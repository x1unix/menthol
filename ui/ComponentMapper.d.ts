import { UIComponent } from './UIComponent';
import { Point } from './types/Point';
import { Form } from './Form';
export declare class ComponentMapper {
    private _locationMap;
    private _guidMap;
    owner: Form;
    constructor(owner: Form);
    clear(): void;
    generate(): void;
    private _mapElement(element);
    private _registerId(element);
    getElementById(eid: string): any;
    getLocatedId(point: Point): any;
    register(item: UIComponent): void;
}
