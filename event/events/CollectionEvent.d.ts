import { Event } from '../Event';
import { EventEmitter } from '../EventEmitter';
import { UIComponent } from '../../ui/UIComponent';
export declare class CollectionEvent extends Event {
    constructor(target: EventEmitter, item: UIComponent);
}
