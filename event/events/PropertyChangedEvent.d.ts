import { UIEvent } from './UIEvent';
import { EventEmitter } from '../EventEmitter';
export declare class PropertyChangedEvent extends UIEvent {
    constructor(target: EventEmitter, propName: string, oldValue: any, newValue: any);
}
