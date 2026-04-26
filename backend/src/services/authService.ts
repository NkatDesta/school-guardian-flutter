import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { JwtPayload, AuthUser } from '../types';
import { getPermissionsForRole } from '../utils/permissions';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback_secret_key';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '24h';

export class AuthService {
  static generateToken(user: AuthUser): string {
    const payload: JwtPayload = {
      userId: user.userId,
      email: user.email,
      role: user.role,
      permissions: this.getPermissionsForRole(user.role),
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + this.parseExpiration(JWT_EXPIRES_IN),
    };

    return jwt.sign(payload, JWT_SECRET, { algorithm: 'HS256' });
  }

  static verifyToken(token: string): JwtPayload {
    try {
      const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
      return decoded;
    } catch (error) {
      throw new Error('Invalid or expired token');
    }
  }

  static async hashPassword(password: string): Promise<string> {
    const saltRounds = 12;
    return bcrypt.hash(password, saltRounds);
  }

  static async comparePassword(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  static getPermissionsForRole(role: string): string[] {
    return getPermissionsForRole(role);
  }

  private static parseExpiration(expiration: string): number {
    const unit = expiration.slice(-1);
    const value = parseInt(expiration.slice(0, -1));

    switch (unit) {
      case 's':
        return value;
      case 'm':
        return value * 60;
      case 'h':
        return value * 60 * 60;
      case 'd':
        return value * 24 * 60 * 60;
      default:
        return 24 * 60 * 60; // Default to 24 hours
    }
  }
}
