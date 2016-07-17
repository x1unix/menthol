import {EventGenerator} from './EventGenerator';

export class EventEmitter {
        public on(eventName:string, listener:Function) {}
        public off(eventName:string, listener:Function) {}
        public _emit(eventName:string, eventArgs:any){};
        private __e:EventGenerator;
        public constructor() {
            this.__e = new EventGenerator(this);
        }
    } 
