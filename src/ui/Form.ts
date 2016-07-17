import {UIEvent, EventEmitter, UIMouseEvent} from '../events';
import {Version} from '../helpers';
import {isset} from '../helpers';
import {Point} from './types/Point';
import {UIComponent} from './UIComponent';
import {ComponentMapper} from './ComponentMapper';
import {Collection} from './types/Collection';

export class Form extends EventEmitter {
        private element:HTMLElement;
        public controls:Collection;
        public canvas:HTMLCanvasElement;
        private _map: ComponentMapper;
        public version:Version = new Version(0,4,0);

        public get height() : number {
            return this.canvas.height;
        }
        public set height(v : number) {
            this.canvas.height = v;
        }

        public get width() : number {
            return this.canvas.width;
        }
        public set width(v : number) {
            this.canvas.width = v;
        }
        
        
        get context() {
            return this.canvas.getContext('2d');
        }

        get mapper() {
            return this._map;
        }


        public redrawContext(force) {
            this._emit('redraw', new UIEvent(this, {'force': force}));
        }

        public registerElement(element:UIComponent) {
            this.mapper.register(element);
        }

        public getElementById(id:string) {
            return this._map.getElementById(id);
        }

        public clear():Form {
            this.context.clearRect(0, 0, this.width, this.height);
            return this;
        }

        public constructor(handler:HTMLElement, bootstrap:Function) {
            super();

            var self = this;

            this.element = handler;
            this.canvas = document.createElement('canvas');

            if(bootstrap) bootstrap.call(self, handler);

            this.element.appendChild(this.canvas);
            this.controls = new Collection(null, this);

            // Check when item inserted and 
            this.controls.on('elementInserted', function(item) {
                
            });

            this._emit('drawStart', new UIEvent(this, {}));

            this._map = new ComponentMapper(this);

            // Mouse events
            this.canvas.addEventListener('click contextmenu dblclick mousedown mouseup mouseover mouseout mousemove', function(event:MouseEvent) {
                var p = new Point(event.layerX, event.layerY);

                // Emit event to frame
                self._emit('click', new UIMouseEvent(self, event));

                // Broadcast to children
                self.controls.broadcast(event, function(t,e) {
                    return new UIMouseEvent(t, e);
                }, true, p);

                // Prevent default
                return false;
            });

            this.on('redraw', function() {
                this.clear();
                this.controls.forEach( function(e:UIComponent) {
                    e.redraw();
                });
            });
        }
    }