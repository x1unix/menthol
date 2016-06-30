export module core {
    export class version {
        public static major:number = 0;
        public static minor:number = 0;
        public static patch:number = 0;
        public static toString() {
            return [this.major, this.minor, this.patch].join('.');
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

    export class EventEmitter {
        private $listeners:Object = {}
        private $owner:Object
        public hasListeners(eventName:string) {
            return typeof this.$listeners[ eventName.toString() ] !== 'undefined';
        }
        
        public on(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) {
                this.$listeners[ eventName.toString() ] = new core.EventListenersCollection(this.$owner, eventName);
            }
            this.$listeners[ eventName.toString() ].addEventListener(listener);
        }

        public off(eventName:string, listener:Function) {
            if ( !this.hasListeners(eventName) ) return false;
            return this.$listeners[ eventName.toString() ].removeEventListener(listener);
        }

    }

    export class Application {
        private element:HTMLElement
        public controls:core.Collection
        private canvas:HTMLCanvasElement
        get context() {
            return this.canvas.getContext('2d');
        }
        public redrawContext() {

        }
        public constructor(handler:HTMLElement) {
            this.element = handler;
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            this.controls = new core.Collection(null, this);
        }
    }


    export class Collection {
        private items:Array<core.UIControl>
        private collectionHandler:any
        public $defaultApplication:core.Application
        public constructor(handler:any, appInstance:core.Application) {
            this.collectionHandler = handler;
            this.items = [];
            this.$defaultApplication = appInstance;
        }
        public add(item:any) {
            item.$$inject(this.collectionHandler);
            this.items.push(item);
        }
        private remove(item:any) {
            var i:number = this.items.indexOf(item);
            if( i > -1) {
                this.items[i].dispose();
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

    export class UIControl {
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
            this.$backgroundColor = newColor;
            this.redrawContext();
        }

        get foreColor():string {
            return this.$foreColor;
        }
        set foreColor(newColor:string) {
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
            this.__position__ = newPosition;
            this.redrawContext();
        }
        get parent():core.UIControl {
            return this.$parent;
        }
        
        public redrawContext(force:boolean=false) {
            // Do not redraw element if its not injected of force do
            if( !this.isInjected || !force ) return false;

            // Trigger parent to redraw
            this.parent.redrawContext(force);
            return true;
        } 
        public render() {

        }
        public $$inject(parent:core.UIControl) {
            this.$parent = parent;
            this.$injected = true;
            this.render();
        }
        public dispose() {
            this.$injected = false;
        }
        
    }
}