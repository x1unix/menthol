import {Event} from '../Event';
import {EventEmitter} from '../EventEmitter';

export class UIEvent  extends Event {
        public constructor(target:EventEmitter, args:Object) {
            super(target, args);
        }
    }