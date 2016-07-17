import { EventEmitter } from './EventEmitter';
export declare class Event {
    private _target;
    target: EventEmitter;
    private _args;
    args: Object;
    constructor(target: EventEmitter, args: Object);
}
