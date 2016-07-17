import {Label} from './Label';
import {Form} from '../ui';

export class Button extends Label {
        
        public constructor(owner:Form) {
            super(owner);
            this.foreColor = '#fff';
            this.backgroundColor = '#000';
            this.padding.top = 5;
            this.padding.bottom = 5;
            this.padding.left = 5;
            this.padding.right = 5;
            this.height = 'auto';
            this.width = 'auto';
        }

        private _getTextPosition() {
            var txtWidth = this.context.measureText(this.text).width | 0;
            
            return {
                'y': this.position.y + this.font.height + this.padding.top,
                'x': this.position.x + this.padding.left
            };
        }

        public getAbsoluteHeight() {
            if(this.height === 'auto') {
                return this.font.height + this.padding.top + this.padding.bottom;
            } else {
                return this.height + this.padding.top + this.padding.bottom;
            }
        }

        public getAbsoluteWidth() {
            if(this.width === 'auto') {
                var txtWidth = this.context.measureText(this.text).width | 0;
                return txtWidth + this.padding.left + this.padding.right;
            } else {
                return this.height + this.padding.left + this.padding.right;
            }
        }
        
        
        
        public _render() {
            var txtPos = this._getTextPosition();
            var paddingY:number = this.padding.top + this.padding.bottom;
            

            this.context.font = this.font.toString();
            this.context.textAlign = this.textAlign;

            this.context.fillStyle = this.backgroundColor;
            
            this.context.fillRect(this.position.x, this.position.y, this.getAbsoluteWidth(), this.getAbsoluteHeight());

            this.context.fillStyle = this.foreColor;

            this.context.fillText(this.text, txtPos.x, txtPos.y, this.context.measureText(this.text).width);
        }
    }   