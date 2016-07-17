import { FontStyle } from './FontStyle';
import { EventEmitter } from '../../events';
export declare class Font extends EventEmitter {
    emittable: boolean;
    private _onChange(prop);
    private _height;
    height: number;
    private _weight;
    weight: number;
    private _style;
    style: FontStyle;
    private _family;
    family: string;
    private _size;
    size: number;
    toString(): string;
    constructor(family?: string, size?: number, weight?: number);
}
