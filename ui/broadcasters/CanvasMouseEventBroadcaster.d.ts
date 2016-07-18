import { UIComponent } from '../UIComponent';
import { Form } from '../Form';
import { CanvasEventBroadcaster } from '../types/CanvasEventBroadcaster';
export declare class CanvasMouseEventBroadcaster extends CanvasEventBroadcaster {
    private elementFound;
    constructor(owner: Form, events?: string[], autobind?: boolean);
    protected eventReactors: {
        'click': (element: UIComponent, event: MouseEvent) => void;
        'mousemove': (element: UIComponent, event: MouseEvent) => void;
        'dblclick': (element: UIComponent, event: MouseEvent) => void;
        'mousedown': (element: UIComponent, event: MouseEvent) => void;
        'mouseup': (element: UIComponent, event: MouseEvent) => void;
        'mouseout': (element: UIComponent, event: MouseEvent) => void;
    };
    protected targetEvent(element: UIComponent, event: MouseEvent): void;
    protected react(element: UIComponent, event: MouseEvent): void;
    protected bindEvent(event: MouseEvent): void;
}
