import {isset} from '../isset';
import {EventEmitter} from '../../events';

export class Domain extends EventEmitter{
    public constructor() {
        super();
    }
    
    private _execute(method:Function) {
        try {
            method();
        } catch (ex) {
            this._emit('error', ex);
        }
    }

    public run(func:Function) {
        setTimeout(() => {
            this._execute(func);
        }, 0);
    }
}