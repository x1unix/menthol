import {MTPoint} from '../../foundation/MTPoint';

export class MTClickEvent {
  static BUTTON_LEFT = -1;
  static BUTTON_RIGHT = -2;
  static BUTTON_NONE = 0;

  storyboardPosition: MTPoint;
  position: MTPoint;
  buttonPressed: number = 0;
}
