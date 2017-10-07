import {EventGenerator} from './EventGenerator';
import {MTObject} from '../foundation/MTObject';

export class EventEmitter extends MTObject {
  public on(eventName: string, listener: Function) {}

  public off(eventName: string, listener: Function) {}

  public _emit(eventName: string, eventArgs: any) {}

  private __e: EventGenerator;

  public constructor() {
    super();
    this.__e = new EventGenerator(this);
  }
}
