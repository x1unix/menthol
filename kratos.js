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
        EventGenerator.prototype.addEventListener = function (eventName, listener) {
            if (!this.hasListeners(eventName)) {
                this.$listeners[eventName] = new core.EventListenersCollection(this.$owner, eventName);
            }
            this.$listeners[eventName].addEventListener(listener);
            return this.$owner;
        };
        EventGenerator.prototype.removeEventListener = function (eventName, listener) {
            if (!this.hasListeners(eventName))
                return false;
            return this.$listeners[eventName].removeEventListener(listener);
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
    var ConponentMapper = (function () {
        function ConponentMapper(owner) {
            this._locationMap = [];
            this._guidMap = {};
            this.owner = owner;
            this.generate();
        }
        ConponentMapper.prototype.generate = function () {
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
            this.$emit('drawStart', new UIEvent(this, {}));
            this._map = new core.ConponentMapper(this);
            this.canvas.addEventListener('click', function (event) {
                var p = new Point(event.layerX, event.layerY);
                try {
                    var target = self._map.getLocatedId(p);
                    target = (core.isset(target) && target.length > 0) ? self._map.getElementById(target) : self;
                    target.$emit('click', new UIMouseEvent(target, event));
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
            this.$emit('redraw', new UIEvent(this, { 'force': force }));
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
            this.$defaultForm = appInstance;
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
            this.$height = 128;
            this.$width = 128;
            this.$injected = false;
            this.$backgroundColor = '#dedede';
            this.$foreColor = '#000';
            this._drawn = false;
            var self = this;
            this.owner = owner;
            this.$context = owner.context;
            this.__position__ = new core.Point(0, 0);
            this.controls = new core.Collection(this, owner);
            this.on('layerUpdate', this._onUpdate);
            this.on('propertyChange', this._onUpdate);
        }
        Object.defineProperty(UIControl.prototype, "drawn", {
            get: function () {
                return this._drawn;
            },
            enumerable: true,
            configurable: true
        });
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
        UIControl.prototype._onUpdate = function () {
            if (!this.drawn)
                return;
            this.owner.$emit('redraw', { relatedTarget: this });
        };
        Object.defineProperty(UIControl.prototype, "backgroundColor", {
            get: function () {
                return this.$backgroundColor;
            },
            set: function (newColor) {
                var old = this.$backgroundColor.toString();
                this.$backgroundColor = newColor;
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'backgroundColor', old, newColor));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "foreColor", {
            get: function () {
                return this.$foreColor;
            },
            set: function (newColor) {
                var old = this.$foreColor.toString();
                this.$foreColor = newColor;
                this.context.fillStyle = newColor;
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'foreColor', old, newColor));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "height", {
            get: function () {
                return this.$height;
            },
            set: function (newHeight) {
                var old = newHeight + 0;
                this.$height = newHeight;
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'width', old, newHeight));
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "width", {
            get: function () {
                return this.$width;
            },
            set: function (newWidth) {
                var old = this.$width + 0;
                this.$width = newWidth;
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'width', old, newWidth));
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'top', old, v));
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'left', old, v));
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
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'position', old, newPosition));
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
        UIControl.prototype.hasParent = function () {
            return (isset(this.parent) && this.parent !== null);
        };
        UIControl.prototype.redraw = function () {
            if (!this.isInjected)
                return false;
            this.owner.registerElement(this);
            this.$emit('redraw', new UIEvent(this, { 'force': false }));
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
            this.$emit('render', new UIEvent(this, null));
            this._render();
            this._drawChildren();
            this._drawn = true;
            this.$emit('rendered', new UIEvent(this, null));
        };
        UIControl.prototype.$$inject = function (parent) {
            this.$parent = parent;
            this.$injected = true;
            this.owner.registerElement(this);
            this.$emit('inject', new UIEvent(this, { 'parent': parent }));
            this.render();
        };
        UIControl.prototype.remove = function () {
            var parent = this.hasParent() ? this.parent : this.owner;
            parent.controls.remove(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hsQkE7QUFDQTtBQUNBOztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGNvcmU7XG4oZnVuY3Rpb24gKGNvcmUpIHtcbiAgICBmdW5jdGlvbiBpc3NldChlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIGNvcmUuaXNzZXQgPSBpc3NldDtcbiAgICB2YXIgQm94TW9kZWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBCb3hNb2RlbCgpIHtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQm94TW9kZWw7XG4gICAgfSgpKTtcbiAgICBjb3JlLkJveE1vZGVsID0gQm94TW9kZWw7XG4gICAgdmFyIHZlcnNpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiB2ZXJzaW9uKCkge1xuICAgICAgICB9XG4gICAgICAgIHZlcnNpb24udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMubWFqb3IsIHRoaXMubWlub3IsIHRoaXMucGF0Y2hdLmpvaW4oJy4nKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmVyc2lvbi5tYWpvciA9IDA7XG4gICAgICAgIHZlcnNpb24ubWlub3IgPSAwO1xuICAgICAgICB2ZXJzaW9uLnBhdGNoID0gMDtcbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfSgpKTtcbiAgICBjb3JlLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHZhciBHVUlEID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gR1VJRCgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IEdVSUQuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICAgICAgfVxuICAgICAgICBHVUlELmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9O1xuICAgICAgICBHVUlELnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfTtcbiAgICAgICAgR1VJRC5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBHVUlEO1xuICAgIH0oKSk7XG4gICAgY29yZS5HVUlEID0gR1VJRDtcbiAgICB2YXIgRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgXCJhcmdzXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcmdzID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXZlbnQ7XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50ID0gRXZlbnQ7XG4gICAgdmFyIFVJRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVUlFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJRXZlbnQ7XG4gICAgfShFdmVudCkpO1xuICAgIGNvcmUuVUlFdmVudCA9IFVJRXZlbnQ7XG4gICAgdmFyIFVJTW91c2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSU1vdXNlRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJTW91c2VFdmVudCh0YXJnZXQsIHdpbmRvd0NsaWNrRXZlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IHdpbmRvd0NsaWNrRXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmw6IHdpbmRvd0NsaWNrRXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICAgICAgYWx0OiB3aW5kb3dDbGlja0V2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHdpbmRvd0NsaWNrRXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgICAgIG1ldGE6IHdpbmRvd0NsaWNrRXZlbnQubWV0YUtleVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogd2luZG93Q2xpY2tFdmVudC5sYXllclgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHdpbmRvd0NsaWNrRXZlbnQubGF5ZXJZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJTW91c2VFdmVudDtcbiAgICB9KFVJRXZlbnQpKTtcbiAgICBjb3JlLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudDtcbiAgICB2YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoUHJvcGVydHlDaGFuZ2VkRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRhcmdldCwgcHJvcE5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4gICAgfShVSUV2ZW50KSk7XG4gICAgY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50O1xuICAgIHZhciBDb2xsZWN0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbkV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uRXZlbnQodGFyZ2V0LCBpdGVtKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbkV2ZW50O1xuICAgIH0oRXZlbnQpKTtcbiAgICBjb3JlLkNvbGxlY3Rpb25FdmVudCA9IENvbGxlY3Rpb25FdmVudDtcbiAgICB2YXIgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgICAgICAgICAgdGhpcy4kJGUgPSBuZXcgY29yZS5FdmVudEdlbmVyYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7IH07XG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuICAgIHZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24oc291cmNlLCBuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLiRob29rcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRTb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRBcmdzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRob29rcy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIGhvb2suY2FsbChzZWxmLiRldmVudFNvdXJjZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmdldExpc3RlbmVyc0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhvb2tzLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuJGhvb2tzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgaG9va0lkID0gdGhpcy4kaG9va3MuaW5kZXhPZihldmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgIGlmIChob29rSWQgPiAtMSlcbiAgICAgICAgICAgICAgICB0aGlzLiRob29rcy5zcGxpY2UoaG9va0lkLCAxKTtcbiAgICAgICAgICAgIHJldHVybiAoaG9va0lkID4gLTEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4gICAgdmFyIEV2ZW50R2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRHZW5lcmF0b3IoZXZlbnRHZW5lcmF0b3IsIGluamVjdCkge1xuICAgICAgICAgICAgaWYgKGluamVjdCA9PT0gdm9pZCAwKSB7IGluamVjdCA9IHRydWU7IH1cbiAgICAgICAgICAgIHRoaXMuJGxpc3RlbmVycyA9IHt9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIgPSBldmVudEdlbmVyYXRvcjtcbiAgICAgICAgICAgIGlmIChpbmplY3QpXG4gICAgICAgICAgICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRvd25lci5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIub2ZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub2ZmLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIuJGVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS50cmlnZ2VyRXZlbnQoZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBuZXcgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24odGhpcy4kb3duZXIsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvd25lcjtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFdmVudEdlbmVyYXRvcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRHZW5lcmF0b3IgPSBFdmVudEdlbmVyYXRvcjtcbiAgICB2YXIgQ29ucG9uZW50TWFwcGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQ29ucG9uZW50TWFwcGVyKG93bmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZ3VpZE1hcCA9IHt9O1xuICAgICAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2VuZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBmb3IgKHZhciB4ID0gMTsgeCA8PSB0aGlzLm93bmVyLmNhbnZhcy53aWR0aDsgeCsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB5ID0gMTsgeSA8PSB0aGlzLm93bmVyLmNhbnZhcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XVt5XSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5fbWFwRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB2YXIgZ3VpZCA9IGVsZW1lbnQuaWQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHZhciBjb29yZHMgPSBlbGVtZW50LnBvaW50cygpO1xuICAgICAgICAgICAgdmFyIHgxID0gY29vcmRzWzBdLngsIHgyID0gY29vcmRzWzFdLngsIHkxID0gY29vcmRzWzFdLnksIHkyID0gY29vcmRzWzJdLnk7XG4gICAgICAgICAgICBmb3IgKHZhciB5ID0geTEgKyAwOyB5IDw9IHkyOyB5KyspIHtcbiAgICAgICAgICAgICAgICBmb3IgKHZhciB4ID0geDEgKyAwOyB4IDw9IHgyOyB4KyspIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9sb2NhdGlvbk1hcFt4XSlcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdID0gbmV3IEFycmF5KCk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0gPT0gJ3VuZGVmaW5lZCcpXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XVt5XSA9IFtdO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XVt5XS5wdXNoKGd1aWQpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5fcmVnaXN0ZXJJZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICB0aGlzLl9ndWlkTWFwW2VsZW1lbnQuaWQudG9TdHJpbmcoKV0gPSBlbGVtZW50O1xuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gKGVpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2d1aWRNYXBbZWlkXTtcbiAgICAgICAgfTtcbiAgICAgICAgQ29ucG9uZW50TWFwcGVyLnByb3RvdHlwZS5nZXRMb2NhdGVkSWQgPSBmdW5jdGlvbiAocG9pbnQpIHtcbiAgICAgICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl9sb2NhdGlvbk1hcFtwb2ludC54XVtwb2ludC55XTtcbiAgICAgICAgICAgIHJldHVybiB0YXJnZXRbdGFyZ2V0Lmxlbmd0aCAtIDFdO1xuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3JlZ2lzdGVySWQoaXRlbSk7XG4gICAgICAgICAgICB0aGlzLl9tYXBFbGVtZW50KGl0ZW0pO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29ucG9uZW50TWFwcGVyO1xuICAgIH0oKSk7XG4gICAgY29yZS5Db25wb25lbnRNYXBwZXIgPSBDb25wb25lbnRNYXBwZXI7XG4gICAgdmFyIEZvcm0gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoRm9ybSwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gRm9ybShoYW5kbGVyLCBib290c3RyYXApIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50ID0gaGFuZGxlcjtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgICAgICBpZiAoYm9vdHN0cmFwKVxuICAgICAgICAgICAgICAgIGJvb3RzdHJhcC5jYWxsKHNlbGYsIGhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgY29yZS5Db2xsZWN0aW9uKG51bGwsIHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scy5vbignZWxlbWVudEluc2VydGVkJywgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZHJhd1N0YXJ0JywgbmV3IFVJRXZlbnQodGhpcywge30pKTtcbiAgICAgICAgICAgIHRoaXMuX21hcCA9IG5ldyBjb3JlLkNvbnBvbmVudE1hcHBlcih0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgdmFyIHAgPSBuZXcgUG9pbnQoZXZlbnQubGF5ZXJYLCBldmVudC5sYXllclkpO1xuICAgICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzZWxmLl9tYXAuZ2V0TG9jYXRlZElkKHApO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQgPSAoY29yZS5pc3NldCh0YXJnZXQpICYmIHRhcmdldC5sZW5ndGggPiAwKSA/IHNlbGYuX21hcC5nZXRFbGVtZW50QnlJZCh0YXJnZXQpIDogc2VsZjtcbiAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LiRlbWl0KCdjbGljaycsIG5ldyBVSU1vdXNlRXZlbnQodGFyZ2V0LCBldmVudCkpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihleCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLm9uKCdyZWRyYXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgICAgICAgICBlLnJlZHJhdygpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwibWFwcGVyXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXA7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgRm9ybS5wcm90b3R5cGUucmVkcmF3Q29udGV4dCA9IGZ1bmN0aW9uIChmb3JjZSkge1xuICAgICAgICAgICAgdGhpcy5fbWFwLmdlbmVyYXRlKCk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZWRyYXcnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZvcmNlIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9ybS5wcm90b3R5cGUucmVnaXN0ZXJFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubWFwcGVyLnJlZ2lzdGVyKGVsZW1lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBGb3JtLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIH07XG4gICAgICAgIEZvcm0ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmNsZWFyUmVjdCgwLCAwLCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcztcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEZvcm07XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLkZvcm0gPSBGb3JtO1xuICAgIHZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKENvbGxlY3Rpb24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIENvbGxlY3Rpb24oaGFuZGxlciwgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jb2xsZWN0aW9uSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgICAgICB0aGlzLiRkZWZhdWx0Rm9ybSA9IGFwcEluc3RhbmNlO1xuICAgICAgICB9XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICBpdGVtLiQkaW5qZWN0KHRoaXMuY29sbGVjdGlvbkhhbmRsZXIpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZWxlbWVudEluc2VydGVkJywgbmV3IENvbGxlY3Rpb25FdmVudCh0aGlzLCBpdGVtKSk7XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgICB2YXIgaSA9IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdlbGVtZW50UmVtb3ZlJywgbmV3IENvbGxlY3Rpb25FdmVudCh0aGlzLCB0aGlzLml0ZW1zW2ldKSk7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaC5jYWxsKHRoaXMuaXRlbXMsIGNhbGxiYWNrKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIENvbGxlY3Rpb247XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuICAgIHZhciBQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgICAgICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgICAgICB0aGlzLnkgPSB5O1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBQb2ludDtcbiAgICB9KCkpO1xuICAgIGNvcmUuUG9pbnQgPSBQb2ludDtcbiAgICB2YXIgVGV4dEFsaWduID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gVGV4dEFsaWduKCkge1xuICAgICAgICB9XG4gICAgICAgIFRleHRBbGlnbi5zdGFydCA9ICdzdGFydCc7XG4gICAgICAgIFRleHRBbGlnbi5lbmQgPSAnZW5kJztcbiAgICAgICAgVGV4dEFsaWduLmxlZnQgPSAnbGVmdCc7XG4gICAgICAgIFRleHRBbGlnbi5jZW50ZXIgPSAnY2VudGVyJztcbiAgICAgICAgVGV4dEFsaWduLnJpZ2h0ID0gJ3JpZ2h0JztcbiAgICAgICAgcmV0dXJuIFRleHRBbGlnbjtcbiAgICB9KCkpO1xuICAgIGNvcmUuVGV4dEFsaWduID0gVGV4dEFsaWduO1xuICAgIHZhciBVSUNvbnRyb2wgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlDb250cm9sLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBVSUNvbnRyb2wob3duZXIpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kaGVpZ2h0ID0gMTI4O1xuICAgICAgICAgICAgdGhpcy4kd2lkdGggPSAxMjg7XG4gICAgICAgICAgICB0aGlzLiRpbmplY3RlZCA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kYmFja2dyb3VuZENvbG9yID0gJyNkZWRlZGUnO1xuICAgICAgICAgICAgdGhpcy4kZm9yZUNvbG9yID0gJyMwMDAnO1xuICAgICAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgICAgIHRoaXMuJGNvbnRleHQgPSBvd25lci5jb250ZXh0O1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18gPSBuZXcgY29yZS5Qb2ludCgwLCAwKTtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgY29yZS5Db2xsZWN0aW9uKHRoaXMsIG93bmVyKTtcbiAgICAgICAgICAgIHRoaXMub24oJ2xheWVyVXBkYXRlJywgdGhpcy5fb25VcGRhdGUpO1xuICAgICAgICAgICAgdGhpcy5vbigncHJvcGVydHlDaGFuZ2UnLCB0aGlzLl9vblVwZGF0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiZHJhd25cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYXduO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImlkXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIGlmICghdGhpcy5oYXNJZCgpKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLiRHVUlEID0gbmV3IGNvcmUuR1VJRCgpO1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRHVUlEO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuaGFzSWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuJEdVSUQgIT09ICd1bmRlZmluZWQnO1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJjb250ZXh0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRjb250ZXh0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImlzSW5qZWN0ZWRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGluamVjdGVkO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuX29uVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmRyYXduKVxuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIHRoaXMub3duZXIuJGVtaXQoJ3JlZHJhdycsIHsgcmVsYXRlZFRhcmdldDogdGhpcyB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiYmFja2dyb3VuZENvbG9yXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRiYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gdGhpcy4kYmFja2dyb3VuZENvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYmFja2dyb3VuZENvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2JhY2tncm91bmRDb2xvcicsIG9sZCwgbmV3Q29sb3IpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJmb3JlQ29sb3JcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZvcmVDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLiRmb3JlQ29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRmb3JlQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gbmV3Q29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2ZvcmVDb2xvcicsIG9sZCwgbmV3Q29sb3IpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhlaWdodDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdIZWlnaHQpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gbmV3SGVpZ2h0ICsgMDtcbiAgICAgICAgICAgICAgICB0aGlzLiRoZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgb2xkLCBuZXdIZWlnaHQpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kd2lkdGg7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3V2lkdGgpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gdGhpcy4kd2lkdGggKyAwO1xuICAgICAgICAgICAgICAgIHRoaXMuJHdpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgb2xkLCBuZXdXaWR0aCkpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcInRvcFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX18ueTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdmFyIG9sZCA9IHYgKyAwO1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnkgPSB2O1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0b3AnLCBvbGQsIHYpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXy54O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gdiArIDA7XG4gICAgICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18ueCA9IHY7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2xlZnQnLCBvbGQsIHYpKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJwb3NpdGlvblwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX187XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICB2YXIgb2xkID0gbmV3IFBvaW50KG5ld1Bvc2l0aW9uLngsIG5ld1Bvc2l0aW9uLnkpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9wID0gbmV3UG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQgPSBuZXdQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3Bvc2l0aW9uJywgb2xkLCBuZXdQb3NpdGlvbikpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucG9pbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHAxID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSwgcDIgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCwgdGhpcy5wb3NpdGlvbi55KSwgcDMgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy53aWR0aCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpLCBwNCA9IG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHJldHVybiBbcDEsIHAyLCBwMywgcDRdO1xuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJwYXJlbnRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHBhcmVudDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLmhhc1BhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoaXNzZXQodGhpcy5wYXJlbnQpICYmIHRoaXMucGFyZW50ICE9PSBudWxsKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNJbmplY3RlZClcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRWxlbWVudCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3JlZHJhdycsIG5ldyBVSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZmFsc2UgfSkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuX2RyYXdDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiBfZm5EcmF3Q2hpbGQoZSkge1xuICAgICAgICAgICAgICAgIGUucmVkcmF3KCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVuZGVyJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3Q2hpbGRyZW4oKTtcbiAgICAgICAgICAgIHRoaXMuX2RyYXduID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3JlbmRlcmVkJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLiQkaW5qZWN0ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICAgICAgdGhpcy4kcGFyZW50ID0gcGFyZW50O1xuICAgICAgICAgICAgdGhpcy4kaW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdpbmplY3QnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdwYXJlbnQnOiBwYXJlbnQgfSkpO1xuICAgICAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5oYXNQYXJlbnQoKSA/IHRoaXMucGFyZW50IDogdGhpcy5vd25lcjtcbiAgICAgICAgICAgIHBhcmVudC5jb250cm9scy5yZW1vdmUodGhpcyk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2Rpc3Bvc2UnLCBuZXcgVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgICAgICAgICB0aGlzLiRpbmplY3RlZCA9IGZhbHNlO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gVUlDb250cm9sO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5VSUNvbnRyb2wgPSBVSUNvbnRyb2w7XG59KShjb3JlID0gZXhwb3J0cy5jb3JlIHx8IChleHBvcnRzLmNvcmUgPSB7fSkpO1xuIiwid2luZG93LmtyYXRvcyA9IHJlcXVpcmUoJy4vY29yZS5qcycpLmNvcmU7XG53aW5kb3cua3JhdG9zLnVpID0gcmVxdWlyZSgnLi91aS5qcycpLnVpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBjb3JlXzEgPSByZXF1aXJlKCcuL2NvcmUnKTtcbnZhciB1aTtcbihmdW5jdGlvbiAodWkpIHtcbiAgICB2YXIgUmVjdGFuZ2xlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKFJlY3RhbmdsZSwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gUmVjdGFuZ2xlKCkge1xuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIH1cbiAgICAgICAgUmVjdGFuZ2xlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBSZWN0YW5nbGU7XG4gICAgfShjb3JlXzEuY29yZS5VSUNvbnRyb2wpKTtcbiAgICB1aS5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG4gICAgdmFyIExhYmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICAgICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBMYWJlbCgpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICAgICAgdGhpcy4kdGV4dCA9ICdOZXcgTGFiZWwnO1xuICAgICAgICAgICAgdGhpcy4kYWxpZ24gPSBjb3JlXzEuY29yZS5UZXh0QWxpZ24ubGVmdDtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJHRleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3U3RyKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgY29yZV8xLmNvcmUuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHQnLCB0aGlzLiR0ZXh0LCBuZXdTdHIpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiR0ZXh0ID0gbmV3U3RyO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dEFsaWduXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiRhbGlnbjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBjb3JlXzEuY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dEFsaWduJywgdGhpcy4kYWxpZ24sIG5ld1ZhbCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJGFsaWduID0gbmV3VmFsO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIExhYmVsLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnBvc2l0aW9uLngpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gTGFiZWw7XG4gICAgfShjb3JlXzEuY29yZS5VSUNvbnRyb2wpKTtcbiAgICB1aS5MYWJlbCA9IExhYmVsO1xuICAgIHZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBCdXR0b24oKSB7XG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBCdXR0b24ucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoKTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIEJ1dHRvbjtcbiAgICB9KExhYmVsKSk7XG4gICAgdWkuQnV0dG9uID0gQnV0dG9uO1xufSkodWkgPSBleHBvcnRzLnVpIHx8IChleHBvcnRzLnVpID0ge30pKTtcbiJdfQ==
