import {MentholException} from './MentholException';

/**
 * Menthol render error exception
 */
export class MTRenderError extends MentholException {
  constructor(message: string) {
    super(message);
  }
}
