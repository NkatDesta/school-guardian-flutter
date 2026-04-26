import { createWriteStream, WriteStream } from 'fs';
import { join } from 'path';

class Logger {
  private logStream: WriteStream | null = null;

  constructor() {
    if (process.env.NODE_ENV === 'development') {
      // In development, just use console logging
      this.logStream = null;
    } else {
      // In production, log to file
      const logPath = join(__dirname, '../../logs/app.log');
      this.logStream = createWriteStream(logPath, { flags: 'a' });
    }
  }

  info(message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] INFO: ${message}`;
    
    console.log(logMessage, ...args);
    
    if (this.logStream) {
      this.logStream.write(logMessage + '\n');
    }
  }

  error(message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] ERROR: ${message}`;
    
    console.error(logMessage, ...args);
    
    if (this.logStream) {
      this.logStream.write(logMessage + '\n');
    }
  }

  warn(message: string, ...args: any[]): void {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] WARN: ${message}`;
    
    console.warn(logMessage, ...args);
    
    if (this.logStream) {
      this.logStream.write(logMessage + '\n');
    }
  }

  debug(message: string, ...args: any[]): void {
    if (process.env.NODE_ENV === 'development') {
      const timestamp = new Date().toISOString();
      const logMessage = `[${timestamp}] DEBUG: ${message}`;
      
      console.debug(logMessage, ...args);
      
      if (this.logStream) {
        this.logStream.write(logMessage + '\n');
      }
    }
  }
}

export const logger = new Logger();
