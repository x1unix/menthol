/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 20);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Emittable_1 = __webpack_require__(21);
exports.Emittable = Emittable_1.Emittable;
var Event_1 = __webpack_require__(5);
exports.Event = Event_1.Event;
var EventEmitter_1 = __webpack_require__(9);
exports.EventEmitter = EventEmitter_1.EventEmitter;
var EventGenerator_1 = __webpack_require__(10);
exports.EventGenerator = EventGenerator_1.EventGenerator;
var EventListenersCollection_1 = __webpack_require__(11);
exports.EventListenersCollection = EventListenersCollection_1.EventListenersCollection;
var CollectionEvent_1 = __webpack_require__(22);
exports.CollectionEvent = CollectionEvent_1.CollectionEvent;
var PropertyChangedEvent_1 = __webpack_require__(8);
exports.PropertyChangedEvent = PropertyChangedEvent_1.PropertyChangedEvent;
var UIEvent_1 = __webpack_require__(2);
exports.UIEvent = UIEvent_1.UIEvent;
var UICommonEvent_1 = __webpack_require__(23);
exports.UICommonEvent = UICommonEvent_1.UICommonEvent;
var UIMouseEvent_1 = __webpack_require__(24);
exports.UIMouseEvent = UIMouseEvent_1.UIMouseEvent;


/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = __webpack_require__(5);
var UIEvent = (function (_super) {
    __extends(UIEvent, _super);
    function UIEvent(target, args) {
        return _super.call(this, target, args) || this;
    }
    return UIEvent;
}(Event_1.Event));
exports.UIEvent = UIEvent;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Version_1 = __webpack_require__(26);
exports.Version = Version_1.Version;
var Domain_1 = __webpack_require__(14);
exports.Domain = Domain_1.Domain;
var Dictionary_1 = __webpack_require__(27);
exports.Dictionary = Dictionary_1.Dictionary;
var isset_1 = __webpack_require__(28);
exports.isset = isset_1.isset;
var _defined_1 = __webpack_require__(16);
exports.$defined = _defined_1.$defined;
var _async_1 = __webpack_require__(29);
exports.$async = _async_1.$async;
var _null_1 = __webpack_require__(15);
exports.$null = _null_1.$null;


/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(1);
exports.Point = Point_1.Point;
var BoxModelElement_1 = __webpack_require__(7);
exports.BoxModelElement = BoxModelElement_1.BoxModelElement;
var GUID_1 = __webpack_require__(12);
exports.GUID = GUID_1.GUID;
var TextAlign_1 = __webpack_require__(25);
exports.TextAlign = TextAlign_1.TextAlign;
var Font_1 = __webpack_require__(13);
exports.Font = Font_1.Font;
var FontStyle_1 = __webpack_require__(17);
exports.FontStyle = FontStyle_1.FontStyle;
var Collection_1 = __webpack_require__(6);
exports.Collection = Collection_1.Collection;
var ComponentMapper_1 = __webpack_require__(18);
exports.ComponentMapper = ComponentMapper_1.ComponentMapper;
var UIComponent_1 = __webpack_require__(32);
exports.UIComponent = UIComponent_1.UIComponent;
var Form_1 = __webpack_require__(33);
exports.Form = Form_1.Form;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.Event = Event;


