import {Event} from '../Event';
import {UIEvent} from './UIEvent';
import {EventEmitter} from '../EventEmitter';

export class PropertyChangedEvent extends UIEvent {
        public constructor(target:EventEmitter, propName:string, oldValue:any, newValue:any) {
            super(target, {
                propertyName: propName,
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }