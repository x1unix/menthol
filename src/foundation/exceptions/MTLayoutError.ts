import {MentholException} from './MentholException';

/**
 * Menthol render error exception
 */
export class MTLayoutError extends MentholException {
  constructor(message: string) {
    super(message);
  }
}
