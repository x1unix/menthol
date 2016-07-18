import {UIComponent} from '../UIComponent';
import {Form} from '../Form';
import {Point} from '../types/Point';
import {UIMouseEvent} from '../../events';
import {$async, $defined} from '../../helpers';
import {CanvasEventBroadcaster} from '../types/CanvasEventBroadcaster';

export class CanvasMouseEventBroadcaster extends CanvasEventBroadcaster {
    private elementFound:boolean = false;

    public constructor(owner:Form, events:string[]=[], autobind:boolean=false) {
        super(owner, events);
    }

    protected eventReactors = {
            'click': function(element:UIComponent, event:MouseEvent) {
                var old:UIComponent = this.mapper.currentMouseElement;

                if( old === null || (old.id === element.id)) { 
                    this.mapper.currentMouseElement = element;
                    var tEvent:UIMouseEvent = new UIMouseEvent(element, event);
                    element.react(event.type, tEvent);
                } else  {
                    old.broadcast('blur', new UIMouseEvent(element, event));

                    this.mapper.currentMouseElement = element;
                    var tEvent:UIMouseEvent = new UIMouseEvent(element, event);
                    element.react(event.type, tEvent);
                }
                
            },
            'mousemove': function(element:UIComponent, event:MouseEvent) {
                var old:UIComponent = this.mapper.currentMouseElement;
                if( (old === null) || (old.id === element.id) )  {
                    if (old.id === element.id) return;

                    this.mapper.currentMouseElement = element;
                    var tEvent:UIMouseEvent = new UIMouseEvent(element, event);
                    element.emit('mouseover', tEvent);
                } else {
                    // Send to old element
                    var tEvent:UIMouseEvent = new UIMouseEvent(old, event);
                    old.emit('mouseout', tEvent);
                    
                    this.mapper.currentMouseElement = element;
                    
                    // New element
                    var tEvent:UIMouseEvent = new UIMouseEvent(element, event);
                    element.emit('mouseover', tEvent);   
                }  
            },
            'dblclick': function(element:UIComponent, event:MouseEvent) {
                this.click(element, event);
            },
            'mousedown': function(element:UIComponent, event:MouseEvent) {
                this.click(element, event);
            },
            'mouseup': function(element:UIComponent, event:MouseEvent) {
                this.click(element, event);
            },
            'mouseout': function(element:UIComponent, event:MouseEvent) {
                this.mapper.currentMouseElement = null;
            }
            
        };
    protected targetEvent(element:UIComponent, event:MouseEvent) {
        let p:Point = new Point(event.layerX, event.layerY);
        if( element.inBoundsOf(p) ) {
            return this.react(element, event);
        } else {
            element.controls.forEach((_element: UIComponent) => {
                this.targetEvent(_element, event);
            });
        }
        
    }

    protected react(element:UIComponent, event:MouseEvent) {
        var eReactor = ( $defined(this.eventReactors[event.type]) ) ? this.eventReactors[event.type] : 'mousemove';
        eReactor(element, event);
    }

    protected bindEvent(event:MouseEvent) {
        let owner:Form = this.owner;

        // Emit to form
        owner._emit( event.type, new UIMouseEvent(owner, event) );

        // Broadcast to children   
        $async( () => {
            owner.controls.forEach((element: UIComponent) => {
                this.targetEvent(element, event);
            });
            if( !this.elementFound ) this.mapper.currentMouseElement = null;
        });
        
    }
}