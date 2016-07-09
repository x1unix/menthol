(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core;
(function (core) {
    var BoxModel = (function () {
        function BoxModel() {
        }
        return BoxModel;
    }());
    core.BoxModel = BoxModel;
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
            for (var x = 1; x <= owner.canvas.width; x++) {
                this._locationMap[x] = new Array();
                for (var y = 1; y <= owner.canvas.height; y++) {
                    this._locationMap[x][y] = new Array();
                }
            }
        }
        ConponentMapper.prototype._refreshMap = function () {
        };
        ConponentMapper.prototype._mapElement = function (element) {
            var guid = element.id.toString();
            var coords = element.points();
            var x1 = coords[0].x, x2 = coords[1].x, y1 = coords[1].y, y2 = coords[2].y;
            for (var y = y1 + 0; y <= y2; y++) {
                for (var x = x1 + 0; x <= x2; x++) {
                    if (!this._locationMap[x])
                        this._locationMap[x] = new Array();
                    this._locationMap[x][y] = guid;
                }
            }
        };
        ConponentMapper.prototype._registerId = function (element) {
            this._guidMap[element.id.toString()] = element;
        };
        ConponentMapper.prototype.getLocatedId = function (point) {
            return this._locationMap[point.x][point.y];
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
        function Application(handler, bootstrap) {
            _super.call(this);
            var self = this;
            this.element = handler;
            this.canvas = document.createElement('canvas');
            if (bootstrap)
                bootstrap.call(self, handler);
            this.element.appendChild(this.canvas);
            this.controls = new core.Collection(null, this);
            this.controls.on('elementInserted', function (item) {
            });
            this.$emit('drawStart', new UIEvent(this, {}));
            this._map = new core.ConponentMapper(this);
            this.canvas.addEventListener('click', function (event) {
                console.log(event);
                var p = new Point(event.layerX, event.layerY);
                try {
                    console.warn(self._map.getLocatedId(p));
                }
                catch (ex) {
                    console.error(p);
                    console.error(ex);
                }
            });
        }
        Object.defineProperty(Application.prototype, "height", {
            get: function () {
                return this.canvas.height;
            },
            set: function (v) {
                this.canvas.height = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Application.prototype, "width", {
            get: function () {
                return this.canvas.width;
            },
            set: function (v) {
                this.canvas.width = v;
            },
            enumerable: true,
            configurable: true
        });
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
            this.__position__ = new core.Point(0, 0);
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
            return typeof this.$GUID !== 'undefined';
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
        UIControl.prototype.points = function () {
            var p1 = new Point(this.position.x, this.position.y), p2 = new Point(this.position.x + this.width, this.position.y), p3 = new Point(this.position.x + this.width, this.position.y + this.height), p4 = new Point(this.position.x, this.position.y + this.height);
            return [p1, p2, p3, p4];
        };
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
    var Rectangle = (function (_super) {
        __extends(Rectangle, _super);
        function Rectangle() {
            _super.apply(this, arguments);
        }
        Rectangle.prototype._render = function () {
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        };
        return Rectangle;
    }(core_1.core.UIControl));
    ui.Rectangle = Rectangle;
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
            this.context.fillText(this.text, this.position.y, this.position.x);
        };
        return Label;
    }(core_1.core.UIControl));
    ui.Label = Label;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button() {
            _super.apply(this, arguments);
        }
        Button.prototype._render = function () {
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
            this.context.fillText(this.text, this.position.x, this.position.y, this.width);
        };
        return Button;
    }(Label));
    ui.Button = Button;
})(ui = exports.ui || (exports.ui = {}));

},{"./core":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JmQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGNvcmU7XG4oZnVuY3Rpb24gKGNvcmUpIHtcbiAgICB2YXIgQm94TW9kZWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBCb3hNb2RlbCgpIHtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQm94TW9kZWw7XG4gICAgfSgpKTtcbiAgICBjb3JlLkJveE1vZGVsID0gQm94TW9kZWw7XG4gICAgdmFyIHZlcnNpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiB2ZXJzaW9uKCkge1xuICAgICAgICB9XG4gICAgICAgIHZlcnNpb24udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMubWFqb3IsIHRoaXMubWlub3IsIHRoaXMucGF0Y2hdLmpvaW4oJy4nKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmVyc2lvbi5tYWpvciA9IDA7XG4gICAgICAgIHZlcnNpb24ubWlub3IgPSAwO1xuICAgICAgICB2ZXJzaW9uLnBhdGNoID0gMDtcbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfSgpKTtcbiAgICBjb3JlLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHZhciBHVUlEID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gR1VJRCgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IEdVSUQuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICAgICAgfVxuICAgICAgICBHVUlELmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9O1xuICAgICAgICBHVUlELnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfTtcbiAgICAgICAgR1VJRC5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBHVUlEO1xuICAgIH0oKSk7XG4gICAgY29yZS5HVUlEID0gR1VJRDtcbiAgICB2YXIgRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgXCJhcmdzXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcmdzID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXZlbnQ7XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50ID0gRXZlbnQ7XG4gICAgdmFyIFVJRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVUlFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJRXZlbnQ7XG4gICAgfShFdmVudCkpO1xuICAgIGNvcmUuVUlFdmVudCA9IFVJRXZlbnQ7XG4gICAgdmFyIFVJTW91c2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSU1vdXNlRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJTW91c2VFdmVudCh0YXJnZXQsIHdpbmRvd0NsaWNrRXZlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IHdpbmRvd0NsaWNrRXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmw6IHdpbmRvd0NsaWNrRXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICAgICAgYWx0OiB3aW5kb3dDbGlja0V2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHdpbmRvd0NsaWNrRXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgICAgIG1ldGE6IHdpbmRvd0NsaWNrRXZlbnQubWV0YUtleVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogd2luZG93Q2xpY2tFdmVudC5sYXllclhcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVUlNb3VzZUV2ZW50O1xuICAgIH0oVUlFdmVudCkpO1xuICAgIGNvcmUuVUlNb3VzZUV2ZW50ID0gVUlNb3VzZUV2ZW50O1xuICAgIHZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eUNoYW5nZWRFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gUHJvcGVydHlDaGFuZ2VkRXZlbnQodGFyZ2V0LCBwcm9wTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BOYW1lLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9wZXJ0eUNoYW5nZWRFdmVudDtcbiAgICB9KFVJRXZlbnQpKTtcbiAgICBjb3JlLlByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4gICAgdmFyIENvbGxlY3Rpb25FdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIENvbGxlY3Rpb25FdmVudCh0YXJnZXQsIGl0ZW0pIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb2xsZWN0aW9uRXZlbnQ7XG4gICAgfShFdmVudCkpO1xuICAgIGNvcmUuQ29sbGVjdGlvbkV2ZW50ID0gQ29sbGVjdGlvbkV2ZW50O1xuICAgIHZhciBFdmVudEVtaXR0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgICAgICAgICB0aGlzLiQkZSA9IG5ldyBjb3JlLkV2ZW50R2VuZXJhdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7IH07XG4gICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuJGVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHsgfTtcbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgdmFyIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbihzb3VyY2UsIG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuJGhvb2tzID0gW107XG4gICAgICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLiRldmVudFNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLnRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIChldmVudEFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuJGhvb2tzLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhvb2sgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgaG9vay5jYWxsKHNlbGYuJGV2ZW50U291cmNlLCBldmVudEFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0TGlzdGVuZXJzQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy4kaG9va3MubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy4kaG9va3MucHVzaChldmVudExpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHZhciBob29rSWQgPSB0aGlzLiRob29rcy5pbmRleE9mKGV2ZW50TGlzdGVuZXIpO1xuICAgICAgICAgICAgaWYgKGhvb2tJZCA+IC0xKVxuICAgICAgICAgICAgICAgIHRoaXMuJGhvb2tzLnNwbGljZShob29rSWQsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIChob29rSWQgPiAtMSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbiA9IEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbjtcbiAgICB2YXIgRXZlbnRHZW5lcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudEdlbmVyYXRvcihldmVudEdlbmVyYXRvciwgaW5qZWN0KSB7XG4gICAgICAgICAgICBpZiAoaW5qZWN0ID09PSB2b2lkIDApIHsgaW5qZWN0ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdGhpcy4kbGlzdGVuZXJzID0ge307XG4gICAgICAgICAgICB0aGlzLiRvd25lciA9IGV2ZW50R2VuZXJhdG9yO1xuICAgICAgICAgICAgaWYgKGluamVjdClcbiAgICAgICAgICAgICAgICB0aGlzLmluamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuJGxpc3RlbmVyc1tldmVudE5hbWVdICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuJG93bmVyLm9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub24uYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLiRvd25lci5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vZmYuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLiRvd25lci4kZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGxpc3RlbmVyc1tldmVudE5hbWVdLnRyaWdnZXJFdmVudChldmVudEFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBuZXcgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24odGhpcy4kb3duZXIsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvd25lcjtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGxpc3RlbmVyc1tldmVudE5hbWVdLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnRHZW5lcmF0b3I7XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50R2VuZXJhdG9yID0gRXZlbnRHZW5lcmF0b3I7XG4gICAgdmFyIENvbnBvbmVudE1hcHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIENvbnBvbmVudE1hcHBlcihvd25lcikge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXAgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2d1aWRNYXAgPSB7fTtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAxOyB4IDw9IG93bmVyLmNhbnZhcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMTsgeSA8PSBvd25lci5jYW52YXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5fcmVmcmVzaE1hcCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5fbWFwRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgZ3VpZCA9IGVsZW1lbnQuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBjb29yZHMgPSBlbGVtZW50LnBvaW50cygpO1xuICAgICAgICAgICAgdmFyIHgxID0gY29vcmRzWzBdLngsIHgyID0gY29vcmRzWzFdLngsIHkxID0gY29vcmRzWzFdLnksIHkyID0gY29vcmRzWzJdLnk7XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0geTEgKyAwOyB5IDw9IHkyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0geDEgKyAwOyB4IDw9IHgyOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9sb2NhdGlvbk1hcFt4XSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldID0gZ3VpZDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuX3JlZ2lzdGVySWQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZ3VpZE1hcFtlbGVtZW50LmlkLnRvU3RyaW5nKCldID0gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5nZXRMb2NhdGVkSWQgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9sb2NhdGlvbk1hcFtwb2ludC54XVtwb2ludC55XTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcklkKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5fbWFwRWxlbWVudChpdGVtKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbnBvbmVudE1hcHBlcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuQ29ucG9uZW50TWFwcGVyID0gQ29ucG9uZW50TWFwcGVyO1xuICAgIHZhciBBcHBsaWNhdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhBcHBsaWNhdGlvbiwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gQXBwbGljYXRpb24oaGFuZGxlciwgYm9vdHN0cmFwKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGhhbmRsZXI7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgaWYgKGJvb3RzdHJhcClcbiAgICAgICAgICAgICAgICBib290c3RyYXAuY2FsbChzZWxmLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IGNvcmUuQ29sbGVjdGlvbihudWxsLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMub24oJ2VsZW1lbnRJbnNlcnRlZCcsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2RyYXdTdGFydCcsIG5ldyBVSUV2ZW50KHRoaXMsIHt9KSk7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgY29yZS5Db25wb25lbnRNYXBwZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBQb2ludChldmVudC5sYXllclgsIGV2ZW50LmxheWVyWSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS53YXJuKHNlbGYuX21hcC5nZXRMb2NhdGVkSWQocCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihwKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEFwcGxpY2F0aW9uLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBwbGljYXRpb24ucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShBcHBsaWNhdGlvbi5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQXBwbGljYXRpb24ucHJvdG90eXBlLCBcIm1hcHBlclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIEFwcGxpY2F0aW9uLnByb3RvdHlwZS5yZWRyYXdDb250ZXh0ID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZWRyYXcnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZvcmNlIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgQXBwbGljYXRpb24ucHJvdG90eXBlLnJlZ2lzdGVyRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1hcHBlci5yZWdpc3RlcihlbGVtZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEFwcGxpY2F0aW9uO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5BcHBsaWNhdGlvbiA9IEFwcGxpY2F0aW9uO1xuICAgIHZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKENvbGxlY3Rpb24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIENvbGxlY3Rpb24oaGFuZGxlciwgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLiRkZWZhdWx0QXBwbGljYXRpb24gPSBhcHBJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS4kJGluamVjdCh0aGlzLmNvbGxlY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2VsZW1lbnRJbnNlcnRlZCcsIG5ldyBDb2xsZWN0aW9uRXZlbnQodGhpcywgaXRlbSkpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZWxlbWVudFJlbW92ZScsIG5ldyBDb2xsZWN0aW9uRXZlbnQodGhpcywgdGhpcy5pdGVtc1tpXSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbjtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XG4gICAgdmFyIFBvaW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBvaW50O1xuICAgIH0oKSk7XG4gICAgY29yZS5Qb2ludCA9IFBvaW50O1xuICAgIHZhciBUZXh0QWxpZ24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBUZXh0QWxpZ24oKSB7XG4gICAgICAgIH1cbiAgICAgICAgVGV4dEFsaWduLnN0YXJ0ID0gJ3N0YXJ0JztcbiAgICAgICAgVGV4dEFsaWduLmVuZCA9ICdlbmQnO1xuICAgICAgICBUZXh0QWxpZ24ubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgVGV4dEFsaWduLmNlbnRlciA9ICdjZW50ZXInO1xuICAgICAgICBUZXh0QWxpZ24ucmlnaHQgPSAncmlnaHQnO1xuICAgICAgICByZXR1cm4gVGV4dEFsaWduO1xuICAgIH0oKSk7XG4gICAgY29yZS5UZXh0QWxpZ24gPSBUZXh0QWxpZ247XG4gICAgdmFyIFVJQ29udHJvbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSUNvbnRyb2wsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJQ29udHJvbChvd25lcikge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRoZWlnaHQgPSAxMjg7XG4gICAgICAgICAgICB0aGlzLiR3aWR0aCA9IDEyODtcbiAgICAgICAgICAgIHRoaXMuJGluamVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRiYWNrZ3JvdW5kQ29sb3IgPSAnI2RlZGVkZSc7XG4gICAgICAgICAgICB0aGlzLiRmb3JlQ29sb3IgPSAnIzAwMCc7XG4gICAgICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgICAgICB0aGlzLiRjb250ZXh0ID0gb3duZXIuY29udGV4dDtcbiAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3IGNvcmUuUG9pbnQoMCwgMCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IGNvcmUuQ29sbGVjdGlvbih0aGlzLCBvd25lcik7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaWRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0lkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJEdVSUQgPSBuZXcgY29yZS5HVUlEKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJEdVSUQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5oYXNJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy4kR1VJRCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaXNJbmplY3RlZFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5qZWN0ZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiYmFja2dyb3VuZENvbG9yXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnYmFja2dyb3VuZENvbG9yJywgdGhpcy4kYmFja2dyb3VuZENvbG9yLCBuZXdDb2xvcikpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGJhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImZvcmVDb2xvclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kZm9yZUNvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2ZvcmVDb2xvcicsIHRoaXMuJGZvcmVDb2xvciwgbmV3Q29sb3IpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRmb3JlQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gbmV3Q29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDb250ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRoZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgdGhpcy4kaGVpZ2h0LCBuZXdIZWlnaHQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRoZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDb250ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHdpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgdGhpcy4kd2lkdGgsIG5ld1dpZHRoKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kd2lkdGggPSBuZXdXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhd0NvbnRleHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJwb3NpdGlvblwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX187XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAncG9zaXRpb24nLCB0aGlzLl9fcG9zaXRpb25fXywgbmV3UG9zaXRpb24pKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXyA9IG5ld1Bvc2l0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucG9pbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHAxID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSwgcDIgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCwgdGhpcy5wb3NpdGlvbi55KSwgcDMgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpLCBwNCA9IG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiBbcDEsIHAyLCBwMywgcDRdO1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJwYXJlbnRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLnJlZHJhd0NvbnRleHQgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSA9PT0gdm9pZCAwKSB7IGZvcmNlID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0luamVjdGVkIHx8ICFmb3JjZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZWRyYXcnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZvcmNlIH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLnBhcmVudC5yZWRyYXdDb250ZXh0KGZvcmNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVuZGVyJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZW5kZXJlZCcsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS4kJGluamVjdCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuJGluamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnaW5qZWN0JywgbmV3IFVJRXZlbnQodGhpcywgeyAncGFyZW50JzogcGFyZW50IH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Rpc3Bvc2UnLCBuZXcgVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgICAgICAgICB0aGlzLiRpbmplY3RlZCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gVUlDb250cm9sO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5VSUNvbnRyb2wgPSBVSUNvbnRyb2w7XG59KShjb3JlID0gZXhwb3J0cy5jb3JlIHx8IChleHBvcnRzLmNvcmUgPSB7fSkpO1xuIiwid2luZG93LmtyYXRvcyA9IHJlcXVpcmUoJy4vY29yZS5qcycpLmNvcmU7XG53aW5kb3cua3JhdG9zLnVpID0gcmVxdWlyZSgnLi91aS5qcycpLnVpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBjb3JlXzEgPSByZXF1aXJlKCcuL2NvcmUnKTtcbnZhciB1aTtcbihmdW5jdGlvbiAodWkpIHtcbiAgICB2YXIgUmVjdGFuZ2xlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFJlY3RhbmdsZSwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gUmVjdGFuZ2xlKCkge1xuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgUmVjdGFuZ2xlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSZWN0YW5nbGU7XG4gICAgfShjb3JlXzEuY29yZS5VSUNvbnRyb2wpKTtcbiAgICB1aS5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG4gICAgdmFyIExhYmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBMYWJlbCgpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy4kdGV4dCA9ICdOZXcgTGFiZWwnO1xuICAgICAgICAgICAgdGhpcy4kYWxpZ24gPSBjb3JlXzEuY29yZS5UZXh0QWxpZ24ubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3U3RyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgY29yZV8xLmNvcmUuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHQnLCB0aGlzLiR0ZXh0LCBuZXdTdHIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiR0ZXh0ID0gbmV3U3RyO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dEFsaWduXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRhbGlnbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBjb3JlXzEuY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dEFsaWduJywgdGhpcy4kYWxpZ24sIG5ld1ZhbCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFsaWduID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIExhYmVsLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnBvc2l0aW9uLngpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gTGFiZWw7XG4gICAgfShjb3JlXzEuY29yZS5VSUNvbnRyb2wpKTtcbiAgICB1aS5MYWJlbCA9IExhYmVsO1xuICAgIHZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBCdXR0b24oKSB7XG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBCdXR0b24ucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEJ1dHRvbjtcbiAgICB9KExhYmVsKSk7XG4gICAgdWkuQnV0dG9uID0gQnV0dG9uO1xufSkodWkgPSBleHBvcnRzLnVpIHx8IChleHBvcnRzLnVpID0ge30pKTtcbiJdfQ==