/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(0);
var events_2 = __webpack_require__(0);
var Point_1 = __webpack_require__(1);
var Collection = (function (_super) {
    __extends(Collection, _super);
    function Collection(handler, appInstance) {
        var _this = _super.call(this) || this;
        _this.collectionHandler = handler;
        _this.items = [];
        _this._defaultForm = appInstance;
        return _this;
    }
    Collection.prototype.add = function (item) {
        item.__inject(this.collectionHandler);
        this.items.push(item);
        this._emit('elementInserted', new events_2.CollectionEvent(this, item));
    };
    Collection.prototype.remove = function (item) {
        var i = this.items.indexOf(item);
        if (i > -1) {
            this.items[i].dispose();
            this._emit('elementRemove', new events_2.CollectionEvent(this, this.items[i]));
            this.items.splice(i, 1);
        }
    };
    Collection.prototype.forEach = function (callback) {
        this.items.forEach.call(this.items, callback);
    };
    Collection.prototype.broadcast = function (domEvent, eventConstructor, checkBounds, point) {
        if (checkBounds === void 0) { checkBounds = true; }
        if (point === void 0) { point = new Point_1.Point(0, 0); }
        this.forEach(function broadcastEvent(e) {
            var inBounds = (checkBounds) ? e.inBoundsOf(point) : true;
            if (inBounds) {
                e._emit(domEvent.type, eventConstructor(domEvent.type, e));
            }
            var checkBoundsRecursive = checkBounds;
            if (inBounds)
                checkBoundsRecursive = false;
            e.controls.broadcast(domEvent, eventConstructor, checkBoundsRecursive, point);
        });
    };
    return Collection;
}(events_1.EventEmitter));
exports.Collection = Collection;


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(0);
var BoxModelElement = (function (_super) {
    __extends(BoxModelElement, _super);
    function BoxModelElement(top, right, bottom, left) {
        if (top === void 0) { top = 0; }
        if (right === void 0) { right = 0; }
        if (bottom === void 0) { bottom = 0; }
        if (left === void 0) { left = 0; }
        var _this = _super.call(this) || this;
        _this._top = top;
        _this._left = left;
        _this._right = right;
        _this._bottom = bottom;
        return _this;
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
}(events_1.Emittable));
exports.BoxModelElement = BoxModelElement;


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UIEvent_1 = __webpack_require__(2);
var PropertyChangedEvent = (function (_super) {
    __extends(PropertyChangedEvent, _super);
    function PropertyChangedEvent(target, propName, oldValue, newValue) {
        return _super.call(this, target, {
            propertyName: propName,
            oldValue: oldValue,
            newValue: newValue
        }) || this;
    }
    return PropertyChangedEvent;
}(UIEvent_1.UIEvent));
exports.PropertyChangedEvent = PropertyChangedEvent;


/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventGenerator_1 = __webpack_require__(10);
var EventEmitter = (function () {
    function EventEmitter() {
        this.__e = new EventGenerator_1.EventGenerator(this);
    }
    EventEmitter.prototype.on = function (eventName, listener) { };
    EventEmitter.prototype.off = function (eventName, listener) { };
    EventEmitter.prototype._emit = function (eventName, eventArgs) { };
    ;
    return EventEmitter;
}());
exports.EventEmitter = EventEmitter;


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var EventListenersCollection_1 = __webpack_require__(11);
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
            this._listeners[eventName] = new EventListenersCollection_1.EventListenersCollection(this._owner, eventName);
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
exports.EventGenerator = EventGenerator;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.EventListenersCollection = EventListenersCollection;


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.GUID = GUID;


/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var helpers_1 = __webpack_require__(3);
var FontStyle_1 = __webpack_require__(17);
var events_1 = __webpack_require__(0);
var Font = (function (_super) {
    __extends(Font, _super);
    function Font(family, size, weight) {
        if (family === void 0) { family = 'sans-serif'; }
        if (size === void 0) { size = 10; }
        if (weight === void 0) { weight = 400; }
        var _this = _super.call(this) || this;
        _this.emittable = false;
        _this._family = family;
        _this._size = size;
        _this._weight = weight;
        _this._style = FontStyle_1.FontStyle.normal;
        return _this;
    }
    Font.prototype._onChange = function (prop) {
        if (this.emittable) {
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, prop, null, null));
        }
    };
    Object.defineProperty(Font.prototype, "height", {
        get: function () {
            return (!helpers_1.isset(this._height) || typeof this._height == 'undefined') ? (this._size * 1.2) | 0 : this._height;
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
}(events_1.EventEmitter));
exports.Font = Font;


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(0);
var Domain = (function (_super) {
    __extends(Domain, _super);
    function Domain() {
        return _super.call(this) || this;
    }
    Domain.prototype._execute = function (method) {
        try {
            method();
        }
        catch (ex) {
            this._emit('error', ex);
        }
    };
    Domain.prototype.run = function (func) {
        var _this = this;
        setTimeout(function () {
            _this._execute(func);
        }, 0);
    };
    return Domain;
}(events_1.EventEmitter));
exports.Domain = Domain;


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $null(val) {
    return val === null;
}
exports.$null = $null;


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function $defined(e) {
    return typeof e !== 'undefined';
}
exports.$defined = $defined;


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.FontStyle = FontStyle;


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CanvasMouseEventBroadcaster_1 = __webpack_require__(30);
var ComponentMapper = (function () {
    function ComponentMapper(owner) {
        this._guidMap = {};
        this.broadcasters = [];
        this.previousMouseElement = null;
        this._currentMouseElement = null;
        this.owner = owner;
        this.broadcasters.push(new CanvasMouseEventBroadcaster_1.CanvasMouseEventBroadcaster(owner, ComponentMapper.DOMMouseEvents, false));
    }
    Object.defineProperty(ComponentMapper.prototype, "currentMouseElement", {
        get: function () {
            return this._currentMouseElement;
        },
        set: function (e) {
            this._currentMouseElement = e;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ComponentMapper.prototype, "currentFocusedElement", {
        get: function () {
            return this._currentFocusedElement;
        },
        set: function (e) {
            this._currentFocusedElement = e;
        },
        enumerable: true,
        configurable: true
    });
    ComponentMapper.prototype.load = function () {
        this.broadcasters.forEach(function (e) {
            e.load();
        });
    };
    ComponentMapper.prototype._registerId = function (element) {
        this._guidMap[element.id.toString()] = element;
    };
    ComponentMapper.prototype.getElementById = function (eid) {
        return this._guidMap[eid];
    };
    ComponentMapper.prototype.register = function (item) {
        this._registerId(item);
    };
    ComponentMapper.DOMMouseEvents = [
        'click',
        'dblclick',
        'mousedown',
        'mouseup',
        'mouseover',
        'mouseout',
        'mousemove'
    ];
    ComponentMapper.DOMEvents = [
        'keydown',
        'keyup',
        'keypress'
    ];
    return ComponentMapper;
}());
exports.ComponentMapper = ComponentMapper;


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __webpack_require__(4);
var events_1 = __webpack_require__(0);
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this._text = 'New Label';
        _this._align = ui_1.TextAlign.left;
        return _this;
    }
    Object.defineProperty(Label.prototype, "text", {
        get: function () {
            return this._text;
        },
        set: function (newStr) {
            var old = this._text.toString();
            this._text = newStr;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'text', old, newStr));
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
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'textAlign', null, newVal));
        },
        enumerable: true,
        configurable: true
    });
    Label.prototype._render = function () {
        this.context.textAlign = this.textAlign;
        this.context.fillStyle = this.foreColor;
        this.context.font = this.font.toString();
        this.context.fillText(this.text, this.position.y, this.position.x);
    };
    return Label;
}(ui_1.UIComponent));
exports.Label = Label;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __webpack_require__(4);
var components_1 = __webpack_require__(34);
var times = 0;
var loop = false;
var redrawTimes = 0;
var fps = 0;
var app = new ui_1.Form(document.getElementById('app'), function () {
    this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('call bootstrap', this);
});
app.on('click', function () {
    console.log('canvas form click!');
});
app.on('redraw', function () {
    redrawTimes++;
});
var label = new components_1.Label(app);
label.left = 320;
label.top = 128;
label.text = "Redraw requests: " + redrawTimes + "\nFPS: " + fps;
label.foreColor = '#ff00aa';
label.font.size = 18;
app.controls.add(label);
var rect = new components_1.Rectangle(app);
rect.height = 32;
rect.width = 32;
rect.left = 0;
rect.top = 0;
rect.backgroundColor = 'red';
rect.on('click', function () {
    alert('rect click');
});
app.controls.add(rect);
var button = new components_1.Button(app);
button.left = 128;
button.top = 128;
button.text = 'Click on start count!';
button.font.size = 12;
button.foreColor = '#fff';
function doCount() {
    if (!stopped) {
        times++;
        button.text = "Counting... " + times;
        button.backgroundColor = t ? '#f00' : '#00f';
        t = !t;
        window.requestAnimationFrame(doCount);
    }
    else {
        times = 0;
        button.text = 'Click on start count!';
    }
}
var t = false;
var stopped = true;
button.on('click', function () {
    stopped = !stopped;
    if (!stopped)
        doCount();
});
button.on('mouseover', function (event) {
    button.backgroundColor = '#cecece';
    button.foreColor = '#000';
});
button.on('mouseout', function () {
    button.backgroundColor = '#000';
    button.foreColor = '#fff';
});
app.controls.add(button);
setInterval(function () {
    label.text = "Redraw requests: " + redrawTimes + "\nFPS: " + fps;
    fps = 0;
    redrawTimes = 0;
}, 1000);
function fpsCount() {
    fps++;
    window.requestAnimationFrame(fpsCount);
}
window.requestAnimationFrame(fpsCount);
window['app'] = app;


