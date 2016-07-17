import { UIComponent } from './UIComponent';
import { Form } from './Form';
export declare class ComponentMapper {
    private _guidMap;
    owner: Form;
    constructor(owner: Form);
    private _registerId(element);
    getElementById(eid: string): any;
    register(item: UIComponent): void;
}
