import {UIEvent} from './UIEvent';
import {EventEmitter} from '../EventEmitter';

export class UICommonEvent extends UIEvent {
  public constructor(target: EventEmitter, args: Object) {
    super(target, args);
  }
}