/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var PropertyChangedEvent_1 = __webpack_require__(8);
var EventEmitter_1 = __webpack_require__(9);
var Emittable = (function (_super) {
    __extends(Emittable, _super);
    function Emittable() {
        var _this = _super.call(this) || this;
        _this.emittable = false;
        return _this;
    }
    Emittable.prototype._onChange = function (prop) {
        if (this.emittable) {
            this._emit('propertyChange', new PropertyChangedEvent_1.PropertyChangedEvent(this, prop, null, null));
        }
    };
    return Emittable;
}(EventEmitter_1.EventEmitter));
exports.Emittable = Emittable;


/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = __webpack_require__(5);
var CollectionEvent = (function (_super) {
    __extends(CollectionEvent, _super);
    function CollectionEvent(target, item) {
        return _super.call(this, target, {
            item: item
        }) || this;
    }
    return CollectionEvent;
}(Event_1.Event));
exports.CollectionEvent = CollectionEvent;


/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UIEvent_1 = __webpack_require__(2);
var UICommonEvent = (function (_super) {
    __extends(UICommonEvent, _super);
    function UICommonEvent(target, args) {
        return _super.call(this, target, args) || this;
    }
    return UICommonEvent;
}(UIEvent_1.UIEvent));
exports.UICommonEvent = UICommonEvent;


