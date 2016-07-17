export class EventListenersCollection {
    private _hooks:Array<Function> = []
    public eventName:string;
    private _eventSource:Object;

    public constructor(source:Object, name:string) {
        this.eventName = name;
        this._eventSource = source;
    }

    public triggerEvent(eventArgs:any) {
        var self = this;
        this._hooks.forEach( function(hook) {
            if( typeof hook == 'function' ) hook.call(self._eventSource, eventArgs);
        });
    }

    public getListenersCount() {
        return this._hooks.length;
    }

    public addEventListener(eventListener:Function) {
        this._hooks.push(eventListener);
    }

    public removeEventListener(eventListener:Function) {
        var hookId = this._hooks.indexOf(eventListener);
        if ( hookId > -1) this._hooks.splice(hookId, 1);
        return (hookId > -1);
    }
}