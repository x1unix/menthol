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
    export class BoxModel {

    }
    export class version {
        public static major:number = 0;
        public static minor:number = 0;
        public static patch:number = 0;
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
        public $emit(eventName:string, eventArgs:any){};
        private $$e:EventGenerator;
        public constructor() {
            this.$$e = new core.EventGenerator(this);
        }
    } 

    export class EventListenersCollection {
        private $hooks:Array<Function> = []
        public eventName:string;
        private $eventSource:Object;

        public constructor(source:Object, name:string) {
            this.eventName = name;
            this.$eventSource = source;
        }

        public triggerEvent(eventArgs:any) {
            var self = this;
            this.$hooks.forEach( function(hook) {
                if( typeof hook == 'function' ) hook.call(self.$eventSource, eventArgs);
            });
        }

        public getListenersCount() {
            return this.$hooks.length;
        }

        public addEventListener(eventListener:Function) {
            this.$hooks.push(eventListener);
        }

        public removeEventListener(eventListener:Function) {
            var hookId = this.$hooks.indexOf(eventListener);
            if ( hookId > -1) this.$hooks.splice(hookId, 1);
            return (hookId > -1);
        }
    }

    export class EventGenerator {
        private $listeners:Object = {}
        private $owner:core.EventEmitter

        public constructor(eventGenerator:any, inject:Boolean = true) {
            this.$owner = eventGenerator;
            if(inject) this.inject();
        }

        public hasListeners(eventName:string) {
            return typeof this.$listeners[ eventName ] !== 'undefined';
        }
        
        private inject() {
            var self = this;
            this.$owner.on = function() {
                self.on.apply(self, arguments);
            };
            this.$owner.off = function() {
                self.off.apply(self, arguments);
            };
            this.$owner.$emit = function() {
                self.emit.apply(self, arguments);
            };
        }

        public emit(eventName:string, eventArgs:any) {
            if ( this.hasListeners(eventName) ) {
                this.$listeners[ eventName ].triggerEvent(eventArgs);
            }
        }
        private addEventListener(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) {
                this.$listeners[ eventName ] = new core.EventListenersCollection(this.$owner, eventName);
            }
            this.$listeners[ eventName ].addEventListener(listener);
            return this.$owner;
        }

        private removeEventListener(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) return false;
            return this.$listeners[ eventName ].removeEventListener(listener);
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

    export class ConponentMapper {
        private _locationMap:Array<any> = [];
        private _guidMap = {};

        public constructor(owner:core.Form) {
            for(let x = 1; x <= owner.canvas.width; x++) {
                this._locationMap[x] = new Array();
                for(let y = 1; y <= owner.canvas.height; y++) {
                    this._locationMap[x][y] = new Array();
                }
            }
        }

        private _refreshMap() {

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
            this.$emit('redraw', new UIEvent(this, {'force': force}));
        }

        public registerElement(element:UIControl) {
            this.mapper.register(element);
        }

        public getElementById(id:string) {
            return this._map.getElementById(id);
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

            this.$emit('drawStart', new UIEvent(this, {}));

            this._map = new core.ConponentMapper(this);
            this.canvas.addEventListener('click', function(event) {
                var p = new Point(event.layerX, event.layerY);
                try {
                    var target =  self._map.getLocatedId(p);
                    target = ( core.isset(target) && target.length > 0) ? self._map.getElementById(target) : self;
                    target.$emit('click', new UIMouseEvent(target, event));
                    
                } catch(ex) {
                    console.error(ex);
                }
            });
        }
    }


    export class Collection extends EventEmitter {
        private items:Array<core.UIControl>
        private collectionHandler:any
        public $defaultForm:core.Form
        public constructor(handler:any, appInstance:core.Form) {
            super();
            this.collectionHandler = handler;
            this.items = [];
            this.$defaultForm = appInstance;
        }

        public add(item:any) {
            item.$$inject(this.collectionHandler);
            this.items.push(item);
            this.$emit('elementInserted', new CollectionEvent(this,item) );
        }
        public remove(item:any) {
            var i:number = this.items.indexOf(item);
            if( i > -1) {
                this.items[i].dispose();
                this.$emit('elementRemove',new CollectionEvent(this,this.items[i]));
                this.items.splice(i,1);
            }
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
        private $parent:core.UIControl
        private $context:CanvasRenderingContext2D
        public controls:core.Collection
        private $height:number = 128
        private $width:number = 128
        private $injected:boolean = false
        private $backgroundColor:string = '#dedede'
        private $foreColor:string = '#000'
        private $GUID:core.GUID

        
        private _drawn : boolean = false;
        
        public get drawn() : boolean {
            return this._drawn;
        }

        public get id():core.GUID {
            if( !this.hasId() ) this.$GUID = new core.GUID();
            return this.$GUID;
        }

        public hasId():boolean {
            return typeof this.$GUID !== 'undefined';
        }

        public constructor(owner:core.Form) {
            super();

            var self = this;

            this.owner = owner;
            this.$context = owner.context;
            this.__position__ = new core.Point(0,0);
            this.controls = new core.Collection(this, owner);

            // Redraw element on events
            this.on('layerUpdate', this._onUpdate);
            this.on('propertyChange', this._onUpdate);
            
        }

        get context():CanvasRenderingContext2D {
            return this.$context;
        }
        get isInjected():boolean {
            return this.$injected;
        }

        private _onUpdate() {
            console.log('update layer '+this.id);
            this.remove();
            this.redrawContext(true);
        }

       
        /**
         * Colors
         */
        get backgroundColor():string {
            return this.$backgroundColor;
        }
        set backgroundColor(newColor:string) {
            this.$emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'backgroundColor',
                    this.$backgroundColor,
                    newColor
            ));
            
            this.$backgroundColor = newColor;
            this.redrawContext();
        }

        get foreColor():string {
            return this.$foreColor;
        }
        set foreColor(newColor:string) {

            this.$emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'foreColor',
                    this.$foreColor,
                    newColor
            ));

            this.$foreColor = newColor;
            this.context.fillStyle = newColor;
            this.redrawContext();
        }
        /**
         * Height
         */
        get height():number {
            return this.$height;
        }
        set height(newHeight:number) {
            this.$emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'width',
                    this.$height,
                    newHeight
            ));

            this.$height = newHeight;
            this.redrawContext();
        }
        /**
         * Width
         */
        get width():number {
            return this.$width;
        }
        set width(newWidth:number) {
            this.$emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'width',
                    this.$width,
                    newWidth
            ));

            this.$width = newWidth;
            this.redrawContext();
        }
        /** 
         * Rest
         */

 
        public get top() : number {
            return this.__position__.y;
        }
        public set top(v : number) {
            this.$emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'top',
                    this.__position__.y,
                    v
            ));
            this.__position__.y = v;
        }

        public get left() : number {
            return this.__position__.x;
        }
        public set left(v : number) {
            this.$emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'left',
                    this.__position__.x,
                    v
            ));
            this.__position__.x = v;
        }
        

        get position():core.Point {
            return this.__position__;
        }
        set position(newPosition:core.Point) {
            this.$emit('propertyChange',
                new PropertyChangedEvent(
                    this,
                    'position',
                    this.__position__,
                    newPosition
            ));

            this.top = newPosition.y;
            this.left = newPosition.x;
            this.__position__ = newPosition;
        }

        public points():Array<Point> {
            var p1 = new Point(this.position.x, this.position.y),
                p2 = new Point(this.position.x + this.width, this.position.y),
                p3 = new Point(this.position.x + this.width, this.position.y + this.height),
                p4 = new Point(this.position.x, this.position.y + this.height);

           return [p1,p2,p3,p4];     
        }

        get parent():core.UIControl {
            return this.$parent;
        }
        
        public hasParent():boolean {
            return ( isset(this.parent) && this.parent !== null);
        }
        public redrawContext(force:boolean=false) {
            // Do not redraw element if its not injected of force do
            if( !this.isInjected || !force ) return false;

            // Remove element if it was drawm
            if( this.drawn ) this.remove(false);

            this.$emit('redraw', new UIEvent(this, {'force': force}));

            // Redraw self
            this.render();

            // Trigger parent to redraw
            if( this.hasParent() ) this.parent.redrawContext(force);

            return true;
        } 

        public _render() {}
        

        public render() {
            this.$emit('render', new UIEvent(this, null));
            this._render();
            this._drawn = true;
            this.$emit('rendered', new UIEvent(this, null));
        }
        public $$inject(parent:core.UIControl) {
            this.$parent = parent;
            this.$injected = true;

            this.owner.registerElement(this);
            this.$emit('inject', new UIEvent(this, {'parent': parent}));
            this.render();
        }

        public remove(deleteElement:boolean=false) {
            this.context.clearRect(
                this.position.x, 
                this.position.y, 
                this.width, 
                this.height
            );
            
            if( deleteElement ) this.owner.controls.remove(this);
        }

        public dispose() {
            this.$emit('dispose', new UIEvent(this, null));
            this.$injected = false;
        }
        
    }
}