/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var UIEvent_1 = __webpack_require__(2);
var UIMouseEvent = (function (_super) {
    __extends(UIMouseEvent, _super);
    function UIMouseEvent(target, windowClickEvent) {
        return _super.call(this, target, {
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
        }) || this;
    }
    return UIMouseEvent;
}(UIEvent_1.UIEvent));
exports.UIMouseEvent = UIMouseEvent;


/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
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
exports.TextAlign = TextAlign;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Version = (function () {
    function Version(major, minor, patch) {
        if (major === void 0) { major = 0; }
        if (minor === void 0) { minor = 0; }
        if (patch === void 0) { patch = 0; }
        this.major = major;
        this.minor = minor;
        this.patch = patch;
    }
    Version.prototype.toString = function () {
        return [this.major, this.minor, this.patch].join('.');
    };
    return Version;
}());
exports.Version = Version;


/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var _null_1 = __webpack_require__(15);
var _defined_1 = __webpack_require__(16);
var Dictionary = (function () {
    function Dictionary() {
        this._items = {};
        this._aliases = {};
        this.defaultKey = null;
    }
    Object.defineProperty(Dictionary.prototype, "length", {
        get: function () {
            return Object.keys(this._items).length;
        },
        enumerable: true,
        configurable: true
    });
    Dictionary.prototype.exists = function (key) {
        return _defined_1.$defined(this._items) && this._items.hasOwnProperty(key);
    };
    Dictionary.prototype.get = function (key, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        return this.exists(key) ? this._items[key] : this._getValueFromAlias(key, defaultValue);
    };
    Dictionary.prototype._linkAlias = function (alias, key) {
        this._aliases[alias.trim()] = key.toString();
    };
    Dictionary.prototype._getValueFromAlias = function (alias, defaultValue) {
        if (defaultValue === void 0) { defaultValue = null; }
        var aliasValue = this._aliases[alias];
        if (!_defined_1.$defined(aliasValue) || !this.exists(aliasValue)) {
            if (_null_1.$null(defaultValue) && !_null_1.$null(this.defaultKey)) {
                defaultValue = this.get(this.defaultKey);
            }
            return defaultValue;
        }
        return this._items[aliasValue];
    };
    Dictionary.prototype.alias = function (aliases, key, force) {
        var _this = this;
        if (force === void 0) { force = false; }
        if (!this.exists(key) && !force)
            throw new ReferenceError("Item with key '" + key + "' doesn't exists.");
        aliases.split(',').forEach(function (alias) {
            _this._linkAlias(alias, key);
        });
        return this;
    };
    Dictionary.prototype.add = function (key, value, overwrite) {
        if (overwrite === void 0) { overwrite = false; }
        if (this.exists(key) && !overwrite)
            throw new ReferenceError("Item with key '" + key + "' already exists.");
        this._items[key] = value;
        return this;
    };
    Dictionary.prototype.remove = function (key) {
        if (!this.exists(key))
            throw new ReferenceError("Item with key '" + key + "' doesn't exists.");
        delete this._items[key];
        return this;
    };
    Dictionary.prototype.forEach = function (callback) {
        var i = this._items;
        for (var key in i) {
            if (i.hasOwnProperty(key)) {
                callback(i[key], key, i);
            }
        }
    };
    return Dictionary;
}());
exports.Dictionary = Dictionary;


