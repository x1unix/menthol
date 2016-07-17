export declare class EventGenerator {
    private _listeners;
    private _owner;
    constructor(eventGenerator: any, inject?: Boolean);
    hasListeners(eventName: string): boolean;
    private inject();
    emit(eventName: string, eventArgs: any): void;
    private addEventListener(eventName, listener);
    private removeEventListener(eventName, listener);
    on(eventNames: string, listener: Function): void;
    off(eventNames: string, listener: Function): void;
}
