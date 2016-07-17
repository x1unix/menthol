"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../events');
var helpers_1 = require('../helpers');
var ComponentMapper_1 = require('./ComponentMapper');
var Collection_1 = require('./types/Collection');
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(handler, bootstrap) {
        _super.call(this);
        this.version = new helpers_1.Version(0, 4, 0);
        var self = this;
        this.element = handler;
        this.canvas = document.createElement('canvas');
        this.canvas.tabIndex = 0;
        this.canvas.focus();
        Object.defineProperty(this.canvas, 'form', {
            value: self,
            enumerable: true,
            configurable: true
        });
        if (bootstrap)
            bootstrap.call(self, handler);
        this.element.appendChild(this.canvas);
        this.controls = new Collection_1.Collection(null, this);
        this.controls.on('elementInserted', function (item) {
        });
        this._emit('drawStart', new events_1.UIEvent(this, {}));
        this._map = new ComponentMapper_1.ComponentMapper(this);
        this.on('redraw', function () {
            this.clear();
            this.controls.forEach(function (e) {
                e.redraw();
            });
        });
    }
    Object.defineProperty(Form.prototype, "height", {
        get: function () {
            return this.canvas.height;
        },
        set: function (v) {
            this.canvas.height = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "width", {
        get: function () {
            return this.canvas.width;
        },
        set: function (v) {
            this.canvas.width = v;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "context", {
        get: function () {
            return this.canvas.getContext('2d');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Form.prototype, "mapper", {
        get: function () {
            return this._map;
        },
        enumerable: true,
        configurable: true
    });
    Form.prototype.redrawContext = function (force) {
        this._emit('redraw', new events_1.UIEvent(this, { 'force': force }));
    };
    Form.prototype.registerElement = function (element) {
        this.mapper.register(element);
    };
    Form.prototype.getElementById = function (id) {
        return this._map.getElementById(id);
    };
    Form.prototype.clear = function () {
        this.context.clearRect(0, 0, this.width, this.height);
        return this;
    };
    return Form;
}(events_1.EventEmitter));
exports.Form = Form;
//# sourceMappingURL=Form.js.map