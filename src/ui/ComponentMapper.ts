import {UIComponent} from './UIComponent';
import {Point} from './types/Point';
import {Form} from './Form';
import {isset} from '../helpers';
import {CanvasEventBroadcaster} from './types/CanvasEventBroadcaster';
import {CanvasMouseEventBroadcaster} from './broadcasters/CanvasMouseEventBroadcaster';

import {UIMouseEvent, UICommonEvent} from '../events';

export class ComponentMapper {
        private _guidMap = {};
        public owner:Form;
        public broadcasters:CanvasEventBroadcaster[] = [];
        
        public previousMouseElement: UIComponent = null;

        private _currentMouseElement : UIComponent = null;
        public get currentMouseElement() : UIComponent {
            return this._currentMouseElement;
        }
        public set currentMouseElement(e:UIComponent) {
            this._currentMouseElement = e;
        }

        private _currentFocusedElement : UIComponent;
        public get currentFocusedElement() : UIComponent {
            return this._currentFocusedElement;
        }

        public set currentFocusedElement(e:UIComponent) {
            this._currentFocusedElement = e;
        }
        
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
            this.broadcasters.push( new CanvasMouseEventBroadcaster(owner, ComponentMapper.DOMMouseEvents, false));
            
            
        }

        public load() {
         this.broadcasters.forEach( (e) => {
             e.load();
         });
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

        
    }