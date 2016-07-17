import {UIComponent} from './UIComponent';
import {Point} from './types/Point';
import {Form} from './Form';
import {isset} from '../helpers';
import {UIMouseEvent, UICommonEvent} from '../events';

export class ComponentMapper {
        private _guidMap = {};
        public owner:Form;
        
        public static DOMMouseEvents:string[] = [
            'click',
            'dblclick',
            'mousedown',
            'mouseup',
            'mouseover',
            'mouseout',
            'mousemove'];

        public static DOMEvents:string[] = [
            'keydown',
            'keyup',
            'keypress'
        ];

        public constructor(owner:Form) {
            this.owner = owner;
            this._watchMouseEvents();
            this._watchDefaultEvents();
        }

        private _registerId(element:UIComponent) {
            this._guidMap[element.id.toString()] = element;
        }

        public getElementById(eid:string) {
            return this._guidMap[eid];
        }

        public register(item:UIComponent) {
            this._registerId(item);
        }

        private _mouseEventsHooker(event:MouseEvent) {
            var p:Point = new Point(event.layerX, event.layerY);
            var owner = this.owner;

            // Emit event to frame
            owner._emit( event.type, new UIMouseEvent(owner, event) );

            // Broadcast to children
            owner.controls.broadcast(event, function(t, e){
                return new UIMouseEvent(t, e);
            }, true, p);
        }

        private _defaultEventsHooker(event:UIEvent) {
            var owner = this.owner;

            // Emit event to frame
            owner._emit( event.type, new UICommonEvent(owner, event) );

            // Broadcast to children
            owner.controls.broadcast(event, function(t, e){
                return new UICommonEvent(t, e);
            }, true, new Point(0,0) );
        }

        private _watchMouseEvents() {
            var self = this;
            ComponentMapper.DOMMouseEvents.forEach( function(e) {
                self.owner.canvas.addEventListener(e, function(event:MouseEvent) {
                    self._mouseEventsHooker(event);
                });
            });   
        }

        private _watchDefaultEvents() {
            var self = this;
            ComponentMapper.DOMEvents.forEach( function(e) {
                self.owner.canvas.addEventListener(e, function(event:UIEvent) {
                    self._defaultEventsHooker(event);
                });
            }); 
        }
    }