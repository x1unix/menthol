import { EventEmitter } from '../events';
import { Version } from '../helpers';
import { UIComponent } from './UIComponent';
import { ComponentMapper } from './ComponentMapper';
import { Collection } from './types/Collection';
export declare class Form extends EventEmitter {
    private element;
    controls: Collection;
    canvas: HTMLCanvasElement;
    private _map;
    version: Version;
    height: number;
    width: number;
    context: CanvasRenderingContext2D;
    mapper: ComponentMapper;
    redrawContext(force: any): void;
    registerElement(element: UIComponent): void;
    getElementById(id: string): any;
    clear(): Form;
    constructor(handler: HTMLElement, bootstrap: Function);
}
