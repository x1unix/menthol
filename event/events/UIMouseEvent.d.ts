import { UIEvent } from './UIEvent';
import { EventEmitter } from '../EventEmitter';
export declare class UIMouseEvent extends UIEvent {
    constructor(target: EventEmitter, windowClickEvent: MouseEvent);
}
