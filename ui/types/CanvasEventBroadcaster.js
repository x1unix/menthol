"use strict";
var CanvasEventBroadcaster = (function () {
    function CanvasEventBroadcaster(owner, events, autobind) {
        if (events === void 0) { events = []; }
        if (autobind === void 0) { autobind = false; }
        this._loaded = false;
        this.owner = owner;
        this.events = events;
        if (autobind)
            this.load();
    }
    CanvasEventBroadcaster.prototype.bindEvent = function (event) { };
    CanvasEventBroadcaster.prototype.react = function (element, event) { };
    CanvasEventBroadcaster.prototype.targetEvent = function (element, event) { };
    Object.defineProperty(CanvasEventBroadcaster.prototype, "loaded", {
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    CanvasEventBroadcaster.prototype.load = function () {
        var _this = this;
        if (this.loaded)
            return;
        this.mapper = this.owner.mapper;
        this.events.forEach(function (eventName) {
            _this.owner.canvas.addEventListener(eventName, function (event) {
                _this.bindEvent(event);
            });
        });
        this._loaded = true;
    };
    return CanvasEventBroadcaster;
}());
exports.CanvasEventBroadcaster = CanvasEventBroadcaster;
//# sourceMappingURL=CanvasEventBroadcaster.js.map