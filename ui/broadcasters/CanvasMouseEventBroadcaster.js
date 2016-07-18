"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point_1 = require('../types/Point');
var events_1 = require('../../events');
var helpers_1 = require('../../helpers');
var CanvasEventBroadcaster_1 = require('../types/CanvasEventBroadcaster');
var CanvasMouseEventBroadcaster = (function (_super) {
    __extends(CanvasMouseEventBroadcaster, _super);
    function CanvasMouseEventBroadcaster(owner, events, autobind) {
        if (events === void 0) { events = []; }
        if (autobind === void 0) { autobind = false; }
        _super.call(this, owner, events);
        this.elementFound = false;
        this.eventReactors = {
            'click': function (element, event) {
                var old = this.mapper.currentMouseElement;
                if (old === null || (old.id === element.id)) {
                    this.mapper.currentMouseElement = element;
                    var tEvent = new events_1.UIMouseEvent(element, event);
                    element.react(event.type, tEvent);
                }
                else {
                    old.broadcast('blur', new events_1.UIMouseEvent(element, event));
                    this.mapper.currentMouseElement = element;
                    var tEvent = new events_1.UIMouseEvent(element, event);
                    element.react(event.type, tEvent);
                }
            },
            'mousemove': function (element, event) {
                var old = this.mapper.currentMouseElement;
                if ((old === null) || (old.id === element.id)) {
                    if (old.id === element.id)
                        return;
                    this.mapper.currentMouseElement = element;
                    var tEvent = new events_1.UIMouseEvent(element, event);
                    element.emit('mouseover', tEvent);
                }
                else {
                    var tEvent = new events_1.UIMouseEvent(old, event);
                    old.emit('mouseout', tEvent);
                    this.mapper.currentMouseElement = element;
                    var tEvent = new events_1.UIMouseEvent(element, event);
                    element.emit('mouseover', tEvent);
                }
            },
            'dblclick': function (element, event) {
                this.click(element, event);
            },
            'mousedown': function (element, event) {
                this.click(element, event);
            },
            'mouseup': function (element, event) {
                this.click(element, event);
            },
            'mouseout': function (element, event) {
                this.mapper.currentMouseElement = null;
            }
        };
    }
    CanvasMouseEventBroadcaster.prototype.targetEvent = function (element, event) {
        var _this = this;
        var p = new Point_1.Point(event.layerX, event.layerY);
        if (element.inBoundsOf(p)) {
            return this.react(element, event);
        }
        else {
            element.controls.forEach(function (_element) {
                _this.targetEvent(_element, event);
            });
        }
    };
    CanvasMouseEventBroadcaster.prototype.react = function (element, event) {
        var eReactor = (helpers_1.$defined(this.eventReactors[event.type])) ? this.eventReactors[event.type] : 'mousemove';
        eReactor(element, event);
    };
    CanvasMouseEventBroadcaster.prototype.bindEvent = function (event) {
        var _this = this;
        var owner = this.owner;
        owner._emit(event.type, new events_1.UIMouseEvent(owner, event));
        helpers_1.$async(function () {
            owner.controls.forEach(function (element) {
                _this.targetEvent(element, event);
            });
            if (!_this.elementFound)
                _this.mapper.currentMouseElement = null;
        });
    };
    return CanvasMouseEventBroadcaster;
}(CanvasEventBroadcaster_1.CanvasEventBroadcaster));
exports.CanvasMouseEventBroadcaster = CanvasMouseEventBroadcaster;
//# sourceMappingURL=CanvasMouseEventBroadcaster.js.map