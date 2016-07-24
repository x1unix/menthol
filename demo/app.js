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
        this.version = new helpers_1.Version(0, 5, 0);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9jb21wb25lbnRzLmpzIiwiLi4vY29tcG9uZW50cy9CdXR0b24uanMiLCIuLi9jb21wb25lbnRzL0xhYmVsLmpzIiwiLi4vY29tcG9uZW50cy9SZWN0YW5nbGUuanMiLCJhcHAuanMiLCIuLi9ldmVudC9FbWl0dGFibGUuanMiLCIuLi9ldmVudC9FdmVudC5qcyIsIi4uL2V2ZW50L0V2ZW50RW1pdHRlci5qcyIsIi4uL2V2ZW50L0V2ZW50R2VuZXJhdG9yLmpzIiwiLi4vZXZlbnQvRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLmpzIiwiLi4vZXZlbnQvZXZlbnRzL0NvbGxlY3Rpb25FdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9VSUNvbW1vbkV2ZW50LmpzIiwiLi4vZXZlbnQvZXZlbnRzL1VJRXZlbnQuanMiLCIuLi9ldmVudC9ldmVudHMvVUlNb3VzZUV2ZW50LmpzIiwiLi4vZXZlbnRzLmpzIiwiLi4vaGVscGVycy5qcyIsIi4uL2hlbHBlcnMvJGFzeW5jLmpzIiwiLi4vaGVscGVycy8kZGVmaW5lZC5qcyIsIi4uL2hlbHBlcnMvJG51bGwuanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvRGljdGlvbmFyeS5qcyIsIi4uL2hlbHBlcnMvY2xhc3Nlcy9Eb21haW4uanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvVmVyc2lvbi5qcyIsIi4uL2hlbHBlcnMvaXNzZXQuanMiLCIuLi91aS5qcyIsIi4uL3VpL0NvbXBvbmVudE1hcHBlci5qcyIsIi4uL3VpL0Zvcm0uanMiLCIuLi91aS9VSUNvbXBvbmVudC5qcyIsIi4uL3VpL2Jyb2FkY2FzdGVycy9DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIuanMiLCIuLi91aS90eXBlcy9Cb3hNb2RlbEVsZW1lbnQuanMiLCIuLi91aS90eXBlcy9DYW52YXNFdmVudEJyb2FkY2FzdGVyLmpzIiwiLi4vdWkvdHlwZXMvQ29sbGVjdGlvbi5qcyIsIi4uL3VpL3R5cGVzL0ZvbnQuanMiLCIuLi91aS90eXBlcy9Gb250U3R5bGUuanMiLCIuLi91aS90eXBlcy9HVUlELmpzIiwiLi4vdWkvdHlwZXMvUG9pbnQuanMiLCIuLi91aS90eXBlcy9UZXh0QWxpZ24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiO1xudmFyIFJlY3RhbmdsZV8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL1JlY3RhbmdsZScpO1xuZXhwb3J0cy5SZWN0YW5nbGUgPSBSZWN0YW5nbGVfMS5SZWN0YW5nbGU7XG52YXIgTGFiZWxfMSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9MYWJlbCcpO1xuZXhwb3J0cy5MYWJlbCA9IExhYmVsXzEuTGFiZWw7XG52YXIgQnV0dG9uXzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvQnV0dG9uJyk7XG5leHBvcnRzLkJ1dHRvbiA9IEJ1dHRvbl8xLkJ1dHRvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWNvbXBvbmVudHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBMYWJlbF8xID0gcmVxdWlyZSgnLi9MYWJlbCcpO1xudmFyIEJ1dHRvbiA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJ1dHRvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCdXR0b24ob3duZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgb3duZXIpO1xuICAgICAgICB0aGlzLmZvcmVDb2xvciA9ICcjZmZmJztcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMucGFkZGluZy50b3AgPSA1O1xuICAgICAgICB0aGlzLnBhZGRpbmcuYm90dG9tID0gNTtcbiAgICAgICAgdGhpcy5wYWRkaW5nLmxlZnQgPSA1O1xuICAgICAgICB0aGlzLnBhZGRpbmcucmlnaHQgPSA1O1xuICAgICAgICB0aGlzLmhlaWdodCA9ICdhdXRvJztcbiAgICAgICAgdGhpcy53aWR0aCA9ICdhdXRvJztcbiAgICB9XG4gICAgQnV0dG9uLnByb3RvdHlwZS5fZ2V0VGV4dFBvc2l0aW9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHh0V2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQodGhpcy50ZXh0KS53aWR0aCB8IDA7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAneSc6IHRoaXMucG9zaXRpb24ueSArIHRoaXMuZm9udC5oZWlnaHQgKyB0aGlzLnBhZGRpbmcudG9wLFxuICAgICAgICAgICAgJ3gnOiB0aGlzLnBvc2l0aW9uLnggKyB0aGlzLnBhZGRpbmcubGVmdFxuICAgICAgICB9O1xuICAgIH07XG4gICAgQnV0dG9uLnByb3RvdHlwZS5nZXRBYnNvbHV0ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMuaGVpZ2h0ID09PSAnYXV0bycpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmZvbnQuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCArIHRoaXMucGFkZGluZy5ib3R0b207XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgKyB0aGlzLnBhZGRpbmcudG9wICsgdGhpcy5wYWRkaW5nLmJvdHRvbTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQnV0dG9uLnByb3RvdHlwZS5nZXRBYnNvbHV0ZVdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAodGhpcy53aWR0aCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICB2YXIgdHh0V2lkdGggPSB0aGlzLmNvbnRleHQubWVhc3VyZVRleHQodGhpcy50ZXh0KS53aWR0aCB8IDA7XG4gICAgICAgICAgICByZXR1cm4gdHh0V2lkdGggKyB0aGlzLnBhZGRpbmcubGVmdCArIHRoaXMucGFkZGluZy5yaWdodDtcbiAgICAgICAgfVxuICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmhlaWdodCArIHRoaXMucGFkZGluZy5sZWZ0ICsgdGhpcy5wYWRkaW5nLnJpZ2h0O1xuICAgICAgICB9XG4gICAgfTtcbiAgICBCdXR0b24ucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciB0eHRQb3MgPSB0aGlzLl9nZXRUZXh0UG9zaXRpb24oKTtcbiAgICAgICAgdmFyIHBhZGRpbmdZID0gdGhpcy5wYWRkaW5nLnRvcCArIHRoaXMucGFkZGluZy5ib3R0b207XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSB0aGlzLnRleHRBbGlnbjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFJlY3QodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnksIHRoaXMuZ2V0QWJzb2x1dGVXaWR0aCgpLCB0aGlzLmdldEFic29sdXRlSGVpZ2h0KCkpO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5mb3JlQ29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHR4dFBvcy54LCB0eHRQb3MueSwgdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMudGV4dCkud2lkdGgpO1xuICAgIH07XG4gICAgcmV0dXJuIEJ1dHRvbjtcbn0oTGFiZWxfMS5MYWJlbCkpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1CdXR0b24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciB1aV8xID0gcmVxdWlyZSgnLi4vdWknKTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uL2V2ZW50cycpO1xudmFyIExhYmVsID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoTGFiZWwsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gTGFiZWwoKSB7XG4gICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgICAgICB0aGlzLl90ZXh0ID0gJ05ldyBMYWJlbCc7XG4gICAgICAgIHRoaXMuX2FsaWduID0gdWlfMS5UZXh0QWxpZ24ubGVmdDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExhYmVsLnByb3RvdHlwZSwgXCJ0ZXh0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3U3RyKSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5fdGV4dC50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fdGV4dCA9IG5ld1N0cjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0ZXh0Jywgb2xkLCBuZXdTdHIpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KExhYmVsLnByb3RvdHlwZSwgXCJ0ZXh0QWxpZ25cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hbGlnbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3VmFsKSB7XG4gICAgICAgICAgICB0aGlzLl9hbGlnbiA9IG5ld1ZhbDtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0ZXh0QWxpZ24nLCBudWxsLCBuZXdWYWwpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgTGFiZWwucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC50ZXh0QWxpZ24gPSB0aGlzLnRleHRBbGlnbjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZvbnQgPSB0aGlzLmZvbnQudG9TdHJpbmcoKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxUZXh0KHRoaXMudGV4dCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLnBvc2l0aW9uLngpO1xuICAgIH07XG4gICAgcmV0dXJuIExhYmVsO1xufSh1aV8xLlVJQ29tcG9uZW50KSk7XG5leHBvcnRzLkxhYmVsID0gTGFiZWw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1MYWJlbC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIHVpXzEgPSByZXF1aXJlKCcuLi91aScpO1xudmFyIFJlY3RhbmdsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFJlY3RhbmdsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBSZWN0YW5nbGUoKSB7XG4gICAgICAgIF9zdXBlci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgICBSZWN0YW5nbGUucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLndpZHRoLCB0aGlzLmhlaWdodCk7XG4gICAgfTtcbiAgICByZXR1cm4gUmVjdGFuZ2xlO1xufSh1aV8xLlVJQ29tcG9uZW50KSk7XG5leHBvcnRzLlJlY3RhbmdsZSA9IFJlY3RhbmdsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVJlY3RhbmdsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciB1aV8xID0gcmVxdWlyZSgnLi4vdWknKTtcbnZhciBjb21wb25lbnRzXzEgPSByZXF1aXJlKCcuLi9jb21wb25lbnRzJyk7XG52YXIgYXBwID0gbmV3IHVpXzEuRm9ybShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXBwJyksIGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmhlaWdodCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQsIHdpbmRvdy5pbm5lckhlaWdodCB8fCAwKTtcbiAgICB0aGlzLndpZHRoID0gTWF0aC5tYXgoZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLCB3aW5kb3cuaW5uZXJXaWR0aCB8fCAwKTtcbiAgICBjb25zb2xlLmxvZygnY2FsbCBib290c3RyYXAnLCB0aGlzKTtcbn0pO1xuYXBwLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBjb25zb2xlLmxvZygnY2FudmFzIGZvcm0gY2xpY2shJyk7XG59KTtcbnZhciByZWN0ID0gbmV3IGNvbXBvbmVudHNfMS5SZWN0YW5nbGUoYXBwKTtcbnJlY3QuaGVpZ2h0ID0gMzI7XG5yZWN0LndpZHRoID0gMzI7XG5yZWN0LmxlZnQgPSAwO1xucmVjdC50b3AgPSAwO1xucmVjdC5iYWNrZ3JvdW5kQ29sb3IgPSAncmVkJztcbmFwcC5jb250cm9scy5hZGQocmVjdCk7XG5yZWN0Lm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBhbGVydCgncmVjdCBjbGljaycpO1xufSk7XG52YXIgYnV0dG9uID0gbmV3IGNvbXBvbmVudHNfMS5CdXR0b24oYXBwKTtcbmJ1dHRvbi5sZWZ0ID0gMTI4O1xuYnV0dG9uLnRvcCA9IDEyODtcbmJ1dHRvbi50ZXh0ID0gXCJDbGljayBvbiBtZSFcIjtcbmJ1dHRvbi5mb250LnNpemUgPSAxMjtcbmJ1dHRvbi5mb3JlQ29sb3IgPSAnI2ZmZic7XG5idXR0b24ub24oJ2NsaWNrJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgYnV0dG9uLnRvcCA9IDEwO1xuICAgIGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNmZjMyMzJcIjtcbiAgICBidXR0b24uZm9yZUNvbG9yID0gXCIjMDAwXCI7XG59KTtcbmJ1dHRvbi5vbignbW91c2VvdmVyJywgZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiI2NlY2VjZVwiO1xuICAgIGJ1dHRvbi5mb3JlQ29sb3IgPSBcIiMwMDBcIjtcbn0pO1xuYnV0dG9uLm9uKCdtb3VzZW91dCcsIGZ1bmN0aW9uICgpIHtcbiAgICBidXR0b24uYmFja2dyb3VuZENvbG9yID0gXCIjMDAwXCI7XG4gICAgYnV0dG9uLmZvcmVDb2xvciA9IFwiI2ZmZlwiO1xufSk7XG5hcHAuY29udHJvbHMuYWRkKGJ1dHRvbik7XG52YXIgbGFiZWwgPSBuZXcgY29tcG9uZW50c18xLkxhYmVsKGFwcCk7XG5sYWJlbC5sZWZ0ID0gMDtcbmxhYmVsLnRvcCA9IDEyODtcbmxhYmVsLnRleHQgPSBcIkhlbGxvIHdvcmxkIVwiO1xubGFiZWwuZm9yZUNvbG9yID0gXCIjZmYwMGFhXCI7XG5sYWJlbC5mb250LnNpemUgPSAxODtcbmFwcC5jb250cm9scy5hZGQobGFiZWwpO1xud2luZG93WydhcHAnXSA9IGFwcDtcbiIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnRzL1Byb3BlcnR5Q2hhbmdlZEV2ZW50Jyk7XG52YXIgRXZlbnRFbWl0dGVyXzEgPSByZXF1aXJlKCcuL0V2ZW50RW1pdHRlcicpO1xudmFyIEVtaXR0YWJsZSA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEVtaXR0YWJsZSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBFbWl0dGFibGUoKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmVtaXR0YWJsZSA9IGZhbHNlO1xuICAgIH1cbiAgICBFbWl0dGFibGUucHJvdG90eXBlLl9vbkNoYW5nZSA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIGlmICh0aGlzLmVtaXR0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgUHJvcGVydHlDaGFuZ2VkRXZlbnRfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCBwcm9wLCBudWxsLCBudWxsKSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBFbWl0dGFibGU7XG59KEV2ZW50RW1pdHRlcl8xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5FbWl0dGFibGUgPSBFbWl0dGFibGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FbWl0dGFibGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRXZlbnQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50KHRhcmdldCwgYXJncykge1xuICAgICAgICB0aGlzLl9hcmdzID0gYXJncztcbiAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdGFyZ2V0O1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcInRhcmdldFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RhcmdldDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5fdGFyZ2V0ID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgXCJhcmdzXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYXJncztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5fYXJncyA9IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBFdmVudDtcbn0oKSk7XG5leHBvcnRzLkV2ZW50ID0gRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudEdlbmVyYXRvcl8xID0gcmVxdWlyZSgnLi9FdmVudEdlbmVyYXRvcicpO1xudmFyIEV2ZW50RW1pdHRlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRFbWl0dGVyKCkge1xuICAgICAgICB0aGlzLl9fZSA9IG5ldyBFdmVudEdlbmVyYXRvcl8xLkV2ZW50R2VuZXJhdG9yKHRoaXMpO1xuICAgIH1cbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7IH07XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykgeyB9O1xuICAgIDtcbiAgICByZXR1cm4gRXZlbnRFbWl0dGVyO1xufSgpKTtcbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXZlbnRFbWl0dGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbl8xID0gcmVxdWlyZSgnLi9FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24nKTtcbnZhciBFdmVudEdlbmVyYXRvciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRHZW5lcmF0b3IoZXZlbnRHZW5lcmF0b3IsIGluamVjdCkge1xuICAgICAgICBpZiAoaW5qZWN0ID09PSB2b2lkIDApIHsgaW5qZWN0ID0gdHJ1ZTsgfVxuICAgICAgICB0aGlzLl9saXN0ZW5lcnMgPSB7fTtcbiAgICAgICAgdGhpcy5fb3duZXIgPSBldmVudEdlbmVyYXRvcjtcbiAgICAgICAgaWYgKGluamVjdClcbiAgICAgICAgICAgIHRoaXMuaW5qZWN0KCk7XG4gICAgfVxuICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5oYXNMaXN0ZW5lcnMgPSBmdW5jdGlvbiAoZXZlbnROYW1lKSB7XG4gICAgICAgIHJldHVybiB0eXBlb2YgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0gIT09ICd1bmRlZmluZWQnO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmluamVjdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9vd25lci5vbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub24uYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb3duZXIub2ZmID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vZmYuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgICAgdGhpcy5fb3duZXIuX2VtaXQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLmVtaXQuYXBwbHkoc2VsZiwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIGlmICh0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXS50cmlnZ2VyRXZlbnQoZXZlbnRBcmdzKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdID0gbmV3IEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbl8xLkV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbih0aGlzLl9vd25lciwgZXZlbnROYW1lKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXS5hZGRFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX293bmVyO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikge1xuICAgICAgICBpZiAoIXRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHJldHVybiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXS5yZW1vdmVFdmVudExpc3RlbmVyKGxpc3RlbmVyKTtcbiAgICB9O1xuICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZU5hbWUpIHtcbiAgICAgICAgICAgIHNlbGYuYWRkRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lcywgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGVOYW1lKSB7XG4gICAgICAgICAgICBzZWxmLnJlbW92ZUV2ZW50TGlzdGVuZXIoZU5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRHZW5lcmF0b3I7XG59KCkpO1xuZXhwb3J0cy5FdmVudEdlbmVyYXRvciA9IEV2ZW50R2VuZXJhdG9yO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXZlbnRHZW5lcmF0b3IuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24oc291cmNlLCBuYW1lKSB7XG4gICAgICAgIHRoaXMuX2hvb2tzID0gW107XG4gICAgICAgIHRoaXMuZXZlbnROYW1lID0gbmFtZTtcbiAgICAgICAgdGhpcy5fZXZlbnRTb3VyY2UgPSBzb3VyY2U7XG4gICAgfVxuICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUudHJpZ2dlckV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50QXJncykge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX2hvb2tzLmZvckVhY2goZnVuY3Rpb24gKGhvb2spIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgaG9vayA9PSAnZnVuY3Rpb24nKVxuICAgICAgICAgICAgICAgIGhvb2suY2FsbChzZWxmLl9ldmVudFNvdXJjZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmdldExpc3RlbmVyc0NvdW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5faG9va3MubGVuZ3RoO1xuICAgIH07XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdGhpcy5faG9va3MucHVzaChldmVudExpc3RlbmVyKTtcbiAgICB9O1xuICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudExpc3RlbmVyKSB7XG4gICAgICAgIHZhciBob29rSWQgPSB0aGlzLl9ob29rcy5pbmRleE9mKGV2ZW50TGlzdGVuZXIpO1xuICAgICAgICBpZiAoaG9va0lkID4gLTEpXG4gICAgICAgICAgICB0aGlzLl9ob29rcy5zcGxpY2UoaG9va0lkLCAxKTtcbiAgICAgICAgcmV0dXJuIChob29rSWQgPiAtMSk7XG4gICAgfTtcbiAgICByZXR1cm4gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xufSgpKTtcbmV4cG9ydHMuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uID0gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgRXZlbnRfMSA9IHJlcXVpcmUoJy4uL0V2ZW50Jyk7XG52YXIgQ29sbGVjdGlvbkV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbkV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbGxlY3Rpb25FdmVudCh0YXJnZXQsIGl0ZW0pIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICBpdGVtOiBpdGVtXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gQ29sbGVjdGlvbkV2ZW50O1xufShFdmVudF8xLkV2ZW50KSk7XG5leHBvcnRzLkNvbGxlY3Rpb25FdmVudCA9IENvbGxlY3Rpb25FdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbGxlY3Rpb25FdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFVJRXZlbnRfMSA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xudmFyIFByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoUHJvcGVydHlDaGFuZ2VkRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUHJvcGVydHlDaGFuZ2VkRXZlbnQodGFyZ2V0LCBwcm9wTmFtZSwgb2xkVmFsdWUsIG5ld1ZhbHVlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgcHJvcGVydHlOYW1lOiBwcm9wTmFtZSxcbiAgICAgICAgICAgIG9sZFZhbHVlOiBvbGRWYWx1ZSxcbiAgICAgICAgICAgIG5ld1ZhbHVlOiBuZXdWYWx1ZVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb3BlcnR5Q2hhbmdlZEV2ZW50O1xufShVSUV2ZW50XzEuVUlFdmVudCkpO1xuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudCA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UHJvcGVydHlDaGFuZ2VkRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBVSUV2ZW50XzEgPSByZXF1aXJlKCcuL1VJRXZlbnQnKTtcbnZhciBVSUNvbW1vbkV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVUlDb21tb25FdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSUNvbW1vbkV2ZW50KHRhcmdldCwgYXJncykge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIGFyZ3MpO1xuICAgIH1cbiAgICByZXR1cm4gVUlDb21tb25FdmVudDtcbn0oVUlFdmVudF8xLlVJRXZlbnQpKTtcbmV4cG9ydHMuVUlDb21tb25FdmVudCA9IFVJQ29tbW9uRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VSUNvbW1vbkV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgRXZlbnRfMSA9IHJlcXVpcmUoJy4uL0V2ZW50Jyk7XG52YXIgVUlFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVJRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVUlFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIFVJRXZlbnQ7XG59KEV2ZW50XzEuRXZlbnQpKTtcbmV4cG9ydHMuVUlFdmVudCA9IFVJRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VSUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgVUlFdmVudF8xID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG52YXIgVUlNb3VzZUV2ZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVUlNb3VzZUV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVJTW91c2VFdmVudCh0YXJnZXQsIHdpbmRvd0NsaWNrRXZlbnQpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICB0eXBlOiB3aW5kb3dDbGlja0V2ZW50LnR5cGUsXG4gICAgICAgICAgICB0YXJnZXQ6IHRhcmdldCxcbiAgICAgICAgICAgIGtleXM6IHtcbiAgICAgICAgICAgICAgICBjdHJsOiB3aW5kb3dDbGlja0V2ZW50LmN0cmxLZXksXG4gICAgICAgICAgICAgICAgYWx0OiB3aW5kb3dDbGlja0V2ZW50LmFsdEtleSxcbiAgICAgICAgICAgICAgICBzaGlmdDogd2luZG93Q2xpY2tFdmVudC5zaGlmdEtleSxcbiAgICAgICAgICAgICAgICBtZXRhOiB3aW5kb3dDbGlja0V2ZW50Lm1ldGFLZXlcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBwb3NpdGlvbjoge1xuICAgICAgICAgICAgICAgIHg6IHdpbmRvd0NsaWNrRXZlbnQubGF5ZXJYLFxuICAgICAgICAgICAgICAgIHk6IHdpbmRvd0NsaWNrRXZlbnQubGF5ZXJZXG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gVUlNb3VzZUV2ZW50O1xufShVSUV2ZW50XzEuVUlFdmVudCkpO1xuZXhwb3J0cy5VSU1vdXNlRXZlbnQgPSBVSU1vdXNlRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VSU1vdXNlRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRW1pdHRhYmxlXzEgPSByZXF1aXJlKCcuL2V2ZW50L0VtaXR0YWJsZScpO1xuZXhwb3J0cy5FbWl0dGFibGUgPSBFbWl0dGFibGVfMS5FbWl0dGFibGU7XG52YXIgRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvRXZlbnQnKTtcbmV4cG9ydHMuRXZlbnQgPSBFdmVudF8xLkV2ZW50O1xudmFyIEV2ZW50RW1pdHRlcl8xID0gcmVxdWlyZSgnLi9ldmVudC9FdmVudEVtaXR0ZXInKTtcbmV4cG9ydHMuRXZlbnRFbWl0dGVyID0gRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyO1xudmFyIEV2ZW50R2VuZXJhdG9yXzEgPSByZXF1aXJlKCcuL2V2ZW50L0V2ZW50R2VuZXJhdG9yJyk7XG5leHBvcnRzLkV2ZW50R2VuZXJhdG9yID0gRXZlbnRHZW5lcmF0b3JfMS5FdmVudEdlbmVyYXRvcjtcbnZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vZXZlbnQvRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uJyk7XG5leHBvcnRzLkV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbiA9IEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbl8xLkV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbjtcbnZhciBDb2xsZWN0aW9uRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnRzL0NvbGxlY3Rpb25FdmVudCcpO1xuZXhwb3J0cy5Db2xsZWN0aW9uRXZlbnQgPSBDb2xsZWN0aW9uRXZlbnRfMS5Db2xsZWN0aW9uRXZlbnQ7XG52YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnRzL1Byb3BlcnR5Q2hhbmdlZEV2ZW50Jyk7XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gUHJvcGVydHlDaGFuZ2VkRXZlbnRfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudDtcbnZhciBVSUV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9VSUV2ZW50Jyk7XG5leHBvcnRzLlVJRXZlbnQgPSBVSUV2ZW50XzEuVUlFdmVudDtcbnZhciBVSUNvbW1vbkV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9VSUNvbW1vbkV2ZW50Jyk7XG5leHBvcnRzLlVJQ29tbW9uRXZlbnQgPSBVSUNvbW1vbkV2ZW50XzEuVUlDb21tb25FdmVudDtcbnZhciBVSU1vdXNlRXZlbnRfMSA9IHJlcXVpcmUoJy4vZXZlbnQvZXZlbnRzL1VJTW91c2VFdmVudCcpO1xuZXhwb3J0cy5VSU1vdXNlRXZlbnQgPSBVSU1vdXNlRXZlbnRfMS5VSU1vdXNlRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1ldmVudHMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVmVyc2lvbl8xID0gcmVxdWlyZSgnLi9oZWxwZXJzL2NsYXNzZXMvVmVyc2lvbicpO1xuZXhwb3J0cy5WZXJzaW9uID0gVmVyc2lvbl8xLlZlcnNpb247XG52YXIgRG9tYWluXzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvY2xhc3Nlcy9Eb21haW4nKTtcbmV4cG9ydHMuRG9tYWluID0gRG9tYWluXzEuRG9tYWluO1xudmFyIERpY3Rpb25hcnlfMSA9IHJlcXVpcmUoJy4vaGVscGVycy9jbGFzc2VzL0RpY3Rpb25hcnknKTtcbmV4cG9ydHMuRGljdGlvbmFyeSA9IERpY3Rpb25hcnlfMS5EaWN0aW9uYXJ5O1xudmFyIGlzc2V0XzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNzZXQnKTtcbmV4cG9ydHMuaXNzZXQgPSBpc3NldF8xLmlzc2V0O1xudmFyIF9kZWZpbmVkXzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvJGRlZmluZWQnKTtcbmV4cG9ydHMuJGRlZmluZWQgPSBfZGVmaW5lZF8xLiRkZWZpbmVkO1xudmFyIF9hc3luY18xID0gcmVxdWlyZSgnLi9oZWxwZXJzLyRhc3luYycpO1xuZXhwb3J0cy4kYXN5bmMgPSBfYXN5bmNfMS4kYXN5bmM7XG52YXIgX251bGxfMSA9IHJlcXVpcmUoJy4vaGVscGVycy8kbnVsbCcpO1xuZXhwb3J0cy4kbnVsbCA9IF9udWxsXzEuJG51bGw7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1oZWxwZXJzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIERvbWFpbl8xID0gcmVxdWlyZSgnLi9jbGFzc2VzL0RvbWFpbicpO1xuZnVuY3Rpb24gJGFzeW5jKG1ldGhvZCwgb25FcnJvcikge1xuICAgIGlmIChvbkVycm9yID09PSB2b2lkIDApIHsgb25FcnJvciA9IGNvbnNvbGUuZXJyb3I7IH1cbiAgICB2YXIgbG9jYWxEb21haW4gPSBuZXcgRG9tYWluXzEuRG9tYWluKCk7XG4gICAgbG9jYWxEb21haW4ub24oJ2Vycm9yJywgb25FcnJvcik7XG4gICAgbG9jYWxEb21haW4ucnVuKG1ldGhvZCk7XG59XG5leHBvcnRzLiRhc3luYyA9ICRhc3luYztcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPSRhc3luYy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uICRkZWZpbmVkKGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIGUgIT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy4kZGVmaW5lZCA9ICRkZWZpbmVkO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9JGRlZmluZWQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiAkbnVsbCh2YWwpIHtcbiAgICByZXR1cm4gdmFsID09PSBudWxsO1xufVxuZXhwb3J0cy4kbnVsbCA9ICRudWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9JG51bGwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX251bGxfMSA9IHJlcXVpcmUoJy4uLyRudWxsJyk7XG52YXIgX2RlZmluZWRfMSA9IHJlcXVpcmUoJy4uLyRkZWZpbmVkJyk7XG52YXIgRGljdGlvbmFyeSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRGljdGlvbmFyeSgpIHtcbiAgICAgICAgdGhpcy5faXRlbXMgPSB7fTtcbiAgICAgICAgdGhpcy5fYWxpYXNlcyA9IHt9O1xuICAgICAgICB0aGlzLmRlZmF1bHRLZXkgPSBudWxsO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRGljdGlvbmFyeS5wcm90b3R5cGUsIFwibGVuZ3RoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gT2JqZWN0LmtleXModGhpcy5faXRlbXMpLmxlbmd0aDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuZXhpc3RzID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICByZXR1cm4gX2RlZmluZWRfMS4kZGVmaW5lZCh0aGlzLl9pdGVtcykgJiYgdGhpcy5faXRlbXMuaGFzT3duUHJvcGVydHkoa2V5KTtcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmdldCA9IGZ1bmN0aW9uIChrZXksIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gbnVsbDsgfVxuICAgICAgICByZXR1cm4gdGhpcy5leGlzdHMoa2V5KSA/IHRoaXMuX2l0ZW1zW2tleV0gOiB0aGlzLl9nZXRWYWx1ZUZyb21BbGlhcyhrZXksIGRlZmF1bHRWYWx1ZSk7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5fbGlua0FsaWFzID0gZnVuY3Rpb24gKGFsaWFzLCBrZXkpIHtcbiAgICAgICAgdGhpcy5fYWxpYXNlc1thbGlhcy50cmltKCldID0ga2V5LnRvU3RyaW5nKCk7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5fZ2V0VmFsdWVGcm9tQWxpYXMgPSBmdW5jdGlvbiAoYWxpYXMsIGRlZmF1bHRWYWx1ZSkge1xuICAgICAgICBpZiAoZGVmYXVsdFZhbHVlID09PSB2b2lkIDApIHsgZGVmYXVsdFZhbHVlID0gbnVsbDsgfVxuICAgICAgICB2YXIgYWxpYXNWYWx1ZSA9IHRoaXMuX2FsaWFzZXNbYWxpYXNdO1xuICAgICAgICBpZiAoIV9kZWZpbmVkXzEuJGRlZmluZWQoYWxpYXNWYWx1ZSkgfHwgIXRoaXMuZXhpc3RzKGFsaWFzVmFsdWUpKSB7XG4gICAgICAgICAgICBpZiAoX251bGxfMS4kbnVsbChkZWZhdWx0VmFsdWUpICYmICFfbnVsbF8xLiRudWxsKHRoaXMuZGVmYXVsdEtleSkpIHtcbiAgICAgICAgICAgICAgICBkZWZhdWx0VmFsdWUgPSB0aGlzLmdldCh0aGlzLmRlZmF1bHRLZXkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGhpcy5faXRlbXNbYWxpYXNWYWx1ZV07XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5hbGlhcyA9IGZ1bmN0aW9uIChhbGlhc2VzLCBrZXksIGZvcmNlKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIGlmIChmb3JjZSA9PT0gdm9pZCAwKSB7IGZvcmNlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKCF0aGlzLmV4aXN0cyhrZXkpICYmICFmb3JjZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIkl0ZW0gd2l0aCBrZXkgJ1wiICsga2V5ICsgXCInIGRvZXNuJ3QgZXhpc3RzLlwiKTtcbiAgICAgICAgYWxpYXNlcy5zcGxpdCgnLCcpLmZvckVhY2goZnVuY3Rpb24gKGFsaWFzKSB7XG4gICAgICAgICAgICBfdGhpcy5fbGlua0FsaWFzKGFsaWFzLCBrZXkpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoa2V5LCB2YWx1ZSwgb3ZlcndyaXRlKSB7XG4gICAgICAgIGlmIChvdmVyd3JpdGUgPT09IHZvaWQgMCkgeyBvdmVyd3JpdGUgPSBmYWxzZTsgfVxuICAgICAgICBpZiAodGhpcy5leGlzdHMoa2V5KSAmJiAhb3ZlcndyaXRlKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiSXRlbSB3aXRoIGtleSAnXCIgKyBrZXkgKyBcIicgYWxyZWFkeSBleGlzdHMuXCIpO1xuICAgICAgICB0aGlzLl9pdGVtc1trZXldID0gdmFsdWU7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGtleSkge1xuICAgICAgICBpZiAoIXRoaXMuZXhpc3RzKGtleSkpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJJdGVtIHdpdGgga2V5ICdcIiArIGtleSArIFwiJyBkb2Vzbid0IGV4aXN0cy5cIik7XG4gICAgICAgIGRlbGV0ZSB0aGlzLl9pdGVtc1trZXldO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLl9pdGVtcztcbiAgICAgICAgZm9yICh2YXIga2V5IGluIGkpIHtcbiAgICAgICAgICAgIGlmIChpLmhhc093blByb3BlcnR5KGtleSkpIHtcbiAgICAgICAgICAgICAgICBjYWxsYmFjayhpW2tleV0sIGtleSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBEaWN0aW9uYXJ5O1xufSgpKTtcbmV4cG9ydHMuRGljdGlvbmFyeSA9IERpY3Rpb25hcnk7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1EaWN0aW9uYXJ5LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciBEb21haW4gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhEb21haW4sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRG9tYWluKCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICB9XG4gICAgRG9tYWluLnByb3RvdHlwZS5fZXhlY3V0ZSA9IGZ1bmN0aW9uIChtZXRob2QpIHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIG1ldGhvZCgpO1xuICAgICAgICB9XG4gICAgICAgIGNhdGNoIChleCkge1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnZXJyb3InLCBleCk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIERvbWFpbi5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKGZ1bmMpIHtcbiAgICAgICAgdmFyIF90aGlzID0gdGhpcztcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBfdGhpcy5fZXhlY3V0ZShmdW5jKTtcbiAgICAgICAgfSwgMCk7XG4gICAgfTtcbiAgICByZXR1cm4gRG9tYWluO1xufShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuRG9tYWluID0gRG9tYWluO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RG9tYWluLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFZlcnNpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFZlcnNpb24obWFqb3IsIG1pbm9yLCBwYXRjaCkge1xuICAgICAgICBpZiAobWFqb3IgPT09IHZvaWQgMCkgeyBtYWpvciA9IDA7IH1cbiAgICAgICAgaWYgKG1pbm9yID09PSB2b2lkIDApIHsgbWlub3IgPSAwOyB9XG4gICAgICAgIGlmIChwYXRjaCA9PT0gdm9pZCAwKSB7IHBhdGNoID0gMDsgfVxuICAgICAgICB0aGlzLm1ham9yID0gbWFqb3I7XG4gICAgICAgIHRoaXMubWlub3IgPSBtaW5vcjtcbiAgICAgICAgdGhpcy5wYXRjaCA9IHBhdGNoO1xuICAgIH1cbiAgICBWZXJzaW9uLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLm1ham9yLCB0aGlzLm1pbm9yLCB0aGlzLnBhdGNoXS5qb2luKCcuJyk7XG4gICAgfTtcbiAgICByZXR1cm4gVmVyc2lvbjtcbn0oKSk7XG5leHBvcnRzLlZlcnNpb24gPSBWZXJzaW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VmVyc2lvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbmZ1bmN0aW9uIGlzc2V0KGUpIHtcbiAgICByZXR1cm4gdHlwZW9mIGUgIT09ICd1bmRlZmluZWQnO1xufVxuZXhwb3J0cy5pc3NldCA9IGlzc2V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aXNzZXQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgUG9pbnRfMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvUG9pbnQnKTtcbmV4cG9ydHMuUG9pbnQgPSBQb2ludF8xLlBvaW50O1xudmFyIEJveE1vZGVsRWxlbWVudF8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Cb3hNb2RlbEVsZW1lbnQnKTtcbmV4cG9ydHMuQm94TW9kZWxFbGVtZW50ID0gQm94TW9kZWxFbGVtZW50XzEuQm94TW9kZWxFbGVtZW50O1xudmFyIEdVSURfMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvR1VJRCcpO1xuZXhwb3J0cy5HVUlEID0gR1VJRF8xLkdVSUQ7XG52YXIgVGV4dEFsaWduXzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL1RleHRBbGlnbicpO1xuZXhwb3J0cy5UZXh0QWxpZ24gPSBUZXh0QWxpZ25fMS5UZXh0QWxpZ247XG52YXIgRm9udF8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Gb250Jyk7XG5leHBvcnRzLkZvbnQgPSBGb250XzEuRm9udDtcbnZhciBGb250U3R5bGVfMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvRm9udFN0eWxlJyk7XG5leHBvcnRzLkZvbnRTdHlsZSA9IEZvbnRTdHlsZV8xLkZvbnRTdHlsZTtcbnZhciBDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0NvbGxlY3Rpb24nKTtcbmV4cG9ydHMuQ29sbGVjdGlvbiA9IENvbGxlY3Rpb25fMS5Db2xsZWN0aW9uO1xudmFyIENvbXBvbmVudE1hcHBlcl8xID0gcmVxdWlyZSgnLi91aS9Db21wb25lbnRNYXBwZXInKTtcbmV4cG9ydHMuQ29tcG9uZW50TWFwcGVyID0gQ29tcG9uZW50TWFwcGVyXzEuQ29tcG9uZW50TWFwcGVyO1xudmFyIFVJQ29tcG9uZW50XzEgPSByZXF1aXJlKCcuL3VpL1VJQ29tcG9uZW50Jyk7XG5leHBvcnRzLlVJQ29tcG9uZW50ID0gVUlDb21wb25lbnRfMS5VSUNvbXBvbmVudDtcbnZhciBGb3JtXzEgPSByZXF1aXJlKCcuL3VpL0Zvcm0nKTtcbmV4cG9ydHMuRm9ybSA9IEZvcm1fMS5Gb3JtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9dWkuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyXzEgPSByZXF1aXJlKCcuL2Jyb2FkY2FzdGVycy9DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXInKTtcbnZhciBDb21wb25lbnRNYXBwZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIENvbXBvbmVudE1hcHBlcihvd25lcikge1xuICAgICAgICB0aGlzLl9ndWlkTWFwID0ge307XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0ZXJzID0gW107XG4gICAgICAgIHRoaXMucHJldmlvdXNNb3VzZUVsZW1lbnQgPSBudWxsO1xuICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICB0aGlzLmJyb2FkY2FzdGVycy5wdXNoKG5ldyBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXJfMS5DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIob3duZXIsIENvbXBvbmVudE1hcHBlci5ET01Nb3VzZUV2ZW50cywgZmFsc2UpKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUsIFwiY3VycmVudE1vdXNlRWxlbWVudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRNb3VzZUVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRNb3VzZUVsZW1lbnQgPSBlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZSwgXCJjdXJyZW50Rm9jdXNlZEVsZW1lbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50Rm9jdXNlZEVsZW1lbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2N1cnJlbnRGb2N1c2VkRWxlbWVudCA9IGU7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUubG9hZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RlcnMuZm9yRWFjaChmdW5jdGlvbiAoZSkge1xuICAgICAgICAgICAgZS5sb2FkKCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5fcmVnaXN0ZXJJZCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHRoaXMuX2d1aWRNYXBbZWxlbWVudC5pZC50b1N0cmluZygpXSA9IGVsZW1lbnQ7XG4gICAgfTtcbiAgICBDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gKGVpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fZ3VpZE1hcFtlaWRdO1xuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5yZWdpc3RlciA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIHRoaXMuX3JlZ2lzdGVySWQoaXRlbSk7XG4gICAgfTtcbiAgICBDb21wb25lbnRNYXBwZXIuRE9NTW91c2VFdmVudHMgPSBbXG4gICAgICAgICdjbGljaycsXG4gICAgICAgICdkYmxjbGljaycsXG4gICAgICAgICdtb3VzZWRvd24nLFxuICAgICAgICAnbW91c2V1cCcsXG4gICAgICAgICdtb3VzZW92ZXInLFxuICAgICAgICAnbW91c2VvdXQnLFxuICAgICAgICAnbW91c2Vtb3ZlJ107XG4gICAgQ29tcG9uZW50TWFwcGVyLkRPTUV2ZW50cyA9IFtcbiAgICAgICAgJ2tleWRvd24nLFxuICAgICAgICAna2V5dXAnLFxuICAgICAgICAna2V5cHJlc3MnXG4gICAgXTtcbiAgICByZXR1cm4gQ29tcG9uZW50TWFwcGVyO1xufSgpKTtcbmV4cG9ydHMuQ29tcG9uZW50TWFwcGVyID0gQ29tcG9uZW50TWFwcGVyO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29tcG9uZW50TWFwcGVyLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi9ldmVudHMnKTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi9oZWxwZXJzJyk7XG52YXIgQ29tcG9uZW50TWFwcGVyXzEgPSByZXF1aXJlKCcuL0NvbXBvbmVudE1hcHBlcicpO1xudmFyIENvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vdHlwZXMvQ29sbGVjdGlvbicpO1xudmFyIEZvcm0gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhGb3JtLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEZvcm0oaGFuZGxlciwgYm9vdHN0cmFwKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLnZlcnNpb24gPSBuZXcgaGVscGVyc18xLlZlcnNpb24oMCwgNSwgMCk7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICAgICAgdGhpcy5jYW52YXMudGFiSW5kZXggPSAwO1xuICAgICAgICB0aGlzLmNhbnZhcy5mb2N1cygpO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodGhpcy5jYW52YXMsICdmb3JtJywge1xuICAgICAgICAgICAgdmFsdWU6IHNlbGYsXG4gICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoYm9vdHN0cmFwKVxuICAgICAgICAgICAgYm9vdHN0cmFwLmNhbGwoc2VsZiwgaGFuZGxlcik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb24obnVsbCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29udHJvbHMub24oJ2VsZW1lbnRJbnNlcnRlZCcsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9lbWl0KCdkcmF3U3RhcnQnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCB7fSkpO1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgQ29tcG9uZW50TWFwcGVyXzEuQ29tcG9uZW50TWFwcGVyKHRoaXMpO1xuICAgICAgICB0aGlzLm9uKCdyZWRyYXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnJlZHJhdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9tYXAubG9hZCgpO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJtYXBwZXJcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXA7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZvcm0ucHJvdG90eXBlLnJlZHJhd0NvbnRleHQgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVkcmF3JywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmb3JjZSB9KSk7XG4gICAgfTtcbiAgICBGb3JtLnByb3RvdHlwZS5yZWdpc3RlckVsZW1lbnQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB0aGlzLm1hcHBlci5yZWdpc3RlcihlbGVtZW50KTtcbiAgICB9O1xuICAgIEZvcm0ucHJvdG90eXBlLmdldEVsZW1lbnRCeUlkID0gZnVuY3Rpb24gKGlkKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXAuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgIH07XG4gICAgRm9ybS5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udGV4dC5jbGVhclJlY3QoMCwgMCwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIHJldHVybiBGb3JtO1xufShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuRm9ybSA9IEZvcm07XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Gb3JtLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi9ldmVudHMnKTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi9oZWxwZXJzJyk7XG52YXIgQm94TW9kZWxFbGVtZW50XzEgPSByZXF1aXJlKCcuL3R5cGVzL0JveE1vZGVsRWxlbWVudCcpO1xudmFyIENvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vdHlwZXMvQ29sbGVjdGlvbicpO1xudmFyIEdVSURfMSA9IHJlcXVpcmUoJy4vdHlwZXMvR1VJRCcpO1xudmFyIFBvaW50XzEgPSByZXF1aXJlKCcuL3R5cGVzL1BvaW50Jyk7XG52YXIgRm9udF8xID0gcmVxdWlyZSgnLi90eXBlcy9Gb250Jyk7XG52YXIgVUlDb21wb25lbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSUNvbXBvbmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSUNvbXBvbmVudChvd25lcikge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5faGVpZ2h0ID0gMTI4O1xuICAgICAgICB0aGlzLl93aWR0aCA9IDEyODtcbiAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fYmFja2dyb3VuZENvbG9yID0gJ3JnYmEoMCwwLDAsMCknO1xuICAgICAgICB0aGlzLl9mb3JlQ29sb3IgPSAnIzAwMCc7XG4gICAgICAgIHRoaXMuX3BhZGRpbmcgPSBuZXcgQm94TW9kZWxFbGVtZW50XzEuQm94TW9kZWxFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX21hcmdpbiA9IG5ldyBCb3hNb2RlbEVsZW1lbnRfMS5Cb3hNb2RlbEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5fZm9udCA9IG5ldyBGb250XzEuRm9udCgpO1xuICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgdGhpcy5fY29udGV4dCA9IG93bmVyLmNvbnRleHQ7XG4gICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3IFBvaW50XzEuUG9pbnQoMCwgMCk7XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb24odGhpcywgb3duZXIpO1xuICAgICAgICBmdW5jdGlvbiBmbk9uVXBkYXRlKCkge1xuICAgICAgICAgICAgc2VsZi5fb25VcGRhdGUoKTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgcHJvcEV2ZW50ID0gJ3Byb3BlcnR5Q2hhbmdlJztcbiAgICAgICAgdGhpcy5vbignbGF5ZXJVcGRhdGUnLCB0aGlzLl9vblVwZGF0ZSk7XG4gICAgICAgIHRoaXMub24oJ3Byb3BlcnR5Q2hhbmdlJywgdGhpcy5fb25VcGRhdGUpO1xuICAgICAgICB0aGlzLl9mb250Lm9uKHByb3BFdmVudCwgZm5PblVwZGF0ZSk7XG4gICAgICAgIHRoaXMuX3BhZGRpbmcub24ocHJvcEV2ZW50LCBmbk9uVXBkYXRlKTtcbiAgICAgICAgdGhpcy5fbWFyZ2luLm9uKHByb3BFdmVudCwgZm5PblVwZGF0ZSk7XG4gICAgfVxuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIGlmIChldmVudE5hbWUgPT09IHZvaWQgMCkgeyBldmVudE5hbWUgPSAnZW1pdCc7IH1cbiAgICAgICAgdGhpcy5fZW1pdChldmVudE5hbWUsIGV2ZW50QXJncyk7XG4gICAgICAgIGlmICh0aGlzLmhhc1BhcmVudCgpKVxuICAgICAgICAgICAgdGhpcy5wYXJlbnQuZW1pdChldmVudE5hbWUsIGV2ZW50QXJncyk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuYnJvYWRjYXN0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzLCBlbWl0T25FdmVudCkge1xuICAgICAgICBpZiAoZXZlbnROYW1lID09PSB2b2lkIDApIHsgZXZlbnROYW1lID0gJ2Jyb2FkY2FzdCc7IH1cbiAgICAgICAgaWYgKGVtaXRPbkV2ZW50ID09PSB2b2lkIDApIHsgZW1pdE9uRXZlbnQgPSB0cnVlOyB9XG4gICAgICAgIGlmIChlbWl0T25FdmVudClcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoZXZlbnROYW1lLCBldmVudEFyZ3MpO1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgICAgIGVsZW1lbnQuYnJvYWRjYXN0KGV2ZW50TmFtZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVhY3QgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgdGhpcy5icm9hZGNhc3QoJ21vdXNlb3ZlcicsIGV2ZW50QXJncywgZmFsc2UpO1xuICAgICAgICB0aGlzLmVtaXQoJ21vdXNlb3ZlcicsIGV2ZW50QXJncyk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImRyYXduXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZHJhd247XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwicGFkZGluZ1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhZGRpbmc7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwibWFyZ2luXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFyZ2luO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImZvbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb250O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImlkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAoIXRoaXMuaGFzSWQoKSlcbiAgICAgICAgICAgICAgICB0aGlzLl9HVUlEID0gbmV3IEdVSURfMS5HVUlEKCk7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fR1VJRDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmhhc0lkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX0dVSUQgIT09ICd1bmRlZmluZWQnO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJjb250ZXh0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY29udGV4dDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJpc0luamVjdGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faW5qZWN0ZWQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fb25VcGRhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5kcmF3bilcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgdGhpcy5vd25lci5fZW1pdCgncmVkcmF3JywgeyByZWxhdGVkVGFyZ2V0OiB0aGlzIH0pO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmluQm91bmRzT2YgPSBmdW5jdGlvbiAobG9jYXRpb24pIHtcbiAgICAgICAgdmFyIHBvaW50cyA9IHRoaXMucG9pbnRzKCk7XG4gICAgICAgIHJldHVybiAobG9jYXRpb24ueCA+PSBwb2ludHNbMF0ueCkgJiYgKGxvY2F0aW9uLnggPD0gcG9pbnRzWzFdLngpICYmIChsb2NhdGlvbi55ID49IHBvaW50c1swXS55KSAmJiAobG9jYXRpb24ueSA8PSBwb2ludHNbMl0ueSk7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImJhY2tncm91bmRDb2xvclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JhY2tncm91bmRDb2xvcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2JhY2tncm91bmRDb2xvcicsIG9sZCwgbmV3Q29sb3IpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJmb3JlQ29sb3JcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mb3JlQ29sb3I7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5fZm9yZUNvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9mb3JlQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdmb3JlQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5faGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdIZWlnaHQpIHtcbiAgICAgICAgICAgIHRoaXMuX2hlaWdodCA9IG5ld0hlaWdodDtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIG51bGwsIG5ld0hlaWdodCkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fd2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1dpZHRoKSB7XG4gICAgICAgICAgICB0aGlzLl93aWR0aCA9IG5ld1dpZHRoO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgbnVsbCwgbmV3V2lkdGgpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmdldEFic29sdXRlSGVpZ2h0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuZ2V0QWJzb2x1dGVXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJ0b3BcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXy55O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdiArIDA7XG4gICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXy55ID0gdjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd0b3AnLCBvbGQsIHYpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX18ueDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHYgKyAwO1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18ueCA9IHY7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnbGVmdCcsIG9sZCwgdikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInBvc2l0aW9uXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX187XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1Bvc2l0aW9uKSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gbmV3IFBvaW50XzEuUG9pbnQobmV3UG9zaXRpb24ueCwgbmV3UG9zaXRpb24ueSk7XG4gICAgICAgICAgICB0aGlzLnRvcCA9IG5ld1Bvc2l0aW9uLnk7XG4gICAgICAgICAgICB0aGlzLmxlZnQgPSBuZXdQb3NpdGlvbi54O1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18gPSBuZXdQb3NpdGlvbjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdwb3NpdGlvbicsIG9sZCwgbmV3UG9zaXRpb24pKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnBvaW50cyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHAxID0gbmV3IFBvaW50XzEuUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkpLCBwMiA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMuZ2V0QWJzb2x1dGVXaWR0aCgpLCB0aGlzLnBvc2l0aW9uLnkpLCBwMyA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCArIHRoaXMuZ2V0QWJzb2x1dGVXaWR0aCgpLCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmdldEFic29sdXRlSGVpZ2h0KCkpLCBwNCA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKTtcbiAgICAgICAgcmV0dXJuIFtwMSwgcDIsIHAzLCBwNF07XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInBhcmVudFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3BhcmVudDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmhhc1BhcmVudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIChoZWxwZXJzXzEuaXNzZXQodGhpcy5wYXJlbnQpICYmIHRoaXMucGFyZW50ICE9PSBudWxsKTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5yZWRyYXcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICghdGhpcy5pc0luamVjdGVkKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRWxlbWVudCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVkcmF3JywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgeyAnZm9yY2UnOiBmYWxzZSB9KSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLl9yZW5kZXIgPSBmdW5jdGlvbiAoKSB7IH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLl9kcmF3Q2hpbGRyZW4gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiBfZm5EcmF3Q2hpbGQoZSkge1xuICAgICAgICAgICAgZS5yZWRyYXcoKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9kcmF3biA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9lbWl0KCdyZW5kZXInLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgICAgIHRoaXMuX3JlbmRlcigpO1xuICAgICAgICB0aGlzLl9kcmF3Q2hpbGRyZW4oKTtcbiAgICAgICAgdGhpcy5fZHJhd24gPSB0cnVlO1xuICAgICAgICB0aGlzLl9lbWl0KCdyZW5kZXJlZCcsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fX2luamVjdCA9IGZ1bmN0aW9uIChwYXJlbnQpIHtcbiAgICAgICAgdGhpcy5fcGFyZW50ID0gcGFyZW50O1xuICAgICAgICB0aGlzLl9pbmplY3RlZCA9IHRydWU7XG4gICAgICAgIHRoaXMuX2ZvbnQuZW1pdHRhYmxlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ2luamVjdCcsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIHsgJ3BhcmVudCc6IHBhcmVudCB9KSk7XG4gICAgICAgIHRoaXMucmVuZGVyKCk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcGFyZW50ID0gdGhpcy5oYXNQYXJlbnQoKSA/IHRoaXMucGFyZW50IDogdGhpcy5vd25lcjtcbiAgICAgICAgcGFyZW50LmNvbnRyb2xzLnJlbW92ZSh0aGlzKTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5kaXNwb3NlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLl9lbWl0KCdkaXNwb3NlJywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICB0aGlzLl9pbmplY3RlZCA9IGZhbHNlO1xuICAgIH07XG4gICAgcmV0dXJuIFVJQ29tcG9uZW50O1xufShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuVUlDb21wb25lbnQgPSBVSUNvbXBvbmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVVJQ29tcG9uZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgUG9pbnRfMSA9IHJlcXVpcmUoJy4uL3R5cGVzL1BvaW50Jyk7XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzJyk7XG52YXIgQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcl8xID0gcmVxdWlyZSgnLi4vdHlwZXMvQ2FudmFzRXZlbnRCcm9hZGNhc3RlcicpO1xudmFyIENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlciA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlciwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIob3duZXIsIGV2ZW50cywgYXV0b2JpbmQpIHtcbiAgICAgICAgaWYgKGV2ZW50cyA9PT0gdm9pZCAwKSB7IGV2ZW50cyA9IFtdOyB9XG4gICAgICAgIGlmIChhdXRvYmluZCA9PT0gdm9pZCAwKSB7IGF1dG9iaW5kID0gZmFsc2U7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgb3duZXIsIGV2ZW50cyk7XG4gICAgICAgIHRoaXMuZWxlbWVudEZvdW5kID0gZmFsc2U7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVycyA9IG5ldyBoZWxwZXJzXzEuRGljdGlvbmFyeSgpO1xuICAgICAgICB0aGlzLl9pbml0SGFuZGxlcnMoKTtcbiAgICB9XG4gICAgQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5faW5pdEhhbmRsZXJzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMuZGVmYXVsdEtleSA9ICdtb3VzZW1vdmUnO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnNcbiAgICAgICAgICAgIC5hZGQoJ2NsaWNrJywgZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChvbGQgPT09IG51bGwgfHwgKG9sZC5pZCA9PT0gZWxlbWVudC5pZCkpIHtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZWFjdChldmVudC50eXBlLCB0RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkLmJyb2FkY2FzdCgnYmx1cicsIG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZWFjdChldmVudC50eXBlLCB0RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmFkZCgnbW91c2Vtb3ZlJywgZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudDtcbiAgICAgICAgICAgIGlmIChoZWxwZXJzXzEuJG51bGwob2xkKSkge1xuICAgICAgICAgICAgICAgIHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgIHZhciB0RXZlbnQgPSBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KGVsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmVtaXQoJ21vdXNlb3ZlcicsIHRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBlbHNlIHtcbiAgICAgICAgICAgICAgICBpZiAob2xkLmlkICE9PSBlbGVtZW50LmlkKSB7XG4gICAgICAgICAgICAgICAgICAgIHZhciB0RXZlbnQgPSBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KG9sZCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBvbGQuZW1pdCgnbW91c2VvdXQnLCB0RXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRFdmVudCA9IG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgICAgICBlbGVtZW50LmVtaXQoJ21vdXNlb3ZlcicsIHRFdmVudCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgICAgICAgLmFsaWFzKCdkYmxjbGljaywgbW91c2Vkb3duLCBtb3VzZXVwLCBtb3VzZW91dCcsICdjbGljaycpO1xuICAgIH07XG4gICAgQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS50YXJnZXRFdmVudCA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgcCA9IG5ldyBQb2ludF8xLlBvaW50KGV2ZW50LmxheWVyWCwgZXZlbnQubGF5ZXJZKTtcbiAgICAgICAgaWYgKGVsZW1lbnQuaW5Cb3VuZHNPZihwKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMucmVhY3QoZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgZWxlbWVudC5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChfZWxlbWVudCkge1xuICAgICAgICAgICAgICAgIF90aGlzLnRhcmdldEV2ZW50KF9lbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5yZWFjdCA9IGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCkge1xuICAgICAgICB0aGlzLmVsZW1lbnRGb3VuZCA9IHRydWU7XG4gICAgICAgIHRoaXMuZXZlbnRIYW5kbGVycy5nZXQoZXZlbnQudHlwZSkuY2FsbCh0aGlzLCBlbGVtZW50LCBldmVudCk7XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLmJpbmRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICB2YXIgb3duZXIgPSB0aGlzLm93bmVyO1xuICAgICAgICB2YXIgY0VsZW1lbnQgPSB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50O1xuICAgICAgICB2YXIgcEVsZW1lbnQgPSB0aGlzLm1hcHBlci5wcmV2aW91c01vdXNlRWxlbWVudDtcbiAgICAgICAgdGhpcy5lbGVtZW50Rm91bmQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5tYXBwZXIucHJldmlvdXNNb3VzZUVsZW1lbnQgPSBjRWxlbWVudDtcbiAgICAgICAgb3duZXIuX2VtaXQoZXZlbnQudHlwZSwgbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChvd25lciwgZXZlbnQpKTtcbiAgICAgICAgb3duZXIuY29udHJvbHMuZm9yRWFjaChmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICAgICAgX3RoaXMudGFyZ2V0RXZlbnQoZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICB9KTtcbiAgICAgICAgaWYgKCF0aGlzLmVsZW1lbnRGb3VuZCAmJiAhaGVscGVyc18xLiRudWxsKHRoaXMubWFwcGVyLnByZXZpb3VzTW91c2VFbGVtZW50KSkge1xuICAgICAgICAgICAgcEVsZW1lbnQuZW1pdCgnbW91c2VvdXQnLCBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KHBFbGVtZW50LCBldmVudCkpO1xuICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm1hcHBlci5wcmV2aW91c01vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXI7XG59KENhbnZhc0V2ZW50QnJvYWRjYXN0ZXJfMS5DYW52YXNFdmVudEJyb2FkY2FzdGVyKSk7XG5leHBvcnRzLkNhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlciA9IENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgQm94TW9kZWxFbGVtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm94TW9kZWxFbGVtZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJveE1vZGVsRWxlbWVudCh0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQpIHtcbiAgICAgICAgaWYgKHRvcCA9PT0gdm9pZCAwKSB7IHRvcCA9IDA7IH1cbiAgICAgICAgaWYgKHJpZ2h0ID09PSB2b2lkIDApIHsgcmlnaHQgPSAwOyB9XG4gICAgICAgIGlmIChib3R0b20gPT09IHZvaWQgMCkgeyBib3R0b20gPSAwOyB9XG4gICAgICAgIGlmIChsZWZ0ID09PSB2b2lkIDApIHsgbGVmdCA9IDA7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX3RvcCA9IHRvcDtcbiAgICAgICAgdGhpcy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMuX3JpZ2h0ID0gcmlnaHQ7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJveE1vZGVsRWxlbWVudC5wcm90b3R5cGUsIFwidG9wXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9wO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdG9wID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgndG9wJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9yaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3JpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2JvdHRvbSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2JvdHRvbScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdsZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBCb3hNb2RlbEVsZW1lbnQ7XG59KGV2ZW50c18xLkVtaXR0YWJsZSkpO1xuZXhwb3J0cy5Cb3hNb2RlbEVsZW1lbnQgPSBCb3hNb2RlbEVsZW1lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Cb3hNb2RlbEVsZW1lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ2FudmFzRXZlbnRCcm9hZGNhc3RlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcihvd25lciwgZXZlbnRzLCBhdXRvYmluZCkge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB2b2lkIDApIHsgZXZlbnRzID0gW107IH1cbiAgICAgICAgaWYgKGF1dG9iaW5kID09PSB2b2lkIDApIHsgYXV0b2JpbmQgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgICAgICAgaWYgKGF1dG9iaW5kKVxuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICAgIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLmJpbmRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkgeyB9O1xuICAgIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7IH07XG4gICAgQ2FudmFzRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUudGFyZ2V0RXZlbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQpIHsgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FudmFzRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUsIFwibG9hZGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBDYW52YXNFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5sb2FkZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubWFwcGVyID0gdGhpcy5vd25lci5tYXBwZXI7XG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgX3RoaXMub3duZXIuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5iaW5kRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXI7XG59KCkpO1xuZXhwb3J0cy5DYW52YXNFdmVudEJyb2FkY2FzdGVyID0gQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNhbnZhc0V2ZW50QnJvYWRjYXN0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIGV2ZW50c18yID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgUG9pbnRfMSA9IHJlcXVpcmUoJy4vUG9pbnQnKTtcbnZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKGhhbmRsZXIsIGFwcEluc3RhbmNlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25IYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLl9kZWZhdWx0Rm9ybSA9IGFwcEluc3RhbmNlO1xuICAgIH1cbiAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtLl9faW5qZWN0KHRoaXMuY29sbGVjdGlvbkhhbmRsZXIpO1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ2VsZW1lbnRJbnNlcnRlZCcsIG5ldyBldmVudHNfMi5Db2xsZWN0aW9uRXZlbnQodGhpcywgaXRlbSkpO1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnZWxlbWVudFJlbW92ZScsIG5ldyBldmVudHNfMi5Db2xsZWN0aW9uRXZlbnQodGhpcywgdGhpcy5pdGVtc1tpXSkpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoLmNhbGwodGhpcy5pdGVtcywgY2FsbGJhY2spO1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0ID0gZnVuY3Rpb24gKGRvbUV2ZW50LCBldmVudENvbnN0cnVjdG9yLCBjaGVja0JvdW5kcywgcG9pbnQpIHtcbiAgICAgICAgaWYgKGNoZWNrQm91bmRzID09PSB2b2lkIDApIHsgY2hlY2tCb3VuZHMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChwb2ludCA9PT0gdm9pZCAwKSB7IHBvaW50ID0gbmV3IFBvaW50XzEuUG9pbnQoMCwgMCk7IH1cbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIGJyb2FkY2FzdEV2ZW50KGUpIHtcbiAgICAgICAgICAgIHZhciBpbkJvdW5kcyA9IChjaGVja0JvdW5kcykgPyBlLmluQm91bmRzT2YocG9pbnQpIDogdHJ1ZTtcbiAgICAgICAgICAgIGlmIChpbkJvdW5kcykge1xuICAgICAgICAgICAgICAgIGUuX2VtaXQoZG9tRXZlbnQudHlwZSwgZXZlbnRDb25zdHJ1Y3Rvcihkb21FdmVudC50eXBlLCBlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2hlY2tCb3VuZHNSZWN1cnNpdmUgPSBjaGVja0JvdW5kcztcbiAgICAgICAgICAgIGlmIChpbkJvdW5kcylcbiAgICAgICAgICAgICAgICBjaGVja0JvdW5kc1JlY3Vyc2l2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZS5jb250cm9scy5icm9hZGNhc3QoZG9tRXZlbnQsIGV2ZW50Q29uc3RydWN0b3IsIGNoZWNrQm91bmRzUmVjdXJzaXZlLCBwb2ludCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbGxlY3Rpb247XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbGxlY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzJyk7XG52YXIgRm9udFN0eWxlXzEgPSByZXF1aXJlKCcuL0ZvbnRTdHlsZScpO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgRm9udCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9udChmYW1pbHksIHNpemUsIHdlaWdodCkge1xuICAgICAgICBpZiAoZmFtaWx5ID09PSB2b2lkIDApIHsgZmFtaWx5ID0gJ3NhbnMtc2VyaWYnOyB9XG4gICAgICAgIGlmIChzaXplID09PSB2b2lkIDApIHsgc2l6ZSA9IDEwOyB9XG4gICAgICAgIGlmICh3ZWlnaHQgPT09IHZvaWQgMCkgeyB3ZWlnaHQgPSA0MDA7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdHRhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZhbWlseSA9IGZhbWlseTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuX3dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fc3R5bGUgPSBGb250U3R5bGVfMS5Gb250U3R5bGUubm9ybWFsO1xuICAgIH1cbiAgICBGb250LnByb3RvdHlwZS5fb25DaGFuZ2UgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICBpZiAodGhpcy5lbWl0dGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICghaGVscGVyc18xLmlzc2V0KHRoaXMuX2hlaWdodCkgfHwgdHlwZW9mIHRoaXMuX2hlaWdodCA9PSAndW5kZWZpbmVkJykgPyAodGhpcy5fc2l6ZSAqIDEuMikgfCAwIDogdGhpcy5faGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnaGVpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJ3ZWlnaHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCd3ZWlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInN0eWxlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gdjtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzdHlsZScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwiZmFtaWx5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFtaWx5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9mYW1pbHkgPSB2O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2ZhbWlseScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3NpemUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgRm9udC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5zdHlsZS50b1N0cmluZygpLCB0aGlzLndlaWdodCwgdGhpcy5zaXplICsgJ3B4LycgKyB0aGlzLmhlaWdodCArICdweCcsIHRoaXMuZmFtaWx5XS5qb2luKCcgJyk7XG4gICAgfTtcbiAgICByZXR1cm4gRm9udDtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkZvbnQgPSBGb250O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rm9udC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBGb250U3R5bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZvbnRTdHlsZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlVHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIEZvbnRTdHlsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVR5cGUudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIEZvbnRTdHlsZS5ub3JtYWwgPSBuZXcgRm9udFN0eWxlKCdub3JtYWwnKTtcbiAgICBGb250U3R5bGUuaXRhbGljID0gbmV3IEZvbnRTdHlsZSgnaXRhbGljJyk7XG4gICAgcmV0dXJuIEZvbnRTdHlsZTtcbn0oKSk7XG5leHBvcnRzLkZvbnRTdHlsZSA9IEZvbnRTdHlsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZvbnRTdHlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBHVUlEID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHVUlEKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBHVUlELmdlbmVyYXRlKCk7XG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICB9XG4gICAgR1VJRC5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgIH07XG4gICAgR1VJRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuICAgIEdVSUQucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgfTtcbiAgICByZXR1cm4gR1VJRDtcbn0oKSk7XG5leHBvcnRzLkdVSUQgPSBHVUlEO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R1VJRC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbiAgICByZXR1cm4gUG9pbnQ7XG59KCkpO1xuZXhwb3J0cy5Qb2ludCA9IFBvaW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9pbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVGV4dEFsaWduID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXh0QWxpZ24oKSB7XG4gICAgfVxuICAgIFRleHRBbGlnbi5zdGFydCA9ICdzdGFydCc7XG4gICAgVGV4dEFsaWduLmVuZCA9ICdlbmQnO1xuICAgIFRleHRBbGlnbi5sZWZ0ID0gJ2xlZnQnO1xuICAgIFRleHRBbGlnbi5jZW50ZXIgPSAnY2VudGVyJztcbiAgICBUZXh0QWxpZ24ucmlnaHQgPSAncmlnaHQnO1xuICAgIHJldHVybiBUZXh0QWxpZ247XG59KCkpO1xuZXhwb3J0cy5UZXh0QWxpZ24gPSBUZXh0QWxpZ247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UZXh0QWxpZ24uanMubWFwIl19
