import {core} from './core';

export module ui {

    export class Rectangle extends core.UIControl {
        public _render() {
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
    

    export class Label extends core.UIControl {
        private _text:string = 'New Label';
        private _align:string = core.TextAlign.left;
        get text():string {
            return this._text;
        }
        set text(newStr:string) {
            var old = this._text.toString();
            this._text = newStr;
            this._emit('propertyChange',
                new core.PropertyChangedEvent(
                    this,
                    'text',
                    old,
                    newStr
            ));
        }

        get textAlign():string {
            return this._align;
        }
        set textAlign(newVal:string) {
            
            this._align = newVal;
            this._emit('propertyChange',
                new core.PropertyChangedEvent(
                    this,
                    'textAlign',
                    null,
                    newVal
            ));
        }

        public _render() {
            this.context.font = this.font.toString();
            this.context.fillText(this.text, this.position.y, this.position.x);
        }
    } 


    export class Button extends Label {
        public _render() {
            this.context.font = this.font.toString();
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
            this.context.fillText(this.text, this.position.x, this.position.y, this.width);
        }
    }   
}