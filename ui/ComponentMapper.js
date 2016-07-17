"use strict";
var ComponentMapper = (function () {
    function ComponentMapper(owner) {
        this._locationMap = [];
        this._guidMap = {};
        this.owner = owner;
        this.generate();
    }
    ComponentMapper.prototype.clear = function () {
        this._locationMap.splice(0, this._locationMap.length - 1);
    };
    ComponentMapper.prototype.generate = function () {
        this.clear();
        for (var x = 1; x <= this.owner.canvas.width; x++) {
            this._locationMap[x] = new Array();
            for (var y = 1; y <= this.owner.canvas.height; y++) {
                this._locationMap[x][y] = new Array();
            }
        }
    };
    ComponentMapper.prototype._mapElement = function (element) {
        var guid = element.id.toString();
        var coords = element.points();
        var x1 = coords[0].x, x2 = coords[1].x, y1 = coords[1].y, y2 = coords[2].y;
        for (var y = y1 + 0; y <= y2; y++) {
            for (var x = x1 + 0; x <= x2; x++) {
                if (!this._locationMap[x])
                    this._locationMap[x] = new Array();
                if (typeof this._locationMap[x][y] == 'undefined')
                    this._locationMap[x][y] = [];
                this._locationMap[x][y].push(guid);
            }
        }
    };
    ComponentMapper.prototype._registerId = function (element) {
        this._guidMap[element.id.toString()] = element;
    };
    ComponentMapper.prototype.getElementById = function (eid) {
        return this._guidMap[eid];
    };
    ComponentMapper.prototype.getLocatedId = function (point) {
        var target = this._locationMap[point.x][point.y];
        return target[target.length - 1];
    };
    ComponentMapper.prototype.register = function (item) {
        this._registerId(item);
        this._mapElement(item);
    };
    return ComponentMapper;
}());
exports.ComponentMapper = ComponentMapper;
//# sourceMappingURL=ComponentMapper.js.map