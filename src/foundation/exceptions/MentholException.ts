import { isNil } from 'lodash';

/**
 * Base Menthol error exception class
 */
export class MentholException extends Error {

  /**
   * Get object class name
   * @returns {string}
   */
  public get className(): string {
    if (isNil(this.constructor['name'])) {
      return Object.prototype.toString.call(this)
        .match(/^\[object\s(.*)\]$/)[1];
    } else {
      return this.constructor['name'];
    }
  }

  constructor(public message: string) {
    super(message);
    this.name = this.className || 'MentholException';
    this.stack = (<any> new Error()).stack;
  }
}
