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
