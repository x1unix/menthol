import { UIComponent } from './UIComponent';
import { Form } from './Form';
export declare class ComponentMapper {
    private _guidMap;
    owner: Form;
    static DOMMouseEvents: string[];
    static DOMEvents: string[];
    constructor(owner: Form);
    private _registerId(element);
    getElementById(eid: string): any;
    register(item: UIComponent): void;
    private _mouseEventsHooker(event);
    private _defaultEventsHooker(event);
    private _watchMouseEvents();
    private _watchDefaultEvents();
}
