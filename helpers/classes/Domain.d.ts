import { EventEmitter } from '../../events';
export declare class Domain extends EventEmitter {
    constructor();
    private _execute(method);
    run(func: Function): void;
}
