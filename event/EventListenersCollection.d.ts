export declare class EventListenersCollection {
    private _hooks;
    eventName: string;
    private _eventSource;
    constructor(source: Object, name: string);
    triggerEvent(eventArgs: any): void;
    getListenersCount(): number;
    addEventListener(eventListener: Function): void;
    removeEventListener(eventListener: Function): boolean;
}
