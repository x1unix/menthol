import { UIComponent } from './UIComponent';
import { Form } from './Form';
import { CanvasEventBroadcaster } from './types/CanvasEventBroadcaster';
export declare class ComponentMapper {
    private _guidMap;
    owner: Form;
    broadcasters: CanvasEventBroadcaster[];
    private _currentMouseElement;
    currentMouseElement: UIComponent;
    private _currentFocusedElement;
    currentFocusedElement: UIComponent;
    static DOMMouseEvents: string[];
    static DOMEvents: string[];
    constructor(owner: Form);
    private _registerId(element);
    getElementById(eid: string): any;
    register(item: UIComponent): void;
}
