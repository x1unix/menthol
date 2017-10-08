import {Storyboard} from './view/Storyboard';
import {MentholDebugProvider} from './debug/MentholDebugProvider';

/**
 * Application bootstrapper
 */
export class Menthol {

  /**
   * Menthol version
   * @type {string}
   */
  public static version = '0.2.0';

  public static debugLevel = 0;

  /**
   * Create a storyboard instance and bind to canvas element
   * @param {HTMLCanvasElement} canvas
   * @param {typeof Storyboard} boardClass
   * @param {number} debugLevel Debug level
   * @returns {Storyboard}
   */
  public static bootstrapView(canvas: HTMLCanvasElement, boardClass: typeof Storyboard, debugLevel: number = 0): Storyboard {
    const board = new boardClass();
    board.canvas = canvas;
    canvas.tabIndex = 0;
    canvas.focus();

    board.syncCanvasBounds()
      .setDebugLevel(debugLevel)
      .onCreate();

    window.addEventListener('resize', () => {
      // Define canvas size (for fullscreen support)
      // and redraw
      board.syncCanvasBounds();
    });

    return board;
  }

  /**
   * Create a storyboard instance and bind to canvas element with injected debug toolchain
   * @param {HTMLCanvasElement} canvas
   * @param {typeof Storyboard} boardClass
   * @param {boolean} critical
   * @returns {Storyboard}
   */
  public static bootstrapViewDebug(canvas: HTMLCanvasElement, boardClass: typeof Storyboard, critical: boolean = false): Storyboard {
    const level = critical ? MentholDebugProvider.DEBUG_CRITICAL : MentholDebugProvider.DEBUG;

    const board = Menthol.bootstrapView(canvas, boardClass, level);

    MentholDebugProvider
        .getInstance()
        .setDebugStoryboard(board)
        .injectSuite();

    return board;
  }
}
