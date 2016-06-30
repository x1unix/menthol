export module core {
    export class version {
        public static major:number = 0;
        public static minor:number = 0;
        public static patch:number = 0;
        public static toString() {
            return [this.major, this.minor, this.patch].join('.');
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
            this.$hooks.forEach( function(hook) {
                if( typeof hook == 'function' ) hook.call(this.$eventSource, eventArgs);
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
            return typeof this.$listeners[ eventName.toString() ] !== 'undefined';
        }
        
        private inject() {
            this.$owner.on = this.on;
            this.$owner.off = this.off;
            this.$owner.$emit = this.emit;
        }

        public emit(eventName:string, eventArgs:any) {
            if ( !this.hasListeners(eventName) ) {
                this.$listeners[ eventName ].triggerEvent(eventArgs);
            }
        }
        public on(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) {
                this.$listeners[ eventName ] = new core.EventListenersCollection(this.$owner, eventName);
            }
            this.$listeners[ eventName ].addEventListener(listener);
        }

        public off(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) return false;
            return this.$listeners[ eventName ].removeEventListener(listener);
        }

    }

    export class Application extends EventEmitter {
        private element:HTMLElement
        public controls:core.Collection
        private canvas:HTMLCanvasElement
        get context() {
            return this.canvas.getContext('2d');
        }

        public redrawContext() {

        }

        public constructor(handler:HTMLElement) {
            super();
            this.element = handler;
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            this.controls = new core.Collection(null, this);
            this.$emit('drawStart', new UIEvent(this, {}));
        }
    }


    export class Collection extends EventEmitter {
        private items:Array<core.UIControl>
        private collectionHandler:any
        public $defaultApplication:core.Application
        public constructor(handler:any, appInstance:core.Application) {
            super();
            this.collectionHandler = handler;
            this.items = [];
            this.$defaultApplication = appInstance;
        }

        public add(item:any) {
            item.$$inject(this.collectionHandler);
            this.items.push(item);
            this.$emit('elementInserted', new CollectionEvent(this,item) );
        }
        private remove(item:any) {
            var i:number = this.items.indexOf(item);
            if( i > -1) {
                this.items[i].dispose();
                this.$emit('elementRemove',new CollectionEvent(this,this.items[i]));
                this.items.splice(i,1);
            }
        }
    }
    export class Point {
        public x:Number
        public y:Number
        public constructor(x:Number, y:Number) {
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
        private owner:core.Application
        private $parent:core.UIControl
        private $context:CanvasRenderingContext2D
        public controls:core.Collection
        private $height:number = 128
        private $width:number = 128
        private $injected:boolean = false
        private $backgroundColor:string = '#dedede'
        private $foreColor:string = '#000'
        
        public constructor(owner:core.Application) {
            super();
            this.owner = owner;
            this.$context = owner.context;
            this.controls = new core.Collection(this, owner);
        }

        get context():CanvasRenderingContext2D {
            return this.$context;
        }
        get isInjected():boolean {
            return this.$injected;
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
            this.__position__ = newPosition;
            this.redrawContext();
        }
        get parent():core.UIControl {
            return this.$parent;
        }
        
        public redrawContext(force:boolean=false) {
            // Do not redraw element if its not injected of force do
            if( !this.isInjected || !force ) return false;
            this.$emit('redraw', new UIEvent(this, {'force': force}));

            // Redraw self
            this.render();

            // Trigger parent to redraw
            this.parent.redrawContext(force);
            return true;
        } 

        public _render() {}

        public render() {
            this.$emit('render', new UIEvent(this, null));
            this._render();
            this.$emit('rendered', new UIEvent(this, null));
        }
        public $$inject(parent:core.UIControl) {
            this.$parent = parent;
            this.$injected = true;

            this.$emit('inject', new UIEvent(this, {'parent': parent}));
            this.render();
        }
        public dispose() {
            this.$emit('dispose', new UIEvent(this, null));
            this.$injected = false;
        }
        
    }
}