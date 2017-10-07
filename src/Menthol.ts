import {Storyboard} from './ui/Storyboard';

/**
 * Application bootstrapper
 */
export class Menthol {

  /**
   * Menthol version
   * @type {string}
   */
  public static version = '0.2.0';

  /**
   * Create a storyboard instance and bind to canvas element
   * @param {HTMLCanvasElement} canvas
   * @param {typeof Storyboard} boardClass
   * @returns {Storyboard}
   */
  public static bootstrapView(canvas: HTMLCanvasElement, boardClass: typeof Storyboard): Storyboard {
    const board = new boardClass();
    board.canvas = canvas;
    canvas.tabIndex = 0;
    canvas.focus();
    board.onCreate();

    return board;
  }
}
