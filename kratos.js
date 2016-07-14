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
            this.$emit('redraw', new UIEvent(this, { 'force': force }));
        };
        Form.prototype.registerElement = function (element) {
            this.mapper.register(element);
        };
        Form.prototype.getElementById = function (id) {
            return this._map.getElementById(id);
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
            console.log('update layer ' + this.id);
            this.remove();
            this.redrawContext(true);
        };
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
        Object.defineProperty(UIControl.prototype, "top", {
            get: function () {
                return this.__position__.y;
            },
            set: function (v) {
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'top', this.__position__.y, v));
                this.__position__.y = v;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "left", {
            get: function () {
                return this.__position__.x;
            },
            set: function (v) {
                this.$emit('propertyChange', new PropertyChangedEvent(this, 'left', this.__position__.x, v));
                this.__position__.x = v;
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
                this.top = newPosition.y;
                this.left = newPosition.x;
                this.__position__ = newPosition;
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
        UIControl.prototype.redrawContext = function (force) {
            if (force === void 0) { force = false; }
            if (!this.isInjected || !force)
                return false;
            if (this.drawn)
                this.remove(false);
            this.$emit('redraw', new UIEvent(this, { 'force': force }));
            this.render();
            if (this.hasParent())
                this.parent.redrawContext(force);
            return true;
        };
        UIControl.prototype._render = function () { };
        UIControl.prototype.render = function () {
            this.$emit('render', new UIEvent(this, null));
            this._render();
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
        UIControl.prototype.remove = function (deleteElement) {
            if (deleteElement === void 0) { deleteElement = false; }
            this.context.clearRect(this.position.x, this.position.y, this.width, this.height);
            if (deleteElement)
                this.owner.controls.remove(this);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJzcmMvY29yZS5qcyIsInNyYy9pbmRleC5qcyIsInNyYy91aS5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcGtCQTtBQUNBO0FBQ0E7O0FDRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGNvcmU7XG4oZnVuY3Rpb24gKGNvcmUpIHtcbiAgICBmdW5jdGlvbiBpc3NldChlKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfVxuICAgIGNvcmUuaXNzZXQgPSBpc3NldDtcbiAgICB2YXIgQm94TW9kZWwgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBCb3hNb2RlbCgpIHtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQm94TW9kZWw7XG4gICAgfSgpKTtcbiAgICBjb3JlLkJveE1vZGVsID0gQm94TW9kZWw7XG4gICAgdmFyIHZlcnNpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiB2ZXJzaW9uKCkge1xuICAgICAgICB9XG4gICAgICAgIHZlcnNpb24udG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gW3RoaXMubWFqb3IsIHRoaXMubWlub3IsIHRoaXMucGF0Y2hdLmpvaW4oJy4nKTtcbiAgICAgICAgfTtcbiAgICAgICAgdmVyc2lvbi5tYWpvciA9IDA7XG4gICAgICAgIHZlcnNpb24ubWlub3IgPSAwO1xuICAgICAgICB2ZXJzaW9uLnBhdGNoID0gMDtcbiAgICAgICAgcmV0dXJuIHZlcnNpb247XG4gICAgfSgpKTtcbiAgICBjb3JlLnZlcnNpb24gPSB2ZXJzaW9uO1xuICAgIHZhciBHVUlEID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gR1VJRCgpIHtcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IEdVSUQuZ2VuZXJhdGUoKTtcbiAgICAgICAgICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICAgICAgfVxuICAgICAgICBHVUlELmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgICAgICB9O1xuICAgICAgICBHVUlELnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfTtcbiAgICAgICAgR1VJRC5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBHVUlEO1xuICAgIH0oKSk7XG4gICAgY29yZS5HVUlEID0gR1VJRDtcbiAgICB2YXIgRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgXCJhcmdzXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9hcmdzID0gdjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gRXZlbnQ7XG4gICAgfSgpKTtcbiAgICBjb3JlLkV2ZW50ID0gRXZlbnQ7XG4gICAgdmFyIFVJRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoVUlFdmVudCwgX3N1cGVyKTtcbiAgICAgICAgZnVuY3Rpb24gVUlFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJRXZlbnQ7XG4gICAgfShFdmVudCkpO1xuICAgIGNvcmUuVUlFdmVudCA9IFVJRXZlbnQ7XG4gICAgdmFyIFVJTW91c2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSU1vdXNlRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJTW91c2VFdmVudCh0YXJnZXQsIHdpbmRvd0NsaWNrRXZlbnQpIHtcbiAgICAgICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgICAgIHR5cGU6IHdpbmRvd0NsaWNrRXZlbnQudHlwZSxcbiAgICAgICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmw6IHdpbmRvd0NsaWNrRXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICAgICAgYWx0OiB3aW5kb3dDbGlja0V2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICAgICAgc2hpZnQ6IHdpbmRvd0NsaWNrRXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgICAgIG1ldGE6IHdpbmRvd0NsaWNrRXZlbnQubWV0YUtleVxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgeDogd2luZG93Q2xpY2tFdmVudC5sYXllclgsXG4gICAgICAgICAgICAgICAgICAgIHk6IHdpbmRvd0NsaWNrRXZlbnQubGF5ZXJZXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFVJTW91c2VFdmVudDtcbiAgICB9KFVJRXZlbnQpKTtcbiAgICBjb3JlLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudDtcbiAgICB2YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoUHJvcGVydHlDaGFuZ2VkRXZlbnQsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRhcmdldCwgcHJvcE5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4gICAgfShVSUV2ZW50KSk7XG4gICAgY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50O1xuICAgIHZhciBDb2xsZWN0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbkV2ZW50LCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uRXZlbnQodGFyZ2V0LCBpdGVtKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbkV2ZW50O1xuICAgIH0oRXZlbnQpKTtcbiAgICBjb3JlLkNvbGxlY3Rpb25FdmVudCA9IENvbGxlY3Rpb25FdmVudDtcbiAgICB2YXIgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgICAgICAgICAgdGhpcy4kJGUgPSBuZXcgY29yZS5FdmVudEdlbmVyYXRvcih0aGlzKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICAgICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgICAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLiRlbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7IH07XG4gICAgICAgIDtcbiAgICAgICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuICAgIHZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24oc291cmNlLCBuYW1lKSB7XG4gICAgICAgICAgICB0aGlzLiRob29rcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lO1xuICAgICAgICAgICAgdGhpcy4kZXZlbnRTb3VyY2UgPSBzb3VyY2U7XG4gICAgICAgIH1cbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRBcmdzKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRob29rcy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgICAgIGhvb2suY2FsbChzZWxmLiRldmVudFNvdXJjZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuICAgICAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmdldExpc3RlbmVyc0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGhvb2tzLmxlbmd0aDtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgICAgIHRoaXMuJGhvb2tzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudExpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgaG9va0lkID0gdGhpcy4kaG9va3MuaW5kZXhPZihldmVudExpc3RlbmVyKTtcbiAgICAgICAgICAgIGlmIChob29rSWQgPiAtMSlcbiAgICAgICAgICAgICAgICB0aGlzLiRob29rcy5zcGxpY2UoaG9va0lkLCAxKTtcbiAgICAgICAgICAgIHJldHVybiAoaG9va0lkID4gLTEpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xuICAgIH0oKSk7XG4gICAgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4gICAgdmFyIEV2ZW50R2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gRXZlbnRHZW5lcmF0b3IoZXZlbnRHZW5lcmF0b3IsIGluamVjdCkge1xuICAgICAgICAgICAgaWYgKGluamVjdCA9PT0gdm9pZCAwKSB7IGluamVjdCA9IHRydWU7IH1cbiAgICAgICAgICAgIHRoaXMuJGxpc3RlbmVycyA9IHt9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIgPSBldmVudEdlbmVyYXRvcjtcbiAgICAgICAgICAgIGlmIChpbmplY3QpXG4gICAgICAgICAgICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICAgICAgfVxuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH07XG4gICAgICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLiRvd25lci5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICBzZWxmLm9uLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIub2ZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHNlbGYub2ZmLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgdGhpcy4kb3duZXIuJGVtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5lbWl0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICB9O1xuICAgICAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS50cmlnZ2VyRXZlbnQoZXZlbnRBcmdzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBuZXcgY29yZS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24odGhpcy4kb3duZXIsIGV2ZW50TmFtZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRvd25lcjtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLiRsaXN0ZW5lcnNbZXZlbnROYW1lXS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGVOYW1lKSB7XG4gICAgICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBFdmVudEdlbmVyYXRvcjtcbiAgICB9KCkpO1xuICAgIGNvcmUuRXZlbnRHZW5lcmF0b3IgPSBFdmVudEdlbmVyYXRvcjtcbiAgICB2YXIgQ29ucG9uZW50TWFwcGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gQ29ucG9uZW50TWFwcGVyKG93bmVyKSB7XG4gICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcCA9IFtdO1xuICAgICAgICAgICAgdGhpcy5fZ3VpZE1hcCA9IHt9O1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPD0gb3duZXIuY2FudmFzLndpZHRoOyB4KyspIHtcbiAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAxOyB5IDw9IG93bmVyLmNhbnZhcy5oZWlnaHQ7IHkrKykge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XVt5XSA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLl9yZWZyZXNoTWFwID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLl9tYXBFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHZhciBndWlkID0gZWxlbWVudC5pZC50b1N0cmluZygpO1xuICAgICAgICAgICAgdmFyIGNvb3JkcyA9IGVsZW1lbnQucG9pbnRzKCk7XG4gICAgICAgICAgICB2YXIgeDEgPSBjb29yZHNbMF0ueCwgeDIgPSBjb29yZHNbMV0ueCwgeTEgPSBjb29yZHNbMV0ueSwgeTIgPSBjb29yZHNbMl0ueTtcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSB5MSArIDA7IHkgPD0geTI7IHkrKykge1xuICAgICAgICAgICAgICAgIGZvciAodmFyIHggPSB4MSArIDA7IHggPD0geDI7IHgrKykge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIXRoaXMuX2xvY2F0aW9uTWFwW3hdKVxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0aGlzLl9sb2NhdGlvbk1hcFt4XVt5XSA9PSAndW5kZWZpbmVkJylcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldID0gW107XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldLnB1c2goZ3VpZCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLl9yZWdpc3RlcklkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMuX2d1aWRNYXBbZWxlbWVudC5pZC50b1N0cmluZygpXSA9IGVsZW1lbnQ7XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoZWlkKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZ3VpZE1hcFtlaWRdO1xuICAgICAgICB9O1xuICAgICAgICBDb25wb25lbnRNYXBwZXIucHJvdG90eXBlLmdldExvY2F0ZWRJZCA9IGZ1bmN0aW9uIChwb2ludCkge1xuICAgICAgICAgICAgdmFyIHRhcmdldCA9IHRoaXMuX2xvY2F0aW9uTWFwW3BvaW50LnhdW3BvaW50LnldO1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldFt0YXJnZXQubGVuZ3RoIC0gMV07XG4gICAgICAgIH07XG4gICAgICAgIENvbnBvbmVudE1hcHBlci5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuX21hcEVsZW1lbnQoaXRlbSk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBDb25wb25lbnRNYXBwZXI7XG4gICAgfSgpKTtcbiAgICBjb3JlLkNvbnBvbmVudE1hcHBlciA9IENvbnBvbmVudE1hcHBlcjtcbiAgICB2YXIgRm9ybSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhGb3JtLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBGb3JtKGhhbmRsZXIsIGJvb3RzdHJhcCkge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQgPSBoYW5kbGVyO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgICAgIGlmIChib290c3RyYXApXG4gICAgICAgICAgICAgICAgYm9vdHN0cmFwLmNhbGwoc2VsZiwgaGFuZGxlcik7XG4gICAgICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBjb3JlLkNvbGxlY3Rpb24obnVsbCwgdGhpcyk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLm9uKCdlbGVtZW50SW5zZXJ0ZWQnLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdkcmF3U3RhcnQnLCBuZXcgVUlFdmVudCh0aGlzLCB7fSkpO1xuICAgICAgICAgICAgdGhpcy5fbWFwID0gbmV3IGNvcmUuQ29ucG9uZW50TWFwcGVyKHRoaXMpO1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICB2YXIgcCA9IG5ldyBQb2ludChldmVudC5sYXllclgsIGV2ZW50LmxheWVyWSk7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRhcmdldCA9IHNlbGYuX21hcC5nZXRMb2NhdGVkSWQocCk7XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldCA9IChjb3JlLmlzc2V0KHRhcmdldCkgJiYgdGFyZ2V0Lmxlbmd0aCA+IDApID8gc2VsZi5fbWFwLmdldEVsZW1lbnRCeUlkKHRhcmdldCkgOiBzZWxmO1xuICAgICAgICAgICAgICAgICAgICB0YXJnZXQuJGVtaXQoJ2NsaWNrJywgbmV3IFVJTW91c2VFdmVudCh0YXJnZXQsIGV2ZW50KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKGV4KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5oZWlnaHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IHY7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJjb250ZXh0XCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJtYXBwZXJcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBGb3JtLnByb3RvdHlwZS5yZWRyYXdDb250ZXh0ID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZWRyYXcnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZvcmNlIH0pKTtcbiAgICAgICAgfTtcbiAgICAgICAgRm9ybS5wcm90b3R5cGUucmVnaXN0ZXJFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIHRoaXMubWFwcGVyLnJlZ2lzdGVyKGVsZW1lbnQpO1xuICAgICAgICB9O1xuICAgICAgICBGb3JtLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcC5nZXRFbGVtZW50QnlJZChpZCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBGb3JtO1xuICAgIH0oRXZlbnRFbWl0dGVyKSk7XG4gICAgY29yZS5Gb3JtID0gRm9ybTtcbiAgICB2YXIgQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKGhhbmRsZXIsIGFwcEluc3RhbmNlKSB7XG4gICAgICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgICAgIHRoaXMuY29sbGVjdGlvbkhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICAgICAgdGhpcy4kZGVmYXVsdEZvcm0gPSBhcHBJbnN0YW5jZTtcbiAgICAgICAgfVxuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgaXRlbS4kJGluamVjdCh0aGlzLmNvbGxlY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgICAgIHRoaXMuJGVtaXQoJ2VsZW1lbnRJbnNlcnRlZCcsIG5ldyBDb2xsZWN0aW9uRXZlbnQodGhpcywgaXRlbSkpO1xuICAgICAgICB9O1xuICAgICAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgICAgdmFyIGkgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5kaXNwb3NlKCk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgnZWxlbWVudFJlbW92ZScsIG5ldyBDb2xsZWN0aW9uRXZlbnQodGhpcywgdGhpcy5pdGVtc1tpXSkpO1xuICAgICAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQ29sbGVjdGlvbjtcbiAgICB9KEV2ZW50RW1pdHRlcikpO1xuICAgIGNvcmUuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XG4gICAgdmFyIFBvaW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgICAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgICAgIHRoaXMueSA9IHk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIFBvaW50O1xuICAgIH0oKSk7XG4gICAgY29yZS5Qb2ludCA9IFBvaW50O1xuICAgIHZhciBUZXh0QWxpZ24gPSAoZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBUZXh0QWxpZ24oKSB7XG4gICAgICAgIH1cbiAgICAgICAgVGV4dEFsaWduLnN0YXJ0ID0gJ3N0YXJ0JztcbiAgICAgICAgVGV4dEFsaWduLmVuZCA9ICdlbmQnO1xuICAgICAgICBUZXh0QWxpZ24ubGVmdCA9ICdsZWZ0JztcbiAgICAgICAgVGV4dEFsaWduLmNlbnRlciA9ICdjZW50ZXInO1xuICAgICAgICBUZXh0QWxpZ24ucmlnaHQgPSAncmlnaHQnO1xuICAgICAgICByZXR1cm4gVGV4dEFsaWduO1xuICAgIH0oKSk7XG4gICAgY29yZS5UZXh0QWxpZ24gPSBUZXh0QWxpZ247XG4gICAgdmFyIFVJQ29udHJvbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhVSUNvbnRyb2wsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIFVJQ29udHJvbChvd25lcikge1xuICAgICAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgICAgICB0aGlzLiRoZWlnaHQgPSAxMjg7XG4gICAgICAgICAgICB0aGlzLiR3aWR0aCA9IDEyODtcbiAgICAgICAgICAgIHRoaXMuJGluamVjdGVkID0gZmFsc2U7XG4gICAgICAgICAgICB0aGlzLiRiYWNrZ3JvdW5kQ29sb3IgPSAnI2RlZGVkZSc7XG4gICAgICAgICAgICB0aGlzLiRmb3JlQ29sb3IgPSAnIzAwMCc7XG4gICAgICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICAgICAgdGhpcy4kY29udGV4dCA9IG93bmVyLmNvbnRleHQ7XG4gICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXyA9IG5ldyBjb3JlLlBvaW50KDAsIDApO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBjb3JlLkNvbGxlY3Rpb24odGhpcywgb3duZXIpO1xuICAgICAgICAgICAgdGhpcy5vbignbGF5ZXJVcGRhdGUnLCB0aGlzLl9vblVwZGF0ZSk7XG4gICAgICAgICAgICB0aGlzLm9uKCdwcm9wZXJ0eUNoYW5nZScsIHRoaXMuX29uVXBkYXRlKTtcbiAgICAgICAgfVxuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJkcmF3blwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhd247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaWRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0lkKCkpXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuJEdVSUQgPSBuZXcgY29yZS5HVUlEKCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJEdVSUQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5oYXNJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy4kR1VJRCAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGNvbnRleHQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwiaXNJbmplY3RlZFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaW5qZWN0ZWQ7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5fb25VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZygndXBkYXRlIGxheWVyICcgKyB0aGlzLmlkKTtcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlKCk7XG4gICAgICAgICAgICB0aGlzLnJlZHJhd0NvbnRleHQodHJ1ZSk7XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImJhY2tncm91bmRDb2xvclwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kYmFja2dyb3VuZENvbG9yO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICAgICAgdGhpcy4kZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2JhY2tncm91bmRDb2xvcicsIHRoaXMuJGJhY2tncm91bmRDb2xvciwgbmV3Q29sb3IpKTtcbiAgICAgICAgICAgICAgICB0aGlzLiRiYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgICAgICB0aGlzLnJlZHJhd0NvbnRleHQoKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb250cm9sLnByb3RvdHlwZSwgXCJmb3JlQ29sb3JcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGZvcmVDb2xvcjtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdmb3JlQ29sb3InLCB0aGlzLiRmb3JlQ29sb3IsIG5ld0NvbG9yKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kZm9yZUNvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kaGVpZ2h0O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0hlaWdodCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIHRoaXMuJGhlaWdodCwgbmV3SGVpZ2h0KSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kaGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgICAgICAgICAgICAgIHRoaXMucmVkcmF3Q29udGV4dCgpO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLiR3aWR0aDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdXaWR0aCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIHRoaXMuJHdpZHRoLCBuZXdXaWR0aCkpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHdpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDb250ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29udHJvbC5wcm90b3R5cGUsIFwidG9wXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXy55O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndG9wJywgdGhpcy5fX3Bvc2l0aW9uX18ueSwgdikpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnkgPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcImxlZnRcIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fLng7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdsZWZ0JywgdGhpcy5fX3Bvc2l0aW9uX18ueCwgdikpO1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnggPSB2O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcInBvc2l0aW9uXCIsIHtcbiAgICAgICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXztcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdwb3NpdGlvbicsIHRoaXMuX19wb3NpdGlvbl9fLCBuZXdQb3NpdGlvbikpO1xuICAgICAgICAgICAgICAgIHRoaXMudG9wID0gbmV3UG9zaXRpb24ueTtcbiAgICAgICAgICAgICAgICB0aGlzLmxlZnQgPSBuZXdQb3NpdGlvbi54O1xuICAgICAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5wb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB2YXIgcDEgPSBuZXcgUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpLCBwMiA9IG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLCB0aGlzLnBvc2l0aW9uLnkpLCBwMyA9IG5ldyBQb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLndpZHRoLCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmhlaWdodCksIHA0ID0gbmV3IFBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgcmV0dXJuIFtwMSwgcDIsIHAzLCBwNF07XG4gICAgICAgIH07XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbnRyb2wucHJvdG90eXBlLCBcInBhcmVudFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kcGFyZW50O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUuaGFzUGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIChpc3NldCh0aGlzLnBhcmVudCkgJiYgdGhpcy5wYXJlbnQgIT09IG51bGwpO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLnJlZHJhd0NvbnRleHQgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgICAgIGlmIChmb3JjZSA9PT0gdm9pZCAwKSB7IGZvcmNlID0gZmFsc2U7IH1cbiAgICAgICAgICAgIGlmICghdGhpcy5pc0luamVjdGVkIHx8ICFmb3JjZSlcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICBpZiAodGhpcy5kcmF3bilcbiAgICAgICAgICAgICAgICB0aGlzLnJlbW92ZShmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZWRyYXcnLCBuZXcgVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZvcmNlIH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5oYXNQYXJlbnQoKSlcbiAgICAgICAgICAgICAgICB0aGlzLnBhcmVudC5yZWRyYXdDb250ZXh0KGZvcmNlKTtcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9O1xuICAgICAgICBVSUNvbnRyb2wucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgncmVuZGVyJywgbmV3IFVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgICAgICB0aGlzLl9kcmF3biA9IHRydWU7XG4gICAgICAgICAgICB0aGlzLiRlbWl0KCdyZW5kZXJlZCcsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS4kJGluamVjdCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgICAgIHRoaXMuJHBhcmVudCA9IHBhcmVudDtcbiAgICAgICAgICAgIHRoaXMuJGluamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMpO1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnaW5qZWN0JywgbmV3IFVJRXZlbnQodGhpcywgeyAncGFyZW50JzogcGFyZW50IH0pKTtcbiAgICAgICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIH07XG4gICAgICAgIFVJQ29udHJvbC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGRlbGV0ZUVsZW1lbnQpIHtcbiAgICAgICAgICAgIGlmIChkZWxldGVFbGVtZW50ID09PSB2b2lkIDApIHsgZGVsZXRlRWxlbWVudCA9IGZhbHNlOyB9XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgICAgICAgICBpZiAoZGVsZXRlRWxlbWVudClcbiAgICAgICAgICAgICAgICB0aGlzLm93bmVyLmNvbnRyb2xzLnJlbW92ZSh0aGlzKTtcbiAgICAgICAgfTtcbiAgICAgICAgVUlDb250cm9sLnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy4kZW1pdCgnZGlzcG9zZScsIG5ldyBVSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgICAgIHRoaXMuJGluamVjdGVkID0gZmFsc2U7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBVSUNvbnRyb2w7XG4gICAgfShFdmVudEVtaXR0ZXIpKTtcbiAgICBjb3JlLlVJQ29udHJvbCA9IFVJQ29udHJvbDtcbn0pKGNvcmUgPSBleHBvcnRzLmNvcmUgfHwgKGV4cG9ydHMuY29yZSA9IHt9KSk7XG4iLCJ3aW5kb3cua3JhdG9zID0gcmVxdWlyZSgnLi9jb3JlLmpzJykuY29yZTtcbndpbmRvdy5rcmF0b3MudWkgPSByZXF1aXJlKCcuL3VpLmpzJykudWk7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGNvcmVfMSA9IHJlcXVpcmUoJy4vY29yZScpO1xudmFyIHVpO1xuKGZ1bmN0aW9uICh1aSkge1xuICAgIHZhciBSZWN0YW5nbGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoUmVjdGFuZ2xlLCBfc3VwZXIpO1xuICAgICAgICBmdW5jdGlvbiBSZWN0YW5nbGUoKSB7XG4gICAgICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgfVxuICAgICAgICBSZWN0YW5nbGUucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgfTtcbiAgICAgICAgcmV0dXJuIFJlY3RhbmdsZTtcbiAgICB9KGNvcmVfMS5jb3JlLlVJQ29udHJvbCkpO1xuICAgIHVpLlJlY3RhbmdsZSA9IFJlY3RhbmdsZTtcbiAgICB2YXIgTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgICAgICBfX2V4dGVuZHMoTGFiZWwsIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIExhYmVsKCkge1xuICAgICAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgICB0aGlzLiR0ZXh0ID0gJ05ldyBMYWJlbCc7XG4gICAgICAgICAgICB0aGlzLiRhbGlnbiA9IGNvcmVfMS5jb3JlLlRleHRBbGlnbi5sZWZ0O1xuICAgICAgICB9XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dFwiLCB7XG4gICAgICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy4kdGV4dDtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdTdHIpIHtcbiAgICAgICAgICAgICAgICB0aGlzLiRlbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBjb3JlXzEuY29yZS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dCcsIHRoaXMuJHRleHQsIG5ld1N0cikpO1xuICAgICAgICAgICAgICAgIHRoaXMuJHRleHQgPSBuZXdTdHI7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDb250ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExhYmVsLnByb3RvdHlwZSwgXCJ0ZXh0QWxpZ25cIiwge1xuICAgICAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuJGFsaWduO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgICAgIHRoaXMuJGVtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGNvcmVfMS5jb3JlLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0ZXh0QWxpZ24nLCB0aGlzLiRhbGlnbiwgbmV3VmFsKSk7XG4gICAgICAgICAgICAgICAgdGhpcy4kYWxpZ24gPSBuZXdWYWw7XG4gICAgICAgICAgICAgICAgdGhpcy5yZWRyYXdDb250ZXh0KCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgTGFiZWwucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucG9zaXRpb24ueCk7XG4gICAgICAgIH07XG4gICAgICAgIHJldHVybiBMYWJlbDtcbiAgICB9KGNvcmVfMS5jb3JlLlVJQ29udHJvbCkpO1xuICAgIHVpLkxhYmVsID0gTGFiZWw7XG4gICAgdmFyIEJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgICAgIGZ1bmN0aW9uIEJ1dHRvbigpIHtcbiAgICAgICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB9XG4gICAgICAgIEJ1dHRvbi5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgpO1xuICAgICAgICB9O1xuICAgICAgICByZXR1cm4gQnV0dG9uO1xuICAgIH0oTGFiZWwpKTtcbiAgICB1aS5CdXR0b24gPSBCdXR0b247XG59KSh1aSA9IGV4cG9ydHMudWkgfHwgKGV4cG9ydHMudWkgPSB7fSkpO1xuIl19
