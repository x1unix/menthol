"use strict";
var _null_1 = require('../$null');
var _defined_1 = require('../$defined');
var Dictionary = (function () {
    function Dictionary() {
        this._items = {};
        this._aliases = {};
        this.defaultKey = null;
    }
    Object.defineProperty(Dictionary.prototype, "length", {
        get: function () {
            return Object.keys(this._items).length;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.exists = function (key) {
        return _defined_1.$defined(this._items) && this._items.hasOwnProperty(key);
    };
    Dictionary.prototype.get = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return this.exists(key) ? this._items[key] : this._getValueFromAlias(key, defaultValue);
    };
    Dictionary.prototype._linkAlias = function (alias, key) {
        this._aliases[alias.trim()] = key.toString();
    };
    Dictionary.prototype._getValueFromAlias = function (alias, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var aliasValue = this._aliases[alias];
        if (!_defined_1.$defined(aliasValue) || !this.exists(aliasValue)) {
            if (_null_1.$null(defaultValue) && !_null_1.$null(this.defaultKey)) {
                defaultValue = this.get(this.defaultKey);
            }
            return defaultValue;
        }
        return this._items[aliasValue];
    };
    Dictionary.prototype.alias = function (aliases, key, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!this.exists(key) && !force)
            throw new ReferenceError("Item with key '" + key + "' doesn't exists.");
        aliases.split(',').forEach(function (alias) {
            _this._linkAlias(alias, key);
        });
        return this;
    };
    Dictionary.prototype.add = function (key, value, overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        if (this.exists(key) && !overwrite)
            throw new ReferenceError("Item with key '" + key + "' already exists.");
        this._items[key] = value;
        return this;
    };
    Dictionary.prototype.remove = function (key) {
        if (!this.exists(key))
            throw new ReferenceError("Item with key '" + key + "' doesn't exists.");
        delete this._items[key];
        return this;
    };
    Dictionary.prototype.forEach = function (callback) {
        var i = this._items;
        for (var key in i) {
            if (i.hasOwnProperty(key)) {
                callback(i[key], key, i);
            }
        }
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;
//# sourceMappingURL=Dictionary.js.map