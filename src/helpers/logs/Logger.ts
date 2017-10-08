import * as moment from 'moment';

/**
 * List of log levels
 *
 * @export
 * @enum {number}
 */
export enum LogLevel {
  ERROR,
  WARN,
  DEBUG,
  INFO,
  ALL
}

export const logLevels = [ 'error', 'warn', 'debug', 'info'];


/* tslint:disable:no-console */

/**
 * Main application log service
 *
 * Note: Please use this service instead of 'console.log' method
 */
export class Logger {

  private static rootLogger: Logger = null;

  /**
   * Get main log instance
   * @returns {Logger}
   */
  public static get main(): Logger {
    if (Logger.rootLogger === null) {
      Logger.rootLogger = new Logger();
    }

    return Logger.rootLogger;
  }

  /**
   * Current log level
   *
   * Defaults:
   * - ERROR : production
   * - ALL : development
   *
   * @private
   * @type {number}
   * @memberof LoggerService
   */
  private logLevel: number = LogLevel.ALL;

  public constructor(level: LogLevel = LogLevel.ALL) {
    this.logLevel = level;
  }


  public get level(): number {
    return this.logLevel;
  }

  /**
   * Print error message
   *
   * @param {string} tag Log tag
   * @param {string} message Message
   * @param {...any[]} content Additional data
   * @memberof LoggerService
   */
  public error(tag: string, message: string, ...content: any[]) {
    this.write(LogLevel.ERROR, tag, message, content);
  }

  /**
   * Print warn message
   *
   * @param {string} tag Log tag
   * @param {string} message Message
   * @param {...any[]} content Additional data
   * @memberof LoggerService
   */
  public warn(tag: string, message: string, ...content: any[]) {
    this.write(LogLevel.WARN, tag, message, content);
  }

  /**
   * Print information message
   *
   * @param {string} tag Log tag
   * @param {string} message Message
   * @param {...any[]} content Additional data
   * @memberof LoggerService
   */
  public info(tag: string, message: string,  ...content: any[]) {
    this.write(LogLevel.INFO, tag, message, content);
  }

  /**
   * Print debug message
   *
   * @param {string} tag Log tag
   * @param {string} message Message
   * @param {...any[]} content Additional data
   * @memberof LoggerService
   */
  public debug(tag: string, message: string, ...content: any[]) {
    this.write(LogLevel.DEBUG, tag, message, content);
  }

  /**
   * Set current log level
   *
   * @param {number} newLevel
   * @memberof LoggerService
   */
  public setLevel(newLevel: number) {
    this.logLevel = newLevel;
  }

  /**
   * Print log message entry at specific log level
   *
   * @private
   * @param {number} level
   * @param {string} tag
   * @param {string} message
   * @param {any[]} [content=[]]
   * @memberof LoggerService
   */
  private write(level: number, tag: string, message: string, content: any[]) {
    if ((this.logLevel === LogLevel.ALL) || (level <= this.logLevel)) {
      this.printMessage(level, tag, message, content);
    }
  }


  /**
   * Format log message
   *
   * @private
   * @param {number} level
   * @param {string} tag
   * @param {string} message
   * @returns {string}
   * @memberof LoggerService
   */
  public format(level: number, tag: string, message: string): string {
    const time = moment().format('DD-MM HH:mm:ss');
    return `${time}: ${logLevels[level].toUpperCase()}/${tag}: ${message}`;
  }

  /**
   * Print log entry the browser console
   *
   * @private
   * @param {number} level
   * @param {string} tag
   * @param {string} message
   * @param {any[]} content
   * @memberof LoggerService
   */
  private printMessage(level: number, tag: string, message: string, content: any[]) {
    let args = [this.format(level, tag, message), ...content];

    switch (level) {
      case LogLevel.ERROR:
        console.error.apply(console, args);
        break;
      case LogLevel.WARN:
        console.warn.apply(console, args);
        break;
      case LogLevel.INFO:
        console.info.apply(console, args);
        break;
      default:
        console.log.apply(console, args);
        break;
    }
  }
}
