import {Event} from '../Event';
import {EventEmitter} from '../EventEmitter';
import {UIComponent} from '../../ui/UIComponent';

export class CollectionEvent extends Event {
        public constructor(target:EventEmitter, item:UIComponent) {
            super(target, {
                item: item
            });
        }
    }