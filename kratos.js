(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
    var GUID = (function () {
        function GUID() {
            var value = GUID.generate();
            this.toString = function () { return value; };
        }
        GUID.generate = function () {
            function s4() {
                return Math.floor((1 + Math.random()) * 0x10000)
                    .toString(16)
                    .substring(1);
            }
            return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
                s4() + '-' + s4() + s4() + s4();
        };
        GUID.prototype.toString = function () {
            return '';
        };
        GUID.prototype.length = function () {
            return this.toString().length;
        };
        return GUID;
    }());
    core.GUID = GUID;
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
    var UIMouseEvent = (function (_super) {
        __extends(UIMouseEvent, _super);
        function UIMouseEvent(target, windowClickEvent) {
            _super.call(this, target, {
                type: windowClickEvent.type,
                keys: {
                    ctrl: windowClickEvent.ctrlKey,
                    alt: windowClickEvent.altKey,
                    shift: windowClickEvent.shiftKey,
                    meta: windowClickEvent.metaKey
                },
                position: {
                    x: windowClickEvent.layerX
                }
            });
        }
        return UIMouseEvent;
    }(UIEvent));
    core.UIMouseEvent = UIMouseEvent;
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
            var self = this;
            this.$hooks.forEach(function (hook) {
                if (typeof hook == 'function')
                    hook.call(self.$eventSource, eventArgs);
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
            return typeof this.$listeners[eventName] !== 'undefined';
        };
        EventGenerator.prototype.inject = function () {
            var self = this;
            this.$owner.on = function () {
                self.on.apply(self, arguments);
            };
            this.$owner.off = function () {
                self.off.apply(self, arguments);
            };
            this.$owner.$emit = function () {
                self.emit.apply(self, arguments);
            };
        };
        EventGenerator.prototype.emit = function (eventName, eventArgs) {
            if (this.hasListeners(eventName)) {
                this.$listeners[eventName].triggerEvent(eventArgs);
            }
        };
        EventGenerator.prototype.on = function (eventName, listener) {
            if (!this.hasListeners(eventName)) {
                this.$listeners[eventName] = new core.EventListenersCollection(this.$owner, eventName);
            }
            this.$listeners[eventName].addEventListener(listener);
            return this.$owner;
        };
        EventGenerator.prototype.off = function (eventName, listener) {
            if (!this.hasListeners(eventName))
                return false;
            return this.$listeners[eventName].removeEventListener(listener);
        };
        return EventGenerator;
    }());
    core.EventGenerator = EventGenerator;
    var ConponentMapper = (function () {
        function ConponentMapper(owner) {
            this._locationMap = [];
            this._guidMap = {};
            for (var y = 1; y <= owner.canvas.height; y++) {
                this._locationMap[y] = new Array();
                for (var x = 1; x <= owner.canvas.width; x++) {
                    this._locationMap[y][x] = new Array();
                }
            }
        }
        ConponentMapper.prototype._refreshMap = function () {
        };
        ConponentMapper.prototype._mapElement = function (element) {
            var guid = element.id.toString();
            var coords = element.coordinates;
            for (var y = coords.y1 + 0; y <= coords.y2; y++) {
                for (var x = coords.x1 + 0; x < coords.x2; x++) {
                    this._locationMap[y][x] = guid;
                }
            }
        };
        ConponentMapper.prototype._registerId = function (element) {
            this._guidMap[element.id.toString()] = element;
        };
        ConponentMapper.prototype.register = function (item) {
            this._registerId(item);
            this._mapElement(item);
        };
        return ConponentMapper;
    }());
    core.ConponentMapper = ConponentMapper;
    var Application = (function (_super) {
        __extends(Application, _super);
        function Application(handler) {
            _super.call(this);
            var self = this;
            this.element = handler;
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            this.controls = new core.Collection(null, this);
            this.controls.on('elementInserted', function (item) {
            });
            this.$emit('drawStart', new UIEvent(this, {}));
            this._map = new core.ConponentMapper(this);
            this.canvas.addEventListener('click', function (event) {
                console.log(event);
            });
        }
        Object.defineProperty(Application.prototype, "context", {
            get: function () {
                return this.canvas.getContext('2d');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "mapper", {
            get: function () {
                return this._map;
            },
            enumerable: true,
            configurable: true
        });
        Application.prototype.redrawContext = function (force) {
            this.$emit('redraw', new UIEvent(this, { 'force': force }));
        };
        Application.prototype.registerElement = function (element) {
            this.mapper.register(element);
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
        Object.defineProperty(UIControl.prototype, "id", {
            get: function () {
                if (!this.hasId())
                    this.$GUID = new core.GUID();
                return this.$GUID;
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype.hasId = function () {
            return typeof this.$GUID == 'undefined' || !this.$GUID.length;
        };
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
        Object.defineProperty(UIControl.prototype, "coordinates", {
            get: function () {
                var x1 = this.position.x, x2 = x1 + this.width, y1 = this.position.y, y2 = y1 + this.height;
                return { x1: x1, x2: x2, y1: y1, y2: y2 };
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
            this.owner.registerElement(this);
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

},{}],2:[function(require,module,exports){
window.kratos = require('./core.js').core;
window.kratos.ui = require('./ui.js').ui;

},{"./core.js":1,"./ui.js":3}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('./core');
var ui;
(function (ui) {
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            _super.apply(this, arguments);
            this.$text = 'New Label';
            this.$align = core_1.core.TextAlign.left;
        }
        Object.defineProperty(Label.prototype, "text", {
            get: function () {
                return this.$text;
            },
            set: function (newStr) {
                this.$emit('propertyChange', new core_1.core.PropertyChangedEvent(this, 'text', this.$text, newStr));
                this.$text = newStr;
                this.redrawContext();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "textAlign", {
            get: function () {
                return this.$align;
            },
            set: function (newVal) {
                this.$emit('propertyChange', new core_1.core.PropertyChangedEvent(this, 'textAlign', this.$align, newVal));
                this.$align = newVal;
                this.redrawContext();
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype._render = function () {
            this.context.fillText(this.text, this.height, this.width);
        };
        return Label;
    }(core_1.core.UIControl));
    ui.Label = Label;
})(ui = exports.ui || (exports.ui = {}));

},{"./core":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzljQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgY29yZTtcbihmdW5jdGlvbiAoY29yZSkge1xuICAgIHZhciB2ZXJzaW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gdmVyc2lvbigpIHtcbiAgICAgICAgfVxuICAgICAgICB2ZXJzaW9uLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLm1ham9yLCB0aGlzLm1pbm9yLCB0aGlzLnBhdGNoXS5qb2luKCcuJyk7XG4gICAgICAgIH07XG4gICAgICAgIHZlcnNpb24ubWFqb3IgPSAwO1xuICAgICAgICB2ZXJzaW9uLm1pbm9yID0gMDtcbiAgICAgICAgdmVyc2lvbi5wYXRjaCA9IDA7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH0oKSk7XG4gICAgY29yZS52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB2YXIgR1VJRCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEdVSUQoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBHVUlELmdlbmVyYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsdWU7IH07XG4gICAgICAgIH1cbiAgICAgICAgR1VJRC5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHM0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgICAgICAgICAgICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgR1VJRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH07XG4gICAgICAgIEdVSUQucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gR1VJRDtcbiAgICB9KCkpO1xuICAgIGNvcmUuR1VJRCA9IEdVSUQ7XG4gICAgdmFyIEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9hcmdzID0gYXJncztcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcInRhcmdldFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwiYXJnc1wiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJncztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJncyA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEV2ZW50O1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudCA9IEV2ZW50O1xuICAgIHZhciBVSUV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFVJRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVSUV2ZW50O1xuICAgIH0oRXZlbnQpKTtcbiAgICBjb3JlLlVJRXZlbnQgPSBVSUV2ZW50O1xuICAgIHZhciBVSU1vdXNlRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlNb3VzZUV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBVSU1vdXNlRXZlbnQodGFyZ2V0LCB3aW5kb3dDbGlja0V2ZW50KSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiB3aW5kb3dDbGlja0V2ZW50LnR5cGUsXG4gICAgICAgICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgICAgICAgICBjdHJsOiB3aW5kb3dDbGlja0V2ZW50LmN0cmxLZXksXG4gICAgICAgICAgICAgICAgICAgIGFsdDogd2luZG93Q2xpY2tFdmVudC5hbHRLZXksXG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0OiB3aW5kb3dDbGlja0V2ZW50LnNoaWZ0S2V5LFxuICAgICAgICAgICAgICAgICAgICBtZXRhOiB3aW5kb3dDbGlja0V2ZW50Lm1ldGFLZXlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHdpbmRvd0NsaWNrRXZlbnQubGF5ZXJYXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJTW91c2VFdmVudDtcbiAgICB9KFVJRXZlbnQpKTtcbiAgICBjb3JlLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudDtcbiAgICB2YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoUHJvcGVydHlDaGFuZ2VkRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRhcmdldCwgcHJvcE5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4gICAgfShVSUV2ZW50KSk7XG4gICAgY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50O1xuICAgIHZhciBDb2xsZWN0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbkV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uRXZlbnQodGFyZ2V0LCBpdGVtKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbkV2ZW50O1xuICAgIH0oRXZlbnQpKTtcbiAgICBjb3JlLkNvbGxlY3Rpb25FdmVudCA9IENvbGxlY3Rpb25FdmVudDtcbiAgICB2YXIgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgICAgICAgICAgdGhpcy4kJGUgPSBuZXcgY29yZS5FdmVudEdlbmVyYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7IH07XG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuICAgIHZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24oc291cmNlLCBuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLiRob29rcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRTb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRBcmdzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRob29rcy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIGhvb2suY2FsbChzZWxmLiRldmVudFNvdXJjZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmdldExpc3RlbmVyc0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhvb2tzLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuJGhvb2tzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgaG9va0lkID0gdGhpcy4kaG9va3MuaW5kZXhPZihldmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgIGlmIChob29rSWQgPiAtMSlcbiAgICAgICAgICAgICAgICB0aGlzLiRob29rcy5zcGxpY2UoaG9va0lkLCAxKTtcbiAgICAgICAgICAgIHJldHVybiAoaG9va0lkID4gLTEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4gICAgdmFyIEV2ZW50R2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRHZW5lcmF0b3IoZXZlbnRHZW5lcmF0b3IsIGluamVjdCkge1xuICAgICAgICAgICAgaWYgKGluamVjdCA9PT0gdm9pZCAwKSB7IGluamVjdCA9IHRydWU7IH1cbiAgICAgICAgICAgIHRoaXMuJGxpc3RlbmVycyA9IHt9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIgPSBldmVudEdlbmVyYXRvcjtcbiAgICAgICAgICAgIGlmIChpbmplY3QpXG4gICAgICAgICAgICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRvd25lci5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIub2ZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub2ZmLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIuJGVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS50cmlnZ2VyRXZlbnQoZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxpc3RlbmVyc1tldmVudE5hbWVdID0gbmV3IGNvcmUuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uKHRoaXMuJG93bmVyLCBldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy4kbGlzdGVuZXJzW2V2ZW50TmFtZV0uYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kb3duZXI7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV2ZW50R2VuZXJhdG9yO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudEdlbmVyYXRvciA9IEV2ZW50R2VuZXJhdG9yO1xuICAgIHZhciBDb25wb25lbnRNYXBwZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb25wb25lbnRNYXBwZXIob3duZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwID0gW107XG4gICAgICAgICAgICB0aGlzLl9ndWlkTWFwID0ge307XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0gMTsgeSA8PSBvd25lci5jYW52YXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt5XSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSAxOyB4IDw9IG93bmVyLmNhbnZhcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3ldW3hdID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuX3JlZnJlc2hNYXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuX21hcEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGd1aWQgPSBlbGVtZW50LmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB2YXIgY29vcmRzID0gZWxlbWVudC5jb29yZGluYXRlcztcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSBjb29yZHMueTEgKyAwOyB5IDw9IGNvb3Jkcy55MjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IGNvb3Jkcy54MSArIDA7IHggPCBjb29yZHMueDI7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt5XVt4XSA9IGd1aWQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLl9yZWdpc3RlcklkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2d1aWRNYXBbZWxlbWVudC5pZC50b1N0cmluZygpXSA9IGVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEVsZW1lbnQoaXRlbSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb25wb25lbnRNYXBwZXI7XG4gICAgfSgpKTtcbiAgICBjb3JlLkNvbnBvbmVudE1hcHBlciA9IENvbnBvbmVudE1hcHBlcjtcbiAgICB2YXIgQXBwbGljYXRpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQXBwbGljYXRpb24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEFwcGxpY2F0aW9uKGhhbmRsZXIpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gaGFuZGxlcjtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBjb3JlLkNvbGxlY3Rpb24obnVsbCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLm9uKCdlbGVtZW50SW5zZXJ0ZWQnLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdkcmF3U3RhcnQnLCBuZXcgVUlFdmVudCh0aGlzLCB7fSkpO1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IGNvcmUuQ29ucG9uZW50TWFwcGVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBwbGljYXRpb24ucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFwcGxpY2F0aW9uLnByb3RvdHlwZSwgXCJtYXBwZXJcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBBcHBsaWNhdGlvbi5wcm90b3R5cGUucmVkcmF3Q29udGV4dCA9IGZ1bmN0aW9uIChmb3JjZSkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVkcmF3JywgbmV3IFVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmb3JjZSB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZWdpc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5tYXBwZXIucmVnaXN0ZXIoZWxlbWVudCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBBcHBsaWNhdGlvbjtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuQXBwbGljYXRpb24gPSBBcHBsaWNhdGlvbjtcbiAgICB2YXIgQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKGhhbmRsZXIsIGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbkhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy4kZGVmYXVsdEFwcGxpY2F0aW9uID0gYXBwSW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uJCRpbmplY3QodGhpcy5jb2xsZWN0aW9uSGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdlbGVtZW50SW5zZXJ0ZWQnLCBuZXcgQ29sbGVjdGlvbkV2ZW50KHRoaXMsIGl0ZW0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2VsZW1lbnRSZW1vdmUnLCBuZXcgQ29sbGVjdGlvbkV2ZW50KHRoaXMsIHRoaXMuaXRlbXNbaV0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbGxlY3Rpb247XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuICAgIHZhciBQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQb2ludDtcbiAgICB9KCkpO1xuICAgIGNvcmUuUG9pbnQgPSBQb2ludDtcbiAgICB2YXIgVGV4dEFsaWduID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gVGV4dEFsaWduKCkge1xuICAgICAgICB9XG4gICAgICAgIFRleHRBbGlnbi5zdGFydCA9ICdzdGFydCc7XG4gICAgICAgIFRleHRBbGlnbi5lbmQgPSAnZW5kJztcbiAgICAgICAgVGV4dEFsaWduLmxlZnQgPSAnbGVmdCc7XG4gICAgICAgIFRleHRBbGlnbi5jZW50ZXIgPSAnY2VudGVyJztcbiAgICAgICAgVGV4dEFsaWduLnJpZ2h0ID0gJ3JpZ2h0JztcbiAgICAgICAgcmV0dXJuIFRleHRBbGlnbjtcbiAgICB9KCkpO1xuICAgIGNvcmUuVGV4dEFsaWduID0gVGV4dEFsaWduO1xuICAgIHZhciBVSUNvbnRyb2wgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlDb250cm9sLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBVSUNvbnRyb2wob3duZXIpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kaGVpZ2h0ID0gMTI4O1xuICAgICAgICAgICAgdGhpcy4kd2lkdGggPSAxMjg7XG4gICAgICAgICAgICB0aGlzLiRpbmplY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kYmFja2dyb3VuZENvbG9yID0gJyNkZWRlZGUnO1xuICAgICAgICAgICAgdGhpcy4kZm9yZUNvbG9yID0gJyMwMDAnO1xuICAgICAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICAgICAgdGhpcy4kY29udGV4dCA9IG93bmVyLmNvbnRleHQ7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IGNvcmUuQ29sbGVjdGlvbih0aGlzLCBvd25lcik7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaWRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0lkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJEdVSUQgPSBuZXcgY29yZS5HVUlEKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJEdVSUQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5oYXNJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy4kR1VJRCA9PSAndW5kZWZpbmVkJyB8fCAhdGhpcy4kR1VJRC5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaXNJbmplY3RlZFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5qZWN0ZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiY29vcmRpbmF0ZXNcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdmFyIHgxID0gdGhpcy5wb3NpdGlvbi54LCB4MiA9IHgxICsgdGhpcy53aWR0aCwgeTEgPSB0aGlzLnBvc2l0aW9uLnksIHkyID0geTEgKyB0aGlzLmhlaWdodDtcbiAgICAgICAgICAgICAgICByZXR1cm4geyB4MTogeDEsIHgyOiB4MiwgeTE6IHkxLCB5MjogeTIgfTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJiYWNrZ3JvdW5kQ29sb3JcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdiYWNrZ3JvdW5kQ29sb3InLCB0aGlzLiRiYWNrZ3JvdW5kQ29sb3IsIG5ld0NvbG9yKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYmFja2dyb3VuZENvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDb250ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiZm9yZUNvbG9yXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRmb3JlQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnZm9yZUNvbG9yJywgdGhpcy4kZm9yZUNvbG9yLCBuZXdDb2xvcikpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGZvcmVDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhd0NvbnRleHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnd2lkdGgnLCB0aGlzLiRoZWlnaHQsIG5ld0hlaWdodCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGhlaWdodCA9IG5ld0hlaWdodDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhd0NvbnRleHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kd2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnd2lkdGgnLCB0aGlzLiR3aWR0aCwgbmV3V2lkdGgpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiR3aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcInBvc2l0aW9uXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdwb3NpdGlvbicsIHRoaXMuX19wb3NpdGlvbl9fLCBuZXdQb3NpdGlvbikpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDb250ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwicGFyZW50XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRwYXJlbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5yZWRyYXdDb250ZXh0ID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgICAgICAgICBpZiAoZm9yY2UgPT09IHZvaWQgMCkgeyBmb3JjZSA9IGZhbHNlOyB9XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbmplY3RlZCB8fCAhZm9yY2UpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVkcmF3JywgbmV3IFVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmb3JjZSB9KSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5wYXJlbnQucmVkcmF3Q29udGV4dChmb3JjZSk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3JlbmRlcicsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVuZGVyZWQnLCBuZXcgVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuJCRpbmplY3QgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgICAgICB0aGlzLiRwYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgICAgICB0aGlzLiRpbmplY3RlZCA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRWxlbWVudCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2luamVjdCcsIG5ldyBVSUV2ZW50KHRoaXMsIHsgJ3BhcmVudCc6IHBhcmVudCB9KSk7XG4gICAgICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdkaXNwb3NlJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICAgICAgdGhpcy4kaW5qZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFVJQ29udHJvbDtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuVUlDb250cm9sID0gVUlDb250cm9sO1xufSkoY29yZSA9IGV4cG9ydHMuY29yZSB8fCAoZXhwb3J0cy5jb3JlID0ge30pKTtcbiIsIndpbmRvdy5rcmF0b3MgPSByZXF1aXJlKCcuL2NvcmUuanMnKS5jb3JlO1xud2luZG93LmtyYXRvcy51aSA9IHJlcXVpcmUoJy4vdWkuanMnKS51aTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgY29yZV8xID0gcmVxdWlyZSgnLi9jb3JlJyk7XG52YXIgdWk7XG4oZnVuY3Rpb24gKHVpKSB7XG4gICAgdmFyIExhYmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBMYWJlbCgpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy4kdGV4dCA9ICdOZXcgTGFiZWwnO1xuICAgICAgICAgICAgdGhpcy4kYWxpZ24gPSBjb3JlXzEuY29yZS5UZXh0QWxpZ24ubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3U3RyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgY29yZV8xLmNvcmUuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHQnLCB0aGlzLiR0ZXh0LCBuZXdTdHIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiR0ZXh0ID0gbmV3U3RyO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dEFsaWduXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRhbGlnbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBjb3JlXzEuY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dEFsaWduJywgdGhpcy4kYWxpZ24sIG5ld1ZhbCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFsaWduID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIExhYmVsLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdGhpcy5oZWlnaHQsIHRoaXMud2lkdGgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gTGFiZWw7XG4gICAgfShjb3JlXzEuY29yZS5VSUNvbnRyb2wpKTtcbiAgICB1aS5MYWJlbCA9IExhYmVsO1xufSkodWkgPSBleHBvcnRzLnVpIHx8IChleHBvcnRzLnVpID0ge30pKTtcbiJdfQ==
