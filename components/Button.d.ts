import { Label } from './Label';
import { Form } from '../ui';
export declare class Button extends Label {
    constructor(owner: Form);
    private _getTextPosition();
    getAbsoluteHeight(): any;
    getAbsoluteWidth(): any;
    _render(): void;
}
