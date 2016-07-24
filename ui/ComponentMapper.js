"use strict";
var CanvasMouseEventBroadcaster_1 = require('./broadcasters/CanvasMouseEventBroadcaster');
var ComponentMapper = (function () {
    function ComponentMapper(owner) {
        this._guidMap = {};
        this.broadcasters = [];
        this.previousMouseElement = null;
        this._currentMouseElement = null;
        this.owner = owner;
        this.broadcasters.push(new CanvasMouseEventBroadcaster_1.CanvasMouseEventBroadcaster(owner, ComponentMapper.DOMMouseEvents, false));
    }
    Object.defineProperty(ComponentMapper.prototype, "currentMouseElement", {
        get: function () {
            return this._currentMouseElement;
        },
        set: function (e) {
            this._currentMouseElement = e;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentMapper.prototype, "currentFocusedElement", {
        get: function () {
            return this._currentFocusedElement;
        },
        set: function (e) {
            this._currentFocusedElement = e;
        },
        enumerable: true,
        configurable: true
    });
    ComponentMapper.prototype.load = function () {
        this.broadcasters.forEach(function (e) {
            e.load();
        });
    };
    ComponentMapper.prototype._registerId = function (element) {
        this._guidMap[element.id.toString()] = element;
    };
    ComponentMapper.prototype.getElementById = function (eid) {
        return this._guidMap[eid];
    };
    ComponentMapper.prototype.register = function (item) {
        this._registerId(item);
    };
    ComponentMapper.DOMMouseEvents = [
        'click',
        'dblclick',
        'mousedown',
        'mouseup',
        'mouseover',
        'mouseout',
        'mousemove'];
    ComponentMapper.DOMEvents = [
        'keydown',
        'keyup',
        'keypress'
    ];
    return ComponentMapper;
}());
exports.ComponentMapper = ComponentMapper;
//# sourceMappingURL=ComponentMapper.js.map