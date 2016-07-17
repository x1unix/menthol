import {UIComponent} from './UIComponent';
import {Point} from './types/Point';
import {Form} from './Form';

export class ComponentMapper {
        private _guidMap = {};
        public owner:Form

        public constructor(owner:Form) {
            this.owner = owner;
        }

        private _registerId(element:UIComponent) {
            this._guidMap[element.id.toString()] = element;
        }

        public getElementById(eid:string) {
            return this._guidMap[eid];
        }

        public register(item:UIComponent) {
            this._registerId(item);
        }
    }