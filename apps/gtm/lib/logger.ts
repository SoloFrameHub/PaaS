/**
 * Simple structured logger for production-ready applications.
 * Wraps console in development and can be extended for cloud logging in production.
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

interface LogContext {
    [key: string]: any;
}

class Logger {
    private isProduction = process.env.NODE_ENV === 'production';

    private formatContext(context?: LogContext) {
        if (!context) return undefined;

        const formatted: LogContext = {};
        for (const [key, value] of Object.entries(context)) {
            if (value instanceof Error) {
                formatted[key] = {
                    message: value.message,
                    stack: value.stack, // Include stack trace in JSON even in production for Error Reporting
                    name: value.name,
                    ...(value as any)
                };
            } else {
                formatted[key] = value;
            }
        }
        return formatted;
    }

    private log(level: LogLevel, message: string, context?: LogContext) {
        // Map to Google Cloud Logging severity levels
        const severityMap: Record<LogLevel, string> = {
            'info': 'INFO',
            'warn': 'WARNING',
            'error': 'ERROR',
            'debug': 'DEBUG'
        };

        const severity = severityMap[level];
        const timestamp = new Date().toISOString();
        const formattedContext = this.formatContext(context);

        if (this.isProduction) {
            // Google Cloud Logging structured entry
            const entry = {
                timestamp,
                severity,
                message,
                ...formattedContext,
                // Add service context for Error Reporting grouping if it's an error
                ...(level === 'error' ? {
                    serviceContext: {
                        service: process.env.NEXT_PUBLIC_APP_NAME || 'soloframehub-v2',
                        version: process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0',
                    }
                } : {})
            };
            console.log(JSON.stringify(entry));
        } else {
            // Development logging
            const consoleMethod = (console[level] || console.log).bind(console);
            let contextStr = '';
            if (formattedContext) {
                try {
                    contextStr = ` | ${JSON.stringify(formattedContext)}`;
                } catch (e) {
                    contextStr = ` | [Circular/Unserializable Context]`;
                }
            }
            consoleMethod(`[${timestamp}] ${severity}: ${message}${contextStr}`);
        }
    }

    info(message: string, context?: LogContext) {
        this.log('info', message, context);
    }

    warn(message: string, context?: LogContext) {
        this.log('warn', message, context);
    }

    error(message: string, context?: LogContext) {
        this.log('error', message, context);
    }

    debug(message: string, context?: LogContext) {
        this.log('debug', message, context);
    }
}

export const logger = new Logger();
