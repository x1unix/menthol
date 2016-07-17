export declare class EventEmitter {
    on(eventName: string, listener: Function): void;
    off(eventName: string, listener: Function): void;
    _emit(eventName: string, eventArgs: any): void;
    private __e;
    constructor();
}
