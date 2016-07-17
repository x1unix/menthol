import {PropertyChangedEvent} from './events/PropertyChangedEvent';
import {EventEmitter} from './EventEmitter';

export class Emittable extends EventEmitter {
        public emittable:boolean;
        public _onChange(prop:string) {
            if( this.emittable ) {
                this._emit('propertyChange', new PropertyChangedEvent(this, prop, null, null) );
            }
        }

        public constructor() {
            super();
            this.emittable = false;
        }
    }