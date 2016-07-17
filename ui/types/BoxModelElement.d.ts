import { Emittable } from '../../events';
export declare class BoxModelElement extends Emittable {
    private _top;
    private _right;
    private _bottom;
    private _left;
    top: number;
    right: number;
    bottom: number;
    left: number;
    constructor(top?: number, right?: number, bottom?: number, left?: number);
}
