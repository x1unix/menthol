import {core} from './core';

export module ui {

    export class Rectangle extends core.UIControl {
        public _render() {
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        }
    }
    

    export class Label extends core.UIControl {
        private $text:string = 'New Label';
        private $align:string = core.TextAlign.left;
        get text():string {
            return this.$text;
        }
        set text(newStr:string) {
            this.$emit('propertyChange',
                new core.PropertyChangedEvent(
                    this,
                    'text',
                    this.$text,
                    newStr
            ));
            this.$text = newStr;
        }

        get textAlign():string {
            return this.$align;
        }
        set textAlign(newVal:string) {
            this.$emit('propertyChange',
                new core.PropertyChangedEvent(
                    this,
                    'textAlign',
                    this.$align,
                    newVal
            ));
            this.$align = newVal;
        }

        public _render() {
            this.context.fillText(this.text, this.position.y, this.position.x);
        }
    } 


    export class Button extends Label {
        public _render() {
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
            this.context.fillText(this.text, this.position.x, this.position.y, this.width);
        }
    }   
}