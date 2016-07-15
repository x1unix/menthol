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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzl4QkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGNvcmU7XG4oZnVuY3Rpb24gKGNvcmUpIHtcbiAgICBmdW5jdGlvbiBpc3NldChlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIGNvcmUuaXNzZXQgPSBpc3NldDtcbiAgICB2YXIgdmVyc2lvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHZlcnNpb24oKSB7XG4gICAgICAgIH1cbiAgICAgICAgdmVyc2lvbi50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBbdGhpcy5tYWpvciwgdGhpcy5taW5vciwgdGhpcy5wYXRjaF0uam9pbignLicpO1xuICAgICAgICB9O1xuICAgICAgICB2ZXJzaW9uLm1ham9yID0gMDtcbiAgICAgICAgdmVyc2lvbi5taW5vciA9IDU7XG4gICAgICAgIHZlcnNpb24ucGF0Y2ggPSA4O1xuICAgICAgICByZXR1cm4gdmVyc2lvbjtcbiAgICB9KCkpO1xuICAgIGNvcmUudmVyc2lvbiA9IHZlcnNpb247XG4gICAgdmFyIEdVSUQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBHVUlEKCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlID0gR1VJRC5nZW5lcmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlOyB9O1xuICAgICAgICB9XG4gICAgICAgIEdVSUQuZ2VuZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmdW5jdGlvbiBzNCgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xuICAgICAgICAgICAgICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgICAgIH07XG4gICAgICAgIEdVSUQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9O1xuICAgICAgICBHVUlELnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEdVSUQ7XG4gICAgfSgpKTtcbiAgICBjb3JlLkdVSUQgPSBHVUlEO1xuICAgIHZhciBFdmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50KHRhcmdldCwgYXJncykge1xuICAgICAgICAgICAgdGhpcy5fYXJncyA9IGFyZ3M7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcImFyZ3NcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FyZ3M7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FyZ3MgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBFdmVudDtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnQgPSBFdmVudDtcbiAgICB2YXIgVUlFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSUV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBVSUV2ZW50KHRhcmdldCwgYXJncykge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVUlFdmVudDtcbiAgICB9KEV2ZW50KSk7XG4gICAgY29yZS5VSUV2ZW50ID0gVUlFdmVudDtcbiAgICB2YXIgVUlNb3VzZUV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFVJTW91c2VFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVUlNb3VzZUV2ZW50KHRhcmdldCwgd2luZG93Q2xpY2tFdmVudCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgdHlwZTogd2luZG93Q2xpY2tFdmVudC50eXBlLFxuICAgICAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAgICAgIGtleXM6IHtcbiAgICAgICAgICAgICAgICAgICAgY3RybDogd2luZG93Q2xpY2tFdmVudC5jdHJsS2V5LFxuICAgICAgICAgICAgICAgICAgICBhbHQ6IHdpbmRvd0NsaWNrRXZlbnQuYWx0S2V5LFxuICAgICAgICAgICAgICAgICAgICBzaGlmdDogd2luZG93Q2xpY2tFdmVudC5zaGlmdEtleSxcbiAgICAgICAgICAgICAgICAgICAgbWV0YTogd2luZG93Q2xpY2tFdmVudC5tZXRhS2V5XG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgICAgICB4OiB3aW5kb3dDbGlja0V2ZW50LmxheWVyWCxcbiAgICAgICAgICAgICAgICAgICAgeTogd2luZG93Q2xpY2tFdmVudC5sYXllcllcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gVUlNb3VzZUV2ZW50O1xuICAgIH0oVUlFdmVudCkpO1xuICAgIGNvcmUuVUlNb3VzZUV2ZW50ID0gVUlNb3VzZUV2ZW50O1xuICAgIHZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eUNoYW5nZWRFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gUHJvcGVydHlDaGFuZ2VkRXZlbnQodGFyZ2V0LCBwcm9wTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BOYW1lLFxuICAgICAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQcm9wZXJ0eUNoYW5nZWRFdmVudDtcbiAgICB9KFVJRXZlbnQpKTtcbiAgICBjb3JlLlByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4gICAgdmFyIENvbGxlY3Rpb25FdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIENvbGxlY3Rpb25FdmVudCh0YXJnZXQsIGl0ZW0pIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBDb2xsZWN0aW9uRXZlbnQ7XG4gICAgfShFdmVudCkpO1xuICAgIGNvcmUuQ29sbGVjdGlvbkV2ZW50ID0gQ29sbGVjdGlvbkV2ZW50O1xuICAgIHZhciBFdmVudEVtaXR0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgICAgICAgICB0aGlzLl9fZSA9IG5ldyBjb3JlLkV2ZW50R2VuZXJhdG9yKHRoaXMpO1xuICAgICAgICB9XG4gICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7IH07XG4gICAgICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2VtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHsgfTtcbiAgICAgICAgO1xuICAgICAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4gICAgdmFyIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbihzb3VyY2UsIG5hbWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvb2tzID0gW107XG4gICAgICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IG5hbWU7XG4gICAgICAgICAgICB0aGlzLl9ldmVudFNvdXJjZSA9IHNvdXJjZTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLnRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIChldmVudEFyZ3MpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX2hvb2tzLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGhvb2sgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICAgICAgaG9vay5jYWxsKHNlbGYuX2V2ZW50U291cmNlLCBldmVudEFyZ3MpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0TGlzdGVuZXJzQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faG9va3MubGVuZ3RoO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICAgICAgdGhpcy5faG9va3MucHVzaChldmVudExpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHZhciBob29rSWQgPSB0aGlzLl9ob29rcy5pbmRleE9mKGV2ZW50TGlzdGVuZXIpO1xuICAgICAgICAgICAgaWYgKGhvb2tJZCA+IC0xKVxuICAgICAgICAgICAgICAgIHRoaXMuX2hvb2tzLnNwbGljZShob29rSWQsIDEpO1xuICAgICAgICAgICAgcmV0dXJuIChob29rSWQgPiAtMSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbiA9IEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbjtcbiAgICB2YXIgRXZlbnRHZW5lcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudEdlbmVyYXRvcihldmVudEdlbmVyYXRvciwgaW5qZWN0KSB7XG4gICAgICAgICAgICBpZiAoaW5qZWN0ID09PSB2b2lkIDApIHsgaW5qZWN0ID0gdHJ1ZTsgfVxuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgICAgICAgICB0aGlzLl9vd25lciA9IGV2ZW50R2VuZXJhdG9yO1xuICAgICAgICAgICAgaWYgKGluamVjdClcbiAgICAgICAgICAgICAgICB0aGlzLmluamVjdCgpO1xuICAgICAgICB9XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuX293bmVyLm9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub24uYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9vd25lci5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5vZmYuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB0aGlzLl9vd25lci5fZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmVtaXQuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnRyaWdnZXJFdmVudChldmVudEFyZ3MpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSA9IG5ldyBjb3JlLkV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbih0aGlzLl9vd25lciwgZXZlbnROYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX293bmVyO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lcywgbGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZU5hbWUpIHtcbiAgICAgICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoZU5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEV2ZW50R2VuZXJhdG9yO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudEdlbmVyYXRvciA9IEV2ZW50R2VuZXJhdG9yO1xuICAgIHZhciBFbWl0dGFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRW1pdHRhYmxlLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBFbWl0dGFibGUoKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuZW1pdHRhYmxlID0gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgRW1pdHRhYmxlLnByb3RvdHlwZS5fb25DaGFuZ2UgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICAgICAgaWYgKHRoaXMuZW1pdHRhYmxlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgcHJvcCwgbnVsbCwgbnVsbCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRW1pdHRhYmxlO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5FbWl0dGFibGUgPSBFbWl0dGFibGU7XG4gICAgdmFyIEJveE1vZGVsRWxlbWVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhCb3hNb2RlbEVsZW1lbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEJveE1vZGVsRWxlbWVudCh0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQpIHtcbiAgICAgICAgICAgIGlmICh0b3AgPT09IHZvaWQgMCkgeyB0b3AgPSAwOyB9XG4gICAgICAgICAgICBpZiAocmlnaHQgPT09IHZvaWQgMCkgeyByaWdodCA9IDA7IH1cbiAgICAgICAgICAgIGlmIChib3R0b20gPT09IHZvaWQgMCkgeyBib3R0b20gPSAwOyB9XG4gICAgICAgICAgICBpZiAobGVmdCA9PT0gdm9pZCAwKSB7IGxlZnQgPSAwOyB9XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX3RvcCA9IHRvcDtcbiAgICAgICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xuICAgICAgICAgICAgdGhpcy5fcmlnaHQgPSByaWdodDtcbiAgICAgICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJ0b3BcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RvcCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCd0b3AnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9yaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdyaWdodCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYm90dG9tO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYm90dG9tID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2JvdHRvbScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcImxlZnRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sZWZ0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2xlZnQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gQm94TW9kZWxFbGVtZW50O1xuICAgIH0oRW1pdHRhYmxlKSk7XG4gICAgY29yZS5Cb3hNb2RlbEVsZW1lbnQgPSBCb3hNb2RlbEVsZW1lbnQ7XG4gICAgdmFyIEZvbnRTdHlsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIEZvbnRTdHlsZSh0eXBlKSB7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZVR5cGUgPSB0eXBlO1xuICAgICAgICB9XG4gICAgICAgIEZvbnRTdHlsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVUeXBlLnRvU3RyaW5nKCk7XG4gICAgICAgIH07XG4gICAgICAgIEZvbnRTdHlsZS5ub3JtYWwgPSBuZXcgRm9udFN0eWxlKCdub3JtYWwnKTtcbiAgICAgICAgRm9udFN0eWxlLml0YWxpYyA9IG5ldyBGb250U3R5bGUoJ2l0YWxpYycpO1xuICAgICAgICByZXR1cm4gRm9udFN0eWxlO1xuICAgIH0oKSk7XG4gICAgY29yZS5Gb250U3R5bGUgPSBGb250U3R5bGU7XG4gICAgdmFyIEZvbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRm9udCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRm9udChmYW1pbHksIHNpemUsIHdlaWdodCkge1xuICAgICAgICAgICAgaWYgKGZhbWlseSA9PT0gdm9pZCAwKSB7IGZhbWlseSA9ICdzYW5zLXNlcmlmJzsgfVxuICAgICAgICAgICAgaWYgKHNpemUgPT09IHZvaWQgMCkgeyBzaXplID0gMTA7IH1cbiAgICAgICAgICAgIGlmICh3ZWlnaHQgPT09IHZvaWQgMCkgeyB3ZWlnaHQgPSA0MDA7IH1cbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5lbWl0dGFibGUgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2ZhbWlseSA9IGZhbWlseTtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSBGb250U3R5bGUubm9ybWFsO1xuICAgICAgICB9XG4gICAgICAgIEZvbnQucHJvdG90eXBlLl9vbkNoYW5nZSA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5lbWl0dGFibGUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCBwcm9wLCBudWxsLCBudWxsKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICghaXNzZXQodGhpcy5faGVpZ2h0KSB8fCB0eXBlb2YgdGhpcy5faGVpZ2h0ID09ICd1bmRlZmluZWQnKSA/ICh0aGlzLl9zaXplICogMS4yKSB8IDAgOiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnaGVpZ2h0Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcIndlaWdodFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd2VpZ2h0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3dlaWdodCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJzdHlsZVwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnc3R5bGUnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwiZmFtaWx5XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mYW1pbHk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX2ZhbWlseSA9IHY7XG4gICAgICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2ZhbWlseScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9zaXplID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnc2l6ZScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIEZvbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIFt0aGlzLnN0eWxlLnRvU3RyaW5nKCksIHRoaXMud2VpZ2h0LCB0aGlzLnNpemUgKyAncHgvJyArIHRoaXMuaGVpZ2h0ICsgJ3B4JywgdGhpcy5mYW1pbHldLmpvaW4oJyAnKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEZvbnQ7XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLkZvbnQgPSBGb250O1xuICAgIHZhciBDb25wb25lbnRNYXBwZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBDb25wb25lbnRNYXBwZXIob3duZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwID0gW107XG4gICAgICAgICAgICB0aGlzLl9ndWlkTWFwID0ge307XG4gICAgICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwLnNwbGljZSgwLCB0aGlzLl9sb2NhdGlvbk1hcC5sZW5ndGggLSAxKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgIGZvciAodmFyIHggPSAxOyB4IDw9IHRoaXMub3duZXIuY2FudmFzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAxOyB5IDw9IHRoaXMub3duZXIuY2FudmFzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLl9tYXBFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBndWlkID0gZWxlbWVudC5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgdmFyIGNvb3JkcyA9IGVsZW1lbnQucG9pbnRzKCk7XG4gICAgICAgICAgICB2YXIgeDEgPSBjb29yZHNbMF0ueCwgeDIgPSBjb29yZHNbMV0ueCwgeTEgPSBjb29yZHNbMV0ueSwgeTIgPSBjb29yZHNbMl0ueTtcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSB5MSArIDA7IHkgPD0geTI7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB4MSArIDA7IHggPD0geDI7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2xvY2F0aW9uTWFwW3hdKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9sb2NhdGlvbk1hcFt4XVt5XSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldLnB1c2goZ3VpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLl9yZWdpc3RlcklkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2d1aWRNYXBbZWxlbWVudC5pZC50b1N0cmluZygpXSA9IGVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoZWlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3VpZE1hcFtlaWRdO1xuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLmdldExvY2F0ZWRJZCA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuX2xvY2F0aW9uTWFwW3BvaW50LnhdW3BvaW50LnldO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFt0YXJnZXQubGVuZ3RoIC0gMV07XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEVsZW1lbnQoaXRlbSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb25wb25lbnRNYXBwZXI7XG4gICAgfSgpKTtcbiAgICBjb3JlLkNvbnBvbmVudE1hcHBlciA9IENvbnBvbmVudE1hcHBlcjtcbiAgICB2YXIgRm9ybSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhGb3JtLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBGb3JtKGhhbmRsZXIsIGJvb3RzdHJhcCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBoYW5kbGVyO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGlmIChib290c3RyYXApXG4gICAgICAgICAgICAgICAgYm9vdHN0cmFwLmNhbGwoc2VsZiwgaGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBjb3JlLkNvbGxlY3Rpb24obnVsbCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLm9uKCdlbGVtZW50SW5zZXJ0ZWQnLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdkcmF3U3RhcnQnLCBuZXcgVUlFdmVudCh0aGlzLCB7fSkpO1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IGNvcmUuQ29ucG9uZW50TWFwcGVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBQb2ludChldmVudC5sYXllclgsIGV2ZW50LmxheWVyWSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHNlbGYuX21hcC5nZXRMb2NhdGVkSWQocCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IChjb3JlLmlzc2V0KHRhcmdldCkgJiYgdGFyZ2V0Lmxlbmd0aCA+IDApID8gc2VsZi5fbWFwLmdldEVsZW1lbnRCeUlkKHRhcmdldCkgOiBzZWxmO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuX2VtaXQoJ2NsaWNrJywgbmV3IFVJTW91c2VFdmVudCh0YXJnZXQsIGV2ZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMub24oJ3JlZHJhdycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgICAgIGUucmVkcmF3KCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJjb250ZXh0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJtYXBwZXJcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBGb3JtLnByb3RvdHlwZS5yZWRyYXdDb250ZXh0ID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgICAgICAgICB0aGlzLl9tYXAuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3JlZHJhdycsIG5ldyBVSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZm9yY2UgfSkpO1xuICAgICAgICB9O1xuICAgICAgICBGb3JtLnByb3RvdHlwZS5yZWdpc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5tYXBwZXIucmVnaXN0ZXIoZWxlbWVudCk7XG4gICAgICAgIH07XG4gICAgICAgIEZvcm0ucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9ybS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRm9ybTtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuRm9ybSA9IEZvcm07XG4gICAgdmFyIENvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbiwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gQ29sbGVjdGlvbihoYW5kbGVyLCBhcHBJbnN0YW5jZSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNvbGxlY3Rpb25IYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2RlZmF1bHRGb3JtID0gYXBwSW5zdGFuY2U7XG4gICAgICAgIH1cbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIGl0ZW0uX19pbmplY3QodGhpcy5jb2xsZWN0aW9uSGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdlbGVtZW50SW5zZXJ0ZWQnLCBuZXcgQ29sbGVjdGlvbkV2ZW50KHRoaXMsIGl0ZW0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHZhciBpID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2VsZW1lbnRSZW1vdmUnLCBuZXcgQ29sbGVjdGlvbkV2ZW50KHRoaXMsIHRoaXMuaXRlbXNbaV0pKTtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoLmNhbGwodGhpcy5pdGVtcywgY2FsbGJhY2spO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbjtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XG4gICAgdmFyIFBvaW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBvaW50O1xuICAgIH0oKSk7XG4gICAgY29yZS5Qb2ludCA9IFBvaW50O1xuICAgIHZhciBUZXh0QWxpZ24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBUZXh0QWxpZ24oKSB7XG4gICAgICAgIH1cbiAgICAgICAgVGV4dEFsaWduLnN0YXJ0ID0gJ3N0YXJ0JztcbiAgICAgICAgVGV4dEFsaWduLmVuZCA9ICdlbmQnO1xuICAgICAgICBUZXh0QWxpZ24ubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgVGV4dEFsaWduLmNlbnRlciA9ICdjZW50ZXInO1xuICAgICAgICBUZXh0QWxpZ24ucmlnaHQgPSAncmlnaHQnO1xuICAgICAgICByZXR1cm4gVGV4dEFsaWduO1xuICAgIH0oKSk7XG4gICAgY29yZS5UZXh0QWxpZ24gPSBUZXh0QWxpZ247XG4gICAgdmFyIFVJQ29udHJvbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSUNvbnRyb2wsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJQ29udHJvbChvd25lcikge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSAxMjg7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IDEyODtcbiAgICAgICAgICAgIHRoaXMuX2luamVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLDAsMCwwKSc7XG4gICAgICAgICAgICB0aGlzLl9mb3JlQ29sb3IgPSAnIzAwMCc7XG4gICAgICAgICAgICB0aGlzLl9wYWRkaW5nID0gbmV3IEJveE1vZGVsRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5fbWFyZ2luID0gbmV3IEJveE1vZGVsRWxlbWVudCgpO1xuICAgICAgICAgICAgdGhpcy5fZm9udCA9IG5ldyBGb250KCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICAgICAgdGhpcy5fY29udGV4dCA9IG93bmVyLmNvbnRleHQ7XG4gICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXyA9IG5ldyBjb3JlLlBvaW50KDAsIDApO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBjb3JlLkNvbGxlY3Rpb24odGhpcywgb3duZXIpO1xuICAgICAgICAgICAgZnVuY3Rpb24gZm5PblVwZGF0ZSgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLl9vblVwZGF0ZSgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHByb3BFdmVudCA9ICdwcm9wZXJ0eUNoYW5nZSc7XG4gICAgICAgICAgICB0aGlzLm9uKCdsYXllclVwZGF0ZScsIHRoaXMuX29uVXBkYXRlKTtcbiAgICAgICAgICAgIHRoaXMub24oJ3Byb3BlcnR5Q2hhbmdlJywgdGhpcy5fb25VcGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5fZm9udC5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5fcGFkZGluZy5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5fbWFyZ2luLm9uKHByb3BFdmVudCwgZm5PblVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiZHJhd25cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYXduO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcInBhZGRpbmdcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhZGRpbmc7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwibWFyZ2luXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXJnaW47XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiZm9udFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJpZFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzSWQoKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fR1VJRCA9IG5ldyBjb3JlLkdVSUQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fR1VJRDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmhhc0lkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9HVUlEICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJpc0luamVjdGVkXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbmplY3RlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9vblVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kcmF3bilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm93bmVyLl9lbWl0KCdyZWRyYXcnLCB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImJhY2tncm91bmRDb2xvclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2JhY2tncm91bmRDb2xvci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdiYWNrZ3JvdW5kQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiZm9yZUNvbG9yXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JlQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5fZm9yZUNvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9yZUNvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2ZvcmVDb2xvcicsIG9sZCwgbmV3Q29sb3IpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgbnVsbCwgbmV3SGVpZ2h0KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBuZXdXaWR0aDtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnd2lkdGgnLCBudWxsLCBuZXdXaWR0aCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuZ2V0QWJzb2x1dGVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuZ2V0QWJzb2x1dGVXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwidG9wXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXy55O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gdiArIDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18ueSA9IHY7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RvcCcsIG9sZCwgdikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImxlZnRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fLng7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHZhciBvbGQgPSB2ICsgMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXy54ID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnbGVmdCcsIG9sZCwgdikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcInBvc2l0aW9uXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHZhciBvbGQgPSBuZXcgUG9pbnQobmV3UG9zaXRpb24ueCwgbmV3UG9zaXRpb24ueSk7XG4gICAgICAgICAgICAgICAgdGhpcy50b3AgPSBuZXdQb3NpdGlvbi55O1xuICAgICAgICAgICAgICAgIHRoaXMubGVmdCA9IG5ld1Bvc2l0aW9uLng7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18gPSBuZXdQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAncG9zaXRpb24nLCBvbGQsIG5ld1Bvc2l0aW9uKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5wb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcDEgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpLCBwMiA9IG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5wb3NpdGlvbi55KSwgcDMgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5nZXRBYnNvbHV0ZVdpZHRoKCksIHRoaXMucG9zaXRpb24ueSArIHRoaXMuZ2V0QWJzb2x1dGVIZWlnaHQoKSksIHA0ID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKTtcbiAgICAgICAgICAgIHJldHVybiBbcDEsIHAyLCBwMywgcDRdO1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJwYXJlbnRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmhhc1BhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoaXNzZXQodGhpcy5wYXJlbnQpICYmIHRoaXMucGFyZW50ICE9PSBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbmplY3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRWxlbWVudCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3JlZHJhdycsIG5ldyBVSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZmFsc2UgfSkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuX2RyYXdDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiBfZm5EcmF3Q2hpbGQoZSkge1xuICAgICAgICAgICAgICAgIGUucmVkcmF3KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncmVuZGVyJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXduID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3JlbmRlcmVkJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9faW5qZWN0ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5fZm9udC5lbWl0dGFibGUgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdpbmplY3QnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdwYXJlbnQnOiBwYXJlbnQgfSkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5oYXNQYXJlbnQoKSA/IHRoaXMucGFyZW50IDogdGhpcy5vd25lcjtcbiAgICAgICAgICAgIHBhcmVudC5jb250cm9scy5yZW1vdmUodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2Rpc3Bvc2UnLCBuZXcgVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgICAgICAgICB0aGlzLl9pbmplY3RlZCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gVUlDb250cm9sO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5VSUNvbnRyb2wgPSBVSUNvbnRyb2w7XG59KShjb3JlID0gZXhwb3J0cy5jb3JlIHx8IChleHBvcnRzLmNvcmUgPSB7fSkpO1xuIiwid2luZG93LmtyYXRvcyA9IHJlcXVpcmUoJy4vY29yZS5qcycpLmNvcmU7XG53aW5kb3cua3JhdG9zLnVpID0gcmVxdWlyZSgnLi91aS5qcycpLnVpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBjb3JlXzEgPSByZXF1aXJlKCcuL2NvcmUnKTtcbnZhciB1aTtcbihmdW5jdGlvbiAodWkpIHtcbiAgICB2YXIgUmVjdGFuZ2xlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFJlY3RhbmdsZSwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gUmVjdGFuZ2xlKCkge1xuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgUmVjdGFuZ2xlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSZWN0YW5nbGU7XG4gICAgfShjb3JlXzEuY29yZS5VSUNvbnRyb2wpKTtcbiAgICB1aS5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG4gICAgdmFyIExhYmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBMYWJlbCgpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dCA9ICdOZXcgTGFiZWwnO1xuICAgICAgICAgICAgdGhpcy5fYWxpZ24gPSBjb3JlXzEuY29yZS5UZXh0QWxpZ24ubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3U3RyKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX3RleHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLl90ZXh0ID0gbmV3U3RyO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGNvcmVfMS5jb3JlLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0ZXh0Jywgb2xkLCBuZXdTdHIpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRBbGlnblwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYWxpZ247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fYWxpZ24gPSBuZXdWYWw7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgY29yZV8xLmNvcmUuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHRBbGlnbicsIG51bGwsIG5ld1ZhbCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIExhYmVsLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IHRoaXMudGV4dEFsaWduO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLmZvbnQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5wb3NpdGlvbi54KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIExhYmVsO1xuICAgIH0oY29yZV8xLmNvcmUuVUlDb250cm9sKSk7XG4gICAgdWkuTGFiZWwgPSBMYWJlbDtcbiAgICB2YXIgQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEJ1dHRvbiwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gQnV0dG9uKG93bmVyKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBvd25lcik7XG4gICAgICAgICAgICB0aGlzLmZvcmVDb2xvciA9ICcjZmZmJztcbiAgICAgICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgICAgICAgICAgdGhpcy5wYWRkaW5nLnRvcCA9IDU7XG4gICAgICAgICAgICB0aGlzLnBhZGRpbmcuYm90dG9tID0gNTtcbiAgICAgICAgICAgIHRoaXMucGFkZGluZy5sZWZ0ID0gNTtcbiAgICAgICAgICAgIHRoaXMucGFkZGluZy5yaWdodCA9IDU7XG4gICAgICAgICAgICB0aGlzLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgICAgIHRoaXMud2lkdGggPSAnYXV0byc7XG4gICAgICAgIH1cbiAgICAgICAgQnV0dG9uLnByb3RvdHlwZS5fZ2V0VGV4dFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHR4dFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMudGV4dCkud2lkdGggfCAwO1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgICAneSc6IHRoaXMucG9zaXRpb24ueSArIHRoaXMuZm9udC5oZWlnaHQgKyB0aGlzLnBhZGRpbmcudG9wLFxuICAgICAgICAgICAgICAgICd4JzogdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5wYWRkaW5nLmxlZnRcbiAgICAgICAgICAgIH07XG4gICAgICAgIH07XG4gICAgICAgIEJ1dHRvbi5wcm90b3R5cGUuZ2V0QWJzb2x1dGVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodGhpcy5oZWlnaHQgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmZvbnQuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCArIHRoaXMucGFkZGluZy5ib3R0b207XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgKyB0aGlzLnBhZGRpbmcudG9wICsgdGhpcy5wYWRkaW5nLmJvdHRvbTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQnV0dG9uLnByb3RvdHlwZS5nZXRBYnNvbHV0ZVdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHRoaXMud2lkdGggPT09ICdhdXRvJykge1xuICAgICAgICAgICAgICAgIHZhciB0eHRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoIHwgMDtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHh0V2lkdGggKyB0aGlzLnBhZGRpbmcubGVmdCArIHRoaXMucGFkZGluZy5yaWdodDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodCArIHRoaXMucGFkZGluZy5sZWZ0ICsgdGhpcy5wYWRkaW5nLnJpZ2h0O1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBCdXR0b24ucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgdHh0UG9zID0gdGhpcy5fZ2V0VGV4dFBvc2l0aW9uKCk7XG4gICAgICAgICAgICB2YXIgcGFkZGluZ1kgPSB0aGlzLnBhZGRpbmcudG9wICsgdGhpcy5wYWRkaW5nLmJvdHRvbTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gdGhpcy50ZXh0QWxpZ247XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMuZ2V0QWJzb2x1dGVXaWR0aCgpLCB0aGlzLmdldEFic29sdXRlSGVpZ2h0KCkpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZm9yZUNvbG9yO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdHh0UG9zLngsIHR4dFBvcy55LCB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQodGhpcy50ZXh0KS53aWR0aCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBCdXR0b247XG4gICAgfShMYWJlbCkpO1xuICAgIHVpLkJ1dHRvbiA9IEJ1dHRvbjtcbn0pKHVpID0gZXhwb3J0cy51aSB8fCAoZXhwb3J0cy51aSA9IHt9KSk7XG4iXX0=
