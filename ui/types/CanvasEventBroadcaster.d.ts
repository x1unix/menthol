import { UIComponent } from '../UIComponent';
import { ComponentMapper } from '../ComponentMapper';
import { Form } from '../Form';
export declare class CanvasEventBroadcaster {
    owner: Form;
    events: string[];
    protected mapper: ComponentMapper;
    protected bindEvent(event: Object): void;
    protected eventReactors: Object;
    protected react(element: UIComponent, event: Object): void;
    protected targetEvent(element: UIComponent, event: Object): void;
    private _loaded;
    loaded: boolean;
    constructor(owner: Form, events?: string[], autobind?: boolean);
    load(): void;
}
