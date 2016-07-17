import {UIComponent} from './UIComponent';
import {Point} from './types/Point';
import {Form} from './Form';

export class ComponentMapper {
        private _locationMap:Array<any> = [];
        private _guidMap = {};
        public owner:Form

        public constructor(owner:Form) {
            this.owner = owner;
            this.generate();
        }

        public clear() {
            this._locationMap.splice(0, this._locationMap.length - 1);
        }

        public generate() {
            this.clear();
            for(let x = 1; x <= this.owner.canvas.width; x++) {
                this._locationMap[x] = new Array();
                for(let y = 1; y <= this.owner.canvas.height; y++) {
                    this._locationMap[x][y] = new Array();
                }
            }
        }

        private _mapElement(element:UIComponent) {
            var guid = element.id.toString();
            var coords = element.points();

            var x1 = coords[0].x,
                x2 = coords[1].x,
                y1 = coords[1].y,
                y2 = coords[2].y;

            for(let y = y1 + 0; y <= y2; y++) {
                for(let x = x1 + 0; x <= x2; x++) {
                    if(!this._locationMap[x]) this._locationMap[x] = new Array();
                    if(typeof this._locationMap[x][y] == 'undefined' ) this._locationMap[x][y] = [];
                    this._locationMap[x][y].push(guid);
                }
            }
            
        }

        private _registerId(element:UIComponent) {
            this._guidMap[element.id.toString()] = element;
        }

        public getElementById(eid:string) {
            return this._guidMap[eid];
        }

        public getLocatedId(point:Point) {
            var target = this._locationMap[point.x][point.y];
            return target[target.length - 1];
        }


        public register(item:UIComponent) {
            this._registerId(item);
            this._mapElement(item);
        }
    }