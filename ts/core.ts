export module core {

    export function isset(e) {
        return typeof e !== 'undefined';
    }

    export interface Coordinates {
        p1:Point,
        p2:Point,
        p3:Point,
        p4:Point
    }

    export class version {
        public static major:number = 0;
        public static minor:number = 5;
        public static patch:number = 8;
        public static toString() {
            return [this.major, this.minor, this.patch].join('.');
        }
    }

    export class GUID {
        public static generate():string {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        }
        public toString():string {
            return '';
        }
        
        public length():number {
            return this.toString().length;
        }

        public constructor() {
            var value:string = GUID.generate();
            this.toString = () => value;
        }
    }

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

    export class UIEvent  extends Event {
        public constructor(target:EventEmitter, args:Object) {
            super(target, args);
        }
    }

    export class UIMouseEvent extends UIEvent {
        public constructor(target:EventEmitter, windowClickEvent:MouseEvent) {

            super(target, {
                type: windowClickEvent.type,
                target: target,
                keys: {
                    ctrl: windowClickEvent.ctrlKey,
                    alt: windowClickEvent.altKey,
                    shift: windowClickEvent.shiftKey,
                    meta: windowClickEvent.metaKey
                },
                position: {
                    x: windowClickEvent.layerX,
                    y: windowClickEvent.layerY
                }

            });
        }
    } 
    export class PropertyChangedEvent extends UIEvent {
        public constructor(target:EventEmitter, propName:string, oldValue:any, newValue:any) {
            super(target, {
                propertyName: propName,
                oldValue: oldValue,
                newValue: newValue
            });
        }
    }

    export class CollectionEvent extends Event {
        public constructor(target:EventEmitter, item:core.UIControl) {
            super(target, {
                item: item
            });
        }
    }

    export class EventEmitter {
        public on(eventName:string, listener:Function) {}
        public off(eventName:string, listener:Function) {}
        public _emit(eventName:string, eventArgs:any){};
        private __e:EventGenerator;
        public constructor() {
            this.__e = new core.EventGenerator(this);
        }
    } 

    export class EventListenersCollection {
        private _hooks:Array<Function> = []
        public eventName:string;
        private _eventSource:Object;

        public constructor(source:Object, name:string) {
            this.eventName = name;
            this._eventSource = source;
        }

        public triggerEvent(eventArgs:any) {
            var self = this;
            this._hooks.forEach( function(hook) {
                if( typeof hook == 'function' ) hook.call(self._eventSource, eventArgs);
            });
        }

        public getListenersCount() {
            return this._hooks.length;
        }

        public addEventListener(eventListener:Function) {
            this._hooks.push(eventListener);
        }

        public removeEventListener(eventListener:Function) {
            var hookId = this._hooks.indexOf(eventListener);
            if ( hookId > -1) this._hooks.splice(hookId, 1);
            return (hookId > -1);
        }
    }

    export class EventGenerator {
        private _listeners:Object = {}
        private _owner:core.EventEmitter

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
                this._listeners[ eventName ] = new core.EventListenersCollection(this._owner, eventName);
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
    export class BoxModelElement extends Emittable{
        private _top:number;
        private _right:number;
        private _bottom:number;
        private _left:number;


        public get top(): number {
            return this._top;
        }

        public set top(value: number) {
            this._top = value;
            this._onChange('top');
        }

        public get right(): number {
            return this._right;
        }

        public set right(value: number) {
            this._right = value;
            this._onChange('right');
        }

        public get bottom(): number {
            return this._bottom;
        }

        public set bottom(value: number) {
            this._bottom = value;
            this._onChange('bottom');
        }

        public get left(): number {
            return this._left;
        }

        public set left(value: number) {
            this._left = value;
            this._onChange('left');
        }
        
        public constructor(top:number=0, right:number=0, bottom:number=0, left:number=0) {
            super();
            this._top = top;
            this._left = left;
            this._right = right;
            this._bottom = bottom;
        }
    }

    export class FontStyle {
        private _styleType:string;
        public constructor(type:string) {
            this._styleType = type;
        }
        public toString() {
            return this._styleType.toString();
        }

        public static normal:FontStyle = new FontStyle('normal');
        public static italic:FontStyle = new FontStyle('italic');
    }


    export class Font extends EventEmitter{
        
        public emittable : boolean = false;

        private _onChange(prop:string) {
            if( this.emittable ) {
                this._emit('propertyChange', new PropertyChangedEvent(this, prop, null, null) );
            }
        }

        private _height : number;

        public get height(): number {
            return ( !isset(this._height) || typeof this._height == 'undefined' ) ? (this._size * 1.2) | 0 : this._height;
        }

        public set height(value: number) {
            this._height = value;
            this._onChange('height');
        }
            

        private _weight : number;
        public get weight(): number {
            return this._weight;
        }

        public set weight(value: number) {
            this._weight = value;
            this._onChange('weight');
        }
        
        
        private _style : FontStyle;
        public get style() : FontStyle {
            return this._style;
        }
        public set style(v : FontStyle) {
            this._style = v;
            this._onChange('style');
        }
        

        private _family : string;
        public get family() : string {
            return this._family;
        }
        public set family(v : string) {
            this._family = v;
            this._onChange('family');
        }

        
        private _size : number;
        public get size() : number {
            return this._size;
        }
        public set size(v : number) {
            this._size = v;
            this._onChange('size');
        }

        public toString() : string {
            return [this.style.toString(), this.weight, this.size+'px/'+this.height+'px', this.family].join(' ');
        }
        
        public constructor(family:string='sans-serif', size:number=10, weight:number=400) {
            super();
            this._family = family;
            this._size = size;
            this._weight = weight;
            this._style = FontStyle.normal;
        }
        
    }



    export class ConponentMapper {
        private _locationMap:Array<any> = [];
        private _guidMap = {};
        public owner:Form

        public constructor(owner:core.Form) {
            this.owner = owner;
            this.generate();
        }

        public clear() {
            this._locationMap.splice(0, this._locationMap.length - 1);
        }

        public generate() {
            this.clear();
            for(let x = 1; x <= this.owner.canvas.width; x++) {
                this._locationMap[x] = new Array();
                for(let y = 1; y <= this.owner.canvas.height; y++) {
                    this._locationMap[x][y] = new Array();
                }
            }
        }

        private _mapElement(element:UIControl) {
            var guid = element.id.toString();
            var coords = element.points();

            var x1 = coords[0].x,
                x2 = coords[1].x,
                y1 = coords[1].y,
                y2 = coords[2].y;

            for(let y = y1 + 0; y <= y2; y++) {
                for(let x = x1 + 0; x <= x2; x++) {
                    if(!this._locationMap[x]) this._locationMap[x] = new Array();
                    if(typeof this._locationMap[x][y] == 'undefined' ) this._locationMap[x][y] = [];
                    this._locationMap[x][y].push(guid);
                }
            }
            
        }

        private _registerId(element:UIControl) {
            this._guidMap[element.id.toString()] = element;
        }

        public getElementById(eid:string) {
            return this._guidMap[eid];
        }

        public getLocatedId(point:Point) {
            var target = this._locationMap[point.x][point.y];
            return target[target.length - 1];
        }


        public register(item:UIControl) {
            this._registerId(item);
            this._mapElement(item);
        }
    }

    export class Form extends EventEmitter {
        private element:HTMLElement
        public controls:core.Collection
        public canvas:HTMLCanvasElement
        private _map: core.ConponentMapper

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
            this._map.generate();
            this._emit('redraw', new UIEvent(this, {'force': force}));
        }

        public registerElement(element:UIControl) {
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
            this.controls = new core.Collection(null, this);

            // Check when item inserted and 
            this.controls.on('elementInserted', function(item) {
                
            });

            this._emit('drawStart', new UIEvent(this, {}));

            this._map = new core.ConponentMapper(this);
            this.canvas.addEventListener('click', function(event) {
                var p = new Point(event.layerX, event.layerY);
                try {
                    var target =  self._map.getLocatedId(p);
                    target = ( core.isset(target) && target.length > 0) ? self._map.getElementById(target) : self;
                    target._emit('click', new UIMouseEvent(target, event));
                    
                } catch(ex) {
                    console.error(ex);
                }
            });

            this.on('redraw', function() {
                this.clear();
                this.controls.forEach( function(e:UIControl) {
                    e.redraw();
                });
            });
        }
    }

    
    export class Collection extends EventEmitter {
        private items:UIControl[]
        private collectionHandler:any
        public _defaultForm:Form
        public constructor(handler:any, appInstance:Form) {
            super();
            this.collectionHandler = handler;
            this.items = [];
            this._defaultForm = appInstance;
        }

        public add(item:any) {
            item.__inject(this.collectionHandler);
            this.items.push(item);
            this._emit('elementInserted', new CollectionEvent(this,item) );
        }
        public remove(item:any) {
            var i:number = this.items.indexOf(item);
            if( i > -1) {
                this.items[i].dispose();
                this._emit('elementRemove',new CollectionEvent(this,this.items[i]));
                this.items.splice(i,1);
            }
        }

        public forEach(callback:Function) {
            this.items.forEach.call(this.items, callback);
        } 
    }

    export class Point {
        public x : number;
        public y : number;
        public constructor(x:number, y:number) {
            this.x = x;
            this.y = y;
        }
    }
    
    export class TextAlign {
        static start:string = 'start';
        static end:string = 'end';
        static left:string = 'left';
        static center:string = 'center';
        static right:string = 'right';
    }

    export class UIControl extends EventEmitter {
        private __position__:core.Point
        private owner:core.Form
        private _parent:core.UIControl
        private _context:CanvasRenderingContext2D
        public controls:core.Collection
        private _height:any = 128
        private _width:any = 128
        private _injected:boolean = false
        private _backgroundColor:string = 'rgba(0,0,0,0)'
        private _foreColor:string = '#000'
        private _GUID:core.GUID;
        private _padding:BoxModelElement = new BoxModelElement();
        private _margin:BoxModelElement = new BoxModelElement();
        private _font:Font = new Font();

        
        private _drawn : boolean = false;
        
        public get drawn() : boolean {
            return this._drawn;
        }


        public get padding(): BoxModelElement  {
            return this._padding;
        }


        public get margin(): BoxModelElement  {
            return this._margin;
        }
        
        
        public get font() : Font {
            return this._font;
        }

        public get id():GUID {
            if( !this.hasId() ) this._GUID = new core.GUID();
            return this._GUID;
        }

        public hasId():boolean {
            return typeof this._GUID !== 'undefined';
        }


        public constructor(owner:Form) {
            super();

            var self = this;

            this.owner = owner;
            this._context = owner.context;
            this.__position__ = new core.Point(0,0);
            this.controls = new core.Collection(this, owner);

            function fnOnUpdate() {
                self._onUpdate();
            }

            var propEvent = 'propertyChange';

            // Redraw element on events
            this.on('layerUpdate', this._onUpdate);
            this.on('propertyChange', this._onUpdate);

            this._font.on(propEvent, fnOnUpdate);
            this._padding.on(propEvent, fnOnUpdate);
            this._margin.on(propEvent, fnOnUpdate);

            
        }

        get context():CanvasRenderingContext2D {
            return this._context;
        }
        get isInjected():boolean {
            return this._injected;
        }

        private _onUpdate() {
            if( !this.drawn ) return;
            this.owner._emit('redraw', {relatedTarget: this});
        }

       
        /**
         * Colors
         */
        get backgroundColor():string {
            return this._backgroundColor;
        }
        set backgroundColor(newColor:string) {
            var old = this._backgroundColor.toString();

            this._backgroundColor = newColor;

            this._emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'backgroundColor',
                    old,
                    newColor
            ));
        }

        get foreColor():string {
            return this._foreColor;
        }
        set foreColor(newColor:string) {
            var old = this._foreColor.toString();

            this._foreColor = newColor;

            this._emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'foreColor',
                    old,
                    newColor
            ));
        }
        /**
         * Height
         */
        get height():any {
            return this._height;
        }
        set height(newHeight:any) {
            this._height = newHeight;

            this._emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'width',
                    null,
                    newHeight
            ));

            
        }
        /**
         * Width
         */
        get width():any {
            return this._width;
        }
        set width(newWidth:any) {
            this._width = newWidth;

            this._emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'width',
                    null,
                    newWidth
            ));
        }
        /** 
         * Rest
         */

        public getAbsoluteHeight() {
          return this.height;
        }

        public getAbsoluteWidth() {
          return this.height;
        }

 
        public get top() : number {
            return this.__position__.y;
        }
        public set top(v : number) {
            var old = v+0;
            this.__position__.y = v;
            this._emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'top',
                    old,
                    v
            ));
        }

        public get left() : number {
            return this.__position__.x;
        }
        public set left(v : number) {
            var old = v+0;
            this.__position__.x = v;
            this._emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'left',
                    old,
                    v
            ));
        }
        

        get position():core.Point {
            return this.__position__;
        }
        set position(newPosition:core.Point) {
            var old = new Point(newPosition.x, newPosition.y);

            this.top = newPosition.y;
            this.left = newPosition.x;
            this.__position__ = newPosition;
            this._emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'position',
                    old,
                    newPosition
            ));
        }

        public points():Array<Point> {
            var p1 = new Point(this.position.x, this.position.y),
                p2 = new Point(this.position.x + this.getAbsoluteWidth(), this.position.y),
                p3 = new Point(this.position.x + this.getAbsoluteWidth(), this.position.y + this.getAbsoluteHeight()),
                p4 = new Point(this.position.x, this.position.y + this.getAbsoluteHeight() );

           return [p1,p2,p3,p4];     
        }

        get parent():core.UIControl {
            return this._parent;
        }
        
        public hasParent():boolean {
            return ( isset(this.parent) && this.parent !== null);
        }
        public redraw() {
            // Do not redraw element if its not injected of force do
            if( !this.isInjected ) return false;

            this.owner.registerElement(this);

            // Emit event
            this._emit('redraw', new UIEvent(this, {'force': false}));

            // Redraw self
            this.render();

            return true;
        } 

        public _render() {}
        
        private _drawChildren() {
            this.controls.forEach( function _fnDrawChild(e) {
                e.redraw();
            });
        }

        public render() {
            this._drawn = false;
            this._emit('render', new UIEvent(this, null));
            this._render();
            this._drawChildren();
            this._drawn = true;
            this._emit('rendered', new UIEvent(this, null));
        }
       

        public __inject(parent:core.UIControl) {
            this._parent = parent;
            this._injected = true;

            this._font.emittable = true;

            this.owner.registerElement(this);
            this._emit('inject', new UIEvent(this, {'parent': parent}));
            this.render();
        }

        public remove() {
            var parent = this.hasParent() ? this.parent : this.owner;
            parent.controls.remove(this);
        }

        public dispose() {
            this._emit('dispose', new UIEvent(this, null));
            this._injected = false;
        }
        
    }
}