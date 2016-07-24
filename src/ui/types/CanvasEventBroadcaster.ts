import {UIComponent} from '../UIComponent';
import {ComponentMapper} from '../ComponentMapper';
import {Form} from '../Form';

export class CanvasEventBroadcaster {
    public owner:Form;
    public events:string[];
    protected mapper:ComponentMapper;
    protected bindEvent(event:Object) {}
    protected eventReactors:Object;
    protected react(element:UIComponent, event:Object) {}
    protected targetEvent(element:UIComponent, event:Object) {}

    
    private _loaded : boolean = false;
    public get loaded() : boolean {
        return this._loaded;
    }
    

    public constructor(owner:Form, events:string[]=[], autobind:boolean=false) {
        this.owner = owner;
        this.events = events;
        // debugger;
        

        if( autobind ) this.load();
    }


    public load() {
        if( this.loaded ) return;

        this.mapper = this.owner.mapper;
        this.events.forEach( (eventName) => {
            this.owner.canvas.addEventListener(eventName, (event:MouseEvent) => {
                this.bindEvent(event); 
            });
        });

        this._loaded = true;
    }
}