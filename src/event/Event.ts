import {EventEmitter} from './EventEmitter';

export class Event {
        
        private _target : EventEmitter;
        public get target() : EventEmitter {
            return this._target;
        }
        public set target(v : EventEmitter) {
            this._target = v;
        }
        
        private _args : Object;
        public get args() : Object {
            return this._args;
        }
        public set args(v : Object) {
            this._args = v;
        }

        public constructor(target:EventEmitter, args:Object) {
            this._args = args;
            this._target = target;
        }   
    }