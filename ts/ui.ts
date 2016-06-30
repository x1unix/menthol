import {core} from './core';

export module ui {
    export class Label extends core.UIControl {
        private $text:string = 'New Label';
        private $align:string = core.TextAlign.left;
        get text():string {
            return this.$text;
        }
        set text(newStr:string) {
            this.$text = newStr;
            this.redrawContext();
        }

        get textAlign():string {
            return this.$align;
        }
        set textAlign(newVal:string) {
            this.$align = newVal;
            this.redrawContext();
        }

        public _render() {
            this.context.fillText(this.text, this.height, this.width);
        }
    }    
}