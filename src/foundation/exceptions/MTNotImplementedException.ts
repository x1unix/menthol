import {MentholException} from './MentholException';

/**
 * Menthol render error exception
 */
export class MTNotImplementedException extends MentholException {
  constructor(message: string = 'Feature not implemented yet') {
    super(message);
  }
}
