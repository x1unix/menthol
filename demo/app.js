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
app.controls.add(rect);
rect.on('click', function () {
    alert('rect click');
});
var button = new components_1.Button(app);
button.left = 128;
button.top = 128;
button.text = "Click on me!";
button.font.size = 12;
button.foreColor = '#fff';
button.on('click', function (event) {
    button.top = 10;
    button.backgroundColor = "#ff3232";
    button.foreColor = "#000";
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
label.left = 0;
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
        this.version = new helpers_1.Version(0, 4, 0);
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
        this.controls.on('elementInserted', function (item) {
        });
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
                element.react(event.type, tEvent);
            }
            else {
                old.broadcast('blur', new events_1.UIMouseEvent(element, event));
                this.mapper.currentMouseElement = element;
                var tEvent = new events_1.UIMouseEvent(element, event);
                element.react(event.type, tEvent);
            }
        })
            .add('mousemove', function (element, event) {
            var old = this.mapper.currentMouseElement;
            if ((old === null) || (old.id === element.id)) {
                console.warn('same or null');
                if (!helpers_1.$null(old) && (old['id'] === element.id))
                    return;
                this.mapper.currentMouseElement = element;
                var tEvent = new events_1.UIMouseEvent(element, event);
                element.emit('mouseover', tEvent);
            }
            else {
                console.warn('not same or null');
                var tEvent = new events_1.UIMouseEvent(old, event);
                old.emit('mouseout', tEvent);
                this.mapper.currentMouseElement = element;
                var tEvent = new events_1.UIMouseEvent(element, event);
                element.emit('mouseover', tEvent);
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
        this.eventHandlers.get(event.type).call(this, element, event);
    };
    CanvasMouseEventBroadcaster.prototype.bindEvent = function (event) {
        var _this = this;
        var owner = this.owner;
        owner._emit(event.type, new events_1.UIMouseEvent(owner, event));
        owner.controls.forEach(function (element) {
            _this.targetEvent(element, event);
        });
        if (!this.elementFound)
            this.mapper.currentMouseElement = null;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9jb21wb25lbnRzLmpzIiwiLi4vY29tcG9uZW50cy9CdXR0b24uanMiLCIuLi9jb21wb25lbnRzL0xhYmVsLmpzIiwiLi4vY29tcG9uZW50cy9SZWN0YW5nbGUuanMiLCJhcHAuanMiLCIuLi9ldmVudC9FbWl0dGFibGUuanMiLCIuLi9ldmVudC9FdmVudC5qcyIsIi4uL2V2ZW50L0V2ZW50RW1pdHRlci5qcyIsIi4uL2V2ZW50L0V2ZW50R2VuZXJhdG9yLmpzIiwiLi4vZXZlbnQvRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLmpzIiwiLi4vZXZlbnQvZXZlbnRzL0NvbGxlY3Rpb25FdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9VSUNvbW1vbkV2ZW50LmpzIiwiLi4vZXZlbnQvZXZlbnRzL1VJRXZlbnQuanMiLCIuLi9ldmVudC9ldmVudHMvVUlNb3VzZUV2ZW50LmpzIiwiLi4vZXZlbnRzLmpzIiwiLi4vaGVscGVycy5qcyIsIi4uL2hlbHBlcnMvJGFzeW5jLmpzIiwiLi4vaGVscGVycy8kZGVmaW5lZC5qcyIsIi4uL2hlbHBlcnMvJG51bGwuanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvRGljdGlvbmFyeS5qcyIsIi4uL2hlbHBlcnMvY2xhc3Nlcy9Eb21haW4uanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvVmVyc2lvbi5qcyIsIi4uL2hlbHBlcnMvaXNzZXQuanMiLCIuLi91aS5qcyIsIi4uL3VpL0NvbXBvbmVudE1hcHBlci5qcyIsIi4uL3VpL0Zvcm0uanMiLCIuLi91aS9VSUNvbXBvbmVudC5qcyIsIi4uL3VpL2Jyb2FkY2FzdGVycy9DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIuanMiLCIuLi91aS90eXBlcy9Cb3hNb2RlbEVsZW1lbnQuanMiLCIuLi91aS90eXBlcy9DYW52YXNFdmVudEJyb2FkY2FzdGVyLmpzIiwiLi4vdWkvdHlwZXMvQ29sbGVjdGlvbi5qcyIsIi4uL3VpL3R5cGVzL0ZvbnQuanMiLCIuLi91aS90eXBlcy9Gb250U3R5bGUuanMiLCIuLi91aS90eXBlcy9HVUlELmpzIiwiLi4vdWkvdHlwZXMvUG9pbnQuanMiLCIuLi91aS90eXBlcy9UZXh0QWxpZ24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNVFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgUmVjdGFuZ2xlXzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvUmVjdGFuZ2xlJyk7XG5leHBvcnRzLlJlY3RhbmdsZSA9IFJlY3RhbmdsZV8xLlJlY3RhbmdsZTtcbnZhciBMYWJlbF8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0xhYmVsJyk7XG5leHBvcnRzLkxhYmVsID0gTGFiZWxfMS5MYWJlbDtcbnZhciBCdXR0b25fMSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9CdXR0b24nKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uXzEuQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Y29tcG9uZW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIExhYmVsXzEgPSByZXF1aXJlKCcuL0xhYmVsJyk7XG52YXIgQnV0dG9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQnV0dG9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJ1dHRvbihvd25lcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCBvd25lcik7XG4gICAgICAgIHRoaXMuZm9yZUNvbG9yID0gJyNmZmYnO1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDb2xvciA9ICcjMDAwJztcbiAgICAgICAgdGhpcy5wYWRkaW5nLnRvcCA9IDU7XG4gICAgICAgIHRoaXMucGFkZGluZy5ib3R0b20gPSA1O1xuICAgICAgICB0aGlzLnBhZGRpbmcubGVmdCA9IDU7XG4gICAgICAgIHRoaXMucGFkZGluZy5yaWdodCA9IDU7XG4gICAgICAgIHRoaXMuaGVpZ2h0ID0gJ2F1dG8nO1xuICAgICAgICB0aGlzLndpZHRoID0gJ2F1dG8nO1xuICAgIH1cbiAgICBCdXR0b24ucHJvdG90eXBlLl9nZXRUZXh0UG9zaXRpb24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eHRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoIHwgMDtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICd5JzogdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5mb250LmhlaWdodCArIHRoaXMucGFkZGluZy50b3AsXG4gICAgICAgICAgICAneCc6IHRoaXMucG9zaXRpb24ueCArIHRoaXMucGFkZGluZy5sZWZ0XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLmdldEFic29sdXRlSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy5oZWlnaHQgPT09ICdhdXRvJykge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZm9udC5oZWlnaHQgKyB0aGlzLnBhZGRpbmcudG9wICsgdGhpcy5wYWRkaW5nLmJvdHRvbTtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodCArIHRoaXMucGFkZGluZy50b3AgKyB0aGlzLnBhZGRpbmcuYm90dG9tO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLmdldEFic29sdXRlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLndpZHRoID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHZhciB0eHRXaWR0aCA9IHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoIHwgMDtcbiAgICAgICAgICAgIHJldHVybiB0eHRXaWR0aCArIHRoaXMucGFkZGluZy5sZWZ0ICsgdGhpcy5wYWRkaW5nLnJpZ2h0O1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLmxlZnQgKyB0aGlzLnBhZGRpbmcucmlnaHQ7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR4dFBvcyA9IHRoaXMuX2dldFRleHRQb3NpdGlvbigpO1xuICAgICAgICB2YXIgcGFkZGluZ1kgPSB0aGlzLnBhZGRpbmcudG9wICsgdGhpcy5wYWRkaW5nLmJvdHRvbTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLmZvbnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IHRoaXMudGV4dEFsaWduO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5nZXRBYnNvbHV0ZVdpZHRoKCksIHRoaXMuZ2V0QWJzb2x1dGVIZWlnaHQoKSk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmZvcmVDb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdHh0UG9zLngsIHR4dFBvcy55LCB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQodGhpcy50ZXh0KS53aWR0aCk7XG4gICAgfTtcbiAgICByZXR1cm4gQnV0dG9uO1xufShMYWJlbF8xLkxhYmVsKSk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUJ1dHRvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIHVpXzEgPSByZXF1aXJlKCcuLi91aScpO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vZXZlbnRzJyk7XG52YXIgTGFiZWwgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhMYWJlbCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBMYWJlbCgpIHtcbiAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgICAgIHRoaXMuX3RleHQgPSAnTmV3IExhYmVsJztcbiAgICAgICAgdGhpcy5fYWxpZ24gPSB1aV8xLlRleHRBbGlnbi5sZWZ0O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90ZXh0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdTdHIpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl90ZXh0LnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl90ZXh0ID0gbmV3U3RyO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHQnLCBvbGQsIG5ld1N0cikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoTGFiZWwucHJvdG90eXBlLCBcInRleHRBbGlnblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FsaWduO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdWYWwpIHtcbiAgICAgICAgICAgIHRoaXMuX2FsaWduID0gbmV3VmFsO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RleHRBbGlnbicsIG51bGwsIG5ld1ZhbCkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBMYWJlbC5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LnRleHRBbGlnbiA9IHRoaXMudGV4dEFsaWduO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuZm9udC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMucG9zaXRpb24ueCk7XG4gICAgfTtcbiAgICByZXR1cm4gTGFiZWw7XG59KHVpXzEuVUlDb21wb25lbnQpKTtcbmV4cG9ydHMuTGFiZWwgPSBMYWJlbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUxhYmVsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgdWlfMSA9IHJlcXVpcmUoJy4uL3VpJyk7XG52YXIgUmVjdGFuZ2xlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUmVjdGFuZ2xlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFJlY3RhbmdsZSgpIHtcbiAgICAgICAgX3N1cGVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICAgIFJlY3RhbmdsZS5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICB9O1xuICAgIHJldHVybiBSZWN0YW5nbGU7XG59KHVpXzEuVUlDb21wb25lbnQpKTtcbmV4cG9ydHMuUmVjdGFuZ2xlID0gUmVjdGFuZ2xlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UmVjdGFuZ2xlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIHVpXzEgPSByZXF1aXJlKCcuLi91aScpO1xudmFyIGNvbXBvbmVudHNfMSA9IHJlcXVpcmUoJy4uL2NvbXBvbmVudHMnKTtcbnZhciBhcHAgPSBuZXcgdWlfMS5Gb3JtKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdhcHAnKSwgZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuaGVpZ2h0ID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodCwgd2luZG93LmlubmVySGVpZ2h0IHx8IDApO1xuICAgIHRoaXMud2lkdGggPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgsIHdpbmRvdy5pbm5lcldpZHRoIHx8IDApO1xuICAgIGNvbnNvbGUubG9nKCdjYWxsIGJvb3RzdHJhcCcsIHRoaXMpO1xufSk7XG5hcHAub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGNvbnNvbGUubG9nKCdjYW52YXMgZm9ybSBjbGljayEnKTtcbn0pO1xudmFyIHJlY3QgPSBuZXcgY29tcG9uZW50c18xLlJlY3RhbmdsZShhcHApO1xucmVjdC5oZWlnaHQgPSAzMjtcbnJlY3Qud2lkdGggPSAzMjtcbnJlY3QubGVmdCA9IDA7XG5yZWN0LnRvcCA9IDA7XG5yZWN0LmJhY2tncm91bmRDb2xvciA9ICdyZWQnO1xuYXBwLmNvbnRyb2xzLmFkZChyZWN0KTtcbnJlY3Qub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGFsZXJ0KCdyZWN0IGNsaWNrJyk7XG59KTtcbnZhciBidXR0b24gPSBuZXcgY29tcG9uZW50c18xLkJ1dHRvbihhcHApO1xuYnV0dG9uLmxlZnQgPSAxMjg7XG5idXR0b24udG9wID0gMTI4O1xuYnV0dG9uLnRleHQgPSBcIkNsaWNrIG9uIG1lIVwiO1xuYnV0dG9uLmZvbnQuc2l6ZSA9IDEyO1xuYnV0dG9uLmZvcmVDb2xvciA9ICcjZmZmJztcbmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBidXR0b24udG9wID0gMTA7XG4gICAgYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiI2ZmMzIzMlwiO1xuICAgIGJ1dHRvbi5mb3JlQ29sb3IgPSBcIiMwMDBcIjtcbn0pO1xuYnV0dG9uLm9uKCdtb3VzZW92ZXInLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICBidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjY2VjZWNlXCI7XG4gICAgYnV0dG9uLmZvcmVDb2xvciA9IFwiIzAwMFwiO1xufSk7XG5idXR0b24ub24oJ21vdXNlb3V0JywgZnVuY3Rpb24gKCkge1xuICAgIGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcIiMwMDBcIjtcbiAgICBidXR0b24uZm9yZUNvbG9yID0gXCIjZmZmXCI7XG59KTtcbmFwcC5jb250cm9scy5hZGQoYnV0dG9uKTtcbnZhciBsYWJlbCA9IG5ldyBjb21wb25lbnRzXzEuTGFiZWwoYXBwKTtcbmxhYmVsLmxlZnQgPSAwO1xubGFiZWwudG9wID0gMTI4O1xubGFiZWwudGV4dCA9IFwiSGVsbG8gd29ybGQhXCI7XG5sYWJlbC5mb3JlQ29sb3IgPSBcIiNmZjAwYWFcIjtcbmxhYmVsLmZvbnQuc2l6ZSA9IDE4O1xuYXBwLmNvbnRyb2xzLmFkZChsYWJlbCk7XG53aW5kb3dbJ2FwcCddID0gYXBwO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudHMvUHJvcGVydHlDaGFuZ2VkRXZlbnQnKTtcbnZhciBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyJyk7XG52YXIgRW1pdHRhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRW1pdHRhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEVtaXR0YWJsZSgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdHRhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIEVtaXR0YWJsZS5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKHRoaXMuZW1pdHRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEVtaXR0YWJsZTtcbn0oRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkVtaXR0YWJsZSA9IEVtaXR0YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVtaXR0YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcImFyZ3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9hcmdzID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuRXZlbnQgPSBFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEV2ZW50R2VuZXJhdG9yXzEgPSByZXF1aXJlKCcuL0V2ZW50R2VuZXJhdG9yJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgICAgIHRoaXMuX19lID0gbmV3IEV2ZW50R2VuZXJhdG9yXzEuRXZlbnRHZW5lcmF0b3IodGhpcyk7XG4gICAgfVxuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7IH07XG4gICAgO1xuICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG59KCkpO1xuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudEVtaXR0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL0V2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbicpO1xudmFyIEV2ZW50R2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEdlbmVyYXRvcihldmVudEdlbmVyYXRvciwgaW5qZWN0KSB7XG4gICAgICAgIGlmIChpbmplY3QgPT09IHZvaWQgMCkgeyBpbmplY3QgPSB0cnVlOyB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLl9vd25lciA9IGV2ZW50R2VuZXJhdG9yO1xuICAgICAgICBpZiAoaW5qZWN0KVxuICAgICAgICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICB9XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX293bmVyLm9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vd25lci5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9mZi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vd25lci5fZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZW1pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnRyaWdnZXJFdmVudChldmVudEFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBuZXcgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uKHRoaXMuX293bmVyLCBldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5fb3duZXI7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZU5hbWUpIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudEdlbmVyYXRvcjtcbn0oKSk7XG5leHBvcnRzLkV2ZW50R2VuZXJhdG9yID0gRXZlbnRHZW5lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudEdlbmVyYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbihzb3VyY2UsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5faG9va3MgPSBbXTtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9ldmVudFNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRBcmdzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5faG9va3MuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgaG9vay5jYWxsKHNlbGYuX2V2ZW50U291cmNlLCBldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0TGlzdGVuZXJzQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ob29rcy5sZW5ndGg7XG4gICAgfTtcbiAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9ob29rcy5wdXNoKGV2ZW50TGlzdGVuZXIpO1xuICAgIH07XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGhvb2tJZCA9IHRoaXMuX2hvb2tzLmluZGV4T2YoZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIGlmIChob29rSWQgPiAtMSlcbiAgICAgICAgICAgIHRoaXMuX2hvb2tzLnNwbGljZShob29rSWQsIDEpO1xuICAgICAgICByZXR1cm4gKGhvb2tJZCA+IC0xKTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG59KCkpO1xuZXhwb3J0cy5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBFdmVudF8xID0gcmVxdWlyZSgnLi4vRXZlbnQnKTtcbnZhciBDb2xsZWN0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sbGVjdGlvbkV2ZW50KHRhcmdldCwgaXRlbSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBDb2xsZWN0aW9uRXZlbnQ7XG59KEV2ZW50XzEuRXZlbnQpKTtcbmV4cG9ydHMuQ29sbGVjdGlvbkV2ZW50ID0gQ29sbGVjdGlvbkV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29sbGVjdGlvbkV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgVUlFdmVudF8xID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG52YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eUNoYW5nZWRFdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0YXJnZXQsIHByb3BOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BOYW1lLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG59KFVJRXZlbnRfMS5VSUV2ZW50KSk7XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFVJRXZlbnRfMSA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xudmFyIFVJQ29tbW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSUNvbW1vbkV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVJQ29tbW9uRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBVSUNvbW1vbkV2ZW50O1xufShVSUV2ZW50XzEuVUlFdmVudCkpO1xuZXhwb3J0cy5VSUNvbW1vbkV2ZW50ID0gVUlDb21tb25FdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJQ29tbW9uRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBFdmVudF8xID0gcmVxdWlyZSgnLi4vRXZlbnQnKTtcbnZhciBVSUV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVUlFdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSUV2ZW50KHRhcmdldCwgYXJncykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gVUlFdmVudDtcbn0oRXZlbnRfMS5FdmVudCkpO1xuZXhwb3J0cy5VSUV2ZW50ID0gVUlFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBVSUV2ZW50XzEgPSByZXF1aXJlKCcuL1VJRXZlbnQnKTtcbnZhciBVSU1vdXNlRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSU1vdXNlRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVUlNb3VzZUV2ZW50KHRhcmdldCwgd2luZG93Q2xpY2tFdmVudCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgIHR5cGU6IHdpbmRvd0NsaWNrRXZlbnQudHlwZSxcbiAgICAgICAgICAgIHRhcmdldDogdGFyZ2V0LFxuICAgICAgICAgICAga2V5czoge1xuICAgICAgICAgICAgICAgIGN0cmw6IHdpbmRvd0NsaWNrRXZlbnQuY3RybEtleSxcbiAgICAgICAgICAgICAgICBhbHQ6IHdpbmRvd0NsaWNrRXZlbnQuYWx0S2V5LFxuICAgICAgICAgICAgICAgIHNoaWZ0OiB3aW5kb3dDbGlja0V2ZW50LnNoaWZ0S2V5LFxuICAgICAgICAgICAgICAgIG1ldGE6IHdpbmRvd0NsaWNrRXZlbnQubWV0YUtleVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHBvc2l0aW9uOiB7XG4gICAgICAgICAgICAgICAgeDogd2luZG93Q2xpY2tFdmVudC5sYXllclgsXG4gICAgICAgICAgICAgICAgeTogd2luZG93Q2xpY2tFdmVudC5sYXllcllcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBVSU1vdXNlRXZlbnQ7XG59KFVJRXZlbnRfMS5VSUV2ZW50KSk7XG5leHBvcnRzLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJTW91c2VFdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFbWl0dGFibGVfMSA9IHJlcXVpcmUoJy4vZXZlbnQvRW1pdHRhYmxlJyk7XG5leHBvcnRzLkVtaXR0YWJsZSA9IEVtaXR0YWJsZV8xLkVtaXR0YWJsZTtcbnZhciBFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9FdmVudCcpO1xuZXhwb3J0cy5FdmVudCA9IEV2ZW50XzEuRXZlbnQ7XG52YXIgRXZlbnRFbWl0dGVyXzEgPSByZXF1aXJlKCcuL2V2ZW50L0V2ZW50RW1pdHRlcicpO1xuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXJfMS5FdmVudEVtaXR0ZXI7XG52YXIgRXZlbnRHZW5lcmF0b3JfMSA9IHJlcXVpcmUoJy4vZXZlbnQvRXZlbnRHZW5lcmF0b3InKTtcbmV4cG9ydHMuRXZlbnRHZW5lcmF0b3IgPSBFdmVudEdlbmVyYXRvcl8xLkV2ZW50R2VuZXJhdG9yO1xudmFyIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbl8xID0gcmVxdWlyZSgnLi9ldmVudC9FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24nKTtcbmV4cG9ydHMuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uID0gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xudmFyIENvbGxlY3Rpb25FdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvQ29sbGVjdGlvbkV2ZW50Jyk7XG5leHBvcnRzLkNvbGxlY3Rpb25FdmVudCA9IENvbGxlY3Rpb25FdmVudF8xLkNvbGxlY3Rpb25FdmVudDtcbnZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvUHJvcGVydHlDaGFuZ2VkRXZlbnQnKTtcbmV4cG9ydHMuUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xLlByb3BlcnR5Q2hhbmdlZEV2ZW50O1xudmFyIFVJRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnRzL1VJRXZlbnQnKTtcbmV4cG9ydHMuVUlFdmVudCA9IFVJRXZlbnRfMS5VSUV2ZW50O1xudmFyIFVJQ29tbW9uRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnRzL1VJQ29tbW9uRXZlbnQnKTtcbmV4cG9ydHMuVUlDb21tb25FdmVudCA9IFVJQ29tbW9uRXZlbnRfMS5VSUNvbW1vbkV2ZW50O1xudmFyIFVJTW91c2VFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvVUlNb3VzZUV2ZW50Jyk7XG5leHBvcnRzLlVJTW91c2VFdmVudCA9IFVJTW91c2VFdmVudF8xLlVJTW91c2VFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWV2ZW50cy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBWZXJzaW9uXzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvY2xhc3Nlcy9WZXJzaW9uJyk7XG5leHBvcnRzLlZlcnNpb24gPSBWZXJzaW9uXzEuVmVyc2lvbjtcbnZhciBEb21haW5fMSA9IHJlcXVpcmUoJy4vaGVscGVycy9jbGFzc2VzL0RvbWFpbicpO1xuZXhwb3J0cy5Eb21haW4gPSBEb21haW5fMS5Eb21haW47XG52YXIgRGljdGlvbmFyeV8xID0gcmVxdWlyZSgnLi9oZWxwZXJzL2NsYXNzZXMvRGljdGlvbmFyeScpO1xuZXhwb3J0cy5EaWN0aW9uYXJ5ID0gRGljdGlvbmFyeV8xLkRpY3Rpb25hcnk7XG52YXIgaXNzZXRfMSA9IHJlcXVpcmUoJy4vaGVscGVycy9pc3NldCcpO1xuZXhwb3J0cy5pc3NldCA9IGlzc2V0XzEuaXNzZXQ7XG52YXIgX2RlZmluZWRfMSA9IHJlcXVpcmUoJy4vaGVscGVycy8kZGVmaW5lZCcpO1xuZXhwb3J0cy4kZGVmaW5lZCA9IF9kZWZpbmVkXzEuJGRlZmluZWQ7XG52YXIgX2FzeW5jXzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvJGFzeW5jJyk7XG5leHBvcnRzLiRhc3luYyA9IF9hc3luY18xLiRhc3luYztcbnZhciBfbnVsbF8xID0gcmVxdWlyZSgnLi9oZWxwZXJzLyRudWxsJyk7XG5leHBvcnRzLiRudWxsID0gX251bGxfMS4kbnVsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWhlbHBlcnMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRG9tYWluXzEgPSByZXF1aXJlKCcuL2NsYXNzZXMvRG9tYWluJyk7XG5mdW5jdGlvbiAkYXN5bmMobWV0aG9kLCBvbkVycm9yKSB7XG4gICAgaWYgKG9uRXJyb3IgPT09IHZvaWQgMCkgeyBvbkVycm9yID0gY29uc29sZS5lcnJvcjsgfVxuICAgIHZhciBsb2NhbERvbWFpbiA9IG5ldyBEb21haW5fMS5Eb21haW4oKTtcbiAgICBsb2NhbERvbWFpbi5vbignZXJyb3InLCBvbkVycm9yKTtcbiAgICBsb2NhbERvbWFpbi5ydW4obWV0aG9kKTtcbn1cbmV4cG9ydHMuJGFzeW5jID0gJGFzeW5jO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9JGFzeW5jLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gJGRlZmluZWQoZSkge1xuICAgIHJldHVybiB0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLiRkZWZpbmVkID0gJGRlZmluZWQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0kZGVmaW5lZC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uICRudWxsKHZhbCkge1xuICAgIHJldHVybiB2YWwgPT09IG51bGw7XG59XG5leHBvcnRzLiRudWxsID0gJG51bGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0kbnVsbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfbnVsbF8xID0gcmVxdWlyZSgnLi4vJG51bGwnKTtcbnZhciBfZGVmaW5lZF8xID0gcmVxdWlyZSgnLi4vJGRlZmluZWQnKTtcbnZhciBEaWN0aW9uYXJ5ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBEaWN0aW9uYXJ5KCkge1xuICAgICAgICB0aGlzLl9pdGVtcyA9IHt9O1xuICAgICAgICB0aGlzLl9hbGlhc2VzID0ge307XG4gICAgICAgIHRoaXMuZGVmYXVsdEtleSA9IG51bGw7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShEaWN0aW9uYXJ5LnByb3RvdHlwZSwgXCJsZW5ndGhcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl9pdGVtcykubGVuZ3RoO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5leGlzdHMgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIHJldHVybiBfZGVmaW5lZF8xLiRkZWZpbmVkKHRoaXMuX2l0ZW1zKSAmJiB0aGlzLl9pdGVtcy5oYXNPd25Qcm9wZXJ0eShrZXkpO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuZ2V0ID0gZnVuY3Rpb24gKGtleSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSBudWxsOyB9XG4gICAgICAgIHJldHVybiB0aGlzLmV4aXN0cyhrZXkpID8gdGhpcy5faXRlbXNba2V5XSA6IHRoaXMuX2dldFZhbHVlRnJvbUFsaWFzKGtleSwgZGVmYXVsdFZhbHVlKTtcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLl9saW5rQWxpYXMgPSBmdW5jdGlvbiAoYWxpYXMsIGtleSkge1xuICAgICAgICB0aGlzLl9hbGlhc2VzW2FsaWFzLnRyaW0oKV0gPSBrZXkudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLl9nZXRWYWx1ZUZyb21BbGlhcyA9IGZ1bmN0aW9uIChhbGlhcywgZGVmYXVsdFZhbHVlKSB7XG4gICAgICAgIGlmIChkZWZhdWx0VmFsdWUgPT09IHZvaWQgMCkgeyBkZWZhdWx0VmFsdWUgPSBudWxsOyB9XG4gICAgICAgIHZhciBhbGlhc1ZhbHVlID0gdGhpcy5fYWxpYXNlc1thbGlhc107XG4gICAgICAgIGlmICghX2RlZmluZWRfMS4kZGVmaW5lZChhbGlhc1ZhbHVlKSB8fCAhdGhpcy5leGlzdHMoYWxpYXNWYWx1ZSkpIHtcbiAgICAgICAgICAgIGlmIChfbnVsbF8xLiRudWxsKGRlZmF1bHRWYWx1ZSkgJiYgIV9udWxsXzEuJG51bGwodGhpcy5kZWZhdWx0S2V5KSkge1xuICAgICAgICAgICAgICAgIGRlZmF1bHRWYWx1ZSA9IHRoaXMuZ2V0KHRoaXMuZGVmYXVsdEtleSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gZGVmYXVsdFZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB0aGlzLl9pdGVtc1thbGlhc1ZhbHVlXTtcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmFsaWFzID0gZnVuY3Rpb24gKGFsaWFzZXMsIGtleSwgZm9yY2UpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKGZvcmNlID09PSB2b2lkIDApIHsgZm9yY2UgPSBmYWxzZTsgfVxuICAgICAgICBpZiAoIXRoaXMuZXhpc3RzKGtleSkgJiYgIWZvcmNlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiSXRlbSB3aXRoIGtleSAnXCIgKyBrZXkgKyBcIicgZG9lc24ndCBleGlzdHMuXCIpO1xuICAgICAgICBhbGlhc2VzLnNwbGl0KCcsJykuZm9yRWFjaChmdW5jdGlvbiAoYWxpYXMpIHtcbiAgICAgICAgICAgIF90aGlzLl9saW5rQWxpYXMoYWxpYXMsIGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChrZXksIHZhbHVlLCBvdmVyd3JpdGUpIHtcbiAgICAgICAgaWYgKG92ZXJ3cml0ZSA9PT0gdm9pZCAwKSB7IG92ZXJ3cml0ZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmICh0aGlzLmV4aXN0cyhrZXkpICYmICFvdmVyd3JpdGUpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJJdGVtIHdpdGgga2V5ICdcIiArIGtleSArIFwiJyBhbHJlYWR5IGV4aXN0cy5cIik7XG4gICAgICAgIHRoaXMuX2l0ZW1zW2tleV0gPSB2YWx1ZTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoa2V5KSB7XG4gICAgICAgIGlmICghdGhpcy5leGlzdHMoa2V5KSlcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIkl0ZW0gd2l0aCBrZXkgJ1wiICsga2V5ICsgXCInIGRvZXNuJ3QgZXhpc3RzLlwiKTtcbiAgICAgICAgZGVsZXRlIHRoaXMuX2l0ZW1zW2tleV07XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB2YXIgaSA9IHRoaXMuX2l0ZW1zO1xuICAgICAgICBmb3IgKHZhciBrZXkgaW4gaSkge1xuICAgICAgICAgICAgaWYgKGkuaGFzT3duUHJvcGVydHkoa2V5KSkge1xuICAgICAgICAgICAgICAgIGNhbGxiYWNrKGlba2V5XSwga2V5LCBpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIERpY3Rpb25hcnk7XG59KCkpO1xuZXhwb3J0cy5EaWN0aW9uYXJ5ID0gRGljdGlvbmFyeTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURpY3Rpb25hcnkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIERvbWFpbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKERvbWFpbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBEb21haW4oKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgIH1cbiAgICBEb21haW4ucHJvdG90eXBlLl9leGVjdXRlID0gZnVuY3Rpb24gKG1ldGhvZCkge1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgbWV0aG9kKCk7XG4gICAgICAgIH1cbiAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdlcnJvcicsIGV4KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRG9tYWluLnByb3RvdHlwZS5ydW4gPSBmdW5jdGlvbiAoZnVuYykge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIF90aGlzLl9leGVjdXRlKGZ1bmMpO1xuICAgICAgICB9LCAwKTtcbiAgICB9O1xuICAgIHJldHVybiBEb21haW47XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Eb21haW4gPSBEb21haW47XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Eb21haW4uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVmVyc2lvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVmVyc2lvbihtYWpvciwgbWlub3IsIHBhdGNoKSB7XG4gICAgICAgIGlmIChtYWpvciA9PT0gdm9pZCAwKSB7IG1ham9yID0gMDsgfVxuICAgICAgICBpZiAobWlub3IgPT09IHZvaWQgMCkgeyBtaW5vciA9IDA7IH1cbiAgICAgICAgaWYgKHBhdGNoID09PSB2b2lkIDApIHsgcGF0Y2ggPSAwOyB9XG4gICAgICAgIHRoaXMubWFqb3IgPSBtYWpvcjtcbiAgICAgICAgdGhpcy5taW5vciA9IG1pbm9yO1xuICAgICAgICB0aGlzLnBhdGNoID0gcGF0Y2g7XG4gICAgfVxuICAgIFZlcnNpb24ucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMubWFqb3IsIHRoaXMubWlub3IsIHRoaXMucGF0Y2hdLmpvaW4oJy4nKTtcbiAgICB9O1xuICAgIHJldHVybiBWZXJzaW9uO1xufSgpKTtcbmV4cG9ydHMuVmVyc2lvbiA9IFZlcnNpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1WZXJzaW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gaXNzZXQoZSkge1xuICAgIHJldHVybiB0eXBlb2YgZSAhPT0gJ3VuZGVmaW5lZCc7XG59XG5leHBvcnRzLmlzc2V0ID0gaXNzZXQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1pc3NldC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBQb2ludF8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Qb2ludCcpO1xuZXhwb3J0cy5Qb2ludCA9IFBvaW50XzEuUG9pbnQ7XG52YXIgQm94TW9kZWxFbGVtZW50XzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0JveE1vZGVsRWxlbWVudCcpO1xuZXhwb3J0cy5Cb3hNb2RlbEVsZW1lbnQgPSBCb3hNb2RlbEVsZW1lbnRfMS5Cb3hNb2RlbEVsZW1lbnQ7XG52YXIgR1VJRF8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9HVUlEJyk7XG5leHBvcnRzLkdVSUQgPSBHVUlEXzEuR1VJRDtcbnZhciBUZXh0QWxpZ25fMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvVGV4dEFsaWduJyk7XG5leHBvcnRzLlRleHRBbGlnbiA9IFRleHRBbGlnbl8xLlRleHRBbGlnbjtcbnZhciBGb250XzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0ZvbnQnKTtcbmV4cG9ydHMuRm9udCA9IEZvbnRfMS5Gb250O1xudmFyIEZvbnRTdHlsZV8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Gb250U3R5bGUnKTtcbmV4cG9ydHMuRm9udFN0eWxlID0gRm9udFN0eWxlXzEuRm9udFN0eWxlO1xudmFyIENvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvQ29sbGVjdGlvbicpO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb247XG52YXIgQ29tcG9uZW50TWFwcGVyXzEgPSByZXF1aXJlKCcuL3VpL0NvbXBvbmVudE1hcHBlcicpO1xuZXhwb3J0cy5Db21wb25lbnRNYXBwZXIgPSBDb21wb25lbnRNYXBwZXJfMS5Db21wb25lbnRNYXBwZXI7XG52YXIgVUlDb21wb25lbnRfMSA9IHJlcXVpcmUoJy4vdWkvVUlDb21wb25lbnQnKTtcbmV4cG9ydHMuVUlDb21wb25lbnQgPSBVSUNvbXBvbmVudF8xLlVJQ29tcG9uZW50O1xudmFyIEZvcm1fMSA9IHJlcXVpcmUoJy4vdWkvRm9ybScpO1xuZXhwb3J0cy5Gb3JtID0gRm9ybV8xLkZvcm07XG4vLyMgc291cmNlTWFwcGluZ1VSTD11aS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXJfMSA9IHJlcXVpcmUoJy4vYnJvYWRjYXN0ZXJzL0NhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlcicpO1xudmFyIENvbXBvbmVudE1hcHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50TWFwcGVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMuX2d1aWRNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RlcnMgPSBbXTtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICB0aGlzLmJyb2FkY2FzdGVycy5wdXNoKG5ldyBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXJfMS5DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIob3duZXIsIENvbXBvbmVudE1hcHBlci5ET01Nb3VzZUV2ZW50cywgZmFsc2UpKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUsIFwiY3VycmVudE1vdXNlRWxlbWVudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRNb3VzZUVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZUVsZW1lbnQgPSBlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZSwgXCJjdXJyZW50Rm9jdXNlZEVsZW1lbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Rm9jdXNlZEVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRGb2N1c2VkRWxlbWVudCA9IGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RlcnMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5sb2FkKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5fcmVnaXN0ZXJJZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2d1aWRNYXBbZWxlbWVudC5pZC50b1N0cmluZygpXSA9IGVsZW1lbnQ7XG4gICAgfTtcbiAgICBDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gKGVpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3VpZE1hcFtlaWRdO1xuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVySWQoaXRlbSk7XG4gICAgfTtcbiAgICBDb21wb25lbnRNYXBwZXIuRE9NTW91c2VFdmVudHMgPSBbXG4gICAgICAgICdjbGljaycsXG4gICAgICAgICdkYmxjbGljaycsXG4gICAgICAgICdtb3VzZWRvd24nLFxuICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICdtb3VzZW92ZXInLFxuICAgICAgICAnbW91c2VvdXQnLFxuICAgICAgICAnbW91c2Vtb3ZlJ107XG4gICAgQ29tcG9uZW50TWFwcGVyLkRPTUV2ZW50cyA9IFtcbiAgICAgICAgJ2tleWRvd24nLFxuICAgICAgICAna2V5dXAnLFxuICAgICAgICAna2V5cHJlc3MnXG4gICAgXTtcbiAgICByZXR1cm4gQ29tcG9uZW50TWFwcGVyO1xufSgpKTtcbmV4cG9ydHMuQ29tcG9uZW50TWFwcGVyID0gQ29tcG9uZW50TWFwcGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcG9uZW50TWFwcGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi9ldmVudHMnKTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi9oZWxwZXJzJyk7XG52YXIgQ29tcG9uZW50TWFwcGVyXzEgPSByZXF1aXJlKCcuL0NvbXBvbmVudE1hcHBlcicpO1xudmFyIENvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vdHlwZXMvQ29sbGVjdGlvbicpO1xudmFyIEZvcm0gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb3JtLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvcm0oaGFuZGxlciwgYm9vdHN0cmFwKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBuZXcgaGVscGVyc18xLlZlcnNpb24oMCwgNCwgMCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMudGFiSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5mb2N1cygpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jYW52YXMsICdmb3JtJywge1xuICAgICAgICAgICAgdmFsdWU6IHNlbGYsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYm9vdHN0cmFwKVxuICAgICAgICAgICAgYm9vdHN0cmFwLmNhbGwoc2VsZiwgaGFuZGxlcik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb24obnVsbCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29udHJvbHMub24oJ2VsZW1lbnRJbnNlcnRlZCcsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9lbWl0KCdkcmF3U3RhcnQnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCB7fSkpO1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgQ29tcG9uZW50TWFwcGVyXzEuQ29tcG9uZW50TWFwcGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm9uKCdyZWRyYXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnJlZHJhdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9tYXAubG9hZCgpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJtYXBwZXJcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXA7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZvcm0ucHJvdG90eXBlLnJlZHJhd0NvbnRleHQgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVkcmF3JywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmb3JjZSB9KSk7XG4gICAgfTtcbiAgICBGb3JtLnByb3RvdHlwZS5yZWdpc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB0aGlzLm1hcHBlci5yZWdpc3RlcihlbGVtZW50KTtcbiAgICB9O1xuICAgIEZvcm0ucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIH07XG4gICAgRm9ybS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBGb3JtO1xufShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuRm9ybSA9IEZvcm07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Gb3JtLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi9ldmVudHMnKTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi9oZWxwZXJzJyk7XG52YXIgQm94TW9kZWxFbGVtZW50XzEgPSByZXF1aXJlKCcuL3R5cGVzL0JveE1vZGVsRWxlbWVudCcpO1xudmFyIENvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vdHlwZXMvQ29sbGVjdGlvbicpO1xudmFyIEdVSURfMSA9IHJlcXVpcmUoJy4vdHlwZXMvR1VJRCcpO1xudmFyIFBvaW50XzEgPSByZXF1aXJlKCcuL3R5cGVzL1BvaW50Jyk7XG52YXIgRm9udF8xID0gcmVxdWlyZSgnLi90eXBlcy9Gb250Jyk7XG52YXIgVUlDb21wb25lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSUNvbXBvbmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSUNvbXBvbmVudChvd25lcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMTI4O1xuICAgICAgICB0aGlzLl93aWR0aCA9IDEyODtcbiAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgICAgICB0aGlzLl9mb3JlQ29sb3IgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3BhZGRpbmcgPSBuZXcgQm94TW9kZWxFbGVtZW50XzEuQm94TW9kZWxFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX21hcmdpbiA9IG5ldyBCb3hNb2RlbEVsZW1lbnRfMS5Cb3hNb2RlbEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5fZm9udCA9IG5ldyBGb250XzEuRm9udCgpO1xuICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG93bmVyLmNvbnRleHQ7XG4gICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3IFBvaW50XzEuUG9pbnQoMCwgMCk7XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb24odGhpcywgb3duZXIpO1xuICAgICAgICBmdW5jdGlvbiBmbk9uVXBkYXRlKCkge1xuICAgICAgICAgICAgc2VsZi5fb25VcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvcEV2ZW50ID0gJ3Byb3BlcnR5Q2hhbmdlJztcbiAgICAgICAgdGhpcy5vbignbGF5ZXJVcGRhdGUnLCB0aGlzLl9vblVwZGF0ZSk7XG4gICAgICAgIHRoaXMub24oJ3Byb3BlcnR5Q2hhbmdlJywgdGhpcy5fb25VcGRhdGUpO1xuICAgICAgICB0aGlzLl9mb250Lm9uKHByb3BFdmVudCwgZm5PblVwZGF0ZSk7XG4gICAgICAgIHRoaXMuX3BhZGRpbmcub24ocHJvcEV2ZW50LCBmbk9uVXBkYXRlKTtcbiAgICAgICAgdGhpcy5fbWFyZ2luLm9uKHByb3BFdmVudCwgZm5PblVwZGF0ZSk7XG4gICAgfVxuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIGlmIChldmVudE5hbWUgPT09IHZvaWQgMCkgeyBldmVudE5hbWUgPSAnZW1pdCc7IH1cbiAgICAgICAgdGhpcy5fZW1pdChldmVudE5hbWUsIGV2ZW50QXJncyk7XG4gICAgICAgIGlmICh0aGlzLmhhc1BhcmVudCgpKVxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW1pdChldmVudE5hbWUsIGV2ZW50QXJncyk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuYnJvYWRjYXN0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzLCBlbWl0T25FdmVudCkge1xuICAgICAgICBpZiAoZXZlbnROYW1lID09PSB2b2lkIDApIHsgZXZlbnROYW1lID0gJ2Jyb2FkY2FzdCc7IH1cbiAgICAgICAgaWYgKGVtaXRPbkV2ZW50ID09PSB2b2lkIDApIHsgZW1pdE9uRXZlbnQgPSB0cnVlOyB9XG4gICAgICAgIGlmIChlbWl0T25FdmVudClcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoZXZlbnROYW1lLCBldmVudEFyZ3MpO1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYnJvYWRjYXN0KGV2ZW50TmFtZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVhY3QgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3QoJ21vdXNlb3ZlcicsIGV2ZW50QXJncywgZmFsc2UpO1xuICAgICAgICB0aGlzLmVtaXQoJ21vdXNlb3ZlcicsIGV2ZW50QXJncyk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImRyYXduXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhd247XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwicGFkZGluZ1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhZGRpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwibWFyZ2luXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFyZ2luO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImZvbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb250O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImlkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzSWQoKSlcbiAgICAgICAgICAgICAgICB0aGlzLl9HVUlEID0gbmV3IEdVSURfMS5HVUlEKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fR1VJRDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmhhc0lkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX0dVSUQgIT09ICd1bmRlZmluZWQnO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJjb250ZXh0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJpc0luamVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fb25VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmF3bilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5vd25lci5fZW1pdCgncmVkcmF3JywgeyByZWxhdGVkVGFyZ2V0OiB0aGlzIH0pO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmluQm91bmRzT2YgPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzKCk7XG4gICAgICAgIHJldHVybiAobG9jYXRpb24ueCA+PSBwb2ludHNbMF0ueCkgJiYgKGxvY2F0aW9uLnggPD0gcG9pbnRzWzFdLngpICYmIChsb2NhdGlvbi55ID49IHBvaW50c1swXS55KSAmJiAobG9jYXRpb24ueSA8PSBwb2ludHNbMl0ueSk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImJhY2tncm91bmRDb2xvclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tncm91bmRDb2xvcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2JhY2tncm91bmRDb2xvcicsIG9sZCwgbmV3Q29sb3IpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJmb3JlQ29sb3JcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JlQ29sb3I7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5fZm9yZUNvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9mb3JlQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdmb3JlQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IG5ld0hlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIG51bGwsIG5ld0hlaWdodCkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1dpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgbnVsbCwgbmV3V2lkdGgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmdldEFic29sdXRlSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuZ2V0QWJzb2x1dGVXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJ0b3BcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXy55O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdiArIDA7XG4gICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXy55ID0gdjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0b3AnLCBvbGQsIHYpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX18ueDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHYgKyAwO1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18ueCA9IHY7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnbGVmdCcsIG9sZCwgdikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInBvc2l0aW9uXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX187XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gbmV3IFBvaW50XzEuUG9pbnQobmV3UG9zaXRpb24ueCwgbmV3UG9zaXRpb24ueSk7XG4gICAgICAgICAgICB0aGlzLnRvcCA9IG5ld1Bvc2l0aW9uLnk7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBuZXdQb3NpdGlvbi54O1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18gPSBuZXdQb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdwb3NpdGlvbicsIG9sZCwgbmV3UG9zaXRpb24pKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnBvaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHAxID0gbmV3IFBvaW50XzEuUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpLCBwMiA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMuZ2V0QWJzb2x1dGVXaWR0aCgpLCB0aGlzLnBvc2l0aW9uLnkpLCBwMyA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMuZ2V0QWJzb2x1dGVXaWR0aCgpLCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmdldEFic29sdXRlSGVpZ2h0KCkpLCBwNCA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKTtcbiAgICAgICAgcmV0dXJuIFtwMSwgcDIsIHAzLCBwNF07XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInBhcmVudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmhhc1BhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChoZWxwZXJzXzEuaXNzZXQodGhpcy5wYXJlbnQpICYmIHRoaXMucGFyZW50ICE9PSBudWxsKTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0luamVjdGVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRWxlbWVudCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVkcmF3JywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmYWxzZSB9KSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLl9kcmF3Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiBfZm5EcmF3Q2hpbGQoZSkge1xuICAgICAgICAgICAgZS5yZWRyYXcoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbWl0KCdyZW5kZXInLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICB0aGlzLl9kcmF3Q2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5fZHJhd24gPSB0cnVlO1xuICAgICAgICB0aGlzLl9lbWl0KCdyZW5kZXJlZCcsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fX2luamVjdCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLl9pbmplY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2ZvbnQuZW1pdHRhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ2luamVjdCcsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIHsgJ3BhcmVudCc6IHBhcmVudCB9KSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5oYXNQYXJlbnQoKSA/IHRoaXMucGFyZW50IDogdGhpcy5vd25lcjtcbiAgICAgICAgcGFyZW50LmNvbnRyb2xzLnJlbW92ZSh0aGlzKTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9lbWl0KCdkaXNwb3NlJywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICB0aGlzLl9pbmplY3RlZCA9IGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIFVJQ29tcG9uZW50O1xufShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuVUlDb21wb25lbnQgPSBVSUNvbXBvbmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJQ29tcG9uZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgUG9pbnRfMSA9IHJlcXVpcmUoJy4uL3R5cGVzL1BvaW50Jyk7XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzJyk7XG52YXIgQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcl8xID0gcmVxdWlyZSgnLi4vdHlwZXMvQ2FudmFzRXZlbnRCcm9hZGNhc3RlcicpO1xudmFyIENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIob3duZXIsIGV2ZW50cywgYXV0b2JpbmQpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdm9pZCAwKSB7IGV2ZW50cyA9IFtdOyB9XG4gICAgICAgIGlmIChhdXRvYmluZCA9PT0gdm9pZCAwKSB7IGF1dG9iaW5kID0gZmFsc2U7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgb3duZXIsIGV2ZW50cyk7XG4gICAgICAgIHRoaXMuZWxlbWVudEZvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVycyA9IG5ldyBoZWxwZXJzXzEuRGljdGlvbmFyeSgpO1xuICAgICAgICB0aGlzLl9pbml0SGFuZGxlcnMoKTtcbiAgICB9XG4gICAgQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5faW5pdEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMuZGVmYXVsdEtleSA9ICdtb3VzZW1vdmUnO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNcbiAgICAgICAgICAgIC5hZGQoJ2NsaWNrJywgZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChvbGQgPT09IG51bGwgfHwgKG9sZC5pZCA9PT0gZWxlbWVudC5pZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZWFjdChldmVudC50eXBlLCB0RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkLmJyb2FkY2FzdCgnYmx1cicsIG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZWFjdChldmVudC50eXBlLCB0RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudDtcbiAgICAgICAgICAgIGlmICgob2xkID09PSBudWxsKSB8fCAob2xkLmlkID09PSBlbGVtZW50LmlkKSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUud2Fybignc2FtZSBvciBudWxsJyk7XG4gICAgICAgICAgICAgICAgaWYgKCFoZWxwZXJzXzEuJG51bGwob2xkKSAmJiAob2xkWydpZCddID09PSBlbGVtZW50LmlkKSlcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIHZhciB0RXZlbnQgPSBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmVtaXQoJ21vdXNlb3ZlcicsIHRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLndhcm4oJ25vdCBzYW1lIG9yIG51bGwnKTtcbiAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChvbGQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBvbGQuZW1pdCgnbW91c2VvdXQnLCB0RXZlbnQpO1xuICAgICAgICAgICAgICAgIHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIHZhciB0RXZlbnQgPSBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmVtaXQoJ21vdXNlb3ZlcicsIHRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWxpYXMoJ2RibGNsaWNrLCBtb3VzZWRvd24sIG1vdXNldXAsIG1vdXNlb3V0JywgJ2NsaWNrJyk7XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnRhcmdldEV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwID0gbmV3IFBvaW50XzEuUG9pbnQoZXZlbnQubGF5ZXJYLCBldmVudC5sYXllclkpO1xuICAgICAgICBpZiAoZWxlbWVudC5pbkJvdW5kc09mKHApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFjdChlbGVtZW50LCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKF9lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGFyZ2V0RXZlbnQoX2VsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVycy5nZXQoZXZlbnQudHlwZSkuY2FsbCh0aGlzLCBlbGVtZW50LCBldmVudCk7XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLmJpbmRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLm93bmVyO1xuICAgICAgICBvd25lci5fZW1pdChldmVudC50eXBlLCBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KG93bmVyLCBldmVudCkpO1xuICAgICAgICBvd25lci5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBfdGhpcy50YXJnZXRFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudEZvdW5kKVxuICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgfTtcbiAgICByZXR1cm4gQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyO1xufShDYW52YXNFdmVudEJyb2FkY2FzdGVyXzEuQ2FudmFzRXZlbnRCcm9hZGNhc3RlcikpO1xuZXhwb3J0cy5DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIgPSBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIEJveE1vZGVsRWxlbWVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJveE1vZGVsRWxlbWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb3hNb2RlbEVsZW1lbnQodG9wLCByaWdodCwgYm90dG9tLCBsZWZ0KSB7XG4gICAgICAgIGlmICh0b3AgPT09IHZvaWQgMCkgeyB0b3AgPSAwOyB9XG4gICAgICAgIGlmIChyaWdodCA9PT0gdm9pZCAwKSB7IHJpZ2h0ID0gMDsgfVxuICAgICAgICBpZiAoYm90dG9tID09PSB2b2lkIDApIHsgYm90dG9tID0gMDsgfVxuICAgICAgICBpZiAobGVmdCA9PT0gdm9pZCAwKSB7IGxlZnQgPSAwOyB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl90b3AgPSB0b3A7XG4gICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xuICAgICAgICB0aGlzLl9yaWdodCA9IHJpZ2h0O1xuICAgICAgICB0aGlzLl9ib3R0b20gPSBib3R0b207XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcInRvcFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvcDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvcCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3RvcCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcmlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdyaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJib3R0b21cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib3R0b207XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9ib3R0b20gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdib3R0b20nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJveE1vZGVsRWxlbWVudC5wcm90b3R5cGUsIFwibGVmdFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWZ0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQm94TW9kZWxFbGVtZW50O1xufShldmVudHNfMS5FbWl0dGFibGUpKTtcbmV4cG9ydHMuQm94TW9kZWxFbGVtZW50ID0gQm94TW9kZWxFbGVtZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Qm94TW9kZWxFbGVtZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIob3duZXIsIGV2ZW50cywgYXV0b2JpbmQpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdm9pZCAwKSB7IGV2ZW50cyA9IFtdOyB9XG4gICAgICAgIGlmIChhdXRvYmluZCA9PT0gdm9pZCAwKSB7IGF1dG9iaW5kID0gZmFsc2U7IH1cbiAgICAgICAgdGhpcy5fbG9hZGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBldmVudHM7XG4gICAgICAgIGlmIChhdXRvYmluZClcbiAgICAgICAgICAgIHRoaXMubG9hZCgpO1xuICAgIH1cbiAgICBDYW52YXNFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5iaW5kRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnQpIHsgfTtcbiAgICBDYW52YXNFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5yZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCkgeyB9O1xuICAgIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnRhcmdldEV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7IH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLCBcImxvYWRlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xvYWRlZDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgQ2FudmFzRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgaWYgKHRoaXMubG9hZGVkKVxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLm1hcHBlciA9IHRoaXMub3duZXIubWFwcGVyO1xuICAgICAgICB0aGlzLmV2ZW50cy5mb3JFYWNoKGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgICAgIF90aGlzLm93bmVyLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKGV2ZW50TmFtZSwgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMuYmluZEV2ZW50KGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbG9hZGVkID0gdHJ1ZTtcbiAgICB9O1xuICAgIHJldHVybiBDYW52YXNFdmVudEJyb2FkY2FzdGVyO1xufSgpKTtcbmV4cG9ydHMuQ2FudmFzRXZlbnRCcm9hZGNhc3RlciA9IENhbnZhc0V2ZW50QnJvYWRjYXN0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1DYW52YXNFdmVudEJyb2FkY2FzdGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciBldmVudHNfMiA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIFBvaW50XzEgPSByZXF1aXJlKCcuL1BvaW50Jyk7XG52YXIgQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbGxlY3Rpb24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sbGVjdGlvbihoYW5kbGVyLCBhcHBJbnN0YW5jZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5jb2xsZWN0aW9uSGFuZGxlciA9IGhhbmRsZXI7XG4gICAgICAgIHRoaXMuaXRlbXMgPSBbXTtcbiAgICAgICAgdGhpcy5fZGVmYXVsdEZvcm0gPSBhcHBJbnN0YW5jZTtcbiAgICB9XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgaXRlbS5fX2luamVjdCh0aGlzLmNvbGxlY3Rpb25IYW5kbGVyKTtcbiAgICAgICAgdGhpcy5pdGVtcy5wdXNoKGl0ZW0pO1xuICAgICAgICB0aGlzLl9lbWl0KCdlbGVtZW50SW5zZXJ0ZWQnLCBuZXcgZXZlbnRzXzIuQ29sbGVjdGlvbkV2ZW50KHRoaXMsIGl0ZW0pKTtcbiAgICB9O1xuICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5pdGVtcy5pbmRleE9mKGl0ZW0pO1xuICAgICAgICBpZiAoaSA+IC0xKSB7XG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLmRpc3Bvc2UoKTtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2VsZW1lbnRSZW1vdmUnLCBuZXcgZXZlbnRzXzIuQ29sbGVjdGlvbkV2ZW50KHRoaXMsIHRoaXMuaXRlbXNbaV0pKTtcbiAgICAgICAgICAgIHRoaXMuaXRlbXMuc3BsaWNlKGksIDEpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHRoaXMuaXRlbXMuZm9yRWFjaC5jYWxsKHRoaXMuaXRlbXMsIGNhbGxiYWNrKTtcbiAgICB9O1xuICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmJyb2FkY2FzdCA9IGZ1bmN0aW9uIChkb21FdmVudCwgZXZlbnRDb25zdHJ1Y3RvciwgY2hlY2tCb3VuZHMsIHBvaW50KSB7XG4gICAgICAgIGlmIChjaGVja0JvdW5kcyA9PT0gdm9pZCAwKSB7IGNoZWNrQm91bmRzID0gdHJ1ZTsgfVxuICAgICAgICBpZiAocG9pbnQgPT09IHZvaWQgMCkgeyBwb2ludCA9IG5ldyBQb2ludF8xLlBvaW50KDAsIDApOyB9XG4gICAgICAgIHRoaXMuZm9yRWFjaChmdW5jdGlvbiBicm9hZGNhc3RFdmVudChlKSB7XG4gICAgICAgICAgICB2YXIgaW5Cb3VuZHMgPSAoY2hlY2tCb3VuZHMpID8gZS5pbkJvdW5kc09mKHBvaW50KSA6IHRydWU7XG4gICAgICAgICAgICBpZiAoaW5Cb3VuZHMpIHtcbiAgICAgICAgICAgICAgICBlLl9lbWl0KGRvbUV2ZW50LnR5cGUsIGV2ZW50Q29uc3RydWN0b3IoZG9tRXZlbnQudHlwZSwgZSkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGNoZWNrQm91bmRzUmVjdXJzaXZlID0gY2hlY2tCb3VuZHM7XG4gICAgICAgICAgICBpZiAoaW5Cb3VuZHMpXG4gICAgICAgICAgICAgICAgY2hlY2tCb3VuZHNSZWN1cnNpdmUgPSBmYWxzZTtcbiAgICAgICAgICAgIGUuY29udHJvbHMuYnJvYWRjYXN0KGRvbUV2ZW50LCBldmVudENvbnN0cnVjdG9yLCBjaGVja0JvdW5kc1JlY3Vyc2l2ZSwgcG9pbnQpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBDb2xsZWN0aW9uO1xufShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db2xsZWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgaGVscGVyc18xID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycycpO1xudmFyIEZvbnRTdHlsZV8xID0gcmVxdWlyZSgnLi9Gb250U3R5bGUnKTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIEZvbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb250LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvbnQoZmFtaWx5LCBzaXplLCB3ZWlnaHQpIHtcbiAgICAgICAgaWYgKGZhbWlseSA9PT0gdm9pZCAwKSB7IGZhbWlseSA9ICdzYW5zLXNlcmlmJzsgfVxuICAgICAgICBpZiAoc2l6ZSA9PT0gdm9pZCAwKSB7IHNpemUgPSAxMDsgfVxuICAgICAgICBpZiAod2VpZ2h0ID09PSB2b2lkIDApIHsgd2VpZ2h0ID0gNDAwOyB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmVtaXR0YWJsZSA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9mYW1pbHkgPSBmYW1pbHk7XG4gICAgICAgIHRoaXMuX3NpemUgPSBzaXplO1xuICAgICAgICB0aGlzLl93ZWlnaHQgPSB3ZWlnaHQ7XG4gICAgICAgIHRoaXMuX3N0eWxlID0gRm9udFN0eWxlXzEuRm9udFN0eWxlLm5vcm1hbDtcbiAgICB9XG4gICAgRm9udC5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKHRoaXMuZW1pdHRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCBwcm9wLCBudWxsLCBudWxsKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiAoIWhlbHBlcnNfMS5pc3NldCh0aGlzLl9oZWlnaHQpIHx8IHR5cGVvZiB0aGlzLl9oZWlnaHQgPT0gJ3VuZGVmaW5lZCcpID8gKHRoaXMuX3NpemUgKiAxLjIpIHwgMCA6IHRoaXMuX2hlaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2hlaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwid2VpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2VpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fd2VpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnd2VpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJzdHlsZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9zdHlsZSA9IHY7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnc3R5bGUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcImZhbWlseVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZhbWlseTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5fZmFtaWx5ID0gdjtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdmYW1pbHknKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInNpemVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zaXplO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9zaXplID0gdjtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzaXplJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZvbnQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gW3RoaXMuc3R5bGUudG9TdHJpbmcoKSwgdGhpcy53ZWlnaHQsIHRoaXMuc2l6ZSArICdweC8nICsgdGhpcy5oZWlnaHQgKyAncHgnLCB0aGlzLmZhbWlseV0uam9pbignICcpO1xuICAgIH07XG4gICAgcmV0dXJuIEZvbnQ7XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Gb250ID0gRm9udDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZvbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRm9udFN0eWxlID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBGb250U3R5bGUodHlwZSkge1xuICAgICAgICB0aGlzLl9zdHlsZVR5cGUgPSB0eXBlO1xuICAgIH1cbiAgICBGb250U3R5bGUucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGVUeXBlLnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICBGb250U3R5bGUubm9ybWFsID0gbmV3IEZvbnRTdHlsZSgnbm9ybWFsJyk7XG4gICAgRm9udFN0eWxlLml0YWxpYyA9IG5ldyBGb250U3R5bGUoJ2l0YWxpYycpO1xuICAgIHJldHVybiBGb250U3R5bGU7XG59KCkpO1xuZXhwb3J0cy5Gb250U3R5bGUgPSBGb250U3R5bGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Gb250U3R5bGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgR1VJRCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gR1VJRCgpIHtcbiAgICAgICAgdmFyIHZhbHVlID0gR1VJRC5nZW5lcmF0ZSgpO1xuICAgICAgICB0aGlzLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkgeyByZXR1cm4gdmFsdWU7IH07XG4gICAgfVxuICAgIEdVSUQuZ2VuZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGZ1bmN0aW9uIHM0KCkge1xuICAgICAgICAgICAgcmV0dXJuIE1hdGguZmxvb3IoKDEgKyBNYXRoLnJhbmRvbSgpKSAqIDB4MTAwMDApXG4gICAgICAgICAgICAgICAgLnRvU3RyaW5nKDE2KVxuICAgICAgICAgICAgICAgIC5zdWJzdHJpbmcoMSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHM0KCkgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArIHM0KCkgKyAnLScgK1xuICAgICAgICAgICAgczQoKSArICctJyArIHM0KCkgKyBzNCgpICsgczQoKTtcbiAgICB9O1xuICAgIEdVSUQucHJvdG90eXBlLnRvU3RyaW5nID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgfTtcbiAgICBHVUlELnByb3RvdHlwZS5sZW5ndGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnRvU3RyaW5nKCkubGVuZ3RoO1xuICAgIH07XG4gICAgcmV0dXJuIEdVSUQ7XG59KCkpO1xuZXhwb3J0cy5HVUlEID0gR1VJRDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUdVSUQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgUG9pbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFBvaW50KHgsIHkpIHtcbiAgICAgICAgdGhpcy54ID0geDtcbiAgICAgICAgdGhpcy55ID0geTtcbiAgICB9XG4gICAgcmV0dXJuIFBvaW50O1xufSgpKTtcbmV4cG9ydHMuUG9pbnQgPSBQb2ludDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVBvaW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFRleHRBbGlnbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gVGV4dEFsaWduKCkge1xuICAgIH1cbiAgICBUZXh0QWxpZ24uc3RhcnQgPSAnc3RhcnQnO1xuICAgIFRleHRBbGlnbi5lbmQgPSAnZW5kJztcbiAgICBUZXh0QWxpZ24ubGVmdCA9ICdsZWZ0JztcbiAgICBUZXh0QWxpZ24uY2VudGVyID0gJ2NlbnRlcic7XG4gICAgVGV4dEFsaWduLnJpZ2h0ID0gJ3JpZ2h0JztcbiAgICByZXR1cm4gVGV4dEFsaWduO1xufSgpKTtcbmV4cG9ydHMuVGV4dEFsaWduID0gVGV4dEFsaWduO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VGV4dEFsaWduLmpzLm1hcCJdfQ==