/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
function isset(e) {
    return typeof e !== 'undefined';
}
exports.isset = isset;


/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Domain_1 = __webpack_require__(14);
function $async(method, onError) {
    if (onError === void 0) { onError = console.error; }
    var localDomain = new Domain_1.Domain();
    localDomain.on('error', onError);
    localDomain.run(method);
}
exports.$async = $async;


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Point_1 = __webpack_require__(1);
var events_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(3);
var CanvasEventBroadcaster_1 = __webpack_require__(31);
var CanvasMouseEventBroadcaster = (function (_super) {
    __extends(CanvasMouseEventBroadcaster, _super);
    function CanvasMouseEventBroadcaster(owner, events, autobind) {
        if (events === void 0) { events = []; }
        if (autobind === void 0) { autobind = false; }
        var _this = _super.call(this, owner, events) || this;
        _this.elementFound = false;
        _this.eventHandlers = new helpers_1.Dictionary();
        _this._initHandlers();
        return _this;
    }
    CanvasMouseEventBroadcaster.prototype._initHandlers = function () {
        this.eventHandlers.defaultKey = 'mousemove';
        this.eventHandlers
            .add('click', function (element, event) {
            var old = this.mapper.currentMouseElement;
            if (old === null || (old.id === element.id)) {
                this.mapper.currentMouseElement = element;
                var tEvent = new events_1.UIMouseEvent(element, event);
                element.emit(event.type, tEvent);
            }
            else {
                old.broadcast('blur', new events_1.UIMouseEvent(element, event));
                this.mapper.currentMouseElement = element;
                var tEvent = new events_1.UIMouseEvent(element, event);
                element.emit(event.type, tEvent);
            }
        })
            .add('mousemove', function (element, event) {
            var old = this.mapper.currentMouseElement;
            if (helpers_1.$null(old)) {
                this.mapper.currentMouseElement = element;
                var tEvent = new events_1.UIMouseEvent(element, event);
                element.emit('mouseover', tEvent);
            }
            else {
                if (old.id !== element.id) {
                    var tEvent = new events_1.UIMouseEvent(old, event);
                    old.emit('mouseout', tEvent);
                    this.mapper.currentMouseElement = element;
                    var tEvent = new events_1.UIMouseEvent(element, event);
                    element.emit('mouseover', tEvent);
                }
            }
        })
            .alias('dblclick, mousedown, mouseup, mouseout', 'click');
    };
    CanvasMouseEventBroadcaster.prototype.targetEvent = function (element, event) {
        var _this = this;
        var p = new Point_1.Point(event.layerX, event.layerY);
        if (element.inBoundsOf(p)) {
            return this.react(element, event);
        }
        else {
            element.controls.forEach(function (_element) {
                _this.targetEvent(_element, event);
            });
        }
    };
    CanvasMouseEventBroadcaster.prototype.react = function (element, event) {
        this.elementFound = true;
        this.eventHandlers.get(event.type).call(this, element, event);
    };
    CanvasMouseEventBroadcaster.prototype.bindEvent = function (event) {
        var _this = this;
        var owner = this.owner;
        var cElement = this.mapper.currentMouseElement;
        var pElement = this.mapper.previousMouseElement;
        this.elementFound = false;
        this.mapper.previousMouseElement = cElement;
        owner._emit(event.type, new events_1.UIMouseEvent(owner, event));
        owner.controls.forEach(function (element) {
            _this.targetEvent(element, event);
        });
        if (!this.elementFound && !helpers_1.$null(this.mapper.previousMouseElement)) {
            if (!helpers_1.$null(pElement))
                pElement.emit('mouseout', new events_1.UIMouseEvent(pElement, event));
            this.mapper.currentMouseElement = null;
            this.mapper.previousMouseElement = null;
        }
    };
    return CanvasMouseEventBroadcaster;
}(CanvasEventBroadcaster_1.CanvasEventBroadcaster));
exports.CanvasMouseEventBroadcaster = CanvasMouseEventBroadcaster;


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var CanvasEventBroadcaster = (function () {
    function CanvasEventBroadcaster(owner, events, autobind) {
        if (events === void 0) { events = []; }
        if (autobind === void 0) { autobind = false; }
        this._loaded = false;
        this.owner = owner;
        this.events = events;
        if (autobind)
            this.load();
    }
    CanvasEventBroadcaster.prototype.bindEvent = function (event) { };
    CanvasEventBroadcaster.prototype.react = function (element, event) { };
    CanvasEventBroadcaster.prototype.targetEvent = function (element, event) { };
    Object.defineProperty(CanvasEventBroadcaster.prototype, "loaded", {
        get: function () {
            return this._loaded;
        },
        enumerable: true,
        configurable: true
    });
    CanvasEventBroadcaster.prototype.load = function () {
        var _this = this;
        if (this.loaded)
            return;
        this.mapper = this.owner.mapper;
        this.events.forEach(function (eventName) {
            _this.owner.canvas.addEventListener(eventName, function (event) {
                _this.bindEvent(event);
            });
        });
        this._loaded = true;
    };
    return CanvasEventBroadcaster;
}());
exports.CanvasEventBroadcaster = CanvasEventBroadcaster;


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(3);
var BoxModelElement_1 = __webpack_require__(7);
var Collection_1 = __webpack_require__(6);
var GUID_1 = __webpack_require__(12);
var Point_1 = __webpack_require__(1);
var Font_1 = __webpack_require__(13);
var UIComponent = (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent(owner) {
        var _this = _super.call(this) || this;
        _this._height = 128;
        _this._width = 128;
        _this._injected = false;
        _this._backgroundColor = 'rgba(0,0,0,0)';
        _this._foreColor = '#000';
        _this._padding = new BoxModelElement_1.BoxModelElement();
        _this._margin = new BoxModelElement_1.BoxModelElement();
        _this._font = new Font_1.Font();
        _this._drawn = false;
        var self = _this;
        _this.owner = owner;
        _this._context = owner.context;
        _this.__position__ = new Point_1.Point(0, 0);
        _this.controls = new Collection_1.Collection(_this, owner);
        function fnOnUpdate() {
            self._onUpdate();
        }
        var propEvent = 'propertyChange';
        _this.on('layerUpdate', _this._onUpdate);
        _this.on('propertyChange', _this._onUpdate);
        _this._font.on(propEvent, fnOnUpdate);
        _this._padding.on(propEvent, fnOnUpdate);
        _this._margin.on(propEvent, fnOnUpdate);
        return _this;
    }
    UIComponent.prototype.emit = function (eventName, eventArgs) {
        if (eventName === void 0) { eventName = 'emit'; }
        this._emit(eventName, eventArgs);
        if (this.hasParent())
            this.parent.emit(eventName, eventArgs);
    };
    UIComponent.prototype.broadcast = function (eventName, eventArgs, emitOnEvent) {
        if (eventName === void 0) { eventName = 'broadcast'; }
        if (emitOnEvent === void 0) { emitOnEvent = true; }
        if (emitOnEvent)
            this._emit(eventName, eventArgs);
        this.controls.forEach(function (element) {
            element.broadcast(eventName, eventArgs);
        });
    };
    UIComponent.prototype.react = function (eventName, eventArgs) {
        this.broadcast('mouseover', eventArgs, false);
        this.emit('mouseover', eventArgs);
    };
    Object.defineProperty(UIComponent.prototype, "drawn", {
        get: function () {
            return this._drawn;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "padding", {
        get: function () {
            return this._padding;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "margin", {
        get: function () {
            return this._margin;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "font", {
        get: function () {
            return this._font;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "id", {
        get: function () {
            if (!this.hasId())
                this._GUID = new GUID_1.GUID();
            return this._GUID;
        },
        enumerable: true,
        configurable: true
    });
    UIComponent.prototype.hasId = function () {
        return typeof this._GUID !== 'undefined';
    };
    Object.defineProperty(UIComponent.prototype, "context", {
        get: function () {
            return this._context;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "isInjected", {
        get: function () {
            return this._injected;
        },
        enumerable: true,
        configurable: true
    });
    UIComponent.prototype._onUpdate = function () {
        if (!this.drawn)
            return;
        this.owner._emit('redraw', { relatedTarget: this });
    };
    UIComponent.prototype.inBoundsOf = function (location) {
        var points = this.points();
        return (location.x >= points[0].x) && (location.x <= points[1].x) && (location.y >= points[0].y) && (location.y <= points[2].y);
    };
    Object.defineProperty(UIComponent.prototype, "backgroundColor", {
        get: function () {
            return this._backgroundColor;
        },
        set: function (newColor) {
            var old = this._backgroundColor.toString();
            this._backgroundColor = newColor;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'backgroundColor', old, newColor));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "foreColor", {
        get: function () {
            return this._foreColor;
        },
        set: function (newColor) {
            var old = this._foreColor.toString();
            this._foreColor = newColor;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'foreColor', old, newColor));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "height", {
        get: function () {
            return this._height;
        },
        set: function (newHeight) {
            this._height = newHeight;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'width', null, newHeight));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "width", {
        get: function () {
            return this._width;
        },
        set: function (newWidth) {
            this._width = newWidth;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'width', null, newWidth));
        },
        enumerable: true,
        configurable: true
    });
    UIComponent.prototype.getAbsoluteHeight = function () {
        return this.height;
    };
    UIComponent.prototype.getAbsoluteWidth = function () {
        return this.height;
    };
    Object.defineProperty(UIComponent.prototype, "top", {
        get: function () {
            return this.__position__.y;
        },
        set: function (v) {
            var old = v + 0;
            this.__position__.y = v;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'top', old, v));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "left", {
        get: function () {
            return this.__position__.x;
        },
        set: function (v) {
            var old = v + 0;
            this.__position__.x = v;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'left', old, v));
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(UIComponent.prototype, "position", {
        get: function () {
            return this.__position__;
        },
        set: function (newPosition) {
            var old = new Point_1.Point(newPosition.x, newPosition.y);
            this.top = newPosition.y;
            this.left = newPosition.x;
            this.__position__ = newPosition;
            this._emit('propertyChange', new events_1.PropertyChangedEvent(this, 'position', old, newPosition));
        },
        enumerable: true,
        configurable: true
    });
    UIComponent.prototype.points = function () {
        var p1 = new Point_1.Point(this.position.x, this.position.y), p2 = new Point_1.Point(this.position.x + this.getAbsoluteWidth(), this.position.y), p3 = new Point_1.Point(this.position.x + this.getAbsoluteWidth(), this.position.y + this.getAbsoluteHeight()), p4 = new Point_1.Point(this.position.x, this.position.y + this.getAbsoluteHeight());
        return [p1, p2, p3, p4];
    };
    Object.defineProperty(UIComponent.prototype, "parent", {
        get: function () {
            return this._parent;
        },
        enumerable: true,
        configurable: true
    });
    UIComponent.prototype.hasParent = function () {
        return (helpers_1.isset(this.parent) && this.parent !== null);
    };
    UIComponent.prototype.redraw = function () {
        if (!this.isInjected)
            return false;
        this.owner.registerElement(this);
        this._emit('redraw', new events_1.UIEvent(this, { 'force': false }));
        this.render();
        return true;
    };
    UIComponent.prototype._render = function () { };
    UIComponent.prototype._drawChildren = function () {
        this.controls.forEach(function _fnDrawChild(e) {
            e.redraw();
        });
    };
    UIComponent.prototype.render = function () {
        this._drawn = false;
        this._emit('render', new events_1.UIEvent(this, null));
        this._render();
        this._drawChildren();
        this._drawn = true;
        this._emit('rendered', new events_1.UIEvent(this, null));
    };
    UIComponent.prototype.__inject = function (parent) {
        this._parent = parent;
        this._injected = true;
        this._font.emittable = true;
        this.owner.registerElement(this);
        this._emit('inject', new events_1.UIEvent(this, { 'parent': parent }));
        this.render();
    };
    UIComponent.prototype.remove = function () {
        var parent = this.hasParent() ? this.parent : this.owner;
        parent.controls.remove(this);
    };
    UIComponent.prototype.dispose = function () {
        this._emit('dispose', new events_1.UIEvent(this, null));
        this._injected = false;
    };
    return UIComponent;
}(events_1.EventEmitter));
exports.UIComponent = UIComponent;


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var events_1 = __webpack_require__(0);
var helpers_1 = __webpack_require__(3);
var ComponentMapper_1 = __webpack_require__(18);
var Collection_1 = __webpack_require__(6);
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(handler, bootstrap) {
        var _this = _super.call(this) || this;
        _this.version = new helpers_1.Version(0, 5, 1);
        var self = _this;
        _this.element = handler;
        _this.canvas = document.createElement('canvas');
        _this.canvas.tabIndex = 0;
        _this.canvas.focus();
        Object.defineProperty(_this.canvas, 'form', {
            value: self,
            enumerable: true,
            configurable: true
        });
        if (bootstrap)
            bootstrap.call(self, handler);
        _this.element.appendChild(_this.canvas);
        _this.controls = new Collection_1.Collection(null, _this);
        _this._emit('drawStart', new events_1.UIEvent(_this, {}));
        _this._map = new ComponentMapper_1.ComponentMapper(_this);
        _this.on('redraw', function () {
            this.clear();
            this.controls.forEach(function (e) {
                e.redraw();
            });
        });
        _this._map.load();
        return _this;
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
        this._emit('redraw', new events_1.UIEvent(this, { 'force': force }));
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
}(events_1.EventEmitter));
exports.Form = Form;


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var Rectangle_1 = __webpack_require__(35);
exports.Rectangle = Rectangle_1.Rectangle;
var Label_1 = __webpack_require__(19);
exports.Label = Label_1.Label;
var Button_1 = __webpack_require__(36);
exports.Button = Button_1.Button;


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var ui_1 = __webpack_require__(4);
var Rectangle = (function (_super) {
    __extends(Rectangle, _super);
    function Rectangle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Rectangle.prototype._render = function () {
        this.context.fillStyle = this.backgroundColor;
        this.context.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
    return Rectangle;
}(ui_1.UIComponent));
exports.Rectangle = Rectangle;


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Label_1 = __webpack_require__(19);
var Button = (function (_super) {
    __extends(Button, _super);
    function Button(owner) {
        var _this = _super.call(this, owner) || this;
        _this.foreColor = '#fff';
        _this.backgroundColor = '#000';
        _this.padding.top = 5;
        _this.padding.bottom = 5;
        _this.padding.left = 5;
        _this.padding.right = 5;
        _this.height = 'auto';
        _this.width = 'auto';
        return _this;
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
}(Label_1.Label));
exports.Button = Button;


/***/ })
/******/ ]);