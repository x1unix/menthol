(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core;
(function (core) {
    function isset(e) {
        return typeof e !== 'undefined';
    }
    core.isset = isset;
    var version = (function () {
        function version() {
        }
        version.toString = function () {
            return [this.major, this.minor, this.patch].join('.');
        };
        version.major = 0;
        version.minor = 5;
        version.patch = 8;
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
                target: target,
                keys: {
                    ctrl: windowClickEvent.ctrlKey,
                    alt: windowClickEvent.altKey,
                    shift: windowClickEvent.shiftKey,
                    meta: windowClickEvent.metaKey
                },
                position: {
                    x: windowClickEvent.layerX,
                    y: windowClickEvent.layerY
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
            this.__e = new core.EventGenerator(this);
        }
        EventEmitter.prototype.on = function (eventName, listener) { };
        EventEmitter.prototype.off = function (eventName, listener) { };
        EventEmitter.prototype._emit = function (eventName, eventArgs) { };
        ;
        return EventEmitter;
    }());
    core.EventEmitter = EventEmitter;
    var EventListenersCollection = (function () {
        function EventListenersCollection(source, name) {
            this._hooks = [];
            this.eventName = name;
            this._eventSource = source;
        }
        EventListenersCollection.prototype.triggerEvent = function (eventArgs) {
            var self = this;
            this._hooks.forEach(function (hook) {
                if (typeof hook == 'function')
                    hook.call(self._eventSource, eventArgs);
            });
        };
        EventListenersCollection.prototype.getListenersCount = function () {
            return this._hooks.length;
        };
        EventListenersCollection.prototype.addEventListener = function (eventListener) {
            this._hooks.push(eventListener);
        };
        EventListenersCollection.prototype.removeEventListener = function (eventListener) {
            var hookId = this._hooks.indexOf(eventListener);
            if (hookId > -1)
                this._hooks.splice(hookId, 1);
            return (hookId > -1);
        };
        return EventListenersCollection;
    }());
    core.EventListenersCollection = EventListenersCollection;
    var EventGenerator = (function () {
        function EventGenerator(eventGenerator, inject) {
            if (inject === void 0) { inject = true; }
            this._listeners = {};
            this._owner = eventGenerator;
            if (inject)
                this.inject();
        }
        EventGenerator.prototype.hasListeners = function (eventName) {
            return typeof this._listeners[eventName] !== 'undefined';
        };
        EventGenerator.prototype.inject = function () {
            var self = this;
            this._owner.on = function () {
                self.on.apply(self, arguments);
            };
            this._owner.off = function () {
                self.off.apply(self, arguments);
            };
            this._owner._emit = function () {
                self.emit.apply(self, arguments);
            };
        };
        EventGenerator.prototype.emit = function (eventName, eventArgs) {
            if (this.hasListeners(eventName)) {
                this._listeners[eventName].triggerEvent(eventArgs);
            }
        };
        EventGenerator.prototype.addEventListener = function (eventName, listener) {
            if (!this.hasListeners(eventName)) {
                this._listeners[eventName] = new core.EventListenersCollection(this._owner, eventName);
            }
            this._listeners[eventName].addEventListener(listener);
            return this._owner;
        };
        EventGenerator.prototype.removeEventListener = function (eventName, listener) {
            if (!this.hasListeners(eventName))
                return false;
            return this._listeners[eventName].removeEventListener(listener);
        };
        EventGenerator.prototype.on = function (eventNames, listener) {
            var self = this;
            eventNames.trim().split(' ').forEach(function (eName) {
                self.addEventListener(eName, listener);
            });
        };
        EventGenerator.prototype.off = function (eventNames, listener) {
            var self = this;
            eventNames.trim().split(' ').forEach(function (eName) {
                self.removeEventListener(eName, listener);
            });
        };
        return EventGenerator;
    }());
    core.EventGenerator = EventGenerator;
    var Emittable = (function (_super) {
        __extends(Emittable, _super);
        function Emittable() {
            _super.call(this);
            this.emittable = false;
        }
        Emittable.prototype._onChange = function (prop) {
            if (this.emittable) {
                this._emit('propertyChange', new PropertyChangedEvent(this, prop, null, null));
            }
        };
        return Emittable;
    }(EventEmitter));
    core.Emittable = Emittable;
    var BoxModelElement = (function (_super) {
        __extends(BoxModelElement, _super);
        function BoxModelElement(top, right, bottom, left) {
            if (top === void 0) { top = 0; }
            if (right === void 0) { right = 0; }
            if (bottom === void 0) { bottom = 0; }
            if (left === void 0) { left = 0; }
            _super.call(this);
            this._top = top;
            this._left = left;
            this._right = right;
            this._bottom = bottom;
        }
        Object.defineProperty(BoxModelElement.prototype, "top", {
            get: function () {
                return this._top;
            },
            set: function (value) {
                this._top = value;
                this._onChange('top');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxModelElement.prototype, "right", {
            get: function () {
                return this._right;
            },
            set: function (value) {
                this._right = value;
                this._onChange('right');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxModelElement.prototype, "bottom", {
            get: function () {
                return this._bottom;
            },
            set: function (value) {
                this._bottom = value;
                this._onChange('bottom');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(BoxModelElement.prototype, "left", {
            get: function () {
                return this._left;
            },
            set: function (value) {
                this._left = value;
                this._onChange('left');
            },
            enumerable: true,
            configurable: true
        });
        return BoxModelElement;
    }(Emittable));
    core.BoxModelElement = BoxModelElement;
    var FontStyle = (function () {
        function FontStyle(type) {
            this._styleType = type;
        }
        FontStyle.prototype.toString = function () {
            return this._styleType.toString();
        };
        FontStyle.normal = new FontStyle('normal');
        FontStyle.italic = new FontStyle('italic');
        return FontStyle;
    }());
    core.FontStyle = FontStyle;
    var Font = (function (_super) {
        __extends(Font, _super);
        function Font(family, size, weight) {
            if (family === void 0) { family = 'sans-serif'; }
            if (size === void 0) { size = 10; }
            if (weight === void 0) { weight = 400; }
            _super.call(this);
            this.emittable = false;
            this._family = family;
            this._size = size;
            this._weight = weight;
            this._style = FontStyle.normal;
        }
        Font.prototype._onChange = function (prop) {
            if (this.emittable) {
                this._emit('propertyChange', new PropertyChangedEvent(this, prop, null, null));
            }
        };
        Object.defineProperty(Font.prototype, "height", {
            get: function () {
                return (!isset(this._height) || typeof this._height == 'undefined') ? (this._size * 1.2) | 0 : this._height;
            },
            set: function (value) {
                this._height = value;
                this._onChange('height');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Font.prototype, "weight", {
            get: function () {
                return this._weight;
            },
            set: function (value) {
                this._weight = value;
                this._onChange('weight');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Font.prototype, "style", {
            get: function () {
                return this._style;
            },
            set: function (v) {
                this._style = v;
                this._onChange('style');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Font.prototype, "family", {
            get: function () {
                return this._family;
            },
            set: function (v) {
                this._family = v;
                this._onChange('family');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Font.prototype, "size", {
            get: function () {
                return this._size;
            },
            set: function (v) {
                this._size = v;
                this._onChange('size');
            },
            enumerable: true,
            configurable: true
        });
        Font.prototype.toString = function () {
            return [this.style.toString(), this.weight, this.size + 'px/' + this.height + 'px', this.family].join(' ');
        };
        return Font;
    }(EventEmitter));
    core.Font = Font;
    var ConponentMapper = (function () {
        function ConponentMapper(owner) {
            this._locationMap = [];
            this._guidMap = {};
            this.owner = owner;
            this.generate();
        }
        ConponentMapper.prototype.clear = function () {
            this._locationMap.splice(0, this._locationMap.length - 1);
        };
        ConponentMapper.prototype.generate = function () {
            this.clear();
            for (var x = 1; x <= this.owner.canvas.width; x++) {
                this._locationMap[x] = new Array();
                for (var y = 1; y <= this.owner.canvas.height; y++) {
                    this._locationMap[x][y] = new Array();
                }
            }
        };
        ConponentMapper.prototype._mapElement = function (element) {
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
        ConponentMapper.prototype._registerId = function (element) {
            this._guidMap[element.id.toString()] = element;
        };
        ConponentMapper.prototype.getElementById = function (eid) {
            return this._guidMap[eid];
        };
        ConponentMapper.prototype.getLocatedId = function (point) {
            var target = this._locationMap[point.x][point.y];
            return target[target.length - 1];
        };
        ConponentMapper.prototype.register = function (item) {
            this._registerId(item);
            this._mapElement(item);
        };
        return ConponentMapper;
    }());
    core.ConponentMapper = ConponentMapper;
    var Form = (function (_super) {
        __extends(Form, _super);
        function Form(handler, bootstrap) {
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
            this._emit('drawStart', new UIEvent(this, {}));
            this._map = new core.ConponentMapper(this);
            this.canvas.addEventListener('click', function (event) {
                var p = new Point(event.layerX, event.layerY);
                try {
                    var target = self._map.getLocatedId(p);
                    target = (core.isset(target) && target.length > 0) ? self._map.getElementById(target) : self;
                    target._emit('click', new UIMouseEvent(target, event));
                }
                catch (ex) {
                    console.error(ex);
                }
            });
            this.on('redraw', function () {
                this.clear();
                this.controls.forEach(function (e) {
                    e.redraw();
                });
            });
        }
        Object.defineProperty(Form.prototype, "height", {
            get: function () {
                return this.canvas.height;
            },
            set: function (v) {
                this.canvas.height = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "width", {
            get: function () {
                return this.canvas.width;
            },
            set: function (v) {
                this.canvas.width = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "context", {
            get: function () {
                return this.canvas.getContext('2d');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Form.prototype, "mapper", {
            get: function () {
                return this._map;
            },
            enumerable: true,
            configurable: true
        });
        Form.prototype.redrawContext = function (force) {
            this._map.generate();
            this._emit('redraw', new UIEvent(this, { 'force': force }));
        };
        Form.prototype.registerElement = function (element) {
            this.mapper.register(element);
        };
        Form.prototype.getElementById = function (id) {
            return this._map.getElementById(id);
        };
        Form.prototype.clear = function () {
            this.context.clearRect(0, 0, this.width, this.height);
            this._map.generate();
            return this;
        };
        return Form;
    }(EventEmitter));
    core.Form = Form;
    var Collection = (function (_super) {
        __extends(Collection, _super);
        function Collection(handler, appInstance) {
            _super.call(this);
            this.collectionHandler = handler;
            this.items = [];
            this._defaultForm = appInstance;
        }
        Collection.prototype.add = function (item) {
            item.__inject(this.collectionHandler);
            this.items.push(item);
            this._emit('elementInserted', new CollectionEvent(this, item));
        };
        Collection.prototype.remove = function (item) {
            var i = this.items.indexOf(item);
            if (i > -1) {
                this.items[i].dispose();
                this._emit('elementRemove', new CollectionEvent(this, this.items[i]));
                this.items.splice(i, 1);
            }
        };
        Collection.prototype.forEach = function (callback) {
            this.items.forEach.call(this.items, callback);
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
            this._height = 128;
            this._width = 128;
            this._injected = false;
            this._backgroundColor = 'rgba(0,0,0,0)';
            this._foreColor = '#000';
            this._padding = new BoxModelElement();
            this._margin = new BoxModelElement();
            this._font = new Font();
            this._drawn = false;
            var self = this;
            this.owner = owner;
            this._context = owner.context;
            this.__position__ = new core.Point(0, 0);
            this.controls = new core.Collection(this, owner);
            function fnOnUpdate() {
                self._onUpdate();
            }
            var propEvent = 'propertyChange';
            this.on('layerUpdate', this._onUpdate);
            this.on('propertyChange', this._onUpdate);
            this._font.on(propEvent, fnOnUpdate);
            this._padding.on(propEvent, fnOnUpdate);
            this._margin.on(propEvent, fnOnUpdate);
        }
        Object.defineProperty(UIControl.prototype, "drawn", {
            get: function () {
                return this._drawn;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "padding", {
            get: function () {
                return this._padding;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "margin", {
            get: function () {
                return this._margin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "font", {
            get: function () {
                return this._font;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "id", {
            get: function () {
                if (!this.hasId())
                    this._GUID = new core.GUID();
                return this._GUID;
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype.hasId = function () {
            return typeof this._GUID !== 'undefined';
        };
        Object.defineProperty(UIControl.prototype, "context", {
            get: function () {
                return this._context;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "isInjected", {
            get: function () {
                return this._injected;
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype._onUpdate = function () {
            if (!this.drawn)
                return;
            this.owner._emit('redraw', { relatedTarget: this });
        };
        Object.defineProperty(UIControl.prototype, "backgroundColor", {
            get: function () {
                return this._backgroundColor;
            },
            set: function (newColor) {
                var old = this._backgroundColor.toString();
                this._backgroundColor = newColor;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'backgroundColor', old, newColor));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "foreColor", {
            get: function () {
                return this._foreColor;
            },
            set: function (newColor) {
                var old = this._foreColor.toString();
                this._foreColor = newColor;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'foreColor', old, newColor));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "height", {
            get: function () {
                return this._height;
            },
            set: function (newHeight) {
                this._height = newHeight;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'width', null, newHeight));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                this._width = newWidth;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'width', null, newWidth));
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype.getAbsoluteHeight = function () {
            return this.height;
        };
        UIControl.prototype.getAbsoluteWidth = function () {
            return this.height;
        };
        Object.defineProperty(UIControl.prototype, "top", {
            get: function () {
                return this.__position__.y;
            },
            set: function (v) {
                var old = v + 0;
                this.__position__.y = v;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'top', old, v));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "left", {
            get: function () {
                return this.__position__.x;
            },
            set: function (v) {
                var old = v + 0;
                this.__position__.x = v;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'left', old, v));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "position", {
            get: function () {
                return this.__position__;
            },
            set: function (newPosition) {
                var old = new Point(newPosition.x, newPosition.y);
                this.top = newPosition.y;
                this.left = newPosition.x;
                this.__position__ = newPosition;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'position', old, newPosition));
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype.points = function () {
            var p1 = new Point(this.position.x, this.position.y), p2 = new Point(this.position.x + this.getAbsoluteWidth(), this.position.y), p3 = new Point(this.position.x + this.getAbsoluteWidth(), this.position.y + this.getAbsoluteHeight()), p4 = new Point(this.position.x, this.position.y + this.getAbsoluteHeight());
            return [p1, p2, p3, p4];
        };
        Object.defineProperty(UIControl.prototype, "parent", {
            get: function () {
                return this._parent;
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype.hasParent = function () {
            return (isset(this.parent) && this.parent !== null);
        };
        UIControl.prototype.redraw = function () {
            if (!this.isInjected)
                return false;
            this.owner.registerElement(this);
            this._emit('redraw', new UIEvent(this, { 'force': false }));
            this.render();
            return true;
        };
        UIControl.prototype._render = function () { };
        UIControl.prototype._drawChildren = function () {
            this.controls.forEach(function _fnDrawChild(e) {
                e.redraw();
            });
        };
        UIControl.prototype.render = function () {
            this._drawn = false;
            this._emit('render', new UIEvent(this, null));
            this._render();
            this._drawChildren();
            this._drawn = true;
            this._emit('rendered', new UIEvent(this, null));
        };
        UIControl.prototype.__inject = function (parent) {
            this._parent = parent;
            this._injected = true;
            this._font.emittable = true;
            this.owner.registerElement(this);
            this._emit('inject', new UIEvent(this, { 'parent': parent }));
            this.render();
        };
        UIControl.prototype.remove = function () {
            var parent = this.hasParent() ? this.parent : this.owner;
            parent.controls.remove(this);
        };
        UIControl.prototype.dispose = function () {
            this._emit('dispose', new UIEvent(this, null));
            this._injected = false;
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
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
        };
        return Rectangle;
    }(core_1.core.UIControl));
    ui.Rectangle = Rectangle;
    var Label = (function (_super) {
        __extends(Label, _super);
        function Label() {
            _super.apply(this, arguments);
            this._text = 'New Label';
            this._align = core_1.core.TextAlign.left;
        }
        Object.defineProperty(Label.prototype, "text", {
            get: function () {
                return this._text;
            },
            set: function (newStr) {
                var old = this._text.toString();
                this._text = newStr;
                this._emit('propertyChange', new core_1.core.PropertyChangedEvent(this, 'text', old, newStr));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Label.prototype, "textAlign", {
            get: function () {
                return this._align;
            },
            set: function (newVal) {
                this._align = newVal;
                this._emit('propertyChange', new core_1.core.PropertyChangedEvent(this, 'textAlign', null, newVal));
            },
            enumerable: true,
            configurable: true
        });
        Label.prototype._render = function () {
            this.context.textAlign = this.textAlign;
            this.context.font = this.font.toString();
            this.context.fillText(this.text, this.position.y, this.position.x);
        };
        return Label;
    }(core_1.core.UIControl));
    ui.Label = Label;
    var Button = (function (_super) {
        __extends(Button, _super);
        function Button(owner) {
            _super.call(this, owner);
            this.foreColor = '#fff';
            this.backgroundColor = '#000';
            this.padding.top = 5;
            this.padding.bottom = 5;
            this.padding.left = 5;
            this.padding.right = 5;
            this.height = 'auto';
            this.width = 'auto';
        }
        Button.prototype._getTextPosition = function () {
            var txtWidth = this.context.measureText(this.text).width | 0;
            return {
                'y': this.position.y + this.font.height + this.padding.top,
                'x': this.position.x + this.padding.left
            };
        };
        Button.prototype.getAbsoluteHeight = function () {
            if (this.height === 'auto') {
                return this.font.height + this.padding.top + this.padding.bottom;
            }
            else {
                return this.height + this.padding.top + this.padding.bottom;
            }
        };
        Button.prototype.getAbsoluteWidth = function () {
            if (this.width === 'auto') {
                var txtWidth = this.context.measureText(this.text).width | 0;
                return txtWidth + this.padding.left + this.padding.right;
            }
            else {
                return this.height + this.padding.left + this.padding.right;
            }
        };
        Button.prototype._render = function () {
            var txtPos = this._getTextPosition();
            var paddingY = this.padding.top + this.padding.bottom;
            this.context.font = this.font.toString();
            this.context.textAlign = this.textAlign;
            this.context.fillStyle = this.backgroundColor;
            this.context.fillRect(this.position.x, this.position.y, this.getAbsoluteWidth(), this.getAbsoluteHeight());
            this.context.fillStyle = this.foreColor;
            this.context.fillText(this.text, txtPos.x, txtPos.y, this.context.measureText(this.text).width);
        };
        return Button;
    }(Label));
    ui.Button = Button;
})(ui = exports.ui || (exports.ui = {}));

},{"./core":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL3hCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgY29yZTtcbihmdW5jdGlvbiAoY29yZSkge1xuICAgIGZ1bmN0aW9uIGlzc2V0KGUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiBlICE9PSAndW5kZWZpbmVkJztcbiAgICB9XG4gICAgY29yZS5pc3NldCA9IGlzc2V0O1xuICAgIHZhciB2ZXJzaW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gdmVyc2lvbigpIHtcbiAgICAgICAgfVxuICAgICAgICB2ZXJzaW9uLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLm1ham9yLCB0aGlzLm1pbm9yLCB0aGlzLnBhdGNoXS5qb2luKCcuJyk7XG4gICAgICAgIH07XG4gICAgICAgIHZlcnNpb24ubWFqb3IgPSAwO1xuICAgICAgICB2ZXJzaW9uLm1pbm9yID0gNTtcbiAgICAgICAgdmVyc2lvbi5wYXRjaCA9IDg7XG4gICAgICAgIHJldHVybiB2ZXJzaW9uO1xuICAgIH0oKSk7XG4gICAgY29yZS52ZXJzaW9uID0gdmVyc2lvbjtcbiAgICB2YXIgR1VJRCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEdVSUQoKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBHVUlELmdlbmVyYXRlKCk7XG4gICAgICAgICAgICB0aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsdWU7IH07XG4gICAgICAgIH1cbiAgICAgICAgR1VJRC5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGZ1bmN0aW9uIHM0KCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgICAgICAgICAgICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICAgICAgfTtcbiAgICAgICAgR1VJRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gJyc7XG4gICAgICAgIH07XG4gICAgICAgIEdVSUQucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gR1VJRDtcbiAgICB9KCkpO1xuICAgIGNvcmUuR1VJRCA9IEdVSUQ7XG4gICAgdmFyIEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgICAgICB0aGlzLl9hcmdzID0gYXJncztcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcInRhcmdldFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwiYXJnc1wiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJncztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYXJncyA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIEV2ZW50O1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudCA9IEV2ZW50O1xuICAgIHZhciBVSUV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFVJRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVSUV2ZW50O1xuICAgIH0oRXZlbnQpKTtcbiAgICBjb3JlLlVJRXZlbnQgPSBVSUV2ZW50O1xuICAgIHZhciBVSU1vdXNlRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlNb3VzZUV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBVSU1vdXNlRXZlbnQodGFyZ2V0LCB3aW5kb3dDbGlja0V2ZW50KSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICB0eXBlOiB3aW5kb3dDbGlja0V2ZW50LnR5cGUsXG4gICAgICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgICAgICAgICBjdHJsOiB3aW5kb3dDbGlja0V2ZW50LmN0cmxLZXksXG4gICAgICAgICAgICAgICAgICAgIGFsdDogd2luZG93Q2xpY2tFdmVudC5hbHRLZXksXG4gICAgICAgICAgICAgICAgICAgIHNoaWZ0OiB3aW5kb3dDbGlja0V2ZW50LnNoaWZ0S2V5LFxuICAgICAgICAgICAgICAgICAgICBtZXRhOiB3aW5kb3dDbGlja0V2ZW50Lm1ldGFLZXlcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgICAgIHg6IHdpbmRvd0NsaWNrRXZlbnQubGF5ZXJYLFxuICAgICAgICAgICAgICAgICAgICB5OiB3aW5kb3dDbGlja0V2ZW50LmxheWVyWVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBVSU1vdXNlRXZlbnQ7XG4gICAgfShVSUV2ZW50KSk7XG4gICAgY29yZS5VSU1vdXNlRXZlbnQgPSBVSU1vdXNlRXZlbnQ7XG4gICAgdmFyIFByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFByb3BlcnR5Q2hhbmdlZEV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0YXJnZXQsIHByb3BOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcE5hbWUsXG4gICAgICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFByb3BlcnR5Q2hhbmdlZEV2ZW50O1xuICAgIH0oVUlFdmVudCkpO1xuICAgIGNvcmUuUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudDtcbiAgICB2YXIgQ29sbGVjdGlvbkV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKENvbGxlY3Rpb25FdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gQ29sbGVjdGlvbkV2ZW50KHRhcmdldCwgaXRlbSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIENvbGxlY3Rpb25FdmVudDtcbiAgICB9KEV2ZW50KSk7XG4gICAgY29yZS5Db2xsZWN0aW9uRXZlbnQgPSBDb2xsZWN0aW9uRXZlbnQ7XG4gICAgdmFyIEV2ZW50RW1pdHRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgICAgICAgICAgIHRoaXMuX19lID0gbmV3IGNvcmUuRXZlbnRHZW5lcmF0b3IodGhpcyk7XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7IH07XG4gICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykgeyB9O1xuICAgICAgICA7XG4gICAgICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbiAgICB2YXIgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uKHNvdXJjZSwgbmFtZSkge1xuICAgICAgICAgICAgdGhpcy5faG9va3MgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuZXZlbnROYW1lID0gbmFtZTtcbiAgICAgICAgICAgIHRoaXMuX2V2ZW50U291cmNlID0gc291cmNlO1xuICAgICAgICB9XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUudHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50QXJncykge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5faG9va3MuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgaG9vayA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgICAgICBob29rLmNhbGwoc2VsZi5fZXZlbnRTb3VyY2UsIGV2ZW50QXJncyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRMaXN0ZW5lcnNDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ob29rcy5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9ob29rcy5wdXNoKGV2ZW50TGlzdGVuZXIpO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdmFyIGhvb2tJZCA9IHRoaXMuX2hvb2tzLmluZGV4T2YoZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgICAgICBpZiAoaG9va0lkID4gLTEpXG4gICAgICAgICAgICAgICAgdGhpcy5faG9va3Muc3BsaWNlKGhvb2tJZCwgMSk7XG4gICAgICAgICAgICByZXR1cm4gKGhvb2tJZCA+IC0xKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uID0gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xuICAgIHZhciBFdmVudEdlbmVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50R2VuZXJhdG9yKGV2ZW50R2VuZXJhdG9yLCBpbmplY3QpIHtcbiAgICAgICAgICAgIGlmIChpbmplY3QgPT09IHZvaWQgMCkgeyBpbmplY3QgPSB0cnVlOyB9XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyID0gZXZlbnRHZW5lcmF0b3I7XG4gICAgICAgICAgICBpZiAoaW5qZWN0KVxuICAgICAgICAgICAgICAgIHRoaXMuaW5qZWN0KCk7XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0gIT09ICd1bmRlZmluZWQnO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5fb3duZXIub24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLm9mZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9mZi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHRoaXMuX293bmVyLl9lbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuZW1pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0udHJpZ2dlckV2ZW50KGV2ZW50QXJncyk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdID0gbmV3IGNvcmUuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uKHRoaXMuX293bmVyLCBldmVudE5hbWUpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0uYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fb3duZXI7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lcywgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIoZU5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnRHZW5lcmF0b3I7XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50R2VuZXJhdG9yID0gRXZlbnRHZW5lcmF0b3I7XG4gICAgdmFyIEVtaXR0YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhFbWl0dGFibGUsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEVtaXR0YWJsZSgpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGFibGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBFbWl0dGFibGUucHJvdG90eXBlLl9vbkNoYW5nZSA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbWl0dGFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCBwcm9wLCBudWxsLCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFbWl0dGFibGU7XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLkVtaXR0YWJsZSA9IEVtaXR0YWJsZTtcbiAgICB2YXIgQm94TW9kZWxFbGVtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEJveE1vZGVsRWxlbWVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gQm94TW9kZWxFbGVtZW50KHRvcCwgcmlnaHQsIGJvdHRvbSwgbGVmdCkge1xuICAgICAgICAgICAgaWYgKHRvcCA9PT0gdm9pZCAwKSB7IHRvcCA9IDA7IH1cbiAgICAgICAgICAgIGlmIChyaWdodCA9PT0gdm9pZCAwKSB7IHJpZ2h0ID0gMDsgfVxuICAgICAgICAgICAgaWYgKGJvdHRvbSA9PT0gdm9pZCAwKSB7IGJvdHRvbSA9IDA7IH1cbiAgICAgICAgICAgIGlmIChsZWZ0ID09PSB2b2lkIDApIHsgbGVmdCA9IDA7IH1cbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fdG9wID0gdG9wO1xuICAgICAgICAgICAgdGhpcy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgICAgICB0aGlzLl9yaWdodCA9IHJpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fYm90dG9tID0gYm90dG9tO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcInRvcFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9wO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdG9wID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3RvcCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3JpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3JpZ2h0Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJveE1vZGVsRWxlbWVudC5wcm90b3R5cGUsIFwiYm90dG9tXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib3R0b207XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9ib3R0b20gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnYm90dG9tJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJveE1vZGVsRWxlbWVudC5wcm90b3R5cGUsIFwibGVmdFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnbGVmdCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBCb3hNb2RlbEVsZW1lbnQ7XG4gICAgfShFbWl0dGFibGUpKTtcbiAgICBjb3JlLkJveE1vZGVsRWxlbWVudCA9IEJveE1vZGVsRWxlbWVudDtcbiAgICB2YXIgRm9udFN0eWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRm9udFN0eWxlKHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlVHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgRm9udFN0eWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9udFN0eWxlLm5vcm1hbCA9IG5ldyBGb250U3R5bGUoJ25vcm1hbCcpO1xuICAgICAgICBGb250U3R5bGUuaXRhbGljID0gbmV3IEZvbnRTdHlsZSgnaXRhbGljJyk7XG4gICAgICAgIHJldHVybiBGb250U3R5bGU7XG4gICAgfSgpKTtcbiAgICBjb3JlLkZvbnRTdHlsZSA9IEZvbnRTdHlsZTtcbiAgICB2YXIgRm9udCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhGb250LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBGb250KGZhbWlseSwgc2l6ZSwgd2VpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoZmFtaWx5ID09PSB2b2lkIDApIHsgZmFtaWx5ID0gJ3NhbnMtc2VyaWYnOyB9XG4gICAgICAgICAgICBpZiAoc2l6ZSA9PT0gdm9pZCAwKSB7IHNpemUgPSAxMDsgfVxuICAgICAgICAgICAgaWYgKHdlaWdodCA9PT0gdm9pZCAwKSB7IHdlaWdodCA9IDQwMDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZmFtaWx5ID0gZmFtaWx5O1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IEZvbnRTdHlsZS5ub3JtYWw7XG4gICAgICAgIH1cbiAgICAgICAgRm9udC5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVtaXR0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCFpc3NldCh0aGlzLl9oZWlnaHQpIHx8IHR5cGVvZiB0aGlzLl9oZWlnaHQgPT0gJ3VuZGVmaW5lZCcpID8gKHRoaXMuX3NpemUgKiAxLjIpIHwgMCA6IHRoaXMuX2hlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdoZWlnaHQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwid2VpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnd2VpZ2h0Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInN0eWxlXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzdHlsZScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJmYW1pbHlcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmFtaWx5ID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnZmFtaWx5Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzaXplJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgRm9udC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuc3R5bGUudG9TdHJpbmcoKSwgdGhpcy53ZWlnaHQsIHRoaXMuc2l6ZSArICdweC8nICsgdGhpcy5oZWlnaHQgKyAncHgnLCB0aGlzLmZhbWlseV0uam9pbignICcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRm9udDtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuRm9udCA9IEZvbnQ7XG4gICAgdmFyIENvbnBvbmVudE1hcHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIENvbnBvbmVudE1hcHBlcihvd25lcikge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXAgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2d1aWRNYXAgPSB7fTtcbiAgICAgICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXAuc3BsaWNlKDAsIHRoaXMuX2xvY2F0aW9uTWFwLmxlbmd0aCAtIDEpO1xuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPD0gdGhpcy5vd25lci5jYW52YXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDE7IHkgPD0gdGhpcy5vd25lci5jYW52YXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuX21hcEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGd1aWQgPSBlbGVtZW50LmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB2YXIgY29vcmRzID0gZWxlbWVudC5wb2ludHMoKTtcbiAgICAgICAgICAgIHZhciB4MSA9IGNvb3Jkc1swXS54LCB4MiA9IGNvb3Jkc1sxXS54LCB5MSA9IGNvb3Jkc1sxXS55LCB5MiA9IGNvb3Jkc1syXS55O1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IHkxICsgMDsgeSA8PSB5MjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHgxICsgMDsgeCA8PSB4MjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbG9jYXRpb25NYXBbeF0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0ucHVzaChndWlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuX3JlZ2lzdGVySWQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZ3VpZE1hcFtlbGVtZW50LmlkLnRvU3RyaW5nKCldID0gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChlaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ndWlkTWFwW2VpZF07XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2V0TG9jYXRlZElkID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fbG9jYXRpb25NYXBbcG9pbnQueF1bcG9pbnQueV07XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3RhcmdldC5sZW5ndGggLSAxXTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcklkKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5fbWFwRWxlbWVudChpdGVtKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbnBvbmVudE1hcHBlcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuQ29ucG9uZW50TWFwcGVyID0gQ29ucG9uZW50TWFwcGVyO1xuICAgIHZhciBGb3JtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEZvcm0sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEZvcm0oaGFuZGxlciwgYm9vdHN0cmFwKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGhhbmRsZXI7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgaWYgKGJvb3RzdHJhcClcbiAgICAgICAgICAgICAgICBib290c3RyYXAuY2FsbChzZWxmLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IGNvcmUuQ29sbGVjdGlvbihudWxsLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMub24oJ2VsZW1lbnRJbnNlcnRlZCcsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2RyYXdTdGFydCcsIG5ldyBVSUV2ZW50KHRoaXMsIHt9KSk7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgY29yZS5Db25wb25lbnRNYXBwZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IFBvaW50KGV2ZW50LmxheWVyWCwgZXZlbnQubGF5ZXJZKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gc2VsZi5fbWFwLmdldExvY2F0ZWRJZChwKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gKGNvcmUuaXNzZXQodGFyZ2V0KSAmJiB0YXJnZXQubGVuZ3RoID4gMCkgPyBzZWxmLl9tYXAuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSA6IHNlbGY7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5fZW1pdCgnY2xpY2snLCBuZXcgVUlNb3VzZUV2ZW50KHRhcmdldCwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vbigncmVkcmF3JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcIm1hcHBlclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIEZvcm0ucHJvdG90eXBlLnJlZHJhd0NvbnRleHQgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5nZW5lcmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncmVkcmF3JywgbmV3IFVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmb3JjZSB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIEZvcm0ucHJvdG90eXBlLnJlZ2lzdGVyRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1hcHBlci5yZWdpc3RlcihlbGVtZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9ybS5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXAuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB9O1xuICAgICAgICBGb3JtLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5fbWFwLmdlbmVyYXRlKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEZvcm07XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLkZvcm0gPSBGb3JtO1xuICAgIHZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKENvbGxlY3Rpb24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIENvbGxlY3Rpb24oaGFuZGxlciwgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLl9kZWZhdWx0Rm9ybSA9IGFwcEluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLl9faW5qZWN0KHRoaXMuY29sbGVjdGlvbkhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnZWxlbWVudEluc2VydGVkJywgbmV3IENvbGxlY3Rpb25FdmVudCh0aGlzLCBpdGVtKSk7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdlbGVtZW50UmVtb3ZlJywgbmV3IENvbGxlY3Rpb25FdmVudCh0aGlzLCB0aGlzLml0ZW1zW2ldKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaC5jYWxsKHRoaXMuaXRlbXMsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbGxlY3Rpb247XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuICAgIHZhciBQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQb2ludDtcbiAgICB9KCkpO1xuICAgIGNvcmUuUG9pbnQgPSBQb2ludDtcbiAgICB2YXIgVGV4dEFsaWduID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gVGV4dEFsaWduKCkge1xuICAgICAgICB9XG4gICAgICAgIFRleHRBbGlnbi5zdGFydCA9ICdzdGFydCc7XG4gICAgICAgIFRleHRBbGlnbi5lbmQgPSAnZW5kJztcbiAgICAgICAgVGV4dEFsaWduLmxlZnQgPSAnbGVmdCc7XG4gICAgICAgIFRleHRBbGlnbi5jZW50ZXIgPSAnY2VudGVyJztcbiAgICAgICAgVGV4dEFsaWduLnJpZ2h0ID0gJ3JpZ2h0JztcbiAgICAgICAgcmV0dXJuIFRleHRBbGlnbjtcbiAgICB9KCkpO1xuICAgIGNvcmUuVGV4dEFsaWduID0gVGV4dEFsaWduO1xuICAgIHZhciBVSUNvbnRyb2wgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlDb250cm9sLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBVSUNvbnRyb2wob3duZXIpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gMTI4O1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSAxMjg7XG4gICAgICAgICAgICB0aGlzLl9pbmplY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgICAgICAgICAgdGhpcy5fZm9yZUNvbG9yID0gJyMwMDAnO1xuICAgICAgICAgICAgdGhpcy5fcGFkZGluZyA9IG5ldyBCb3hNb2RlbEVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuX21hcmdpbiA9IG5ldyBCb3hNb2RlbEVsZW1lbnQoKTtcbiAgICAgICAgICAgIHRoaXMuX2ZvbnQgPSBuZXcgRm9udCgpO1xuICAgICAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBvd25lci5jb250ZXh0O1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18gPSBuZXcgY29yZS5Qb2ludCgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgY29yZS5Db2xsZWN0aW9uKHRoaXMsIG93bmVyKTtcbiAgICAgICAgICAgIGZ1bmN0aW9uIGZuT25VcGRhdGUoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5fb25VcGRhdGUoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBwcm9wRXZlbnQgPSAncHJvcGVydHlDaGFuZ2UnO1xuICAgICAgICAgICAgdGhpcy5vbignbGF5ZXJVcGRhdGUnLCB0aGlzLl9vblVwZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9uKCdwcm9wZXJ0eUNoYW5nZScsIHRoaXMuX29uVXBkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuX2ZvbnQub24ocHJvcEV2ZW50LCBmbk9uVXBkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuX3BhZGRpbmcub24ocHJvcEV2ZW50LCBmbk9uVXBkYXRlKTtcbiAgICAgICAgICAgIHRoaXMuX21hcmdpbi5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImRyYXduXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9kcmF3bjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJwYWRkaW5nXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWRkaW5nO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcIm1hcmdpblwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFyZ2luO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImZvbnRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaWRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0lkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX0dVSUQgPSBuZXcgY29yZS5HVUlEKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0dVSUQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5oYXNJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fR1VJRCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaXNJbmplY3RlZFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0ZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5fb25VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuZHJhd24pXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgdGhpcy5vd25lci5fZW1pdCgncmVkcmF3JywgeyByZWxhdGVkVGFyZ2V0OiB0aGlzIH0pO1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJiYWNrZ3JvdW5kQ29sb3JcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnYmFja2dyb3VuZENvbG9yJywgb2xkLCBuZXdDb2xvcikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImZvcmVDb2xvclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9yZUNvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2ZvcmVDb2xvci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZvcmVDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdmb3JlQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIG51bGwsIG5ld0hlaWdodCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgbnVsbCwgbmV3V2lkdGgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmdldEFic29sdXRlSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmdldEFic29sdXRlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcInRvcFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX18ueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHYgKyAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnkgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0b3AnLCBvbGQsIHYpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXy54O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gdiArIDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18ueCA9IHY7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2xlZnQnLCBvbGQsIHYpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJwb3NpdGlvblwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX187XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gbmV3IFBvaW50KG5ld1Bvc2l0aW9uLngsIG5ld1Bvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9wID0gbmV3UG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQgPSBuZXdQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3Bvc2l0aW9uJywgb2xkLCBuZXdQb3NpdGlvbikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucG9pbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHAxID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSwgcDIgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5nZXRBYnNvbHV0ZVdpZHRoKCksIHRoaXMucG9zaXRpb24ueSksIHAzID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMuZ2V0QWJzb2x1dGVXaWR0aCgpLCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmdldEFic29sdXRlSGVpZ2h0KCkpLCBwNCA9IG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuZ2V0QWJzb2x1dGVIZWlnaHQoKSk7XG4gICAgICAgICAgICByZXR1cm4gW3AxLCBwMiwgcDMsIHA0XTtcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwicGFyZW50XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5oYXNQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKGlzc2V0KHRoaXMucGFyZW50KSAmJiB0aGlzLnBhcmVudCAhPT0gbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW5qZWN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdyZWRyYXcnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9kcmF3Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gX2ZuRHJhd0NoaWxkKGUpIHtcbiAgICAgICAgICAgICAgICBlLnJlZHJhdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3JlbmRlcicsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NoaWxkcmVuKCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdyZW5kZXJlZCcsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5fX2luamVjdCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuX2luamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ZvbnQuZW1pdHRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnaW5qZWN0JywgbmV3IFVJRXZlbnQodGhpcywgeyAncGFyZW50JzogcGFyZW50IH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuaGFzUGFyZW50KCkgPyB0aGlzLnBhcmVudCA6IHRoaXMub3duZXI7XG4gICAgICAgICAgICBwYXJlbnQuY29udHJvbHMucmVtb3ZlKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdkaXNwb3NlJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFVJQ29udHJvbDtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuVUlDb250cm9sID0gVUlDb250cm9sO1xufSkoY29yZSA9IGV4cG9ydHMuY29yZSB8fCAoZXhwb3J0cy5jb3JlID0ge30pKTtcbiIsIndpbmRvdy5rcmF0b3MgPSByZXF1aXJlKCcuL2NvcmUuanMnKS5jb3JlO1xud2luZG93LmtyYXRvcy51aSA9IHJlcXVpcmUoJy4vdWkuanMnKS51aTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgY29yZV8xID0gcmVxdWlyZSgnLi9jb3JlJyk7XG52YXIgdWk7XG4oZnVuY3Rpb24gKHVpKSB7XG4gICAgdmFyIFJlY3RhbmdsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhSZWN0YW5nbGUsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFJlY3RhbmdsZSgpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIFJlY3RhbmdsZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVjdGFuZ2xlO1xuICAgIH0oY29yZV8xLmNvcmUuVUlDb250cm9sKSk7XG4gICAgdWkuUmVjdGFuZ2xlID0gUmVjdGFuZ2xlO1xuICAgIHZhciBMYWJlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhMYWJlbCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gTGFiZWwoKSB7XG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSAnTmV3IExhYmVsJztcbiAgICAgICAgICAgIHRoaXMuX2FsaWduID0gY29yZV8xLmNvcmUuVGV4dEFsaWduLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExhYmVsLnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1N0cikge1xuICAgICAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl90ZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dCA9IG5ld1N0cjtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBjb3JlXzEuY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dCcsIG9sZCwgbmV3U3RyKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExhYmVsLnByb3RvdHlwZSwgXCJ0ZXh0QWxpZ25cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsaWduO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsaWduID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGNvcmVfMS5jb3JlLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0ZXh0QWxpZ24nLCBudWxsLCBuZXdWYWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBMYWJlbC5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSB0aGlzLnRleHRBbGlnbjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucG9zaXRpb24ueCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBMYWJlbDtcbiAgICB9KGNvcmVfMS5jb3JlLlVJQ29udHJvbCkpO1xuICAgIHVpLkxhYmVsID0gTGFiZWw7XG4gICAgdmFyIEJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEJ1dHRvbihvd25lcikge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgb3duZXIpO1xuICAgICAgICAgICAgdGhpcy5mb3JlQ29sb3IgPSAnI2ZmZic7XG4gICAgICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICAgICAgICAgIHRoaXMucGFkZGluZy50b3AgPSA1O1xuICAgICAgICAgICAgdGhpcy5wYWRkaW5nLmJvdHRvbSA9IDU7XG4gICAgICAgICAgICB0aGlzLnBhZGRpbmcubGVmdCA9IDU7XG4gICAgICAgICAgICB0aGlzLnBhZGRpbmcucmlnaHQgPSA1O1xuICAgICAgICAgICAgdGhpcy5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgICAgICB0aGlzLndpZHRoID0gJ2F1dG8nO1xuICAgICAgICB9XG4gICAgICAgIEJ1dHRvbi5wcm90b3R5cGUuX2dldFRleHRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0eHRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoIHwgMDtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgJ3knOiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmZvbnQuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCxcbiAgICAgICAgICAgICAgICAneCc6IHRoaXMucG9zaXRpb24ueCArIHRoaXMucGFkZGluZy5sZWZ0XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBCdXR0b24ucHJvdG90eXBlLmdldEFic29sdXRlSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5mb250LmhlaWdodCArIHRoaXMucGFkZGluZy50b3AgKyB0aGlzLnBhZGRpbmcuYm90dG9tO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCArIHRoaXMucGFkZGluZy5ib3R0b207XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIEJ1dHRvbi5wcm90b3R5cGUuZ2V0QWJzb2x1dGVXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICh0aGlzLndpZHRoID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgICAgICB2YXIgdHh0V2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQodGhpcy50ZXh0KS53aWR0aCB8IDA7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHR4dFdpZHRoICsgdGhpcy5wYWRkaW5nLmxlZnQgKyB0aGlzLnBhZGRpbmcucmlnaHQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgKyB0aGlzLnBhZGRpbmcubGVmdCArIHRoaXMucGFkZGluZy5yaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQnV0dG9uLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHR4dFBvcyA9IHRoaXMuX2dldFRleHRQb3NpdGlvbigpO1xuICAgICAgICAgICAgdmFyIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nLnRvcCArIHRoaXMucGFkZGluZy5ib3R0b207XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuZm9udC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IHRoaXMudGV4dEFsaWduO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZvcmVDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHR4dFBvcy54LCB0eHRQb3MueSwgdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMudGV4dCkud2lkdGgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQnV0dG9uO1xuICAgIH0oTGFiZWwpKTtcbiAgICB1aS5CdXR0b24gPSBCdXR0b247XG59KSh1aSA9IGV4cG9ydHMudWkgfHwgKGV4cG9ydHMudWkgPSB7fSkpO1xuIl19
