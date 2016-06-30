"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
    var Event = (function () {
        function Event(target, args) {
            this._args = args;
            this._target = target;
        }
        Object.defineProperty(Event.prototype, "target", {
            get: function () {
                return this._target;
            },
            set: function (v) {
                this._target = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Event.prototype, "args", {
            get: function () {
                return this._args;
            },
            set: function (v) {
                this._args = v;
            },
            enumerable: true,
            configurable: true
        });
        return Event;
    }());
    core.Event = Event;
    var UIEvent = (function (_super) {
        __extends(UIEvent, _super);
        function UIEvent(target, args) {
            _super.call(this, target, args);
        }
        return UIEvent;
    }(Event));
    core.UIEvent = UIEvent;
    var PropertyChangedEvent = (function (_super) {
        __extends(PropertyChangedEvent, _super);
        function PropertyChangedEvent(target, propName, oldValue, newValue) {
            _super.call(this, target, {
                propertyName: propName,
                oldValue: oldValue,
                newValue: newValue
            });
        }
        return PropertyChangedEvent;
    }(UIEvent));
    core.PropertyChangedEvent = PropertyChangedEvent;
    var CollectionEvent = (function (_super) {
        __extends(CollectionEvent, _super);
        function CollectionEvent(target, item) {
            _super.call(this, target, {
                item: item
            });
        }
        return CollectionEvent;
    }(Event));
    core.CollectionEvent = CollectionEvent;
    var EventEmitter = (function () {
        function EventEmitter() {
            this.$$e = new core.EventGenerator(this);
        }
        EventEmitter.prototype.on = function (eventName, listener) { };
        EventEmitter.prototype.off = function (eventName, listener) { };
        EventEmitter.prototype.$emit = function (eventName, eventArgs) { };
        ;
        return EventEmitter;
    }());
    core.EventEmitter = EventEmitter;
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
    var EventGenerator = (function () {
        function EventGenerator(eventGenerator, inject) {
            if (inject === void 0) { inject = true; }
            this.$listeners = {};
            this.$owner = eventGenerator;
            if (inject)
                this.inject();
        }
        EventGenerator.prototype.hasListeners = function (eventName) {
            return typeof this.$listeners[eventName.toString()] !== 'undefined';
        };
        EventGenerator.prototype.inject = function () {
            this.$owner.on = this.on;
            this.$owner.off = this.off;
            this.$owner.$emit = this.emit;
        };
        EventGenerator.prototype.emit = function (eventName, eventArgs) {
            if (!this.hasListeners(eventName)) {
                this.$listeners[eventName].triggerEvent(eventArgs);
            }
        };
        EventGenerator.prototype.on = function (eventName, listener) {
            if (!this.hasListeners(eventName)) {
                this.$listeners[eventName] = new core.EventListenersCollection(this.$owner, eventName);
            }
            this.$listeners[eventName].addEventListener(listener);
        };
        EventGenerator.prototype.off = function (eventName, listener) {
            if (!this.hasListeners(eventName))
                return false;
            return this.$listeners[eventName].removeEventListener(listener);
        };
        return EventGenerator;
    }());
    core.EventGenerator = EventGenerator;
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(handler) {
            _super.call(this);
            this.element = handler;
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            this.controls = new core.Collection(null, this);
            this.$emit('drawStart', new UIEvent(this, {}));
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
    }(EventEmitter));
    core.Application = Application;
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(handler, appInstance) {
            _super.call(this);
            this.collectionHandler = handler;
            this.items = [];
            this.$defaultApplication = appInstance;
        }
        Collection.prototype.add = function (item) {
            item.$$inject(this.collectionHandler);
            this.items.push(item);
            this.$emit('elementInserted', new CollectionEvent(this, item));
        };
        Collection.prototype.remove = function (item) {
            var i = this.items.indexOf(item);
            if (i > -1) {
                this.items[i].dispose();
                this.$emit('elementRemove', new CollectionEvent(this, this.items[i]));
                this.items.splice(i, 1);
            }
        };
        return Collection;
    }(EventEmitter));
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
    var UIControl = (function (_super) {
        __extends(UIControl, _super);
        function UIControl(owner) {
            _super.call(this);
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'backgroundColor', this.$backgroundColor, newColor));
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'foreColor', this.$foreColor, newColor));
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'width', this.$height, newHeight));
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'width', this.$width, newWidth));
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'position', this.__position__, newPosition));
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
            this.$emit('redraw', new UIEvent(this, { 'force': force }));
            this.render();
            this.parent.redrawContext(force);
            return true;
        };
        UIControl.prototype._render = function () { };
        UIControl.prototype.render = function () {
            this.$emit('render', new UIEvent(this, null));
            this._render();
            this.$emit('rendered', new UIEvent(this, null));
        };
        UIControl.prototype.$$inject = function (parent) {
            this.$parent = parent;
            this.$injected = true;
            this.$emit('inject', new UIEvent(this, { 'parent': parent }));
            this.render();
        };
        UIControl.prototype.dispose = function () {
            this.$emit('dispose', new UIEvent(this, null));
            this.$injected = false;
        };
        return UIControl;
    }(EventEmitter));
    core.UIControl = UIControl;
})(core = exports.core || (exports.core = {}));
