"use strict";
var Point_1 = require('./types/Point');
var events_1 = require('../events');
var ComponentMapper = (function () {
    function ComponentMapper(owner) {
        this._guidMap = {};
        this.owner = owner;
        this._watchMouseEvents();
        this._watchDefaultEvents();
    }
    ComponentMapper.prototype._registerId = function (element) {
        this._guidMap[element.id.toString()] = element;
    };
    ComponentMapper.prototype.getElementById = function (eid) {
        return this._guidMap[eid];
    };
    ComponentMapper.prototype.register = function (item) {
        this._registerId(item);
    };
    ComponentMapper.prototype._mouseEventsHooker = function (event) {
        var p = new Point_1.Point(event.layerX, event.layerY);
        var owner = this.owner;
        owner._emit(event.type, new events_1.UIMouseEvent(owner, event));
        owner.controls.broadcast(event, function (t, e) {
            return new events_1.UIMouseEvent(t, e);
        }, true, p);
    };
    ComponentMapper.prototype._defaultEventsHooker = function (event) {
        var owner = this.owner;
        owner._emit(event.type, new events_1.UICommonEvent(owner, event));
        owner.controls.broadcast(event, function (t, e) {
            return new events_1.UICommonEvent(t, e);
        }, true, new Point_1.Point(0, 0));
    };
    ComponentMapper.prototype._watchMouseEvents = function () {
        var self = this;
        ComponentMapper.DOMMouseEvents.forEach(function (e) {
            self.owner.canvas.addEventListener(e, function (event) {
                self._mouseEventsHooker(event);
            });
        });
    };
    ComponentMapper.prototype._watchDefaultEvents = function () {
        var self = this;
        ComponentMapper.DOMEvents.forEach(function (e) {
            self.owner.canvas.addEventListener(e, function (event) {
                self._defaultEventsHooker(event);
            });
        });
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