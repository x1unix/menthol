import { Logger } from './Logger';
import { isNil } from 'lodash';
import {MTObject} from '../../foundation';

export class Loggable extends MTObject {
  constructor(protected logger: Logger = Logger.main) {
    super();
  }

  /**
   * Write log entry (DEBUG)
   * @param {string} message
   * @param {string} rest
   */
  protected log(message: string, ...rest: string[]) {
    this.logger.debug(this.className, message, rest);
  }

  /**
   * Write log error entry
   * @param {string} message
   * @param {string} rest
   */
  protected logError(message: string, ...rest: string[]) {
    this.logger.error(this.className, message, rest);
  }

  /**
   * Write log info entry
   * @param {string} message
   * @param {string} rest
   */
  protected logInfo(message: string, ...rest: string[]) {
    this.logger.info(this.className, message, rest);
  }

  /**
   * Write log warn entry
   * @param {string} message
   * @param {string} rest
   */
  protected logWarn(message: string, ...rest: string[]) {
    this.logger.warn(this.className, message, rest);
  }
}
