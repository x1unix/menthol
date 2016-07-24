import {UIComponent, TextAlign} from '../ui';
import {PropertyChangedEvent} from '../events';

export class Label extends UIComponent {
        private _text:string = 'New Label';
        private _align:string = TextAlign.left;
        get text():string {
            return this._text;
        }
        set text(newStr:string) {
            var old = this._text.toString();
            this._text = newStr;
            this._emit('propertyChange',
                new PropertyChangedEvent(
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
                new PropertyChangedEvent(
                    this,
                    'textAlign',
                    null,
                    newVal
            ));
        }
        
        public _render() {
            this.context.textAlign = this.textAlign;
            this.context.fillStyle = this.foreColor;
            this.context.font = this.font.toString();
            this.context.fillText(this.text, this.position.y, this.position.x);
        }
    }