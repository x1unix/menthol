"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('./core');
var ui;
(function (ui) {
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle() {
            _super.apply(this, arguments);
        }
        Rectangle.prototype._render = function () {
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        };
        return Rectangle;
    }(core_1.core.UIControl));
    ui.Rectangle = Rectangle;
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            _super.apply(this, arguments);
            this._text = 'New Label';
            this._align = core_1.core.TextAlign.left;
        }
        Object.defineProperty(Label.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (newStr) {
                var old = this._text.toString();
                this._text = newStr;
                this._emit('propertyChange', new core_1.core.PropertyChangedEvent(this, 'text', old, newStr));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "textAlign", {
            get: function () {
                return this._align;
            },
            set: function (newVal) {
                this._align = newVal;
                this._emit('propertyChange', new core_1.core.PropertyChangedEvent(this, 'textAlign', null, newVal));
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype._render = function () {
            this.context.font = this.font.toString();
            this.context.fillText(this.text, this.position.y, this.position.x);
        };
        return Label;
    }(core_1.core.UIControl));
    ui.Label = Label;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.apply(this, arguments);
        }
        Button.prototype._render = function () {
            this.context.font = this.font.toString();
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
            this.context.fillText(this.text, this.position.x, this.position.y, this.width);
        };
        return Button;
    }(Label));
    ui.Button = Button;
})(ui = exports.ui || (exports.ui = {}));
