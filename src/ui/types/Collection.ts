import {UIComponent} from '../UIComponent';
import {Form} from '../Form';
import {EventEmitter} from '../../events';
import {CollectionEvent} from '../../events';

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
    }