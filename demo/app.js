(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
var Rectangle_1 = require('./components/Rectangle');
exports.Rectangle = Rectangle_1.Rectangle;
var Label_1 = require('./components/Label');
exports.Label = Label_1.Label;
var Button_1 = require('./components/Button');
exports.Button = Button_1.Button;

},{"./components/Button":2,"./components/Label":3,"./components/Rectangle":4}],2:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Label_1 = require('./Label');
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
}(Label_1.Label));
exports.Button = Button;

},{"./Label":3}],3:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui_1 = require('../ui');
var events_1 = require('../events');
var Label = (function (_super) {
    __extends(Label, _super);
    function Label() {
        _super.apply(this, arguments);
        this._text = 'New Label';
        this._align = ui_1.TextAlign.left;
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

},{"../events":16,"../ui":25}],4:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var ui_1 = require('../ui');
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
}(ui_1.UIComponent));
exports.Rectangle = Rectangle;

},{"../ui":25}],5:[function(require,module,exports){
"use strict";
var ui_1 = require('../ui');
var components_1 = require('../components');
var times = 0;
var loop = false;
var app = new ui_1.Form(document.getElementById('app'), function () {
    this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('call bootstrap', this);
});
app.on('click', function () {
    console.log('canvas form click!');
});
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
button.text = "Click on start count!";
button.font.size = 12;
button.foreColor = '#fff';
function doCount() {
    times++;
    button.text = "Counting... " + times;
    if (!stopped) {
        stopped = false;
        window.requestAnimationFrame(doCount);
    }
}
function breakCount() {
    stopped = true;
    times = 0;
    button.text = "Click on start count!";
}
var btnClicked = false;
var stopped = false;
button.on('click', function () {
    btnClicked ? breakCount() : doCount();
    btnClicked = !btnClicked;
});
button.on('mouseover', function (event) {
    button.backgroundColor = "#cecece";
    button.foreColor = "#000";
});
button.on('mouseout', function () {
    button.backgroundColor = "#000";
    button.foreColor = "#fff";
});
app.controls.add(button);
var label = new components_1.Label(app);
label.left = 320;
label.top = 128;
label.text = "Hello world!";
label.foreColor = "#ff00aa";
label.font.size = 18;
app.controls.add(label);
window['app'] = app;

},{"../components":1,"../ui":25}],6:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var PropertyChangedEvent_1 = require('./events/PropertyChangedEvent');
var EventEmitter_1 = require('./EventEmitter');
var Emittable = (function (_super) {
    __extends(Emittable, _super);
    function Emittable() {
        _super.call(this);
        this.emittable = false;
    }
    Emittable.prototype._onChange = function (prop) {
        if (this.emittable) {
            this._emit('propertyChange', new PropertyChangedEvent_1.PropertyChangedEvent(this, prop, null, null));
        }
    };
    return Emittable;
}(EventEmitter_1.EventEmitter));
exports.Emittable = Emittable;

},{"./EventEmitter":8,"./events/PropertyChangedEvent":12}],7:[function(require,module,exports){
"use strict";
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

},{}],8:[function(require,module,exports){
"use strict";
var EventGenerator_1 = require('./EventGenerator');
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

},{"./EventGenerator":9}],9:[function(require,module,exports){
"use strict";
var EventListenersCollection_1 = require('./EventListenersCollection');
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

},{"./EventListenersCollection":10}],10:[function(require,module,exports){
"use strict";
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

},{}],11:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Event_1 = require('../Event');
var CollectionEvent = (function (_super) {
    __extends(CollectionEvent, _super);
    function CollectionEvent(target, item) {
        _super.call(this, target, {
            item: item
        });
    }
    return CollectionEvent;
}(Event_1.Event));
exports.CollectionEvent = CollectionEvent;

},{"../Event":7}],12:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIEvent_1 = require('./UIEvent');
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
}(UIEvent_1.UIEvent));
exports.PropertyChangedEvent = PropertyChangedEvent;

},{"./UIEvent":14}],13:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIEvent_1 = require('./UIEvent');
var UICommonEvent = (function (_super) {
    __extends(UICommonEvent, _super);
    function UICommonEvent(target, args) {
        _super.call(this, target, args);
    }
    return UICommonEvent;
}(UIEvent_1.UIEvent));
exports.UICommonEvent = UICommonEvent;

},{"./UIEvent":14}],14:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Event_1 = require('../Event');
var UIEvent = (function (_super) {
    __extends(UIEvent, _super);
    function UIEvent(target, args) {
        _super.call(this, target, args);
    }
    return UIEvent;
}(Event_1.Event));
exports.UIEvent = UIEvent;

},{"../Event":7}],15:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var UIEvent_1 = require('./UIEvent');
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
}(UIEvent_1.UIEvent));
exports.UIMouseEvent = UIMouseEvent;

},{"./UIEvent":14}],16:[function(require,module,exports){
"use strict";
var Emittable_1 = require('./event/Emittable');
exports.Emittable = Emittable_1.Emittable;
var Event_1 = require('./event/Event');
exports.Event = Event_1.Event;
var EventEmitter_1 = require('./event/EventEmitter');
exports.EventEmitter = EventEmitter_1.EventEmitter;
var EventGenerator_1 = require('./event/EventGenerator');
exports.EventGenerator = EventGenerator_1.EventGenerator;
var EventListenersCollection_1 = require('./event/EventListenersCollection');
exports.EventListenersCollection = EventListenersCollection_1.EventListenersCollection;
var CollectionEvent_1 = require('./event/events/CollectionEvent');
exports.CollectionEvent = CollectionEvent_1.CollectionEvent;
var PropertyChangedEvent_1 = require('./event/events/PropertyChangedEvent');
exports.PropertyChangedEvent = PropertyChangedEvent_1.PropertyChangedEvent;
var UIEvent_1 = require('./event/events/UIEvent');
exports.UIEvent = UIEvent_1.UIEvent;
var UICommonEvent_1 = require('./event/events/UICommonEvent');
exports.UICommonEvent = UICommonEvent_1.UICommonEvent;
var UIMouseEvent_1 = require('./event/events/UIMouseEvent');
exports.UIMouseEvent = UIMouseEvent_1.UIMouseEvent;

},{"./event/Emittable":6,"./event/Event":7,"./event/EventEmitter":8,"./event/EventGenerator":9,"./event/EventListenersCollection":10,"./event/events/CollectionEvent":11,"./event/events/PropertyChangedEvent":12,"./event/events/UICommonEvent":13,"./event/events/UIEvent":14,"./event/events/UIMouseEvent":15}],17:[function(require,module,exports){
"use strict";
var Version_1 = require('./helpers/classes/Version');
exports.Version = Version_1.Version;
var Domain_1 = require('./helpers/classes/Domain');
exports.Domain = Domain_1.Domain;
var Dictionary_1 = require('./helpers/classes/Dictionary');
exports.Dictionary = Dictionary_1.Dictionary;
var isset_1 = require('./helpers/isset');
exports.isset = isset_1.isset;
var _defined_1 = require('./helpers/$defined');
exports.$defined = _defined_1.$defined;
var _async_1 = require('./helpers/$async');
exports.$async = _async_1.$async;
var _null_1 = require('./helpers/$null');
exports.$null = _null_1.$null;

},{"./helpers/$async":18,"./helpers/$defined":19,"./helpers/$null":20,"./helpers/classes/Dictionary":21,"./helpers/classes/Domain":22,"./helpers/classes/Version":23,"./helpers/isset":24}],18:[function(require,module,exports){
"use strict";
var Domain_1 = require('./classes/Domain');
function $async(method, onError) {
    if (onError === void 0) { onError = console.error; }
    var localDomain = new Domain_1.Domain();
    localDomain.on('error', onError);
    localDomain.run(method);
}
exports.$async = $async;

},{"./classes/Domain":22}],19:[function(require,module,exports){
"use strict";
function $defined(e) {
    return typeof e !== 'undefined';
}
exports.$defined = $defined;

},{}],20:[function(require,module,exports){
"use strict";
function $null(val) {
    return val === null;
}
exports.$null = $null;

},{}],21:[function(require,module,exports){
"use strict";
var _null_1 = require('../$null');
var _defined_1 = require('../$defined');
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

},{"../$defined":19,"../$null":20}],22:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../../events');
var Domain = (function (_super) {
    __extends(Domain, _super);
    function Domain() {
        _super.call(this);
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

},{"../../events":16}],23:[function(require,module,exports){
"use strict";
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

},{}],24:[function(require,module,exports){
"use strict";
function isset(e) {
    return typeof e !== 'undefined';
}
exports.isset = isset;

},{}],25:[function(require,module,exports){
"use strict";
var Point_1 = require('./ui/types/Point');
exports.Point = Point_1.Point;
var BoxModelElement_1 = require('./ui/types/BoxModelElement');
exports.BoxModelElement = BoxModelElement_1.BoxModelElement;
var GUID_1 = require('./ui/types/GUID');
exports.GUID = GUID_1.GUID;
var TextAlign_1 = require('./ui/types/TextAlign');
exports.TextAlign = TextAlign_1.TextAlign;
var Font_1 = require('./ui/types/Font');
exports.Font = Font_1.Font;
var FontStyle_1 = require('./ui/types/FontStyle');
exports.FontStyle = FontStyle_1.FontStyle;
var Collection_1 = require('./ui/types/Collection');
exports.Collection = Collection_1.Collection;
var ComponentMapper_1 = require('./ui/ComponentMapper');
exports.ComponentMapper = ComponentMapper_1.ComponentMapper;
var UIComponent_1 = require('./ui/UIComponent');
exports.UIComponent = UIComponent_1.UIComponent;
var Form_1 = require('./ui/Form');
exports.Form = Form_1.Form;

},{"./ui/ComponentMapper":26,"./ui/Form":27,"./ui/UIComponent":28,"./ui/types/BoxModelElement":30,"./ui/types/Collection":32,"./ui/types/Font":33,"./ui/types/FontStyle":34,"./ui/types/GUID":35,"./ui/types/Point":36,"./ui/types/TextAlign":37}],26:[function(require,module,exports){
"use strict";
var CanvasMouseEventBroadcaster_1 = require('./broadcasters/CanvasMouseEventBroadcaster');
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
        'mousemove'];
    ComponentMapper.DOMEvents = [
        'keydown',
        'keyup',
        'keypress'
    ];
    return ComponentMapper;
}());
exports.ComponentMapper = ComponentMapper;

},{"./broadcasters/CanvasMouseEventBroadcaster":29}],27:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../events');
var helpers_1 = require('../helpers');
var ComponentMapper_1 = require('./ComponentMapper');
var Collection_1 = require('./types/Collection');
var Form = (function (_super) {
    __extends(Form, _super);
    function Form(handler, bootstrap) {
        _super.call(this);
        this.version = new helpers_1.Version(0, 5, 1);
        var self = this;
        this.element = handler;
        this.canvas = document.createElement('canvas');
        this.canvas.tabIndex = 0;
        this.canvas.focus();
        Object.defineProperty(this.canvas, 'form', {
            value: self,
            enumerable: true,
            configurable: true
        });
        if (bootstrap)
            bootstrap.call(self, handler);
        this.element.appendChild(this.canvas);
        this.controls = new Collection_1.Collection(null, this);
        this._emit('drawStart', new events_1.UIEvent(this, {}));
        this._map = new ComponentMapper_1.ComponentMapper(this);
        this.on('redraw', function () {
            this.clear();
            this.controls.forEach(function (e) {
                e.redraw();
            });
        });
        this._map.load();
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

},{"../events":16,"../helpers":17,"./ComponentMapper":26,"./types/Collection":32}],28:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../events');
var helpers_1 = require('../helpers');
var BoxModelElement_1 = require('./types/BoxModelElement');
var Collection_1 = require('./types/Collection');
var GUID_1 = require('./types/GUID');
var Point_1 = require('./types/Point');
var Font_1 = require('./types/Font');
var UIComponent = (function (_super) {
    __extends(UIComponent, _super);
    function UIComponent(owner) {
        _super.call(this);
        this._height = 128;
        this._width = 128;
        this._injected = false;
        this._backgroundColor = 'rgba(0,0,0,0)';
        this._foreColor = '#000';
        this._padding = new BoxModelElement_1.BoxModelElement();
        this._margin = new BoxModelElement_1.BoxModelElement();
        this._font = new Font_1.Font();
        this._drawn = false;
        var self = this;
        this.owner = owner;
        this._context = owner.context;
        this.__position__ = new Point_1.Point(0, 0);
        this.controls = new Collection_1.Collection(this, owner);
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

},{"../events":16,"../helpers":17,"./types/BoxModelElement":30,"./types/Collection":32,"./types/Font":33,"./types/GUID":35,"./types/Point":36}],29:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Point_1 = require('../types/Point');
var events_1 = require('../../events');
var helpers_1 = require('../../helpers');
var CanvasEventBroadcaster_1 = require('../types/CanvasEventBroadcaster');
var CanvasMouseEventBroadcaster = (function (_super) {
    __extends(CanvasMouseEventBroadcaster, _super);
    function CanvasMouseEventBroadcaster(owner, events, autobind) {
        if (events === void 0) { events = []; }
        if (autobind === void 0) { autobind = false; }
        _super.call(this, owner, events);
        this.elementFound = false;
        this.eventHandlers = new helpers_1.Dictionary();
        this._initHandlers();
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

},{"../../events":16,"../../helpers":17,"../types/CanvasEventBroadcaster":31,"../types/Point":36}],30:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../../events');
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
}(events_1.Emittable));
exports.BoxModelElement = BoxModelElement;

},{"../../events":16}],31:[function(require,module,exports){
"use strict";
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

},{}],32:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../../events');
var events_2 = require('../../events');
var Point_1 = require('./Point');
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

},{"../../events":16,"./Point":36}],33:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var helpers_1 = require('../../helpers');
var FontStyle_1 = require('./FontStyle');
var events_1 = require('../../events');
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
        this._style = FontStyle_1.FontStyle.normal;
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

},{"../../events":16,"../../helpers":17,"./FontStyle":34}],34:[function(require,module,exports){
"use strict";
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

},{}],35:[function(require,module,exports){
"use strict";
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

},{}],36:[function(require,module,exports){
"use strict";
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;

},{}],37:[function(require,module,exports){
"use strict";
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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9jb21wb25lbnRzLmpzIiwiLi4vY29tcG9uZW50cy9CdXR0b24uanMiLCIuLi9jb21wb25lbnRzL0xhYmVsLmpzIiwiLi4vY29tcG9uZW50cy9SZWN0YW5nbGUuanMiLCJhcHAuanMiLCIuLi9ldmVudC9FbWl0dGFibGUuanMiLCIuLi9ldmVudC9FdmVudC5qcyIsIi4uL2V2ZW50L0V2ZW50RW1pdHRlci5qcyIsIi4uL2V2ZW50L0V2ZW50R2VuZXJhdG9yLmpzIiwiLi4vZXZlbnQvRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLmpzIiwiLi4vZXZlbnQvZXZlbnRzL0NvbGxlY3Rpb25FdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9VSUNvbW1vbkV2ZW50LmpzIiwiLi4vZXZlbnQvZXZlbnRzL1VJRXZlbnQuanMiLCIuLi9ldmVudC9ldmVudHMvVUlNb3VzZUV2ZW50LmpzIiwiLi4vZXZlbnRzLmpzIiwiLi4vaGVscGVycy5qcyIsIi4uL2hlbHBlcnMvJGFzeW5jLmpzIiwiLi4vaGVscGVycy8kZGVmaW5lZC5qcyIsIi4uL2hlbHBlcnMvJG51bGwuanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvRGljdGlvbmFyeS5qcyIsIi4uL2hlbHBlcnMvY2xhc3Nlcy9Eb21haW4uanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvVmVyc2lvbi5qcyIsIi4uL2hlbHBlcnMvaXNzZXQuanMiLCIuLi91aS5qcyIsIi4uL3VpL0NvbXBvbmVudE1hcHBlci5qcyIsIi4uL3VpL0Zvcm0uanMiLCIuLi91aS9VSUNvbXBvbmVudC5qcyIsIi4uL3VpL2Jyb2FkY2FzdGVycy9DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIuanMiLCIuLi91aS90eXBlcy9Cb3hNb2RlbEVsZW1lbnQuanMiLCIuLi91aS90eXBlcy9DYW52YXNFdmVudEJyb2FkY2FzdGVyLmpzIiwiLi4vdWkvdHlwZXMvQ29sbGVjdGlvbi5qcyIsIi4uL3VpL3R5cGVzL0ZvbnQuanMiLCIuLi91aS90eXBlcy9Gb250U3R5bGUuanMiLCIuLi91aS90eXBlcy9HVUlELmpzIiwiLi4vdWkvdHlwZXMvUG9pbnQuanMiLCIuLi91aS90eXBlcy9UZXh0QWxpZ24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgUmVjdGFuZ2xlXzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUmVjdGFuZ2xlJyk7XG5leHBvcnRzLlJlY3RhbmdsZSA9IFJlY3RhbmdsZV8xLlJlY3RhbmdsZTtcbnZhciBMYWJlbF8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0xhYmVsJyk7XG5leHBvcnRzLkxhYmVsID0gTGFiZWxfMS5MYWJlbDtcbnZhciBCdXR0b25fMSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9CdXR0b24nKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uXzEuQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIExhYmVsXzEgPSByZXF1aXJlKCcuL0xhYmVsJyk7XG52YXIgQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1dHRvbihvd25lcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBvd25lcik7XG4gICAgICAgIHRoaXMuZm9yZUNvbG9yID0gJyNmZmYnO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICAgICAgdGhpcy5wYWRkaW5nLnRvcCA9IDU7XG4gICAgICAgIHRoaXMucGFkZGluZy5ib3R0b20gPSA1O1xuICAgICAgICB0aGlzLnBhZGRpbmcubGVmdCA9IDU7XG4gICAgICAgIHRoaXMucGFkZGluZy5yaWdodCA9IDU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLndpZHRoID0gJ2F1dG8nO1xuICAgIH1cbiAgICBCdXR0b24ucHJvdG90eXBlLl9nZXRUZXh0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eHRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoIHwgMDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICd5JzogdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5mb250LmhlaWdodCArIHRoaXMucGFkZGluZy50b3AsXG4gICAgICAgICAgICAneCc6IHRoaXMucG9zaXRpb24ueCArIHRoaXMucGFkZGluZy5sZWZ0XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLmdldEFic29sdXRlSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5oZWlnaHQgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9udC5oZWlnaHQgKyB0aGlzLnBhZGRpbmcudG9wICsgdGhpcy5wYWRkaW5nLmJvdHRvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodCArIHRoaXMucGFkZGluZy50b3AgKyB0aGlzLnBhZGRpbmcuYm90dG9tO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLmdldEFic29sdXRlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLndpZHRoID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHZhciB0eHRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoIHwgMDtcbiAgICAgICAgICAgIHJldHVybiB0eHRXaWR0aCArIHRoaXMucGFkZGluZy5sZWZ0ICsgdGhpcy5wYWRkaW5nLnJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLmxlZnQgKyB0aGlzLnBhZGRpbmcucmlnaHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR4dFBvcyA9IHRoaXMuX2dldFRleHRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcGFkZGluZ1kgPSB0aGlzLnBhZGRpbmcudG9wICsgdGhpcy5wYWRkaW5nLmJvdHRvbTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLmZvbnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IHRoaXMudGV4dEFsaWduO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5nZXRBYnNvbHV0ZVdpZHRoKCksIHRoaXMuZ2V0QWJzb2x1dGVIZWlnaHQoKSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZvcmVDb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdHh0UG9zLngsIHR4dFBvcy55LCB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQodGhpcy50ZXh0KS53aWR0aCk7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uO1xufShMYWJlbF8xLkxhYmVsKSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIHVpXzEgPSByZXF1aXJlKCcuLi91aScpO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vZXZlbnRzJyk7XG52YXIgTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMYWJlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMYWJlbCgpIHtcbiAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX3RleHQgPSAnTmV3IExhYmVsJztcbiAgICAgICAgdGhpcy5fYWxpZ24gPSB1aV8xLlRleHRBbGlnbi5sZWZ0O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdTdHIpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl90ZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gbmV3U3RyO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHQnLCBvbGQsIG5ld1N0cikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRBbGlnblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsaWduO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2FsaWduID0gbmV3VmFsO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHRBbGlnbicsIG51bGwsIG5ld1ZhbCkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBMYWJlbC5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IHRoaXMudGV4dEFsaWduO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5mb3JlQ29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5wb3NpdGlvbi54KTtcbiAgICB9O1xuICAgIHJldHVybiBMYWJlbDtcbn0odWlfMS5VSUNvbXBvbmVudCkpO1xuZXhwb3J0cy5MYWJlbCA9IExhYmVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGFiZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciB1aV8xID0gcmVxdWlyZSgnLi4vdWknKTtcbnZhciBSZWN0YW5nbGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZWN0YW5nbGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmVjdGFuZ2xlKCkge1xuICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgUmVjdGFuZ2xlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlY3RhbmdsZTtcbn0odWlfMS5VSUNvbXBvbmVudCkpO1xuZXhwb3J0cy5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWN0YW5nbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdWlfMSA9IHJlcXVpcmUoJy4uL3VpJyk7XG52YXIgY29tcG9uZW50c18xID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cycpO1xudmFyIHRpbWVzID0gMDtcbnZhciBsb29wID0gZmFsc2U7XG52YXIgYXBwID0gbmV3IHVpXzEuRm9ybShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyksIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhlaWdodCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbiAgICB0aGlzLndpZHRoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICBjb25zb2xlLmxvZygnY2FsbCBib290c3RyYXAnLCB0aGlzKTtcbn0pO1xuYXBwLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzIGZvcm0gY2xpY2shJyk7XG59KTtcbnZhciByZWN0ID0gbmV3IGNvbXBvbmVudHNfMS5SZWN0YW5nbGUoYXBwKTtcbnJlY3QuaGVpZ2h0ID0gMzI7XG5yZWN0LndpZHRoID0gMzI7XG5yZWN0LmxlZnQgPSAwO1xucmVjdC50b3AgPSAwO1xucmVjdC5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbnJlY3Qub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGFsZXJ0KCdyZWN0IGNsaWNrJyk7XG59KTtcbmFwcC5jb250cm9scy5hZGQocmVjdCk7XG52YXIgYnV0dG9uID0gbmV3IGNvbXBvbmVudHNfMS5CdXR0b24oYXBwKTtcbmJ1dHRvbi5sZWZ0ID0gMTI4O1xuYnV0dG9uLnRvcCA9IDEyODtcbmJ1dHRvbi50ZXh0ID0gXCJDbGljayBvbiBzdGFydCBjb3VudCFcIjtcbmJ1dHRvbi5mb250LnNpemUgPSAxMjtcbmJ1dHRvbi5mb3JlQ29sb3IgPSAnI2ZmZic7XG5mdW5jdGlvbiBkb0NvdW50KCkge1xuICAgIHRpbWVzKys7XG4gICAgYnV0dG9uLnRleHQgPSBcIkNvdW50aW5nLi4uIFwiICsgdGltZXM7XG4gICAgaWYgKCFzdG9wcGVkKSB7XG4gICAgICAgIHN0b3BwZWQgPSBmYWxzZTtcbiAgICAgICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZShkb0NvdW50KTtcbiAgICB9XG59XG5mdW5jdGlvbiBicmVha0NvdW50KCkge1xuICAgIHN0b3BwZWQgPSB0cnVlO1xuICAgIHRpbWVzID0gMDtcbiAgICBidXR0b24udGV4dCA9IFwiQ2xpY2sgb24gc3RhcnQgY291bnQhXCI7XG59XG52YXIgYnRuQ2xpY2tlZCA9IGZhbHNlO1xudmFyIHN0b3BwZWQgPSBmYWxzZTtcbmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYnRuQ2xpY2tlZCA/IGJyZWFrQ291bnQoKSA6IGRvQ291bnQoKTtcbiAgICBidG5DbGlja2VkID0gIWJ0bkNsaWNrZWQ7XG59KTtcbmJ1dHRvbi5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiI2NlY2VjZVwiO1xuICAgIGJ1dHRvbi5mb3JlQ29sb3IgPSBcIiMwMDBcIjtcbn0pO1xuYnV0dG9uLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICBidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjMDAwXCI7XG4gICAgYnV0dG9uLmZvcmVDb2xvciA9IFwiI2ZmZlwiO1xufSk7XG5hcHAuY29udHJvbHMuYWRkKGJ1dHRvbik7XG52YXIgbGFiZWwgPSBuZXcgY29tcG9uZW50c18xLkxhYmVsKGFwcCk7XG5sYWJlbC5sZWZ0ID0gMzIwO1xubGFiZWwudG9wID0gMTI4O1xubGFiZWwudGV4dCA9IFwiSGVsbG8gd29ybGQhXCI7XG5sYWJlbC5mb3JlQ29sb3IgPSBcIiNmZjAwYWFcIjtcbmxhYmVsLmZvbnQuc2l6ZSA9IDE4O1xuYXBwLmNvbnRyb2xzLmFkZChsYWJlbCk7XG53aW5kb3dbJ2FwcCddID0gYXBwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudHMvUHJvcGVydHlDaGFuZ2VkRXZlbnQnKTtcbnZhciBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyJyk7XG52YXIgRW1pdHRhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRW1pdHRhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEVtaXR0YWJsZSgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdHRhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIEVtaXR0YWJsZS5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKHRoaXMuZW1pdHRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEVtaXR0YWJsZTtcbn0oRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkVtaXR0YWJsZSA9IEVtaXR0YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVtaXR0YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcImFyZ3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9hcmdzID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuRXZlbnQgPSBFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEV2ZW50R2VuZXJhdG9yXzEgPSByZXF1aXJlKCcuL0V2ZW50R2VuZXJhdG9yJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgICAgIHRoaXMuX19lID0gbmV3IEV2ZW50R2VuZXJhdG9yXzEuRXZlbnRHZW5lcmF0b3IodGhpcyk7XG4gICAgfVxuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7IH07XG4gICAgO1xuICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG59KCkpO1xuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudEVtaXR0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL0V2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbicpO1xudmFyIEV2ZW50R2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEdlbmVyYXRvcihldmVudEdlbmVyYXRvciwgaW5qZWN0KSB7XG4gICAgICAgIGlmIChpbmplY3QgPT09IHZvaWQgMCkgeyBpbmplY3QgPSB0cnVlOyB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLl9vd25lciA9IGV2ZW50R2VuZXJhdG9yO1xuICAgICAgICBpZiAoaW5qZWN0KVxuICAgICAgICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICB9XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX293bmVyLm9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vd25lci5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9mZi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vd25lci5fZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZW1pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnRyaWdnZXJFdmVudChldmVudEFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBuZXcgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uKHRoaXMuX293bmVyLCBldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5fb3duZXI7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZU5hbWUpIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudEdlbmVyYXRvcjtcbn0oKSk7XG5leHBvcnRzLkV2ZW50R2VuZXJhdG9yID0gRXZlbnRHZW5lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudEdlbmVyYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbihzb3VyY2UsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5faG9va3MgPSBbXTtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9ldmVudFNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRBcmdzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5faG9va3MuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgaG9vay5jYWxsKHNlbGYuX2V2ZW50U291cmNlLCBldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0TGlzdGVuZXJzQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ob29rcy5sZW5ndGg7XG4gICAgfTtcbiAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9ob29rcy5wdXNoKGV2ZW50TGlzdGVuZXIpO1xuICAgIH07XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGhvb2tJZCA9IHRoaXMuX2hvb2tzLmluZGV4T2YoZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIGlmIChob29rSWQgPiAtMSlcbiAgICAgICAgICAgIHRoaXMuX2hvb2tzLnNwbGljZShob29rSWQsIDEpO1xuICAgICAgICByZXR1cm4gKGhvb2tJZCA+IC0xKTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG59KCkpO1xuZXhwb3J0cy5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBFdmVudF8xID0gcmVxdWlyZSgnLi4vRXZlbnQnKTtcbnZhciBDb2xsZWN0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sbGVjdGlvbkV2ZW50KHRhcmdldCwgaXRlbSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBDb2xsZWN0aW9uRXZlbnQ7XG59KEV2ZW50XzEuRXZlbnQpKTtcbmV4cG9ydHMuQ29sbGVjdGlvbkV2ZW50ID0gQ29sbGVjdGlvbkV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29sbGVjdGlvbkV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgVUlFdmVudF8xID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG52YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eUNoYW5nZWRFdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0YXJnZXQsIHByb3BOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BOYW1lLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG59KFVJRXZlbnRfMS5VSUV2ZW50KSk7XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFVJRXZlbnRfMSA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xudmFyIFVJQ29tbW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSUNvbW1vbkV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVJQ29tbW9uRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBVSUNvbW1vbkV2ZW50O1xufShVSUV2ZW50XzEuVUlFdmVudCkpO1xuZXhwb3J0cy5VSUNvbW1vbkV2ZW50ID0gVUlDb21tb25FdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJQ29tbW9uRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBFdmVudF8xID0gcmVxdWlyZSgnLi4vRXZlbnQnKTtcbnZhciBVSUV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVUlFdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSUV2ZW50KHRhcmdldCwgYXJncykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gVUlFdmVudDtcbn0oRXZlbnRfMS5FdmVudCkpO1xuZXhwb3J0cy5VSUV2ZW50ID0gVUlFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBVSUV2ZW50XzEgPSByZXF1aXJlKCcuL1VJRXZlbnQnKTtcbnZhciBVSU1vdXNlRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSU1vdXNlRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVUlNb3VzZUV2ZW50KHRhcmdldCwgd2luZG93Q2xpY2tFdmVudCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgIHR5cGU6IHdpbmRvd0NsaWNrRXZlbnQudHlwZSxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgICAgIGN0cmw6IHdpbmRvd0NsaWNrRXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICBhbHQ6IHdpbmRvd0NsaWNrRXZlbnQuYWx0S2V5LFxuICAgICAgICAgICAgICAgIHNoaWZ0OiB3aW5kb3dDbGlja0V2ZW50LnNoaWZ0S2V5LFxuICAgICAgICAgICAgICAgIG1ldGE6IHdpbmRvd0NsaWNrRXZlbnQubWV0YUtleVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogd2luZG93Q2xpY2tFdmVudC5sYXllclgsXG4gICAgICAgICAgICAgICAgeTogd2luZG93Q2xpY2tFdmVudC5sYXllcllcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBVSU1vdXNlRXZlbnQ7XG59KFVJRXZlbnRfMS5VSUV2ZW50KSk7XG5leHBvcnRzLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJTW91c2VFdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFbWl0dGFibGVfMSA9IHJlcXVpcmUoJy4vZXZlbnQvRW1pdHRhYmxlJyk7XG5leHBvcnRzLkVtaXR0YWJsZSA9IEVtaXR0YWJsZV8xLkVtaXR0YWJsZTtcbnZhciBFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9FdmVudCcpO1xuZXhwb3J0cy5FdmVudCA9IEV2ZW50XzEuRXZlbnQ7XG52YXIgRXZlbnRFbWl0dGVyXzEgPSByZXF1aXJlKCcuL2V2ZW50L0V2ZW50RW1pdHRlcicpO1xuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXJfMS5FdmVudEVtaXR0ZXI7XG52YXIgRXZlbnRHZW5lcmF0b3JfMSA9IHJlcXVpcmUoJy4vZXZlbnQvRXZlbnRHZW5lcmF0b3InKTtcbmV4cG9ydHMuRXZlbnRHZW5lcmF0b3IgPSBFdmVudEdlbmVyYXRvcl8xLkV2ZW50R2VuZXJhdG9yO1xudmFyIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbl8xID0gcmVxdWlyZSgnLi9ldmVudC9FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24nKTtcbmV4cG9ydHMuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uID0gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xudmFyIENvbGxlY3Rpb25FdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvQ29sbGVjdGlvbkV2ZW50Jyk7XG5leHBvcnRzLkNvbGxlY3Rpb25FdmVudCA9IENvbGxlY3Rpb25FdmVudF8xLkNvbGxlY3Rpb25FdmVudDtcbnZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvUHJvcGVydHlDaGFuZ2VkRXZlbnQnKTtcbmV4cG9ydHMuUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xLlByb3BlcnR5Q2hhbmdlZEV2ZW50O1xudmFyIFVJRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnRzL1VJRXZlbnQnKTtcbmV4cG9ydHMuVUlFdmVudCA9IFVJRXZlbnRfMS5VSUV2ZW50O1xudmFyIFVJQ29tbW9uRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnRzL1VJQ29tbW9uRXZlbnQnKTtcbmV4cG9ydHMuVUlDb21tb25FdmVudCA9IFVJQ29tbW9uRXZlbnRfMS5VSUNvbW1vbkV2ZW50O1xudmFyIFVJTW91c2VFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvVUlNb3VzZUV2ZW50Jyk7XG5leHBvcnRzLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudF8xLlVJTW91c2VFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBWZXJzaW9uXzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvY2xhc3Nlcy9WZXJzaW9uJyk7XG5leHBvcnRzLlZlcnNpb24gPSBWZXJzaW9uXzEuVmVyc2lvbjtcbnZhciBEb21haW5fMSA9IHJlcXVpcmUoJy4vaGVscGVycy9jbGFzc2VzL0RvbWFpbicpO1xuZXhwb3J0cy5Eb21haW4gPSBEb21haW5fMS5Eb21haW47XG52YXIgRGljdGlvbmFyeV8xID0gcmVxdWlyZSgnLi9oZWxwZXJzL2NsYXNzZXMvRGljdGlvbmFyeScpO1xuZXhwb3J0cy5EaWN0aW9uYXJ5ID0gRGljdGlvbmFyeV8xLkRpY3Rpb25hcnk7XG52YXIgaXNzZXRfMSA9IHJlcXVpcmUoJy4vaGVscGVycy9pc3NldCcpO1xuZXhwb3J0cy5pc3NldCA9IGlzc2V0XzEuaXNzZXQ7XG52YXIgX2RlZmluZWRfMSA9IHJlcXVpcmUoJy4vaGVscGVycy8kZGVmaW5lZCcpO1xuZXhwb3J0cy4kZGVmaW5lZCA9IF9kZWZpbmVkXzEuJGRlZmluZWQ7XG52YXIgX2FzeW5jXzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvJGFzeW5jJyk7XG5leHBvcnRzLiRhc3luYyA9IF9hc3luY18xLiRhc3luYztcbnZhciBfbnVsbF8xID0gcmVxdWlyZSgnLi9oZWxwZXJzLyRudWxsJyk7XG5leHBvcnRzLiRudWxsID0gX251bGxfMS4kbnVsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRG9tYWluXzEgPSByZXF1aXJlKCcuL2NsYXNzZXMvRG9tYWluJyk7XG5mdW5jdGlvbiAkYXN5bmMobWV0aG9kLCBvbkVycm9yKSB7XG4gICAgaWYgKG9uRXJyb3IgPT09IHZvaWQgMCkgeyBvbkVycm9yID0gY29uc29sZS5lcnJvcjsgfVxuICAgIHZhciBsb2NhbERvbWFpbiA9IG5ldyBEb21haW5fMS5Eb21haW4oKTtcbiAgICBsb2NhbERvbWFpbi5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICBsb2NhbERvbWFpbi5ydW4obWV0aG9kKTtcbn1cbmV4cG9ydHMuJGFzeW5jID0gJGFzeW5jO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9JGFzeW5jLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gJGRlZmluZWQoZSkge1xuICAgIHJldHVybiB0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLiRkZWZpbmVkID0gJGRlZmluZWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0kZGVmaW5lZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uICRudWxsKHZhbCkge1xuICAgIHJldHVybiB2YWwgPT09IG51bGw7XG59XG5leHBvcnRzLiRudWxsID0gJG51bGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0kbnVsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfbnVsbF8xID0gcmVxdWlyZSgnLi4vJG51bGwnKTtcbnZhciBfZGVmaW5lZF8xID0gcmVxdWlyZSgnLi4vJGRlZmluZWQnKTtcbnZhciBEaWN0aW9uYXJ5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWN0aW9uYXJ5KCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IHt9O1xuICAgICAgICB0aGlzLl9hbGlhc2VzID0ge307XG4gICAgICAgIHRoaXMuZGVmYXVsdEtleSA9IG51bGw7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaWN0aW9uYXJ5LnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9pdGVtcykubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5leGlzdHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBfZGVmaW5lZF8xLiRkZWZpbmVkKHRoaXMuX2l0ZW1zKSAmJiB0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiB0aGlzLmV4aXN0cyhrZXkpID8gdGhpcy5faXRlbXNba2V5XSA6IHRoaXMuX2dldFZhbHVlRnJvbUFsaWFzKGtleSwgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLl9saW5rQWxpYXMgPSBmdW5jdGlvbiAoYWxpYXMsIGtleSkge1xuICAgICAgICB0aGlzLl9hbGlhc2VzW2FsaWFzLnRyaW0oKV0gPSBrZXkudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLl9nZXRWYWx1ZUZyb21BbGlhcyA9IGZ1bmN0aW9uIChhbGlhcywgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSBudWxsOyB9XG4gICAgICAgIHZhciBhbGlhc1ZhbHVlID0gdGhpcy5fYWxpYXNlc1thbGlhc107XG4gICAgICAgIGlmICghX2RlZmluZWRfMS4kZGVmaW5lZChhbGlhc1ZhbHVlKSB8fCAhdGhpcy5leGlzdHMoYWxpYXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChfbnVsbF8xLiRudWxsKGRlZmF1bHRWYWx1ZSkgJiYgIV9udWxsXzEuJG51bGwodGhpcy5kZWZhdWx0S2V5KSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0KHRoaXMuZGVmYXVsdEtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1thbGlhc1ZhbHVlXTtcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmFsaWFzID0gZnVuY3Rpb24gKGFsaWFzZXMsIGtleSwgZm9yY2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGZvcmNlID09PSB2b2lkIDApIHsgZm9yY2UgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoIXRoaXMuZXhpc3RzKGtleSkgJiYgIWZvcmNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiSXRlbSB3aXRoIGtleSAnXCIgKyBrZXkgKyBcIicgZG9lc24ndCBleGlzdHMuXCIpO1xuICAgICAgICBhbGlhc2VzLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgICAgIF90aGlzLl9saW5rQWxpYXMoYWxpYXMsIGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgaWYgKG92ZXJ3cml0ZSA9PT0gdm9pZCAwKSB7IG92ZXJ3cml0ZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmICh0aGlzLmV4aXN0cyhrZXkpICYmICFvdmVyd3JpdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJJdGVtIHdpdGgga2V5ICdcIiArIGtleSArIFwiJyBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICAgIHRoaXMuX2l0ZW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5leGlzdHMoa2V5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIkl0ZW0gd2l0aCBrZXkgJ1wiICsga2V5ICsgXCInIGRvZXNuJ3QgZXhpc3RzLlwiKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2l0ZW1zW2tleV07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgaSA9IHRoaXMuX2l0ZW1zO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gaSkge1xuICAgICAgICAgICAgaWYgKGkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGlba2V5XSwga2V5LCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERpY3Rpb25hcnk7XG59KCkpO1xuZXhwb3J0cy5EaWN0aW9uYXJ5ID0gRGljdGlvbmFyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpY3Rpb25hcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIERvbWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERvbWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEb21haW4oKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBEb21haW4ucHJvdG90eXBlLl9leGVjdXRlID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWV0aG9kKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdlcnJvcicsIGV4KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRG9tYWluLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9leGVjdXRlKGZ1bmMpO1xuICAgICAgICB9LCAwKTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW47XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Eb21haW4gPSBEb21haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Eb21haW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVmVyc2lvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmVyc2lvbihtYWpvciwgbWlub3IsIHBhdGNoKSB7XG4gICAgICAgIGlmIChtYWpvciA9PT0gdm9pZCAwKSB7IG1ham9yID0gMDsgfVxuICAgICAgICBpZiAobWlub3IgPT09IHZvaWQgMCkgeyBtaW5vciA9IDA7IH1cbiAgICAgICAgaWYgKHBhdGNoID09PSB2b2lkIDApIHsgcGF0Y2ggPSAwOyB9XG4gICAgICAgIHRoaXMubWFqb3IgPSBtYWpvcjtcbiAgICAgICAgdGhpcy5taW5vciA9IG1pbm9yO1xuICAgICAgICB0aGlzLnBhdGNoID0gcGF0Y2g7XG4gICAgfVxuICAgIFZlcnNpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMubWFqb3IsIHRoaXMubWlub3IsIHRoaXMucGF0Y2hdLmpvaW4oJy4nKTtcbiAgICB9O1xuICAgIHJldHVybiBWZXJzaW9uO1xufSgpKTtcbmV4cG9ydHMuVmVyc2lvbiA9IFZlcnNpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1WZXJzaW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNzZXQoZSkge1xuICAgIHJldHVybiB0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzc2V0ID0gaXNzZXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc3NldC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBQb2ludF8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Qb2ludCcpO1xuZXhwb3J0cy5Qb2ludCA9IFBvaW50XzEuUG9pbnQ7XG52YXIgQm94TW9kZWxFbGVtZW50XzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0JveE1vZGVsRWxlbWVudCcpO1xuZXhwb3J0cy5Cb3hNb2RlbEVsZW1lbnQgPSBCb3hNb2RlbEVsZW1lbnRfMS5Cb3hNb2RlbEVsZW1lbnQ7XG52YXIgR1VJRF8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9HVUlEJyk7XG5leHBvcnRzLkdVSUQgPSBHVUlEXzEuR1VJRDtcbnZhciBUZXh0QWxpZ25fMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvVGV4dEFsaWduJyk7XG5leHBvcnRzLlRleHRBbGlnbiA9IFRleHRBbGlnbl8xLlRleHRBbGlnbjtcbnZhciBGb250XzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0ZvbnQnKTtcbmV4cG9ydHMuRm9udCA9IEZvbnRfMS5Gb250O1xudmFyIEZvbnRTdHlsZV8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Gb250U3R5bGUnKTtcbmV4cG9ydHMuRm9udFN0eWxlID0gRm9udFN0eWxlXzEuRm9udFN0eWxlO1xudmFyIENvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvQ29sbGVjdGlvbicpO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb247XG52YXIgQ29tcG9uZW50TWFwcGVyXzEgPSByZXF1aXJlKCcuL3VpL0NvbXBvbmVudE1hcHBlcicpO1xuZXhwb3J0cy5Db21wb25lbnRNYXBwZXIgPSBDb21wb25lbnRNYXBwZXJfMS5Db21wb25lbnRNYXBwZXI7XG52YXIgVUlDb21wb25lbnRfMSA9IHJlcXVpcmUoJy4vdWkvVUlDb21wb25lbnQnKTtcbmV4cG9ydHMuVUlDb21wb25lbnQgPSBVSUNvbXBvbmVudF8xLlVJQ29tcG9uZW50O1xudmFyIEZvcm1fMSA9IHJlcXVpcmUoJy4vdWkvRm9ybScpO1xuZXhwb3J0cy5Gb3JtID0gRm9ybV8xLkZvcm07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11aS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXJfMSA9IHJlcXVpcmUoJy4vYnJvYWRjYXN0ZXJzL0NhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlcicpO1xudmFyIENvbXBvbmVudE1hcHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50TWFwcGVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMuX2d1aWRNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5wcmV2aW91c01vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0ZXJzLnB1c2gobmV3IENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlcl8xLkNhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlcihvd25lciwgQ29tcG9uZW50TWFwcGVyLkRPTU1vdXNlRXZlbnRzLCBmYWxzZSkpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZSwgXCJjdXJyZW50TW91c2VFbGVtZW50XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudE1vdXNlRWxlbWVudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlRWxlbWVudCA9IGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLCBcImN1cnJlbnRGb2N1c2VkRWxlbWVudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRGb2N1c2VkRWxlbWVudDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgdGhpcy5fY3VycmVudEZvY3VzZWRFbGVtZW50ID0gZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmJyb2FkY2FzdGVycy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICBlLmxvYWQoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLl9yZWdpc3RlcklkID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5fZ3VpZE1hcFtlbGVtZW50LmlkLnRvU3RyaW5nKCldID0gZWxlbWVudDtcbiAgICB9O1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2V0RWxlbWVudEJ5SWQgPSBmdW5jdGlvbiAoZWlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ndWlkTWFwW2VpZF07XG4gICAgfTtcbiAgICBDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZChpdGVtKTtcbiAgICB9O1xuICAgIENvbXBvbmVudE1hcHBlci5ET01Nb3VzZUV2ZW50cyA9IFtcbiAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgJ2RibGNsaWNrJyxcbiAgICAgICAgJ21vdXNlZG93bicsXG4gICAgICAgICdtb3VzZXVwJyxcbiAgICAgICAgJ21vdXNlb3ZlcicsXG4gICAgICAgICdtb3VzZW91dCcsXG4gICAgICAgICdtb3VzZW1vdmUnXTtcbiAgICBDb21wb25lbnRNYXBwZXIuRE9NRXZlbnRzID0gW1xuICAgICAgICAna2V5ZG93bicsXG4gICAgICAgICdrZXl1cCcsXG4gICAgICAgICdrZXlwcmVzcydcbiAgICBdO1xuICAgIHJldHVybiBDb21wb25lbnRNYXBwZXI7XG59KCkpO1xuZXhwb3J0cy5Db21wb25lbnRNYXBwZXIgPSBDb21wb25lbnRNYXBwZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db21wb25lbnRNYXBwZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uL2V2ZW50cycpO1xudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMnKTtcbnZhciBDb21wb25lbnRNYXBwZXJfMSA9IHJlcXVpcmUoJy4vQ29tcG9uZW50TWFwcGVyJyk7XG52YXIgQ29sbGVjdGlvbl8xID0gcmVxdWlyZSgnLi90eXBlcy9Db2xsZWN0aW9uJyk7XG52YXIgRm9ybSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvcm0sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9ybShoYW5kbGVyLCBib290c3RyYXApIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMudmVyc2lvbiA9IG5ldyBoZWxwZXJzXzEuVmVyc2lvbigwLCA1LCAxKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBoYW5kbGVyO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICB0aGlzLmNhbnZhcy50YWJJbmRleCA9IDA7XG4gICAgICAgIHRoaXMuY2FudmFzLmZvY3VzKCk7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLmNhbnZhcywgJ2Zvcm0nLCB7XG4gICAgICAgICAgICB2YWx1ZTogc2VsZixcbiAgICAgICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChib290c3RyYXApXG4gICAgICAgICAgICBib290c3RyYXAuY2FsbChzZWxmLCBoYW5kbGVyKTtcbiAgICAgICAgdGhpcy5lbGVtZW50LmFwcGVuZENoaWxkKHRoaXMuY2FudmFzKTtcbiAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBDb2xsZWN0aW9uXzEuQ29sbGVjdGlvbihudWxsLCB0aGlzKTtcbiAgICAgICAgdGhpcy5fZW1pdCgnZHJhd1N0YXJ0JywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywge30pKTtcbiAgICAgICAgdGhpcy5fbWFwID0gbmV3IENvbXBvbmVudE1hcHBlcl8xLkNvbXBvbmVudE1hcHBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5vbigncmVkcmF3JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5yZWRyYXcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFwLmxvYWQoKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwibWFwcGVyXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBGb3JtLnByb3RvdHlwZS5yZWRyYXdDb250ZXh0ID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgICAgIHRoaXMuX2VtaXQoJ3JlZHJhdycsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZm9yY2UgfSkpO1xuICAgIH07XG4gICAgRm9ybS5wcm90b3R5cGUucmVnaXN0ZXJFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5tYXBwZXIucmVnaXN0ZXIoZWxlbWVudCk7XG4gICAgfTtcbiAgICBGb3JtLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICB9O1xuICAgIEZvcm0ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gRm9ybTtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkZvcm0gPSBGb3JtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rm9ybS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vZXZlbnRzJyk7XG52YXIgaGVscGVyc18xID0gcmVxdWlyZSgnLi4vaGVscGVycycpO1xudmFyIEJveE1vZGVsRWxlbWVudF8xID0gcmVxdWlyZSgnLi90eXBlcy9Cb3hNb2RlbEVsZW1lbnQnKTtcbnZhciBDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL3R5cGVzL0NvbGxlY3Rpb24nKTtcbnZhciBHVUlEXzEgPSByZXF1aXJlKCcuL3R5cGVzL0dVSUQnKTtcbnZhciBQb2ludF8xID0gcmVxdWlyZSgnLi90eXBlcy9Qb2ludCcpO1xudmFyIEZvbnRfMSA9IHJlcXVpcmUoJy4vdHlwZXMvRm9udCcpO1xudmFyIFVJQ29tcG9uZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVUlDb21wb25lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVUlDb21wb25lbnQob3duZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDEyODtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAxMjg7XG4gICAgICAgIHRoaXMuX2luamVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICAgICAgdGhpcy5fZm9yZUNvbG9yID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9wYWRkaW5nID0gbmV3IEJveE1vZGVsRWxlbWVudF8xLkJveE1vZGVsRWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9tYXJnaW4gPSBuZXcgQm94TW9kZWxFbGVtZW50XzEuQm94TW9kZWxFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2ZvbnQgPSBuZXcgRm9udF8xLkZvbnQoKTtcbiAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBvd25lci5jb250ZXh0O1xuICAgICAgICB0aGlzLl9fcG9zaXRpb25fXyA9IG5ldyBQb2ludF8xLlBvaW50KDAsIDApO1xuICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IENvbGxlY3Rpb25fMS5Db2xsZWN0aW9uKHRoaXMsIG93bmVyKTtcbiAgICAgICAgZnVuY3Rpb24gZm5PblVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHNlbGYuX29uVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3BFdmVudCA9ICdwcm9wZXJ0eUNoYW5nZSc7XG4gICAgICAgIHRoaXMub24oJ2xheWVyVXBkYXRlJywgdGhpcy5fb25VcGRhdGUpO1xuICAgICAgICB0aGlzLm9uKCdwcm9wZXJ0eUNoYW5nZScsIHRoaXMuX29uVXBkYXRlKTtcbiAgICAgICAgdGhpcy5fZm9udC5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgICAgICB0aGlzLl9wYWRkaW5nLm9uKHByb3BFdmVudCwgZm5PblVwZGF0ZSk7XG4gICAgICAgIHRoaXMuX21hcmdpbi5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgIH1cbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICBpZiAoZXZlbnROYW1lID09PSB2b2lkIDApIHsgZXZlbnROYW1lID0gJ2VtaXQnOyB9XG4gICAgICAgIHRoaXMuX2VtaXQoZXZlbnROYW1lLCBldmVudEFyZ3MpO1xuICAgICAgICBpZiAodGhpcy5oYXNQYXJlbnQoKSlcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmVtaXQoZXZlbnROYW1lLCBldmVudEFyZ3MpO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmJyb2FkY2FzdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncywgZW1pdE9uRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gdm9pZCAwKSB7IGV2ZW50TmFtZSA9ICdicm9hZGNhc3QnOyB9XG4gICAgICAgIGlmIChlbWl0T25FdmVudCA9PT0gdm9pZCAwKSB7IGVtaXRPbkV2ZW50ID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoZW1pdE9uRXZlbnQpXG4gICAgICAgICAgICB0aGlzLl9lbWl0KGV2ZW50TmFtZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmJyb2FkY2FzdChldmVudE5hbWUsIGV2ZW50QXJncyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0KCdtb3VzZW92ZXInLCBldmVudEFyZ3MsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbWl0KCdtb3VzZW92ZXInLCBldmVudEFyZ3MpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJkcmF3blwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYXduO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInBhZGRpbmdcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWRkaW5nO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcIm1hcmdpblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmdpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJmb250XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJpZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0lkKCkpXG4gICAgICAgICAgICAgICAgdGhpcy5fR1VJRCA9IG5ldyBHVUlEXzEuR1VJRCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0dVSUQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5oYXNJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9HVUlEICE9PSAndW5kZWZpbmVkJztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiaXNJbmplY3RlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuX29uVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJhd24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMub3duZXIuX2VtaXQoJ3JlZHJhdycsIHsgcmVsYXRlZFRhcmdldDogdGhpcyB9KTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5pbkJvdW5kc09mID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLnBvaW50cygpO1xuICAgICAgICByZXR1cm4gKGxvY2F0aW9uLnggPj0gcG9pbnRzWzBdLngpICYmIChsb2NhdGlvbi54IDw9IHBvaW50c1sxXS54KSAmJiAobG9jYXRpb24ueSA+PSBwb2ludHNbMF0ueSkgJiYgKGxvY2F0aW9uLnkgPD0gcG9pbnRzWzJdLnkpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJiYWNrZ3JvdW5kQ29sb3JcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5fYmFja2dyb3VuZENvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdiYWNrZ3JvdW5kQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiZm9yZUNvbG9yXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9yZUNvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2ZvcmVDb2xvci50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fZm9yZUNvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnZm9yZUNvbG9yJywgb2xkLCBuZXdDb2xvcikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnd2lkdGgnLCBudWxsLCBuZXdIZWlnaHQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBuZXdXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIG51bGwsIG5ld1dpZHRoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5nZXRBYnNvbHV0ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmdldEFic29sdXRlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwidG9wXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX18ueTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHYgKyAwO1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18ueSA9IHY7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndG9wJywgb2xkLCB2KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwibGVmdFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fLng7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB2ICsgMDtcbiAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnggPSB2O1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2xlZnQnLCBvbGQsIHYpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJwb3NpdGlvblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdQb3NpdGlvbikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IG5ldyBQb2ludF8xLlBvaW50KG5ld1Bvc2l0aW9uLngsIG5ld1Bvc2l0aW9uLnkpO1xuICAgICAgICAgICAgdGhpcy50b3AgPSBuZXdQb3NpdGlvbi55O1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gbmV3UG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAncG9zaXRpb24nLCBvbGQsIG5ld1Bvc2l0aW9uKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5wb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwMSA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSwgcDIgPSBuZXcgUG9pbnRfMS5Qb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5wb3NpdGlvbi55KSwgcDMgPSBuZXcgUG9pbnRfMS5Qb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKSwgcDQgPSBuZXcgUG9pbnRfMS5Qb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuZ2V0QWJzb2x1dGVIZWlnaHQoKSk7XG4gICAgICAgIHJldHVybiBbcDEsIHAyLCBwMywgcDRdO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJwYXJlbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5oYXNQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoaGVscGVyc18xLmlzc2V0KHRoaXMucGFyZW50KSAmJiB0aGlzLnBhcmVudCAhPT0gbnVsbCk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbmplY3RlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ3JlZHJhdycsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZmFsc2UgfSkpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fZHJhd0NoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gX2ZuRHJhd0NoaWxkKGUpIHtcbiAgICAgICAgICAgIGUucmVkcmF3KCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVuZGVyJywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5fZHJhd0NoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuX2RyYXduID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVuZGVyZWQnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuX19pbmplY3QgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9mb250LmVtaXR0YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMpO1xuICAgICAgICB0aGlzLl9lbWl0KCdpbmplY3QnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCB7ICdwYXJlbnQnOiBwYXJlbnQgfSkpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuaGFzUGFyZW50KCkgPyB0aGlzLnBhcmVudCA6IHRoaXMub3duZXI7XG4gICAgICAgIHBhcmVudC5jb250cm9scy5yZW1vdmUodGhpcyk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZW1pdCgnZGlzcG9zZScsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBVSUNvbXBvbmVudDtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLlVJQ29tcG9uZW50ID0gVUlDb21wb25lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VSUNvbXBvbmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFBvaW50XzEgPSByZXF1aXJlKCcuLi90eXBlcy9Qb2ludCcpO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgaGVscGVyc18xID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycycpO1xudmFyIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXJfMSA9IHJlcXVpcmUoJy4uL3R5cGVzL0NhbnZhc0V2ZW50QnJvYWRjYXN0ZXInKTtcbnZhciBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyKG93bmVyLCBldmVudHMsIGF1dG9iaW5kKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHZvaWQgMCkgeyBldmVudHMgPSBbXTsgfVxuICAgICAgICBpZiAoYXV0b2JpbmQgPT09IHZvaWQgMCkgeyBhdXRvYmluZCA9IGZhbHNlOyB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG93bmVyLCBldmVudHMpO1xuICAgICAgICB0aGlzLmVsZW1lbnRGb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSBuZXcgaGVscGVyc18xLkRpY3Rpb25hcnkoKTtcbiAgICAgICAgdGhpcy5faW5pdEhhbmRsZXJzKCk7XG4gICAgfVxuICAgIENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUuX2luaXRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzLmRlZmF1bHRLZXkgPSAnbW91c2Vtb3ZlJztcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzXG4gICAgICAgICAgICAuYWRkKCdjbGljaycsIGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCkge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAob2xkID09PSBudWxsIHx8IChvbGQuaWQgPT09IGVsZW1lbnQuaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHRFdmVudCA9IG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZW1pdChldmVudC50eXBlLCB0RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkLmJyb2FkY2FzdCgnYmx1cicsIG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5lbWl0KGV2ZW50LnR5cGUsIHRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50O1xuICAgICAgICAgICAgaWYgKGhlbHBlcnNfMS4kbnVsbChvbGQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHRFdmVudCA9IG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZW1pdCgnbW91c2VvdmVyJywgdEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGQuaWQgIT09IGVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRFdmVudCA9IG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQob2xkLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIG9sZC5lbWl0KCdtb3VzZW91dCcsIHRFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZW1pdCgnbW91c2VvdmVyJywgdEV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWxpYXMoJ2RibGNsaWNrLCBtb3VzZWRvd24sIG1vdXNldXAsIG1vdXNlb3V0JywgJ2NsaWNrJyk7XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnRhcmdldEV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwID0gbmV3IFBvaW50XzEuUG9pbnQoZXZlbnQubGF5ZXJYLCBldmVudC5sYXllclkpO1xuICAgICAgICBpZiAoZWxlbWVudC5pbkJvdW5kc09mKHApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFjdChlbGVtZW50LCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKF9lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGFyZ2V0RXZlbnQoX2VsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzLmdldChldmVudC50eXBlKS5jYWxsKHRoaXMsIGVsZW1lbnQsIGV2ZW50KTtcbiAgICB9O1xuICAgIENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUuYmluZEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMub3duZXI7XG4gICAgICAgIHZhciBjRWxlbWVudCA9IHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQ7XG4gICAgICAgIHZhciBwRWxlbWVudCA9IHRoaXMubWFwcGVyLnByZXZpb3VzTW91c2VFbGVtZW50O1xuICAgICAgICB0aGlzLmVsZW1lbnRGb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcHBlci5wcmV2aW91c01vdXNlRWxlbWVudCA9IGNFbGVtZW50O1xuICAgICAgICBvd25lci5fZW1pdChldmVudC50eXBlLCBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KG93bmVyLCBldmVudCkpO1xuICAgICAgICBvd25lci5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBfdGhpcy50YXJnZXRFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudEZvdW5kICYmICFoZWxwZXJzXzEuJG51bGwodGhpcy5tYXBwZXIucHJldmlvdXNNb3VzZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoIWhlbHBlcnNfMS4kbnVsbChwRWxlbWVudCkpXG4gICAgICAgICAgICAgICAgcEVsZW1lbnQuZW1pdCgnbW91c2VvdXQnLCBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KHBFbGVtZW50LCBldmVudCkpO1xuICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm1hcHBlci5wcmV2aW91c01vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXI7XG59KENhbnZhc0V2ZW50QnJvYWRjYXN0ZXJfMS5DYW52YXNFdmVudEJyb2FkY2FzdGVyKSk7XG5leHBvcnRzLkNhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlciA9IENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgQm94TW9kZWxFbGVtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm94TW9kZWxFbGVtZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJveE1vZGVsRWxlbWVudCh0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQpIHtcbiAgICAgICAgaWYgKHRvcCA9PT0gdm9pZCAwKSB7IHRvcCA9IDA7IH1cbiAgICAgICAgaWYgKHJpZ2h0ID09PSB2b2lkIDApIHsgcmlnaHQgPSAwOyB9XG4gICAgICAgIGlmIChib3R0b20gPT09IHZvaWQgMCkgeyBib3R0b20gPSAwOyB9XG4gICAgICAgIGlmIChsZWZ0ID09PSB2b2lkIDApIHsgbGVmdCA9IDA7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX3RvcCA9IHRvcDtcbiAgICAgICAgdGhpcy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMuX3JpZ2h0ID0gcmlnaHQ7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJveE1vZGVsRWxlbWVudC5wcm90b3R5cGUsIFwidG9wXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9wO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdG9wID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgndG9wJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9yaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3JpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2JvdHRvbSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2JvdHRvbScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdsZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBCb3hNb2RlbEVsZW1lbnQ7XG59KGV2ZW50c18xLkVtaXR0YWJsZSkpO1xuZXhwb3J0cy5Cb3hNb2RlbEVsZW1lbnQgPSBCb3hNb2RlbEVsZW1lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Cb3hNb2RlbEVsZW1lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ2FudmFzRXZlbnRCcm9hZGNhc3RlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcihvd25lciwgZXZlbnRzLCBhdXRvYmluZCkge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB2b2lkIDApIHsgZXZlbnRzID0gW107IH1cbiAgICAgICAgaWYgKGF1dG9iaW5kID09PSB2b2lkIDApIHsgYXV0b2JpbmQgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgICAgICAgaWYgKGF1dG9iaW5kKVxuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICAgIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLmJpbmRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkgeyB9O1xuICAgIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7IH07XG4gICAgQ2FudmFzRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUudGFyZ2V0RXZlbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQpIHsgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FudmFzRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUsIFwibG9hZGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBDYW52YXNFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5sb2FkZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubWFwcGVyID0gdGhpcy5vd25lci5tYXBwZXI7XG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgX3RoaXMub3duZXIuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5iaW5kRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXI7XG59KCkpO1xuZXhwb3J0cy5DYW52YXNFdmVudEJyb2FkY2FzdGVyID0gQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNhbnZhc0V2ZW50QnJvYWRjYXN0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIGV2ZW50c18yID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgUG9pbnRfMSA9IHJlcXVpcmUoJy4vUG9pbnQnKTtcbnZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKGhhbmRsZXIsIGFwcEluc3RhbmNlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25IYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLl9kZWZhdWx0Rm9ybSA9IGFwcEluc3RhbmNlO1xuICAgIH1cbiAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtLl9faW5qZWN0KHRoaXMuY29sbGVjdGlvbkhhbmRsZXIpO1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ2VsZW1lbnRJbnNlcnRlZCcsIG5ldyBldmVudHNfMi5Db2xsZWN0aW9uRXZlbnQodGhpcywgaXRlbSkpO1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnZWxlbWVudFJlbW92ZScsIG5ldyBldmVudHNfMi5Db2xsZWN0aW9uRXZlbnQodGhpcywgdGhpcy5pdGVtc1tpXSkpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoLmNhbGwodGhpcy5pdGVtcywgY2FsbGJhY2spO1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0ID0gZnVuY3Rpb24gKGRvbUV2ZW50LCBldmVudENvbnN0cnVjdG9yLCBjaGVja0JvdW5kcywgcG9pbnQpIHtcbiAgICAgICAgaWYgKGNoZWNrQm91bmRzID09PSB2b2lkIDApIHsgY2hlY2tCb3VuZHMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChwb2ludCA9PT0gdm9pZCAwKSB7IHBvaW50ID0gbmV3IFBvaW50XzEuUG9pbnQoMCwgMCk7IH1cbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIGJyb2FkY2FzdEV2ZW50KGUpIHtcbiAgICAgICAgICAgIHZhciBpbkJvdW5kcyA9IChjaGVja0JvdW5kcykgPyBlLmluQm91bmRzT2YocG9pbnQpIDogdHJ1ZTtcbiAgICAgICAgICAgIGlmIChpbkJvdW5kcykge1xuICAgICAgICAgICAgICAgIGUuX2VtaXQoZG9tRXZlbnQudHlwZSwgZXZlbnRDb25zdHJ1Y3Rvcihkb21FdmVudC50eXBlLCBlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2hlY2tCb3VuZHNSZWN1cnNpdmUgPSBjaGVja0JvdW5kcztcbiAgICAgICAgICAgIGlmIChpbkJvdW5kcylcbiAgICAgICAgICAgICAgICBjaGVja0JvdW5kc1JlY3Vyc2l2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZS5jb250cm9scy5icm9hZGNhc3QoZG9tRXZlbnQsIGV2ZW50Q29uc3RydWN0b3IsIGNoZWNrQm91bmRzUmVjdXJzaXZlLCBwb2ludCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbGxlY3Rpb247XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbGxlY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzJyk7XG52YXIgRm9udFN0eWxlXzEgPSByZXF1aXJlKCcuL0ZvbnRTdHlsZScpO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgRm9udCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9udChmYW1pbHksIHNpemUsIHdlaWdodCkge1xuICAgICAgICBpZiAoZmFtaWx5ID09PSB2b2lkIDApIHsgZmFtaWx5ID0gJ3NhbnMtc2VyaWYnOyB9XG4gICAgICAgIGlmIChzaXplID09PSB2b2lkIDApIHsgc2l6ZSA9IDEwOyB9XG4gICAgICAgIGlmICh3ZWlnaHQgPT09IHZvaWQgMCkgeyB3ZWlnaHQgPSA0MDA7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdHRhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZhbWlseSA9IGZhbWlseTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuX3dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fc3R5bGUgPSBGb250U3R5bGVfMS5Gb250U3R5bGUubm9ybWFsO1xuICAgIH1cbiAgICBGb250LnByb3RvdHlwZS5fb25DaGFuZ2UgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICBpZiAodGhpcy5lbWl0dGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICghaGVscGVyc18xLmlzc2V0KHRoaXMuX2hlaWdodCkgfHwgdHlwZW9mIHRoaXMuX2hlaWdodCA9PSAndW5kZWZpbmVkJykgPyAodGhpcy5fc2l6ZSAqIDEuMikgfCAwIDogdGhpcy5faGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnaGVpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJ3ZWlnaHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCd3ZWlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInN0eWxlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gdjtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzdHlsZScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwiZmFtaWx5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFtaWx5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9mYW1pbHkgPSB2O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2ZhbWlseScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3NpemUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgRm9udC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5zdHlsZS50b1N0cmluZygpLCB0aGlzLndlaWdodCwgdGhpcy5zaXplICsgJ3B4LycgKyB0aGlzLmhlaWdodCArICdweCcsIHRoaXMuZmFtaWx5XS5qb2luKCcgJyk7XG4gICAgfTtcbiAgICByZXR1cm4gRm9udDtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkZvbnQgPSBGb250O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rm9udC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBGb250U3R5bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZvbnRTdHlsZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlVHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIEZvbnRTdHlsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVR5cGUudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIEZvbnRTdHlsZS5ub3JtYWwgPSBuZXcgRm9udFN0eWxlKCdub3JtYWwnKTtcbiAgICBGb250U3R5bGUuaXRhbGljID0gbmV3IEZvbnRTdHlsZSgnaXRhbGljJyk7XG4gICAgcmV0dXJuIEZvbnRTdHlsZTtcbn0oKSk7XG5leHBvcnRzLkZvbnRTdHlsZSA9IEZvbnRTdHlsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZvbnRTdHlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBHVUlEID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHVUlEKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBHVUlELmdlbmVyYXRlKCk7XG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICB9XG4gICAgR1VJRC5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgIH07XG4gICAgR1VJRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuICAgIEdVSUQucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgfTtcbiAgICByZXR1cm4gR1VJRDtcbn0oKSk7XG5leHBvcnRzLkdVSUQgPSBHVUlEO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R1VJRC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbiAgICByZXR1cm4gUG9pbnQ7XG59KCkpO1xuZXhwb3J0cy5Qb2ludCA9IFBvaW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9pbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVGV4dEFsaWduID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXh0QWxpZ24oKSB7XG4gICAgfVxuICAgIFRleHRBbGlnbi5zdGFydCA9ICdzdGFydCc7XG4gICAgVGV4dEFsaWduLmVuZCA9ICdlbmQnO1xuICAgIFRleHRBbGlnbi5sZWZ0ID0gJ2xlZnQnO1xuICAgIFRleHRBbGlnbi5jZW50ZXIgPSAnY2VudGVyJztcbiAgICBUZXh0QWxpZ24ucmlnaHQgPSAncmlnaHQnO1xuICAgIHJldHVybiBUZXh0QWxpZ247XG59KCkpO1xuZXhwb3J0cy5UZXh0QWxpZ24gPSBUZXh0QWxpZ247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UZXh0QWxpZ24uanMubWFwIl19
