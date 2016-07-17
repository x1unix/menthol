import { EventEmitter } from './EventEmitter';
export declare class Emittable extends EventEmitter {
    emittable: boolean;
    _onChange(prop: string): void;
    constructor();
}
