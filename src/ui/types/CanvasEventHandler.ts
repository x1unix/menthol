import {CanvasEventBroadcaster} from './CanvasEventBroadcaster';
import {UIComponent} from '../UIComponent';
import {Storyboard} from '../Storyboard';
import {ComponentMapper} from '../ComponentMapper';

export class CanvasEventHandler {
  public targetEventName: string;
  public owner: Storyboard;
  public mapper: ComponentMapper;

  public constructor(eventName: string, owner: Storyboard) {
    this.owner = owner;
    this.mapper = owner.mapper;
    this.targetEventName = eventName;
  }

  public handleEvent(event: UIEvent) {
  }

}
