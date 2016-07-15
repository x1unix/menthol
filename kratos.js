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
        version.patch = 5;
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
            if (size === void 0) { size = 15; }
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
            this._backgroundColor = '#dedede';
            this._foreColor = '#000';
            this._font = new Font();
            this._drawn = false;
            var self = this;
            this.owner = owner;
            this._context = owner.context;
            this.__position__ = new core.Point(0, 0);
            this.controls = new core.Collection(this, owner);
            this.on('layerUpdate', this._onUpdate);
            this.on('propertyChange', this._onUpdate);
            this._font.on('propertyChange', function onUpdate() {
                self._onUpdate();
            });
        }
        Object.defineProperty(UIControl.prototype, "drawn", {
            get: function () {
                return this._drawn;
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
                this.context.fillStyle = newColor;
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
                var old = newHeight + 0;
                this._height = newHeight;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'width', old, newHeight));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "width", {
            get: function () {
                return this._width;
            },
            set: function (newWidth) {
                var old = this._width + 0;
                this._width = newWidth;
                this._emit('propertyChange', new PropertyChangedEvent(this, 'width', old, newWidth));
            },
            enumerable: true,
            configurable: true
        });
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
            var p1 = new Point(this.position.x, this.position.y), p2 = new Point(this.position.x + this.width, this.position.y), p3 = new Point(this.position.x + this.width, this.position.y + this.height), p4 = new Point(this.position.x, this.position.y + this.height);
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
            this.context.font = this.font.toString();
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
            this.context.font = this.font.toString();
            this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
            this.context.fillText(this.text, this.position.x, this.position.y, this.width);
        };
        return Button;
    }(Label));
    ui.Button = Button;
})(ui = exports.ui || (exports.ui = {}));

},{"./core":1}]},{},[2])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3ckJBO0FBQ0E7QUFDQTs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBjb3JlO1xuKGZ1bmN0aW9uIChjb3JlKSB7XG4gICAgZnVuY3Rpb24gaXNzZXQoZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIGUgIT09ICd1bmRlZmluZWQnO1xuICAgIH1cbiAgICBjb3JlLmlzc2V0ID0gaXNzZXQ7XG4gICAgdmFyIHZlcnNpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiB2ZXJzaW9uKCkge1xuICAgICAgICB9XG4gICAgICAgIHZlcnNpb24udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMubWFqb3IsIHRoaXMubWlub3IsIHRoaXMucGF0Y2hdLmpvaW4oJy4nKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmVyc2lvbi5tYWpvciA9IDA7XG4gICAgICAgIHZlcnNpb24ubWlub3IgPSA1O1xuICAgICAgICB2ZXJzaW9uLnBhdGNoID0gNTtcbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfSgpKTtcbiAgICBjb3JlLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHZhciBHVUlEID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gR1VJRCgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IEdVSUQuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICAgICAgfVxuICAgICAgICBHVUlELmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9O1xuICAgICAgICBHVUlELnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfTtcbiAgICAgICAgR1VJRC5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBHVUlEO1xuICAgIH0oKSk7XG4gICAgY29yZS5HVUlEID0gR1VJRDtcbiAgICB2YXIgRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgXCJhcmdzXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcmdzID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXZlbnQ7XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50ID0gRXZlbnQ7XG4gICAgdmFyIFVJRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVUlFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJRXZlbnQ7XG4gICAgfShFdmVudCkpO1xuICAgIGNvcmUuVUlFdmVudCA9IFVJRXZlbnQ7XG4gICAgdmFyIFVJTW91c2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSU1vdXNlRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJTW91c2VFdmVudCh0YXJnZXQsIHdpbmRvd0NsaWNrRXZlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IHdpbmRvd0NsaWNrRXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmw6IHdpbmRvd0NsaWNrRXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICAgICAgYWx0OiB3aW5kb3dDbGlja0V2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHdpbmRvd0NsaWNrRXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgICAgIG1ldGE6IHdpbmRvd0NsaWNrRXZlbnQubWV0YUtleVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogd2luZG93Q2xpY2tFdmVudC5sYXllclgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHdpbmRvd0NsaWNrRXZlbnQubGF5ZXJZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJTW91c2VFdmVudDtcbiAgICB9KFVJRXZlbnQpKTtcbiAgICBjb3JlLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudDtcbiAgICB2YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoUHJvcGVydHlDaGFuZ2VkRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRhcmdldCwgcHJvcE5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4gICAgfShVSUV2ZW50KSk7XG4gICAgY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50O1xuICAgIHZhciBDb2xsZWN0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbkV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uRXZlbnQodGFyZ2V0LCBpdGVtKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbkV2ZW50O1xuICAgIH0oRXZlbnQpKTtcbiAgICBjb3JlLkNvbGxlY3Rpb25FdmVudCA9IENvbGxlY3Rpb25FdmVudDtcbiAgICB2YXIgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgICAgICAgICAgdGhpcy5fX2UgPSBuZXcgY29yZS5FdmVudEdlbmVyYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7IH07XG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuICAgIHZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24oc291cmNlLCBuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLl9ob29rcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy5fZXZlbnRTb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRBcmdzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLl9ob29rcy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIGhvb2suY2FsbChzZWxmLl9ldmVudFNvdXJjZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmdldExpc3RlbmVyc0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hvb2tzLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuX2hvb2tzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgaG9va0lkID0gdGhpcy5faG9va3MuaW5kZXhPZihldmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgIGlmIChob29rSWQgPiAtMSlcbiAgICAgICAgICAgICAgICB0aGlzLl9ob29rcy5zcGxpY2UoaG9va0lkLCAxKTtcbiAgICAgICAgICAgIHJldHVybiAoaG9va0lkID4gLTEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4gICAgdmFyIEV2ZW50R2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRHZW5lcmF0b3IoZXZlbnRHZW5lcmF0b3IsIGluamVjdCkge1xuICAgICAgICAgICAgaWYgKGluamVjdCA9PT0gdm9pZCAwKSB7IGluamVjdCA9IHRydWU7IH1cbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgICAgICAgICAgdGhpcy5fb3duZXIgPSBldmVudEdlbmVyYXRvcjtcbiAgICAgICAgICAgIGlmIChpbmplY3QpXG4gICAgICAgICAgICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLl9vd25lci5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fb3duZXIub2ZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub2ZmLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy5fb3duZXIuX2VtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXS50cmlnZ2VyRXZlbnQoZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBuZXcgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24odGhpcy5fb3duZXIsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXS5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9vd25lcjtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFdmVudEdlbmVyYXRvcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRHZW5lcmF0b3IgPSBFdmVudEdlbmVyYXRvcjtcbiAgICB2YXIgRm9udFN0eWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRm9udFN0eWxlKHR5cGUpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlVHlwZSA9IHR5cGU7XG4gICAgICAgIH1cbiAgICAgICAgRm9udFN0eWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVR5cGUudG9TdHJpbmcoKTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9udFN0eWxlLm5vcm1hbCA9IG5ldyBGb250U3R5bGUoJ25vcm1hbCcpO1xuICAgICAgICBGb250U3R5bGUuaXRhbGljID0gbmV3IEZvbnRTdHlsZSgnaXRhbGljJyk7XG4gICAgICAgIHJldHVybiBGb250U3R5bGU7XG4gICAgfSgpKTtcbiAgICBjb3JlLkZvbnRTdHlsZSA9IEZvbnRTdHlsZTtcbiAgICB2YXIgRm9udCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhGb250LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBGb250KGZhbWlseSwgc2l6ZSwgd2VpZ2h0KSB7XG4gICAgICAgICAgICBpZiAoZmFtaWx5ID09PSB2b2lkIDApIHsgZmFtaWx5ID0gJ3NhbnMtc2VyaWYnOyB9XG4gICAgICAgICAgICBpZiAoc2l6ZSA9PT0gdm9pZCAwKSB7IHNpemUgPSAxNTsgfVxuICAgICAgICAgICAgaWYgKHdlaWdodCA9PT0gdm9pZCAwKSB7IHdlaWdodCA9IDQwMDsgfVxuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmVtaXR0YWJsZSA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5fZmFtaWx5ID0gZmFtaWx5O1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IEZvbnRTdHlsZS5ub3JtYWw7XG4gICAgICAgIH1cbiAgICAgICAgRm9udC5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgICAgIGlmICh0aGlzLmVtaXR0YWJsZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gKCFpc3NldCh0aGlzLl9oZWlnaHQpIHx8IHR5cGVvZiB0aGlzLl9oZWlnaHQgPT0gJ3VuZGVmaW5lZCcpID8gKHRoaXMuX3NpemUgKiAxLjIpIHwgMCA6IHRoaXMuX2hlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdoZWlnaHQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwid2VpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnd2VpZ2h0Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInN0eWxlXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzdHlsZScpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJmYW1pbHlcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fZmFtaWx5ID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnZmFtaWx5Jyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzaXplJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgRm9udC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMuc3R5bGUudG9TdHJpbmcoKSwgdGhpcy53ZWlnaHQsIHRoaXMuc2l6ZSArICdweC8nICsgdGhpcy5oZWlnaHQgKyAncHgnLCB0aGlzLmZhbWlseV0uam9pbignICcpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRm9udDtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuRm9udCA9IEZvbnQ7XG4gICAgdmFyIENvbnBvbmVudE1hcHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIENvbnBvbmVudE1hcHBlcihvd25lcikge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXAgPSBbXTtcbiAgICAgICAgICAgIHRoaXMuX2d1aWRNYXAgPSB7fTtcbiAgICAgICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXAuc3BsaWNlKDAsIHRoaXMuX2xvY2F0aW9uTWFwLmxlbmd0aCAtIDEpO1xuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPD0gdGhpcy5vd25lci5jYW52YXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeSA9IDE7IHkgPD0gdGhpcy5vd25lci5jYW52YXMuaGVpZ2h0OyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuX21hcEVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdmFyIGd1aWQgPSBlbGVtZW50LmlkLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB2YXIgY29vcmRzID0gZWxlbWVudC5wb2ludHMoKTtcbiAgICAgICAgICAgIHZhciB4MSA9IGNvb3Jkc1swXS54LCB4MiA9IGNvb3Jkc1sxXS54LCB5MSA9IGNvb3Jkc1sxXS55LCB5MiA9IGNvb3Jkc1syXS55O1xuICAgICAgICAgICAgZm9yICh2YXIgeSA9IHkxICsgMDsgeSA8PSB5MjsgeSsrKSB7XG4gICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IHgxICsgMDsgeCA8PSB4MjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghdGhpcy5fbG9jYXRpb25NYXBbeF0pXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0gPSBbXTtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0ucHVzaChndWlkKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuX3JlZ2lzdGVySWQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgdGhpcy5fZ3VpZE1hcFtlbGVtZW50LmlkLnRvU3RyaW5nKCldID0gZWxlbWVudDtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChlaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ndWlkTWFwW2VpZF07XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2V0TG9jYXRlZElkID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgICAgICB2YXIgdGFyZ2V0ID0gdGhpcy5fbG9jYXRpb25NYXBbcG9pbnQueF1bcG9pbnQueV07XG4gICAgICAgICAgICByZXR1cm4gdGFyZ2V0W3RhcmdldC5sZW5ndGggLSAxXTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB0aGlzLl9yZWdpc3RlcklkKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy5fbWFwRWxlbWVudChpdGVtKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbnBvbmVudE1hcHBlcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuQ29ucG9uZW50TWFwcGVyID0gQ29ucG9uZW50TWFwcGVyO1xuICAgIHZhciBGb3JtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKEZvcm0sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEZvcm0oaGFuZGxlciwgYm9vdHN0cmFwKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudCA9IGhhbmRsZXI7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICAgICAgaWYgKGJvb3RzdHJhcClcbiAgICAgICAgICAgICAgICBib290c3RyYXAuY2FsbChzZWxmLCBoYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IGNvcmUuQ29sbGVjdGlvbihudWxsLCB0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMub24oJ2VsZW1lbnRJbnNlcnRlZCcsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2RyYXdTdGFydCcsIG5ldyBVSUV2ZW50KHRoaXMsIHt9KSk7XG4gICAgICAgICAgICB0aGlzLl9tYXAgPSBuZXcgY29yZS5Db25wb25lbnRNYXBwZXIodGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgICAgIHZhciBwID0gbmV3IFBvaW50KGV2ZW50LmxheWVyWCwgZXZlbnQubGF5ZXJZKTtcbiAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICB2YXIgdGFyZ2V0ID0gc2VsZi5fbWFwLmdldExvY2F0ZWRJZChwKTtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0ID0gKGNvcmUuaXNzZXQodGFyZ2V0KSAmJiB0YXJnZXQubGVuZ3RoID4gMCkgPyBzZWxmLl9tYXAuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSA6IHNlbGY7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldC5fZW1pdCgnY2xpY2snLCBuZXcgVUlNb3VzZUV2ZW50KHRhcmdldCwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy5vbigncmVkcmF3JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICAgICAgZS5yZWRyYXcoKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLndpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcIm1hcHBlclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIEZvcm0ucHJvdG90eXBlLnJlZHJhd0NvbnRleHQgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgICAgIHRoaXMuX21hcC5nZW5lcmF0ZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncmVkcmF3JywgbmV3IFVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmb3JjZSB9KSk7XG4gICAgICAgIH07XG4gICAgICAgIEZvcm0ucHJvdG90eXBlLnJlZ2lzdGVyRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLm1hcHBlci5yZWdpc3RlcihlbGVtZW50KTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9ybS5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoaWQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXAuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICB9O1xuICAgICAgICBGb3JtLnByb3RvdHlwZS5jbGVhciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBGb3JtO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5Gb3JtID0gRm9ybTtcbiAgICB2YXIgQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKGhhbmRsZXIsIGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbkhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZGVmYXVsdEZvcm0gPSBhcHBJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS5fX2luamVjdCh0aGlzLmNvbGxlY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2VsZW1lbnRJbnNlcnRlZCcsIG5ldyBDb2xsZWN0aW9uRXZlbnQodGhpcywgaXRlbSkpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZW1pdCgnZWxlbWVudFJlbW92ZScsIG5ldyBDb2xsZWN0aW9uRXZlbnQodGhpcywgdGhpcy5pdGVtc1tpXSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2guY2FsbCh0aGlzLml0ZW1zLCBjYWxsYmFjayk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb2xsZWN0aW9uO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbjtcbiAgICB2YXIgUG9pbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gICAgICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICAgICAgdGhpcy55ID0geTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUG9pbnQ7XG4gICAgfSgpKTtcbiAgICBjb3JlLlBvaW50ID0gUG9pbnQ7XG4gICAgdmFyIFRleHRBbGlnbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFRleHRBbGlnbigpIHtcbiAgICAgICAgfVxuICAgICAgICBUZXh0QWxpZ24uc3RhcnQgPSAnc3RhcnQnO1xuICAgICAgICBUZXh0QWxpZ24uZW5kID0gJ2VuZCc7XG4gICAgICAgIFRleHRBbGlnbi5sZWZ0ID0gJ2xlZnQnO1xuICAgICAgICBUZXh0QWxpZ24uY2VudGVyID0gJ2NlbnRlcic7XG4gICAgICAgIFRleHRBbGlnbi5yaWdodCA9ICdyaWdodCc7XG4gICAgICAgIHJldHVybiBUZXh0QWxpZ247XG4gICAgfSgpKTtcbiAgICBjb3JlLlRleHRBbGlnbiA9IFRleHRBbGlnbjtcbiAgICB2YXIgVUlDb250cm9sID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFVJQ29udHJvbCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVUlDb250cm9sKG93bmVyKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IDEyODtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gMTI4O1xuICAgICAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9ICcjZGVkZWRlJztcbiAgICAgICAgICAgIHRoaXMuX2ZvcmVDb2xvciA9ICcjMDAwJztcbiAgICAgICAgICAgIHRoaXMuX2ZvbnQgPSBuZXcgRm9udCgpO1xuICAgICAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgICAgIHRoaXMuX2NvbnRleHQgPSBvd25lci5jb250ZXh0O1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18gPSBuZXcgY29yZS5Qb2ludCgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgY29yZS5Db2xsZWN0aW9uKHRoaXMsIG93bmVyKTtcbiAgICAgICAgICAgIHRoaXMub24oJ2xheWVyVXBkYXRlJywgdGhpcy5fb25VcGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5vbigncHJvcGVydHlDaGFuZ2UnLCB0aGlzLl9vblVwZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLl9mb250Lm9uKCdwcm9wZXJ0eUNoYW5nZScsIGZ1bmN0aW9uIG9uVXBkYXRlKCkge1xuICAgICAgICAgICAgICAgIHNlbGYuX29uVXBkYXRlKCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJkcmF3blwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhd247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiZm9udFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJpZFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBpZiAoIXRoaXMuaGFzSWQoKSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fR1VJRCA9IG5ldyBjb3JlLkdVSUQoKTtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fR1VJRDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmhhc0lkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9HVUlEICE9PSAndW5kZWZpbmVkJztcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJpc0luamVjdGVkXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9pbmplY3RlZDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9vblVwZGF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmICghdGhpcy5kcmF3bilcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB0aGlzLm93bmVyLl9lbWl0KCdyZWRyYXcnLCB7IHJlbGF0ZWRUYXJnZXQ6IHRoaXMgfSk7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImJhY2tncm91bmRDb2xvclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2JhY2tncm91bmRDb2xvci50b1N0cmluZygpO1xuICAgICAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdiYWNrZ3JvdW5kQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiZm9yZUNvbG9yXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JlQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5fZm9yZUNvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9yZUNvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdmb3JlQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3SGVpZ2h0KSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IG5ld0hlaWdodCArIDA7XG4gICAgICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIG9sZCwgbmV3SGVpZ2h0KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1dpZHRoKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX3dpZHRoICsgMDtcbiAgICAgICAgICAgICAgICB0aGlzLl93aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIG9sZCwgbmV3V2lkdGgpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJ0b3BcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fLnk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHZhciBvbGQgPSB2ICsgMDtcbiAgICAgICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXy55ID0gdjtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndG9wJywgb2xkLCB2KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwibGVmdFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX18ueDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHYgKyAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnggPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdsZWZ0Jywgb2xkLCB2KSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwicG9zaXRpb25cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IG5ldyBQb2ludChuZXdQb3NpdGlvbi54LCBuZXdQb3NpdGlvbi55KTtcbiAgICAgICAgICAgICAgICB0aGlzLnRvcCA9IG5ld1Bvc2l0aW9uLnk7XG4gICAgICAgICAgICAgICAgdGhpcy5sZWZ0ID0gbmV3UG9zaXRpb24ueDtcbiAgICAgICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXyA9IG5ld1Bvc2l0aW9uO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdwb3NpdGlvbicsIG9sZCwgbmV3UG9zaXRpb24pKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLnBvaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciBwMSA9IG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSksIHAyID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgsIHRoaXMucG9zaXRpb24ueSksIHAzID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMud2lkdGgsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0KSwgcDQgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gW3AxLCBwMiwgcDMsIHA0XTtcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwicGFyZW50XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5oYXNQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKGlzc2V0KHRoaXMucGFyZW50KSAmJiB0aGlzLnBhcmVudCAhPT0gbnVsbCk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmlzSW5qZWN0ZWQpXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdyZWRyYXcnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZhbHNlIH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9kcmF3Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gX2ZuRHJhd0NoaWxkKGUpIHtcbiAgICAgICAgICAgICAgICBlLnJlZHJhdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3JlbmRlcicsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICAgICAgdGhpcy5fZHJhd0NoaWxkcmVuKCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdyZW5kZXJlZCcsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5fX2luamVjdCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuX2luamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuX2ZvbnQuZW1pdHRhYmxlID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnaW5qZWN0JywgbmV3IFVJRXZlbnQodGhpcywgeyAncGFyZW50JzogcGFyZW50IH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuaGFzUGFyZW50KCkgPyB0aGlzLnBhcmVudCA6IHRoaXMub3duZXI7XG4gICAgICAgICAgICBwYXJlbnQuY29udHJvbHMucmVtb3ZlKHRoaXMpO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdkaXNwb3NlJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFVJQ29udHJvbDtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuVUlDb250cm9sID0gVUlDb250cm9sO1xufSkoY29yZSA9IGV4cG9ydHMuY29yZSB8fCAoZXhwb3J0cy5jb3JlID0ge30pKTtcbiIsIndpbmRvdy5rcmF0b3MgPSByZXF1aXJlKCcuL2NvcmUuanMnKS5jb3JlO1xud2luZG93LmtyYXRvcy51aSA9IHJlcXVpcmUoJy4vdWkuanMnKS51aTtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgY29yZV8xID0gcmVxdWlyZSgnLi9jb3JlJyk7XG52YXIgdWk7XG4oZnVuY3Rpb24gKHVpKSB7XG4gICAgdmFyIFJlY3RhbmdsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhSZWN0YW5nbGUsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFJlY3RhbmdsZSgpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIFJlY3RhbmdsZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gUmVjdGFuZ2xlO1xuICAgIH0oY29yZV8xLmNvcmUuVUlDb250cm9sKSk7XG4gICAgdWkuUmVjdGFuZ2xlID0gUmVjdGFuZ2xlO1xuICAgIHZhciBMYWJlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhMYWJlbCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gTGFiZWwoKSB7XG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSAnTmV3IExhYmVsJztcbiAgICAgICAgICAgIHRoaXMuX2FsaWduID0gY29yZV8xLmNvcmUuVGV4dEFsaWduLmxlZnQ7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExhYmVsLnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1N0cikge1xuICAgICAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl90ZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy5fdGV4dCA9IG5ld1N0cjtcbiAgICAgICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBjb3JlXzEuY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dCcsIG9sZCwgbmV3U3RyKSk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExhYmVsLnByb3RvdHlwZSwgXCJ0ZXh0QWxpZ25cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsaWduO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuX2FsaWduID0gbmV3VmFsO1xuICAgICAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGNvcmVfMS5jb3JlLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0ZXh0QWxpZ24nLCBudWxsLCBuZXdWYWwpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBMYWJlbC5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucG9zaXRpb24ueCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBMYWJlbDtcbiAgICB9KGNvcmVfMS5jb3JlLlVJQ29udHJvbCkpO1xuICAgIHVpLkxhYmVsID0gTGFiZWw7XG4gICAgdmFyIEJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEJ1dHRvbigpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIEJ1dHRvbi5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEJ1dHRvbjtcbiAgICB9KExhYmVsKSk7XG4gICAgdWkuQnV0dG9uID0gQnV0dG9uO1xufSkodWkgPSBleHBvcnRzLnVpIHx8IChleHBvcnRzLnVpID0ge30pKTtcbiJdfQ==
