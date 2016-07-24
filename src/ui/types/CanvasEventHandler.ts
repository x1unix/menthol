import {CanvasEventBroadcaster} from './CanvasEventBroadcaster';
import {UIComponent} from '../UIComponent';
import {Form} from '../Form';
import {ComponentMapper} from '../ComponentMapper';

export class CanvasEventHandler {
    public targetEventName:string;
    public owner:Form;
    public mapper:ComponentMapper;
    public constructor(eventName:string, owner:Form) {
        this.owner = owner;
        this.mapper = owner.mapper;
        this.targetEventName = eventName;
    }
    public handleEvent(event:UIEvent){}
    
}