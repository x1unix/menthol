"use strict";
var core;
(function (core) {
    var version = (function () {
        function version() {
        }
        version.toString = function () {
            return [this.major, this.minor, this.patch].join('.');
        };
        version.major = 0;
        version.minor = 0;
        version.patch = 0;
        return version;
    }());
    core.version = version;
    var EventListenersCollection = (function () {
        function EventListenersCollection(source, name) {
            this.$hooks = [];
            this.eventName = name;
            this.$eventSource = source;
        }
        EventListenersCollection.prototype.triggerEvent = function (eventArgs) {
            this.$hooks.forEach(function (hook) {
                if (typeof hook == 'function')
                    hook.call(this.$eventSource, eventArgs);
            });
        };
        EventListenersCollection.prototype.getListenersCount = function () {
            return this.$hooks.length;
        };
        EventListenersCollection.prototype.addEventListener = function (eventListener) {
            this.$hooks.push(eventListener);
        };
        EventListenersCollection.prototype.removeEventListener = function (eventListener) {
            var hookId = this.$hooks.indexOf(eventListener);
            if (hookId > -1)
                this.$hooks.splice(hookId, 1);
            return (hookId > -1);
        };
        return EventListenersCollection;
    }());
    core.EventListenersCollection = EventListenersCollection;
    var EventEmitter = (function () {
        function EventEmitter() {
            this.$listeners = {};
        }
        EventEmitter.prototype.hasListeners = function (eventName) {
            return typeof this.$listeners[eventName.toString()] !== 'undefined';
        };
        EventEmitter.prototype.on = function (eventName, listener) {
            if (!this.hasListeners(eventName)) {
                this.$listeners[eventName.toString()] = new core.EventListenersCollection(this.$owner, eventName);
            }
            this.$listeners[eventName.toString()].addEventListener(listener);
        };
        EventEmitter.prototype.off = function (eventName, listener) {
            if (!this.hasListeners(eventName))
                return false;
            return this.$listeners[eventName.toString()].removeEventListener(listener);
        };
        return EventEmitter;
    }());
    core.EventEmitter = EventEmitter;
    var Application = (function () {
        function Application(handler) {
            this.element = handler;
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            this.controls = new core.Collection(null, this);
        }
        Object.defineProperty(Application.prototype, "context", {
            get: function () {
                return this.canvas.getContext('2d');
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype.redrawContext = function () {
        };
        return Application;
    }());
    core.Application = Application;
    var Collection = (function () {
        function Collection(handler, appInstance) {
            this.collectionHandler = handler;
            this.items = [];
            this.$defaultApplication = appInstance;
        }
        Collection.prototype.add = function (item) {
            item.$$inject(this.collectionHandler);
            this.items.push(item);
        };
        Collection.prototype.remove = function (item) {
            var i = this.items.indexOf(item);
            if (i > -1) {
                this.items[i].dispose();
                this.items.splice(i, 1);
            }
        };
        return Collection;
    }());
    core.Collection = Collection;
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    core.Point = Point;
    var TextAlign = (function () {
        function TextAlign() {
        }
        TextAlign.start = 'start';
        TextAlign.end = 'end';
        TextAlign.left = 'left';
        TextAlign.center = 'center';
        TextAlign.right = 'right';
        return TextAlign;
    }());
    core.TextAlign = TextAlign;
    var UIControl = (function () {
        function UIControl(owner) {
            this.$height = 128;
            this.$width = 128;
            this.$injected = false;
            this.$backgroundColor = '#dedede';
            this.$foreColor = '#000';
            this.owner = owner;
            this.$context = owner.context;
            this.controls = new core.Collection(this, owner);
        }
        Object.defineProperty(UIControl.prototype, "context", {
            get: function () {
                return this.$context;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "isInjected", {
            get: function () {
                return this.$injected;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "backgroundColor", {
            get: function () {
                return this.$backgroundColor;
            },
            set: function (newColor) {
                this.$backgroundColor = newColor;
                this.redrawContext();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "foreColor", {
            get: function () {
                return this.$foreColor;
            },
            set: function (newColor) {
                this.$foreColor = newColor;
                this.context.fillStyle = newColor;
                this.redrawContext();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "height", {
            get: function () {
                return this.$height;
            },
            set: function (newHeight) {
                this.$height = newHeight;
                this.redrawContext();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "width", {
            get: function () {
                return this.$width;
            },
            set: function (newWidth) {
                this.$width = newWidth;
                this.redrawContext();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "position", {
            get: function () {
                return this.__position__;
            },
            set: function (newPosition) {
                this.__position__ = newPosition;
                this.redrawContext();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "parent", {
            get: function () {
                return this.$parent;
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype.redrawContext = function (force) {
            if (force === void 0) { force = false; }
            if (!this.isInjected || !force)
                return false;
            this.parent.redrawContext(force);
            return true;
        };
        UIControl.prototype.render = function () {
        };
        UIControl.prototype.$$inject = function (parent) {
            this.$parent = parent;
            this.$injected = true;
            this.render();
        };
        UIControl.prototype.dispose = function () {
            this.$injected = false;
        };
        return UIControl;
    }());
    core.UIControl = UIControl;
})(core = exports.core || (exports.core = {}));
