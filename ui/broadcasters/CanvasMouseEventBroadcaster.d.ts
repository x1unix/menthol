import { UIComponent } from '../UIComponent';
import { Form } from '../Form';
import { CanvasEventBroadcaster } from '../types/CanvasEventBroadcaster';
export declare class CanvasMouseEventBroadcaster extends CanvasEventBroadcaster {
    private elementFound;
    private eventHandlers;
    constructor(owner: Form, events?: string[], autobind?: boolean);
    protected _initHandlers(): void;
    protected targetEvent(element: UIComponent, event: MouseEvent): void;
    protected react(element: UIComponent, event: MouseEvent): void;
    protected bindEvent(event: MouseEvent): void;
}
