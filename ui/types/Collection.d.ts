import { Form } from '../Form';
import { EventEmitter } from '../../events';
import { Point } from './Point';
export declare class Collection extends EventEmitter {
    private items;
    private collectionHandler;
    _defaultForm: Form;
    constructor(handler: any, appInstance: Form);
    add(item: any): void;
    remove(item: any): void;
    forEach(callback: Function): void;
    broadcast(domEvent: UIEvent, eventConstructor: Function, checkBounds?: boolean, point?: Point): void;
}
