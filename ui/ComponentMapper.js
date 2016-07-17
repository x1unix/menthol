"use strict";
var ComponentMapper = (function () {
    function ComponentMapper(owner) {
        this._guidMap = {};
        this.owner = owner;
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
    return ComponentMapper;
}());
exports.ComponentMapper = ComponentMapper;
//# sourceMappingURL=ComponentMapper.js.map