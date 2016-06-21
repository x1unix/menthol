module kratos {
    export class Application {
        private element:HTMLElement
        public controls:kratos.Collection
        private canvas:HTMLCanvasElement
        get context() {
            return this.canvas.getContext('2d');
        }
        public constructor(handler:HTMLElement) {
            this.element = handler;
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            this.controls = new kratos.Collection(null, this);
        }
    }


    export class Collection {
        private items:Array<kratos.UIControl>
        private collectionHandler:any
        public $defaultApplication:kratos.Application
        public constructor(handler:any, appInstance:kratos.Application) {
            this.collectionHandler = handler;
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
    export class UIControl {
        private __position__:kratos.Point
        private owner:kratos.Application
        private $parent:kratos.UIControl
        private context:CanvasRenderingContext2D
        public controls:kratos.Collection
        get position():kratos.Point {
            return this.__position__;
        }
        set position(newPosition:kratos.Point) {
            this.__position__ = newPosition;
        }
        get parent():kratos.UIControl {
            return this.$parent;
        }
        public constructor(owner:kratos.Application) {
            this.owner = owner;
            this.context = owner.context;
            this.controls = new kratos.Collection(this, owner);
        }
        public render() {

        }
        public $$inject(parent:kratos.UIControl) {
            this.$parent = parent;
            this.render();
        }
        public dispose() {
            
        }
        
    }
}