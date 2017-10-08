/**
 * Event listener delegate
 */
export type MTEventListener<T> = (sender: any, eventArgs: T) => boolean;

/**
 * Event emitter
 */
export class MTEventEmitter<T> {
  /**
   * List of event listeners
   */
  protected listeners: MTEventListener<T>[];

  /**
   * Event sender
   * @param sender
   */
  constructor(protected sender: any) {}

  /**
   * Fire event
   * @param {T} eventArgs
   */
  dispatchEvent(eventArgs: T = null) {
    this.listeners.forEach((listener) => listener(this.sender, eventArgs));
  }

}
