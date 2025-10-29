/**
 * Production-ready logging utility
 * Logs to console in development, can be extended to send to monitoring services
 */

type LogLevel = 'info' | 'warn' | 'error';

interface LogContext {
  [key: string]: unknown;
}

class Logger {
  private shouldLog(level: LogLevel): boolean {
    // In production, only log warnings and errors
    if (process.env.NODE_ENV === 'production') {
      return level === 'warn' || level === 'error';
    }
    // In development, log everything
    return true;
  }

  /**
   * Log informational messages (development only)
   */
  info(message: string, context?: LogContext) {
    if (this.shouldLog('info')) {
      console.log(`[INFO] ${message}`, context || '');
    }
  }

  /**
   * Log warnings (development and production)
   */
  warn(message: string, context?: LogContext) {
    if (this.shouldLog('warn')) {
      console.warn(`[WARN] ${message}`, context || '');
      
      // TODO: Send to monitoring service in production
      // if (process.env.NODE_ENV === 'production') {
      //   Sentry.captureMessage(message, {
      //     level: 'warning',
      //     extra: context,
      //   });
      // }
    }
  }

  /**
   * Log errors (development and production)
   */
  error(message: string, error?: Error | unknown, context?: LogContext) {
    if (this.shouldLog('error')) {
      console.error(`[ERROR] ${message}`, error, context || '');
      
      // TODO: Send to monitoring service in production
      // if (process.env.NODE_ENV === 'production') {
      //   Sentry.captureException(error instanceof Error ? error : new Error(message), {
      //     extra: { ...context, originalError: error },
      //   });
      // }
    }
  }
}

export const logger = new Logger();


