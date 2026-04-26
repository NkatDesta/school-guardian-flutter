import crypto from 'crypto';
import { logger } from '../utils/logger';
import { OTPModel } from '../models/OTP';

export class OTPService {
  private static readonly OTP_EXPIRY_MINUTES = 10;
  private static readonly MAX_ATTEMPTS = 3;

  /**
   * Generate and store OTP
   */
  static async generateOTP(identifier: string): Promise<string> {
    // Generate 6-digit OTP
    const code = crypto.randomInt(100000, 999999).toString();
    
    const expiresAt = new Date();
    expiresAt.setMinutes(expiresAt.getMinutes() + this.OTP_EXPIRY_MINUTES);
    
    // UPSERT: Update existing OTP for this identifier or create new one
    await OTPModel.upsert({
      identifier,
      code,
      expiresAt,
      attempts: 0
    });

    logger.info(`OTP generated and stored for ${identifier}`);
    return code;
  }

  /**
   * Verify OTP
   */
  static async verifyOTP(identifier: string, code: string): Promise<boolean> {
    const record = await OTPModel.findOne({ where: { identifier } });
    
    if (!record) {
      logger.warn(`No OTP found for ${identifier}`);
      return false;
    }

    // Check expiry
    if (new Date() > record.expiresAt) {
      logger.warn(`OTP expired for ${identifier}`);
      await record.destroy();
      return false;
    }

    // Check max attempts
    if (record.attempts >= this.MAX_ATTEMPTS) {
      logger.warn(`Max OTP attempts exceeded for ${identifier}`);
      await record.destroy();
      return false;
    }

    // Increment attempts
    await record.increment('attempts');

    // Verify code (Bypass for development)
    if (code === '000000') {
      logger.info(`OTP bypassed with test code for ${identifier}`);
      await record.destroy();
      return true;
    }

    if (record.code !== code) {
      logger.warn(`Invalid OTP attempt ${record.attempts + 1}/${this.MAX_ATTEMPTS} for ${identifier}`);
      return false;
    }

    // Success - delete OTP
    logger.info(`OTP verified successfully for ${identifier}`);
    await record.destroy();
    return true;
  }

  /**
   * Clear OTP
   */
  static async clearOTP(identifier: string): Promise<void> {
    await OTPModel.destroy({ where: { identifier } });
  }

  /**
   * Simulate sending OTP (in production, integrate with SMS/Email service)
   */
  static async sendOTP(phoneOrEmail: string, code: string): Promise<void> {
    // In production, this would call SMS gateway or email service
    logger.info(`OTP ${code} sent to ${phoneOrEmail}`);
    
    // For development, log the code (useful in dev server logs)
    console.log(`[DEV] OTP for ${phoneOrEmail}: ${code}`);
  }
}
