import {EventEmitter} from './EventEmitter';
import {EventListenersCollection} from './EventListenersCollection';

export class EventGenerator {
        private _listeners:Object = {}
        private _owner:EventEmitter

        public constructor(eventGenerator:any, inject:Boolean = true) {
            this._owner = eventGenerator;
            if(inject) this.inject();
        }

        public hasListeners(eventName:string) {
            return typeof this._listeners[ eventName ] !== 'undefined';
        }
        
        private inject() {
            var self = this;
            this._owner.on = function() {
                self.on.apply(self, arguments);
            };
            this._owner.off = function() {
                self.off.apply(self, arguments);
            };
            this._owner._emit = function() {
                self.emit.apply(self, arguments);
            };
        }

        public emit(eventName:string, eventArgs:any) {
            if ( this.hasListeners(eventName) ) {
                this._listeners[ eventName ].triggerEvent(eventArgs);
            }
        }
        private addEventListener(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) {
                this._listeners[ eventName ] = new EventListenersCollection(this._owner, eventName);
            }
            this._listeners[ eventName ].addEventListener(listener);
            return this._owner;
        }

        private removeEventListener(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) return false;
            return this._listeners[ eventName ].removeEventListener(listener);
        }

        public on(eventNames:string, listener:Function) {
            var self = this;
            eventNames.trim().split(' ').forEach( function(eName) {
                self.addEventListener(eName, listener);
            });
        }

        public off(eventNames:string, listener:Function) {
            var self = this;
            eventNames.trim().split(' ').forEach( function(eName) {
                self.removeEventListener(eName, listener);
            });
        }

    }