import { createWriteStream } from 'fs';
import { join } from 'path';

export enum LogLevel {
  ERROR = 0,
  WARN = 1,
  INFO = 2,
  DEBUG = 3,
}

interface LogEntry {
  timestamp: string;
  level: string;
  message: string;
  meta?: any;
}

class Logger {
  private logLevel: LogLevel;
  private logStream: NodeJS.WritableStream;

  constructor() {
    this.logLevel = this.getLogLevel();
    this.logStream = createWriteStream(join(process.cwd(), 'server.log'), { flags: 'a' });
  }

  private getLogLevel(): LogLevel {
    const level = process.env.LOG_LEVEL?.toUpperCase() || 'INFO';
    return LogLevel[level as keyof typeof LogLevel] ?? LogLevel.INFO;
  }

  private formatLog(level: string, message: string, meta?: any): string {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      ...(meta && { meta }),
    };
    return JSON.stringify(entry) + '\n';
  }

  private log(level: LogLevel, levelName: string, message: string, meta?: any): void {
    if (level <= this.logLevel) {
      const formattedLog = this.formatLog(levelName, message, meta);
      
      // Console output with colors
      const colors = {
        ERROR: '\x1b[31m',
        WARN: '\x1b[33m',
        INFO: '\x1b[36m',
        DEBUG: '\x1b[37m',
      };
      const reset = '\x1b[0m';
      
      console.log(`${colors[levelName as keyof typeof colors]}[${levelName}]${reset} ${message}`, meta || '');
      
      // File output
      this.logStream.write(formattedLog);
    }
  }

  error(message: string, meta?: any): void {
    this.log(LogLevel.ERROR, 'ERROR', message, meta);
  }

  warn(message: string, meta?: any): void {
    this.log(LogLevel.WARN, 'WARN', message, meta);
  }

  info(message: string, meta?: any): void {
    this.log(LogLevel.INFO, 'INFO', message, meta);
  }

  debug(message: string, meta?: any): void {
    this.log(LogLevel.DEBUG, 'DEBUG', message, meta);
  }
}

export const logger = new Logger();
export default logger;