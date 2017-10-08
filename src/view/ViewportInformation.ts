import { isNil } from 'lodash';

import { MentholException } from '../foundation/exceptions/MentholException';

export class ViewportInformation {

  constructor(private canvas: HTMLCanvasElement) {
    if (isNil(canvas)) throw new MentholException('Cannot generate ViewportInformation: Canvas is not provided');
  }

  /**
   * Get device pixel ratio
   * @returns {number}
   */
  get pixelRatio(): number {
    const ctx = this.canvas.getContext('2d'),
        dpr = window.devicePixelRatio || 1,
        bsr = ctx['webkitBackingStorePixelRatio'] ||
        ctx['mozBackingStorePixelRatio'] ||
        ctx['msBackingStorePixelRatio'] ||
        ctx['oBackingStorePixelRatio'] ||
        ctx['backingStorePixelRatio'] || 1;

    return dpr / bsr;
  }

}
