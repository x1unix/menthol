import {Storyboard} from '../view/Storyboard';
import {Loggable} from '../helpers/logs/Loggable';

export class MentholDebugProvider extends Loggable {
  private static instance: MentholDebugProvider = null;

  static DEBUG_CRITICAL = 3;
  static DEBUG = 1;
  static DEBUG_SURFACE = 2;
  static PRODUCTION = 0;

  public static getInstance(): MentholDebugProvider {
    if (MentholDebugProvider.instance === null) {
      MentholDebugProvider.instance = new MentholDebugProvider();
    }

    return MentholDebugProvider.instance;
  }

  protected currentBoard: Storyboard = null;

  public setDebugStoryboard(board: Storyboard): MentholDebugProvider {
    this.currentBoard = board;
    this.logInfo(`${board.className} used for debugging`);
    return this;
  }


  public injectSuite() {
    this.log('Debug suite injected');
    window['getDebugSuite'] = () => MentholDebugProvider.getInstance();
  }
}
