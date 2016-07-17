import {UIComponent} from '../UIComponent';
import {Form} from '../Form';
import {EventEmitter} from '../../events';
import {CollectionEvent} from '../../events';
import {Event} from '../../events';
import {Point} from './Point';

export class Collection extends EventEmitter {
        private items:UIComponent[]
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

        public broadcast(domEvent:UIEvent, eventConstructor:Function, checkBounds:boolean=true, point:Point=new Point(0,0)) {
            this.forEach( function broadcastEvent(e:UIComponent) {
                var inBounds:boolean = (checkBounds) ? e.inBoundsOf(point) : true;

                if( inBounds ) {
                    e._emit(domEvent.type, eventConstructor(domEvent.type, e));
                }

                var checkBoundsRecursive = checkBounds;
                if( inBounds ) checkBoundsRecursive = false; 
                e.controls.broadcast(domEvent, eventConstructor, checkBoundsRecursive, point);

            });
        }
    }