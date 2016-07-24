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
var times = 0;
button.on('click', function (event) {
    times++;
    button.text = "Clicked! " + times;
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
            console.warn('click commited', element);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9jb21wb25lbnRzLmpzIiwiLi4vY29tcG9uZW50cy9CdXR0b24uanMiLCIuLi9jb21wb25lbnRzL0xhYmVsLmpzIiwiLi4vY29tcG9uZW50cy9SZWN0YW5nbGUuanMiLCJhcHAuanMiLCIuLi9ldmVudC9FbWl0dGFibGUuanMiLCIuLi9ldmVudC9FdmVudC5qcyIsIi4uL2V2ZW50L0V2ZW50RW1pdHRlci5qcyIsIi4uL2V2ZW50L0V2ZW50R2VuZXJhdG9yLmpzIiwiLi4vZXZlbnQvRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLmpzIiwiLi4vZXZlbnQvZXZlbnRzL0NvbGxlY3Rpb25FdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9VSUNvbW1vbkV2ZW50LmpzIiwiLi4vZXZlbnQvZXZlbnRzL1VJRXZlbnQuanMiLCIuLi9ldmVudC9ldmVudHMvVUlNb3VzZUV2ZW50LmpzIiwiLi4vZXZlbnRzLmpzIiwiLi4vaGVscGVycy5qcyIsIi4uL2hlbHBlcnMvJGFzeW5jLmpzIiwiLi4vaGVscGVycy8kZGVmaW5lZC5qcyIsIi4uL2hlbHBlcnMvJG51bGwuanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvRGljdGlvbmFyeS5qcyIsIi4uL2hlbHBlcnMvY2xhc3Nlcy9Eb21haW4uanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvVmVyc2lvbi5qcyIsIi4uL2hlbHBlcnMvaXNzZXQuanMiLCIuLi91aS5qcyIsIi4uL3VpL0NvbXBvbmVudE1hcHBlci5qcyIsIi4uL3VpL0Zvcm0uanMiLCIuLi91aS9VSUNvbXBvbmVudC5qcyIsIi4uL3VpL2Jyb2FkY2FzdGVycy9DYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIuanMiLCIuLi91aS90eXBlcy9Cb3hNb2RlbEVsZW1lbnQuanMiLCIuLi91aS90eXBlcy9DYW52YXNFdmVudEJyb2FkY2FzdGVyLmpzIiwiLi4vdWkvdHlwZXMvQ29sbGVjdGlvbi5qcyIsIi4uL3VpL3R5cGVzL0ZvbnQuanMiLCIuLi91aS90eXBlcy9Gb250U3R5bGUuanMiLCIuLi91aS90eXBlcy9HVUlELmpzIiwiLi4vdWkvdHlwZXMvUG9pbnQuanMiLCIuLi91aS90eXBlcy9UZXh0QWxpZ24uanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVRQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25FQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBSZWN0YW5nbGVfMSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9SZWN0YW5nbGUnKTtcbmV4cG9ydHMuUmVjdGFuZ2xlID0gUmVjdGFuZ2xlXzEuUmVjdGFuZ2xlO1xudmFyIExhYmVsXzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTGFiZWwnKTtcbmV4cG9ydHMuTGFiZWwgPSBMYWJlbF8xLkxhYmVsO1xudmFyIEJ1dHRvbl8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0J1dHRvbicpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgTGFiZWxfMSA9IHJlcXVpcmUoJy4vTGFiZWwnKTtcbnZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKG93bmVyKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG93bmVyKTtcbiAgICAgICAgdGhpcy5mb3JlQ29sb3IgPSAnI2ZmZic7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgICAgICB0aGlzLnBhZGRpbmcudG9wID0gNTtcbiAgICAgICAgdGhpcy5wYWRkaW5nLmJvdHRvbSA9IDU7XG4gICAgICAgIHRoaXMucGFkZGluZy5sZWZ0ID0gNTtcbiAgICAgICAgdGhpcy5wYWRkaW5nLnJpZ2h0ID0gNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgIHRoaXMud2lkdGggPSAnYXV0byc7XG4gICAgfVxuICAgIEJ1dHRvbi5wcm90b3R5cGUuX2dldFRleHRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR4dFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMudGV4dCkud2lkdGggfCAwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3knOiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmZvbnQuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCxcbiAgICAgICAgICAgICd4JzogdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5wYWRkaW5nLmxlZnRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuZ2V0QWJzb2x1dGVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlaWdodCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb250LmhlaWdodCArIHRoaXMucGFkZGluZy50b3AgKyB0aGlzLnBhZGRpbmcuYm90dG9tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCArIHRoaXMucGFkZGluZy5ib3R0b207XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuZ2V0QWJzb2x1dGVXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMud2lkdGggPT09ICdhdXRvJykge1xuICAgICAgICAgICAgdmFyIHR4dFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMudGV4dCkud2lkdGggfCAwO1xuICAgICAgICAgICAgcmV0dXJuIHR4dFdpZHRoICsgdGhpcy5wYWRkaW5nLmxlZnQgKyB0aGlzLnBhZGRpbmcucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgKyB0aGlzLnBhZGRpbmcubGVmdCArIHRoaXMucGFkZGluZy5yaWdodDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQnV0dG9uLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHh0UG9zID0gdGhpcy5fZ2V0VGV4dFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBwYWRkaW5nWSA9IHRoaXMucGFkZGluZy50b3AgKyB0aGlzLnBhZGRpbmcuYm90dG9tO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuZm9udC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gdGhpcy50ZXh0QWxpZ247XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZm9yZUNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0eHRQb3MueCwgdHh0UG9zLnksIHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoKTtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b247XG59KExhYmVsXzEuTGFiZWwpKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgdWlfMSA9IHJlcXVpcmUoJy4uL3VpJyk7XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi9ldmVudHMnKTtcbnZhciBMYWJlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExhYmVsKCkge1xuICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fdGV4dCA9ICdOZXcgTGFiZWwnO1xuICAgICAgICB0aGlzLl9hbGlnbiA9IHVpXzEuVGV4dEFsaWduLmxlZnQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1N0cikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX3RleHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSBuZXdTdHI7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dCcsIG9sZCwgbmV3U3RyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dEFsaWduXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYWxpZ247XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgdGhpcy5fYWxpZ24gPSBuZXdWYWw7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dEFsaWduJywgbnVsbCwgbmV3VmFsKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIExhYmVsLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gdGhpcy50ZXh0QWxpZ247XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5wb3NpdGlvbi54KTtcbiAgICB9O1xuICAgIHJldHVybiBMYWJlbDtcbn0odWlfMS5VSUNvbXBvbmVudCkpO1xuZXhwb3J0cy5MYWJlbCA9IExhYmVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGFiZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciB1aV8xID0gcmVxdWlyZSgnLi4vdWknKTtcbnZhciBSZWN0YW5nbGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZWN0YW5nbGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmVjdGFuZ2xlKCkge1xuICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgUmVjdGFuZ2xlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlY3RhbmdsZTtcbn0odWlfMS5VSUNvbXBvbmVudCkpO1xuZXhwb3J0cy5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWN0YW5nbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdWlfMSA9IHJlcXVpcmUoJy4uL3VpJyk7XG52YXIgY29tcG9uZW50c18xID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cycpO1xudmFyIGFwcCA9IG5ldyB1aV8xLkZvcm0oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG4gICAgdGhpcy53aWR0aCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgY29uc29sZS5sb2coJ2NhbGwgYm9vdHN0cmFwJywgdGhpcyk7XG59KTtcbmFwcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgY29uc29sZS5sb2coJ2NhbnZhcyBmb3JtIGNsaWNrIScpO1xufSk7XG52YXIgcmVjdCA9IG5ldyBjb21wb25lbnRzXzEuUmVjdGFuZ2xlKGFwcCk7XG5yZWN0LmhlaWdodCA9IDMyO1xucmVjdC53aWR0aCA9IDMyO1xucmVjdC5sZWZ0ID0gMDtcbnJlY3QudG9wID0gMDtcbnJlY3QuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG5hcHAuY29udHJvbHMuYWRkKHJlY3QpO1xucmVjdC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYWxlcnQoJ3JlY3QgY2xpY2snKTtcbn0pO1xudmFyIGJ1dHRvbiA9IG5ldyBjb21wb25lbnRzXzEuQnV0dG9uKGFwcCk7XG5idXR0b24ubGVmdCA9IDEyODtcbmJ1dHRvbi50b3AgPSAxMjg7XG5idXR0b24udGV4dCA9IFwiQ2xpY2sgb24gbWUhXCI7XG5idXR0b24uZm9udC5zaXplID0gMTI7XG5idXR0b24uZm9yZUNvbG9yID0gJyNmZmYnO1xudmFyIHRpbWVzID0gMDtcbmJ1dHRvbi5vbignY2xpY2snLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICB0aW1lcysrO1xuICAgIGJ1dHRvbi50ZXh0ID0gXCJDbGlja2VkISBcIiArIHRpbWVzO1xufSk7XG5idXR0b24ub24oJ21vdXNlb3ZlcicsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGJ1dHRvbi5iYWNrZ3JvdW5kQ29sb3IgPSBcIiNjZWNlY2VcIjtcbiAgICBidXR0b24uZm9yZUNvbG9yID0gXCIjMDAwXCI7XG59KTtcbmJ1dHRvbi5vbignbW91c2VvdXQnLCBmdW5jdGlvbiAoKSB7XG4gICAgYnV0dG9uLmJhY2tncm91bmRDb2xvciA9IFwiIzAwMFwiO1xuICAgIGJ1dHRvbi5mb3JlQ29sb3IgPSBcIiNmZmZcIjtcbn0pO1xuYXBwLmNvbnRyb2xzLmFkZChidXR0b24pO1xudmFyIGxhYmVsID0gbmV3IGNvbXBvbmVudHNfMS5MYWJlbChhcHApO1xubGFiZWwubGVmdCA9IDA7XG5sYWJlbC50b3AgPSAxMjg7XG5sYWJlbC50ZXh0ID0gXCJIZWxsbyB3b3JsZCFcIjtcbmxhYmVsLmZvcmVDb2xvciA9IFwiI2ZmMDBhYVwiO1xubGFiZWwuZm9udC5zaXplID0gMTg7XG5hcHAuY29udHJvbHMuYWRkKGxhYmVsKTtcbndpbmRvd1snYXBwJ10gPSBhcHA7XG4iLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFByb3BlcnR5Q2hhbmdlZEV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudCcpO1xudmFyIEV2ZW50RW1pdHRlcl8xID0gcmVxdWlyZSgnLi9FdmVudEVtaXR0ZXInKTtcbnZhciBFbWl0dGFibGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhFbWl0dGFibGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRW1pdHRhYmxlKCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGFibGUgPSBmYWxzZTtcbiAgICB9XG4gICAgRW1pdHRhYmxlLnByb3RvdHlwZS5fb25DaGFuZ2UgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICBpZiAodGhpcy5lbWl0dGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IFByb3BlcnR5Q2hhbmdlZEV2ZW50XzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgcHJvcCwgbnVsbCwgbnVsbCkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRW1pdHRhYmxlO1xufShFdmVudEVtaXR0ZXJfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuRW1pdHRhYmxlID0gRW1pdHRhYmxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RW1pdHRhYmxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEV2ZW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgdGhpcy5fYXJncyA9IGFyZ3M7XG4gICAgICAgIHRoaXMuX3RhcmdldCA9IHRhcmdldDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEV2ZW50LnByb3RvdHlwZSwgXCJ0YXJnZXRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl90YXJnZXQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3RhcmdldCA9IHY7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwiYXJnc1wiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2FyZ3M7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX2FyZ3MgPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gRXZlbnQ7XG59KCkpO1xuZXhwb3J0cy5FdmVudCA9IEV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRXZlbnRHZW5lcmF0b3JfMSA9IHJlcXVpcmUoJy4vRXZlbnRHZW5lcmF0b3InKTtcbnZhciBFdmVudEVtaXR0ZXIgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgICAgICAgdGhpcy5fX2UgPSBuZXcgRXZlbnRHZW5lcmF0b3JfMS5FdmVudEdlbmVyYXRvcih0aGlzKTtcbiAgICB9XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7IH07XG4gICAgRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vZmYgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2VtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHsgfTtcbiAgICA7XG4gICAgcmV0dXJuIEV2ZW50RW1pdHRlcjtcbn0oKSk7XG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50RW1pdHRlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb25fMSA9IHJlcXVpcmUoJy4vRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uJyk7XG52YXIgRXZlbnRHZW5lcmF0b3IgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50R2VuZXJhdG9yKGV2ZW50R2VuZXJhdG9yLCBpbmplY3QpIHtcbiAgICAgICAgaWYgKGluamVjdCA9PT0gdm9pZCAwKSB7IGluamVjdCA9IHRydWU7IH1cbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzID0ge307XG4gICAgICAgIHRoaXMuX293bmVyID0gZXZlbnRHZW5lcmF0b3I7XG4gICAgICAgIGlmIChpbmplY3QpXG4gICAgICAgICAgICB0aGlzLmluamVjdCgpO1xuICAgIH1cbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaGFzTGlzdGVuZXJzID0gZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICByZXR1cm4gdHlwZW9mIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdICE9PSAndW5kZWZpbmVkJztcbiAgICB9O1xuICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5pbmplY3QgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5fb3duZXIub24gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9uLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX293bmVyLm9mZiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYub2ZmLmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICAgIHRoaXMuX293bmVyLl9lbWl0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5lbWl0LmFwcGx5KHNlbGYsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICBpZiAodGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0udHJpZ2dlckV2ZW50KGV2ZW50QXJncyk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKSB7XG4gICAgICAgICAgICB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSA9IG5ldyBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb25fMS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24odGhpcy5fb3duZXIsIGV2ZW50TmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0uYWRkRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgICAgIHJldHVybiB0aGlzLl9vd25lcjtcbiAgICB9O1xuICAgIEV2ZW50R2VuZXJhdG9yLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHtcbiAgICAgICAgaWYgKCF0aGlzLmhhc0xpc3RlbmVycyhldmVudE5hbWUpKVxuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICByZXR1cm4gdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0ucmVtb3ZlRXZlbnRMaXN0ZW5lcihsaXN0ZW5lcik7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lcywgbGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICBldmVudE5hbWVzLnRyaW0oKS5zcGxpdCgnICcpLmZvckVhY2goZnVuY3Rpb24gKGVOYW1lKSB7XG4gICAgICAgICAgICBzZWxmLmFkZEV2ZW50TGlzdGVuZXIoZU5hbWUsIGxpc3RlbmVyKTtcbiAgICAgICAgfSk7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgc2VsZi5yZW1vdmVFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50R2VuZXJhdG9yO1xufSgpKTtcbmV4cG9ydHMuRXZlbnRHZW5lcmF0b3IgPSBFdmVudEdlbmVyYXRvcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50R2VuZXJhdG9yLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbiA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uKHNvdXJjZSwgbmFtZSkge1xuICAgICAgICB0aGlzLl9ob29rcyA9IFtdO1xuICAgICAgICB0aGlzLmV2ZW50TmFtZSA9IG5hbWU7XG4gICAgICAgIHRoaXMuX2V2ZW50U291cmNlID0gc291cmNlO1xuICAgIH1cbiAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLnRyaWdnZXJFdmVudCA9IGZ1bmN0aW9uIChldmVudEFyZ3MpIHtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLl9ob29rcy5mb3JFYWNoKGZ1bmN0aW9uIChob29rKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIGhvb2sgPT0gJ2Z1bmN0aW9uJylcbiAgICAgICAgICAgICAgICBob29rLmNhbGwoc2VsZi5fZXZlbnRTb3VyY2UsIGV2ZW50QXJncyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5nZXRMaXN0ZW5lcnNDb3VudCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2hvb2tzLmxlbmd0aDtcbiAgICB9O1xuICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudExpc3RlbmVyKSB7XG4gICAgICAgIHRoaXMuX2hvb2tzLnB1c2goZXZlbnRMaXN0ZW5lcik7XG4gICAgfTtcbiAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLnJlbW92ZUV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB2YXIgaG9va0lkID0gdGhpcy5faG9va3MuaW5kZXhPZihldmVudExpc3RlbmVyKTtcbiAgICAgICAgaWYgKGhvb2tJZCA+IC0xKVxuICAgICAgICAgICAgdGhpcy5faG9va3Muc3BsaWNlKGhvb2tJZCwgMSk7XG4gICAgICAgIHJldHVybiAoaG9va0lkID4gLTEpO1xuICAgIH07XG4gICAgcmV0dXJuIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbjtcbn0oKSk7XG5leHBvcnRzLkV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbiA9IEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEV2ZW50XzEgPSByZXF1aXJlKCcuLi9FdmVudCcpO1xudmFyIENvbGxlY3Rpb25FdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKENvbGxlY3Rpb25FdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2xsZWN0aW9uRXZlbnQodGFyZ2V0LCBpdGVtKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgaXRlbTogaXRlbVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIENvbGxlY3Rpb25FdmVudDtcbn0oRXZlbnRfMS5FdmVudCkpO1xuZXhwb3J0cy5Db2xsZWN0aW9uRXZlbnQgPSBDb2xsZWN0aW9uRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db2xsZWN0aW9uRXZlbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBVSUV2ZW50XzEgPSByZXF1aXJlKCcuL1VJRXZlbnQnKTtcbnZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFByb3BlcnR5Q2hhbmdlZEV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFByb3BlcnR5Q2hhbmdlZEV2ZW50KHRhcmdldCwgcHJvcE5hbWUsIG9sZFZhbHVlLCBuZXdWYWx1ZSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgIHByb3BlcnR5TmFtZTogcHJvcE5hbWUsXG4gICAgICAgICAgICBvbGRWYWx1ZTogb2xkVmFsdWUsXG4gICAgICAgICAgICBuZXdWYWx1ZTogbmV3VmFsdWVcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBQcm9wZXJ0eUNoYW5nZWRFdmVudDtcbn0oVUlFdmVudF8xLlVJRXZlbnQpKTtcbmV4cG9ydHMuUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSBQcm9wZXJ0eUNoYW5nZWRFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVByb3BlcnR5Q2hhbmdlZEV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgVUlFdmVudF8xID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG52YXIgVUlDb21tb25FdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVJQ29tbW9uRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVUlDb21tb25FdmVudCh0YXJnZXQsIGFyZ3MpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCBhcmdzKTtcbiAgICB9XG4gICAgcmV0dXJuIFVJQ29tbW9uRXZlbnQ7XG59KFVJRXZlbnRfMS5VSUV2ZW50KSk7XG5leHBvcnRzLlVJQ29tbW9uRXZlbnQgPSBVSUNvbW1vbkV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VUlDb21tb25FdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEV2ZW50XzEgPSByZXF1aXJlKCcuLi9FdmVudCcpO1xudmFyIFVJRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSUV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVJRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBVSUV2ZW50O1xufShFdmVudF8xLkV2ZW50KSk7XG5leHBvcnRzLlVJRXZlbnQgPSBVSUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VUlFdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFVJRXZlbnRfMSA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xudmFyIFVJTW91c2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVJTW91c2VFdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSU1vdXNlRXZlbnQodGFyZ2V0LCB3aW5kb3dDbGlja0V2ZW50KSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgdHlwZTogd2luZG93Q2xpY2tFdmVudC50eXBlLFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICAgICAgY3RybDogd2luZG93Q2xpY2tFdmVudC5jdHJsS2V5LFxuICAgICAgICAgICAgICAgIGFsdDogd2luZG93Q2xpY2tFdmVudC5hbHRLZXksXG4gICAgICAgICAgICAgICAgc2hpZnQ6IHdpbmRvd0NsaWNrRXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgbWV0YTogd2luZG93Q2xpY2tFdmVudC5tZXRhS2V5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiB3aW5kb3dDbGlja0V2ZW50LmxheWVyWCxcbiAgICAgICAgICAgICAgICB5OiB3aW5kb3dDbGlja0V2ZW50LmxheWVyWVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFVJTW91c2VFdmVudDtcbn0oVUlFdmVudF8xLlVJRXZlbnQpKTtcbmV4cG9ydHMuVUlNb3VzZUV2ZW50ID0gVUlNb3VzZUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VUlNb3VzZUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEVtaXR0YWJsZV8xID0gcmVxdWlyZSgnLi9ldmVudC9FbWl0dGFibGUnKTtcbmV4cG9ydHMuRW1pdHRhYmxlID0gRW1pdHRhYmxlXzEuRW1pdHRhYmxlO1xudmFyIEV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L0V2ZW50Jyk7XG5leHBvcnRzLkV2ZW50ID0gRXZlbnRfMS5FdmVudDtcbnZhciBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoJy4vZXZlbnQvRXZlbnRFbWl0dGVyJyk7XG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcl8xLkV2ZW50RW1pdHRlcjtcbnZhciBFdmVudEdlbmVyYXRvcl8xID0gcmVxdWlyZSgnLi9ldmVudC9FdmVudEdlbmVyYXRvcicpO1xuZXhwb3J0cy5FdmVudEdlbmVyYXRvciA9IEV2ZW50R2VuZXJhdG9yXzEuRXZlbnRHZW5lcmF0b3I7XG52YXIgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL2V2ZW50L0V2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbicpO1xuZXhwb3J0cy5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb25fMS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG52YXIgQ29sbGVjdGlvbkV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9Db2xsZWN0aW9uRXZlbnQnKTtcbmV4cG9ydHMuQ29sbGVjdGlvbkV2ZW50ID0gQ29sbGVjdGlvbkV2ZW50XzEuQ29sbGVjdGlvbkV2ZW50O1xudmFyIFByb3BlcnR5Q2hhbmdlZEV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudCcpO1xuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudCA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50XzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG52YXIgVUlFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvVUlFdmVudCcpO1xuZXhwb3J0cy5VSUV2ZW50ID0gVUlFdmVudF8xLlVJRXZlbnQ7XG52YXIgVUlDb21tb25FdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvVUlDb21tb25FdmVudCcpO1xuZXhwb3J0cy5VSUNvbW1vbkV2ZW50ID0gVUlDb21tb25FdmVudF8xLlVJQ29tbW9uRXZlbnQ7XG52YXIgVUlNb3VzZUV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9VSU1vdXNlRXZlbnQnKTtcbmV4cG9ydHMuVUlNb3VzZUV2ZW50ID0gVUlNb3VzZUV2ZW50XzEuVUlNb3VzZUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFZlcnNpb25fMSA9IHJlcXVpcmUoJy4vaGVscGVycy9jbGFzc2VzL1ZlcnNpb24nKTtcbmV4cG9ydHMuVmVyc2lvbiA9IFZlcnNpb25fMS5WZXJzaW9uO1xudmFyIERvbWFpbl8xID0gcmVxdWlyZSgnLi9oZWxwZXJzL2NsYXNzZXMvRG9tYWluJyk7XG5leHBvcnRzLkRvbWFpbiA9IERvbWFpbl8xLkRvbWFpbjtcbnZhciBEaWN0aW9uYXJ5XzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvY2xhc3Nlcy9EaWN0aW9uYXJ5Jyk7XG5leHBvcnRzLkRpY3Rpb25hcnkgPSBEaWN0aW9uYXJ5XzEuRGljdGlvbmFyeTtcbnZhciBpc3NldF8xID0gcmVxdWlyZSgnLi9oZWxwZXJzL2lzc2V0Jyk7XG5leHBvcnRzLmlzc2V0ID0gaXNzZXRfMS5pc3NldDtcbnZhciBfZGVmaW5lZF8xID0gcmVxdWlyZSgnLi9oZWxwZXJzLyRkZWZpbmVkJyk7XG5leHBvcnRzLiRkZWZpbmVkID0gX2RlZmluZWRfMS4kZGVmaW5lZDtcbnZhciBfYXN5bmNfMSA9IHJlcXVpcmUoJy4vaGVscGVycy8kYXN5bmMnKTtcbmV4cG9ydHMuJGFzeW5jID0gX2FzeW5jXzEuJGFzeW5jO1xudmFyIF9udWxsXzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvJG51bGwnKTtcbmV4cG9ydHMuJG51bGwgPSBfbnVsbF8xLiRudWxsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBEb21haW5fMSA9IHJlcXVpcmUoJy4vY2xhc3Nlcy9Eb21haW4nKTtcbmZ1bmN0aW9uICRhc3luYyhtZXRob2QsIG9uRXJyb3IpIHtcbiAgICBpZiAob25FcnJvciA9PT0gdm9pZCAwKSB7IG9uRXJyb3IgPSBjb25zb2xlLmVycm9yOyB9XG4gICAgdmFyIGxvY2FsRG9tYWluID0gbmV3IERvbWFpbl8xLkRvbWFpbigpO1xuICAgIGxvY2FsRG9tYWluLm9uKCdlcnJvcicsIG9uRXJyb3IpO1xuICAgIGxvY2FsRG9tYWluLnJ1bihtZXRob2QpO1xufVxuZXhwb3J0cy4kYXN5bmMgPSAkYXN5bmM7XG4vLyMgc291cmNlTWFwcGluZ1VSTD0kYXN5bmMuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiAkZGVmaW5lZChlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlICE9PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuJGRlZmluZWQgPSAkZGVmaW5lZDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPSRkZWZpbmVkLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xuZnVuY3Rpb24gJG51bGwodmFsKSB7XG4gICAgcmV0dXJuIHZhbCA9PT0gbnVsbDtcbn1cbmV4cG9ydHMuJG51bGwgPSAkbnVsbDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPSRudWxsLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9udWxsXzEgPSByZXF1aXJlKCcuLi8kbnVsbCcpO1xudmFyIF9kZWZpbmVkXzEgPSByZXF1aXJlKCcuLi8kZGVmaW5lZCcpO1xudmFyIERpY3Rpb25hcnkgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIERpY3Rpb25hcnkoKSB7XG4gICAgICAgIHRoaXMuX2l0ZW1zID0ge307XG4gICAgICAgIHRoaXMuX2FsaWFzZXMgPSB7fTtcbiAgICAgICAgdGhpcy5kZWZhdWx0S2V5ID0gbnVsbDtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KERpY3Rpb25hcnkucHJvdG90eXBlLCBcImxlbmd0aFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX2l0ZW1zKS5sZW5ndGg7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLmV4aXN0cyA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgcmV0dXJuIF9kZWZpbmVkXzEuJGRlZmluZWQodGhpcy5faXRlbXMpICYmIHRoaXMuX2l0ZW1zLmhhc093blByb3BlcnR5KGtleSk7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5nZXQgPSBmdW5jdGlvbiAoa2V5LCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdm9pZCAwKSB7IGRlZmF1bHRWYWx1ZSA9IG51bGw7IH1cbiAgICAgICAgcmV0dXJuIHRoaXMuZXhpc3RzKGtleSkgPyB0aGlzLl9pdGVtc1trZXldIDogdGhpcy5fZ2V0VmFsdWVGcm9tQWxpYXMoa2V5LCBkZWZhdWx0VmFsdWUpO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuX2xpbmtBbGlhcyA9IGZ1bmN0aW9uIChhbGlhcywga2V5KSB7XG4gICAgICAgIHRoaXMuX2FsaWFzZXNbYWxpYXMudHJpbSgpXSA9IGtleS50b1N0cmluZygpO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuX2dldFZhbHVlRnJvbUFsaWFzID0gZnVuY3Rpb24gKGFsaWFzLCBkZWZhdWx0VmFsdWUpIHtcbiAgICAgICAgaWYgKGRlZmF1bHRWYWx1ZSA9PT0gdm9pZCAwKSB7IGRlZmF1bHRWYWx1ZSA9IG51bGw7IH1cbiAgICAgICAgdmFyIGFsaWFzVmFsdWUgPSB0aGlzLl9hbGlhc2VzW2FsaWFzXTtcbiAgICAgICAgaWYgKCFfZGVmaW5lZF8xLiRkZWZpbmVkKGFsaWFzVmFsdWUpIHx8ICF0aGlzLmV4aXN0cyhhbGlhc1ZhbHVlKSkge1xuICAgICAgICAgICAgaWYgKF9udWxsXzEuJG51bGwoZGVmYXVsdFZhbHVlKSAmJiAhX251bGxfMS4kbnVsbCh0aGlzLmRlZmF1bHRLZXkpKSB7XG4gICAgICAgICAgICAgICAgZGVmYXVsdFZhbHVlID0gdGhpcy5nZXQodGhpcy5kZWZhdWx0S2V5KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiBkZWZhdWx0VmFsdWU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHRoaXMuX2l0ZW1zW2FsaWFzVmFsdWVdO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuYWxpYXMgPSBmdW5jdGlvbiAoYWxpYXNlcywga2V5LCBmb3JjZSkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAoZm9yY2UgPT09IHZvaWQgMCkgeyBmb3JjZSA9IGZhbHNlOyB9XG4gICAgICAgIGlmICghdGhpcy5leGlzdHMoa2V5KSAmJiAhZm9yY2UpXG4gICAgICAgICAgICB0aHJvdyBuZXcgUmVmZXJlbmNlRXJyb3IoXCJJdGVtIHdpdGgga2V5ICdcIiArIGtleSArIFwiJyBkb2Vzbid0IGV4aXN0cy5cIik7XG4gICAgICAgIGFsaWFzZXMuc3BsaXQoJywnKS5mb3JFYWNoKGZ1bmN0aW9uIChhbGlhcykge1xuICAgICAgICAgICAgX3RoaXMuX2xpbmtBbGlhcyhhbGlhcywga2V5KTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgRGljdGlvbmFyeS5wcm90b3R5cGUuYWRkID0gZnVuY3Rpb24gKGtleSwgdmFsdWUsIG92ZXJ3cml0ZSkge1xuICAgICAgICBpZiAob3ZlcndyaXRlID09PSB2b2lkIDApIHsgb3ZlcndyaXRlID0gZmFsc2U7IH1cbiAgICAgICAgaWYgKHRoaXMuZXhpc3RzKGtleSkgJiYgIW92ZXJ3cml0ZSlcbiAgICAgICAgICAgIHRocm93IG5ldyBSZWZlcmVuY2VFcnJvcihcIkl0ZW0gd2l0aCBrZXkgJ1wiICsga2V5ICsgXCInIGFscmVhZHkgZXhpc3RzLlwiKTtcbiAgICAgICAgdGhpcy5faXRlbXNba2V5XSA9IHZhbHVlO1xuICAgICAgICByZXR1cm4gdGhpcztcbiAgICB9O1xuICAgIERpY3Rpb25hcnkucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uIChrZXkpIHtcbiAgICAgICAgaWYgKCF0aGlzLmV4aXN0cyhrZXkpKVxuICAgICAgICAgICAgdGhyb3cgbmV3IFJlZmVyZW5jZUVycm9yKFwiSXRlbSB3aXRoIGtleSAnXCIgKyBrZXkgKyBcIicgZG9lc24ndCBleGlzdHMuXCIpO1xuICAgICAgICBkZWxldGUgdGhpcy5faXRlbXNba2V5XTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICBEaWN0aW9uYXJ5LnByb3RvdHlwZS5mb3JFYWNoID0gZnVuY3Rpb24gKGNhbGxiYWNrKSB7XG4gICAgICAgIHZhciBpID0gdGhpcy5faXRlbXM7XG4gICAgICAgIGZvciAodmFyIGtleSBpbiBpKSB7XG4gICAgICAgICAgICBpZiAoaS5oYXNPd25Qcm9wZXJ0eShrZXkpKSB7XG4gICAgICAgICAgICAgICAgY2FsbGJhY2soaVtrZXldLCBrZXksIGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfTtcbiAgICByZXR1cm4gRGljdGlvbmFyeTtcbn0oKSk7XG5leHBvcnRzLkRpY3Rpb25hcnkgPSBEaWN0aW9uYXJ5O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9RGljdGlvbmFyeS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgRG9tYWluID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRG9tYWluLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIERvbWFpbigpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgfVxuICAgIERvbWFpbi5wcm90b3R5cGUuX2V4ZWN1dGUgPSBmdW5jdGlvbiAobWV0aG9kKSB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICBtZXRob2QoKTtcbiAgICAgICAgfVxuICAgICAgICBjYXRjaCAoZXgpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ2Vycm9yJywgZXgpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBEb21haW4ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uIChmdW5jKSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgX3RoaXMuX2V4ZWN1dGUoZnVuYyk7XG4gICAgICAgIH0sIDApO1xuICAgIH07XG4gICAgcmV0dXJuIERvbWFpbjtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkRvbWFpbiA9IERvbWFpbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPURvbWFpbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBWZXJzaW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWZXJzaW9uKG1ham9yLCBtaW5vciwgcGF0Y2gpIHtcbiAgICAgICAgaWYgKG1ham9yID09PSB2b2lkIDApIHsgbWFqb3IgPSAwOyB9XG4gICAgICAgIGlmIChtaW5vciA9PT0gdm9pZCAwKSB7IG1pbm9yID0gMDsgfVxuICAgICAgICBpZiAocGF0Y2ggPT09IHZvaWQgMCkgeyBwYXRjaCA9IDA7IH1cbiAgICAgICAgdGhpcy5tYWpvciA9IG1ham9yO1xuICAgICAgICB0aGlzLm1pbm9yID0gbWlub3I7XG4gICAgICAgIHRoaXMucGF0Y2ggPSBwYXRjaDtcbiAgICB9XG4gICAgVmVyc2lvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5tYWpvciwgdGhpcy5taW5vciwgdGhpcy5wYXRjaF0uam9pbignLicpO1xuICAgIH07XG4gICAgcmV0dXJuIFZlcnNpb247XG59KCkpO1xuZXhwb3J0cy5WZXJzaW9uID0gVmVyc2lvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVZlcnNpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBpc3NldChlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlICE9PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNzZXQgPSBpc3NldDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzc2V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFBvaW50XzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL1BvaW50Jyk7XG5leHBvcnRzLlBvaW50ID0gUG9pbnRfMS5Qb2ludDtcbnZhciBCb3hNb2RlbEVsZW1lbnRfMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvQm94TW9kZWxFbGVtZW50Jyk7XG5leHBvcnRzLkJveE1vZGVsRWxlbWVudCA9IEJveE1vZGVsRWxlbWVudF8xLkJveE1vZGVsRWxlbWVudDtcbnZhciBHVUlEXzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0dVSUQnKTtcbmV4cG9ydHMuR1VJRCA9IEdVSURfMS5HVUlEO1xudmFyIFRleHRBbGlnbl8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9UZXh0QWxpZ24nKTtcbmV4cG9ydHMuVGV4dEFsaWduID0gVGV4dEFsaWduXzEuVGV4dEFsaWduO1xudmFyIEZvbnRfMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvRm9udCcpO1xuZXhwb3J0cy5Gb250ID0gRm9udF8xLkZvbnQ7XG52YXIgRm9udFN0eWxlXzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0ZvbnRTdHlsZScpO1xuZXhwb3J0cy5Gb250U3R5bGUgPSBGb250U3R5bGVfMS5Gb250U3R5bGU7XG52YXIgQ29sbGVjdGlvbl8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Db2xsZWN0aW9uJyk7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uXzEuQ29sbGVjdGlvbjtcbnZhciBDb21wb25lbnRNYXBwZXJfMSA9IHJlcXVpcmUoJy4vdWkvQ29tcG9uZW50TWFwcGVyJyk7XG5leHBvcnRzLkNvbXBvbmVudE1hcHBlciA9IENvbXBvbmVudE1hcHBlcl8xLkNvbXBvbmVudE1hcHBlcjtcbnZhciBVSUNvbXBvbmVudF8xID0gcmVxdWlyZSgnLi91aS9VSUNvbXBvbmVudCcpO1xuZXhwb3J0cy5VSUNvbXBvbmVudCA9IFVJQ29tcG9uZW50XzEuVUlDb21wb25lbnQ7XG52YXIgRm9ybV8xID0gcmVxdWlyZSgnLi91aS9Gb3JtJyk7XG5leHBvcnRzLkZvcm0gPSBGb3JtXzEuRm9ybTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVpLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlcl8xID0gcmVxdWlyZSgnLi9icm9hZGNhc3RlcnMvQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyJyk7XG52YXIgQ29tcG9uZW50TWFwcGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBDb21wb25lbnRNYXBwZXIob3duZXIpIHtcbiAgICAgICAgdGhpcy5fZ3VpZE1hcCA9IHt9O1xuICAgICAgICB0aGlzLmJyb2FkY2FzdGVycyA9IFtdO1xuICAgICAgICB0aGlzLnByZXZpb3VzTW91c2VFbGVtZW50ID0gbnVsbDtcbiAgICAgICAgdGhpcy5fY3VycmVudE1vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcbiAgICAgICAgdGhpcy5icm9hZGNhc3RlcnMucHVzaChuZXcgQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyXzEuQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyKG93bmVyLCBDb21wb25lbnRNYXBwZXIuRE9NTW91c2VFdmVudHMsIGZhbHNlKSk7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLCBcImN1cnJlbnRNb3VzZUVsZW1lbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9jdXJyZW50TW91c2VFbGVtZW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50TW91c2VFbGVtZW50ID0gZTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUsIFwiY3VycmVudEZvY3VzZWRFbGVtZW50XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fY3VycmVudEZvY3VzZWRFbGVtZW50O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICB0aGlzLl9jdXJyZW50Rm9jdXNlZEVsZW1lbnQgPSBlO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLmxvYWQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0ZXJzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgIGUubG9hZCgpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUuX3JlZ2lzdGVySWQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9ndWlkTWFwW2VsZW1lbnQuaWQudG9TdHJpbmcoKV0gPSBlbGVtZW50O1xuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChlaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1aWRNYXBbZWlkXTtcbiAgICB9O1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUucmVnaXN0ZXIgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB0aGlzLl9yZWdpc3RlcklkKGl0ZW0pO1xuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLkRPTU1vdXNlRXZlbnRzID0gW1xuICAgICAgICAnY2xpY2snLFxuICAgICAgICAnZGJsY2xpY2snLFxuICAgICAgICAnbW91c2Vkb3duJyxcbiAgICAgICAgJ21vdXNldXAnLFxuICAgICAgICAnbW91c2VvdmVyJyxcbiAgICAgICAgJ21vdXNlb3V0JyxcbiAgICAgICAgJ21vdXNlbW92ZSddO1xuICAgIENvbXBvbmVudE1hcHBlci5ET01FdmVudHMgPSBbXG4gICAgICAgICdrZXlkb3duJyxcbiAgICAgICAgJ2tleXVwJyxcbiAgICAgICAgJ2tleXByZXNzJ1xuICAgIF07XG4gICAgcmV0dXJuIENvbXBvbmVudE1hcHBlcjtcbn0oKSk7XG5leHBvcnRzLkNvbXBvbmVudE1hcHBlciA9IENvbXBvbmVudE1hcHBlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbXBvbmVudE1hcHBlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vZXZlbnRzJyk7XG52YXIgaGVscGVyc18xID0gcmVxdWlyZSgnLi4vaGVscGVycycpO1xudmFyIENvbXBvbmVudE1hcHBlcl8xID0gcmVxdWlyZSgnLi9Db21wb25lbnRNYXBwZXInKTtcbnZhciBDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL3R5cGVzL0NvbGxlY3Rpb24nKTtcbnZhciBGb3JtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9ybSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb3JtKGhhbmRsZXIsIGJvb3RzdHJhcCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy52ZXJzaW9uID0gbmV3IGhlbHBlcnNfMS5WZXJzaW9uKDAsIDUsIDEpO1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuZWxlbWVudCA9IGhhbmRsZXI7XG4gICAgICAgIHRoaXMuY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgICAgIHRoaXMuY2FudmFzLnRhYkluZGV4ID0gMDtcbiAgICAgICAgdGhpcy5jYW52YXMuZm9jdXMoKTtcbiAgICAgICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KHRoaXMuY2FudmFzLCAnZm9ybScsIHtcbiAgICAgICAgICAgIHZhbHVlOiBzZWxmLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGJvb3RzdHJhcClcbiAgICAgICAgICAgIGJvb3RzdHJhcC5jYWxsKHNlbGYsIGhhbmRsZXIpO1xuICAgICAgICB0aGlzLmVsZW1lbnQuYXBwZW5kQ2hpbGQodGhpcy5jYW52YXMpO1xuICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IENvbGxlY3Rpb25fMS5Db2xsZWN0aW9uKG51bGwsIHRoaXMpO1xuICAgICAgICB0aGlzLmNvbnRyb2xzLm9uKCdlbGVtZW50SW5zZXJ0ZWQnLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZW1pdCgnZHJhd1N0YXJ0JywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywge30pKTtcbiAgICAgICAgdGhpcy5fbWFwID0gbmV3IENvbXBvbmVudE1hcHBlcl8xLkNvbXBvbmVudE1hcHBlcih0aGlzKTtcbiAgICAgICAgdGhpcy5vbigncmVkcmF3JywgZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdGhpcy5jbGVhcigpO1xuICAgICAgICAgICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgICAgICAgZS5yZWRyYXcoKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fbWFwLmxvYWQoKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmhlaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMuaGVpZ2h0ID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcIndpZHRoXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMud2lkdGg7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuY2FudmFzLndpZHRoID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvcm0ucHJvdG90eXBlLCBcImNvbnRleHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwibWFwcGVyXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbWFwO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBGb3JtLnByb3RvdHlwZS5yZWRyYXdDb250ZXh0ID0gZnVuY3Rpb24gKGZvcmNlKSB7XG4gICAgICAgIHRoaXMuX2VtaXQoJ3JlZHJhdycsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZm9yY2UgfSkpO1xuICAgIH07XG4gICAgRm9ybS5wcm90b3R5cGUucmVnaXN0ZXJFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5tYXBwZXIucmVnaXN0ZXIoZWxlbWVudCk7XG4gICAgfTtcbiAgICBGb3JtLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICB9O1xuICAgIEZvcm0ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgcmV0dXJuIHRoaXM7XG4gICAgfTtcbiAgICByZXR1cm4gRm9ybTtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkZvcm0gPSBGb3JtO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rm9ybS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vZXZlbnRzJyk7XG52YXIgaGVscGVyc18xID0gcmVxdWlyZSgnLi4vaGVscGVycycpO1xudmFyIEJveE1vZGVsRWxlbWVudF8xID0gcmVxdWlyZSgnLi90eXBlcy9Cb3hNb2RlbEVsZW1lbnQnKTtcbnZhciBDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL3R5cGVzL0NvbGxlY3Rpb24nKTtcbnZhciBHVUlEXzEgPSByZXF1aXJlKCcuL3R5cGVzL0dVSUQnKTtcbnZhciBQb2ludF8xID0gcmVxdWlyZSgnLi90eXBlcy9Qb2ludCcpO1xudmFyIEZvbnRfMSA9IHJlcXVpcmUoJy4vdHlwZXMvRm9udCcpO1xudmFyIFVJQ29tcG9uZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoVUlDb21wb25lbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gVUlDb21wb25lbnQob3duZXIpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX2hlaWdodCA9IDEyODtcbiAgICAgICAgdGhpcy5fd2lkdGggPSAxMjg7XG4gICAgICAgIHRoaXMuX2luamVjdGVkID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2JhY2tncm91bmRDb2xvciA9ICdyZ2JhKDAsMCwwLDApJztcbiAgICAgICAgdGhpcy5fZm9yZUNvbG9yID0gJyMwMDAnO1xuICAgICAgICB0aGlzLl9wYWRkaW5nID0gbmV3IEJveE1vZGVsRWxlbWVudF8xLkJveE1vZGVsRWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9tYXJnaW4gPSBuZXcgQm94TW9kZWxFbGVtZW50XzEuQm94TW9kZWxFbGVtZW50KCk7XG4gICAgICAgIHRoaXMuX2ZvbnQgPSBuZXcgRm9udF8xLkZvbnQoKTtcbiAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XG4gICAgICAgIHRoaXMuX2NvbnRleHQgPSBvd25lci5jb250ZXh0O1xuICAgICAgICB0aGlzLl9fcG9zaXRpb25fXyA9IG5ldyBQb2ludF8xLlBvaW50KDAsIDApO1xuICAgICAgICB0aGlzLmNvbnRyb2xzID0gbmV3IENvbGxlY3Rpb25fMS5Db2xsZWN0aW9uKHRoaXMsIG93bmVyKTtcbiAgICAgICAgZnVuY3Rpb24gZm5PblVwZGF0ZSgpIHtcbiAgICAgICAgICAgIHNlbGYuX29uVXBkYXRlKCk7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHByb3BFdmVudCA9ICdwcm9wZXJ0eUNoYW5nZSc7XG4gICAgICAgIHRoaXMub24oJ2xheWVyVXBkYXRlJywgdGhpcy5fb25VcGRhdGUpO1xuICAgICAgICB0aGlzLm9uKCdwcm9wZXJ0eUNoYW5nZScsIHRoaXMuX29uVXBkYXRlKTtcbiAgICAgICAgdGhpcy5fZm9udC5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgICAgICB0aGlzLl9wYWRkaW5nLm9uKHByb3BFdmVudCwgZm5PblVwZGF0ZSk7XG4gICAgICAgIHRoaXMuX21hcmdpbi5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgIH1cbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuZW1pdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncykge1xuICAgICAgICBpZiAoZXZlbnROYW1lID09PSB2b2lkIDApIHsgZXZlbnROYW1lID0gJ2VtaXQnOyB9XG4gICAgICAgIHRoaXMuX2VtaXQoZXZlbnROYW1lLCBldmVudEFyZ3MpO1xuICAgICAgICBpZiAodGhpcy5oYXNQYXJlbnQoKSlcbiAgICAgICAgICAgIHRoaXMucGFyZW50LmVtaXQoZXZlbnROYW1lLCBldmVudEFyZ3MpO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmJyb2FkY2FzdCA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGV2ZW50QXJncywgZW1pdE9uRXZlbnQpIHtcbiAgICAgICAgaWYgKGV2ZW50TmFtZSA9PT0gdm9pZCAwKSB7IGV2ZW50TmFtZSA9ICdicm9hZGNhc3QnOyB9XG4gICAgICAgIGlmIChlbWl0T25FdmVudCA9PT0gdm9pZCAwKSB7IGVtaXRPbkV2ZW50ID0gdHJ1ZTsgfVxuICAgICAgICBpZiAoZW1pdE9uRXZlbnQpXG4gICAgICAgICAgICB0aGlzLl9lbWl0KGV2ZW50TmFtZSwgZXZlbnRBcmdzKTtcbiAgICAgICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBlbGVtZW50LmJyb2FkY2FzdChldmVudE5hbWUsIGV2ZW50QXJncyk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7XG4gICAgICAgIHRoaXMuYnJvYWRjYXN0KCdtb3VzZW92ZXInLCBldmVudEFyZ3MsIGZhbHNlKTtcbiAgICAgICAgdGhpcy5lbWl0KCdtb3VzZW92ZXInLCBldmVudEFyZ3MpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJkcmF3blwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYXduO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInBhZGRpbmdcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWRkaW5nO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcIm1hcmdpblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmdpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJmb250XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJpZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0lkKCkpXG4gICAgICAgICAgICAgICAgdGhpcy5fR1VJRCA9IG5ldyBHVUlEXzEuR1VJRCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0dVSUQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5oYXNJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9HVUlEICE9PSAndW5kZWZpbmVkJztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiaXNJbmplY3RlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuX29uVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJhd24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMub3duZXIuX2VtaXQoJ3JlZHJhdycsIHsgcmVsYXRlZFRhcmdldDogdGhpcyB9KTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5pbkJvdW5kc09mID0gZnVuY3Rpb24gKGxvY2F0aW9uKSB7XG4gICAgICAgIHZhciBwb2ludHMgPSB0aGlzLnBvaW50cygpO1xuICAgICAgICByZXR1cm4gKGxvY2F0aW9uLnggPj0gcG9pbnRzWzBdLngpICYmIChsb2NhdGlvbi54IDw9IHBvaW50c1sxXS54KSAmJiAobG9jYXRpb24ueSA+PSBwb2ludHNbMF0ueSkgJiYgKGxvY2F0aW9uLnkgPD0gcG9pbnRzWzJdLnkpO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJiYWNrZ3JvdW5kQ29sb3JcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0NvbG9yKSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdGhpcy5fYmFja2dyb3VuZENvbG9yLnRvU3RyaW5nKCk7XG4gICAgICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSBuZXdDb2xvcjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdiYWNrZ3JvdW5kQ29sb3InLCBvbGQsIG5ld0NvbG9yKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiZm9yZUNvbG9yXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9yZUNvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2ZvcmVDb2xvci50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fZm9yZUNvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnZm9yZUNvbG9yJywgb2xkLCBuZXdDb2xvcikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2hlaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3SGVpZ2h0KSB7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSBuZXdIZWlnaHQ7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnd2lkdGgnLCBudWxsLCBuZXdIZWlnaHQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJ3aWR0aFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dpZHRoO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdXaWR0aCkge1xuICAgICAgICAgICAgdGhpcy5fd2lkdGggPSBuZXdXaWR0aDtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICd3aWR0aCcsIG51bGwsIG5ld1dpZHRoKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5nZXRBYnNvbHV0ZUhlaWdodCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0O1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmdldEFic29sdXRlV2lkdGggPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwidG9wXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fX3Bvc2l0aW9uX18ueTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHYgKyAwO1xuICAgICAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18ueSA9IHY7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndG9wJywgb2xkLCB2KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwibGVmdFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fLng7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB2ICsgMDtcbiAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnggPSB2O1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2xlZnQnLCBvbGQsIHYpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJwb3NpdGlvblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdQb3NpdGlvbikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IG5ldyBQb2ludF8xLlBvaW50KG5ld1Bvc2l0aW9uLngsIG5ld1Bvc2l0aW9uLnkpO1xuICAgICAgICAgICAgdGhpcy50b3AgPSBuZXdQb3NpdGlvbi55O1xuICAgICAgICAgICAgdGhpcy5sZWZ0ID0gbmV3UG9zaXRpb24ueDtcbiAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fID0gbmV3UG9zaXRpb247XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAncG9zaXRpb24nLCBvbGQsIG5ld1Bvc2l0aW9uKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5wb2ludHMgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwMSA9IG5ldyBQb2ludF8xLlBvaW50KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55KSwgcDIgPSBuZXcgUG9pbnRfMS5Qb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5wb3NpdGlvbi55KSwgcDMgPSBuZXcgUG9pbnRfMS5Qb2ludCh0aGlzLnBvc2l0aW9uLnggKyB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5wb3NpdGlvbi55ICsgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKSwgcDQgPSBuZXcgUG9pbnRfMS5Qb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSArIHRoaXMuZ2V0QWJzb2x1dGVIZWlnaHQoKSk7XG4gICAgICAgIHJldHVybiBbcDEsIHAyLCBwMywgcDRdO1xuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJwYXJlbnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYXJlbnQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5oYXNQYXJlbnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAoaGVscGVyc18xLmlzc2V0KHRoaXMucGFyZW50KSAmJiB0aGlzLnBhcmVudCAhPT0gbnVsbCk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucmVkcmF3ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuaXNJbmplY3RlZClcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgdGhpcy5vd25lci5yZWdpc3RlckVsZW1lbnQodGhpcyk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ3JlZHJhdycsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZmFsc2UgfSkpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkgeyB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5fZHJhd0NoaWxkcmVuID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gX2ZuRHJhd0NoaWxkKGUpIHtcbiAgICAgICAgICAgIGUucmVkcmF3KCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnJlbmRlciA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZHJhd24gPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVuZGVyJywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgICAgICB0aGlzLl9yZW5kZXIoKTtcbiAgICAgICAgdGhpcy5fZHJhd0NoaWxkcmVuKCk7XG4gICAgICAgIHRoaXMuX2RyYXduID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZW1pdCgncmVuZGVyZWQnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuX19pbmplY3QgPSBmdW5jdGlvbiAocGFyZW50KSB7XG4gICAgICAgIHRoaXMuX3BhcmVudCA9IHBhcmVudDtcbiAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSB0cnVlO1xuICAgICAgICB0aGlzLl9mb250LmVtaXR0YWJsZSA9IHRydWU7XG4gICAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMpO1xuICAgICAgICB0aGlzLl9lbWl0KCdpbmplY3QnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCB7ICdwYXJlbnQnOiBwYXJlbnQgfSkpO1xuICAgICAgICB0aGlzLnJlbmRlcigpO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHBhcmVudCA9IHRoaXMuaGFzUGFyZW50KCkgPyB0aGlzLnBhcmVudCA6IHRoaXMub3duZXI7XG4gICAgICAgIHBhcmVudC5jb250cm9scy5yZW1vdmUodGhpcyk7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuZGlzcG9zZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5fZW1pdCgnZGlzcG9zZScsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgdGhpcy5faW5qZWN0ZWQgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJldHVybiBVSUNvbXBvbmVudDtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLlVJQ29tcG9uZW50ID0gVUlDb21wb25lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1VSUNvbXBvbmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFBvaW50XzEgPSByZXF1aXJlKCcuLi90eXBlcy9Qb2ludCcpO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgaGVscGVyc18xID0gcmVxdWlyZSgnLi4vLi4vaGVscGVycycpO1xudmFyIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXJfMSA9IHJlcXVpcmUoJy4uL3R5cGVzL0NhbnZhc0V2ZW50QnJvYWRjYXN0ZXInKTtcbnZhciBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ2FudmFzTW91c2VFdmVudEJyb2FkY2FzdGVyKG93bmVyLCBldmVudHMsIGF1dG9iaW5kKSB7XG4gICAgICAgIGlmIChldmVudHMgPT09IHZvaWQgMCkgeyBldmVudHMgPSBbXTsgfVxuICAgICAgICBpZiAoYXV0b2JpbmQgPT09IHZvaWQgMCkgeyBhdXRvYmluZCA9IGZhbHNlOyB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG93bmVyLCBldmVudHMpO1xuICAgICAgICB0aGlzLmVsZW1lbnRGb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLmV2ZW50SGFuZGxlcnMgPSBuZXcgaGVscGVyc18xLkRpY3Rpb25hcnkoKTtcbiAgICAgICAgdGhpcy5faW5pdEhhbmRsZXJzKCk7XG4gICAgfVxuICAgIENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUuX2luaXRIYW5kbGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzLmRlZmF1bHRLZXkgPSAnbW91c2Vtb3ZlJztcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzXG4gICAgICAgICAgICAuYWRkKCdjbGljaycsIGZ1bmN0aW9uIChlbGVtZW50LCBldmVudCkge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQ7XG4gICAgICAgICAgICBjb25zb2xlLndhcm4oJ2NsaWNrIGNvbW1pdGVkJywgZWxlbWVudCk7XG4gICAgICAgICAgICBpZiAob2xkID09PSBudWxsIHx8IChvbGQuaWQgPT09IGVsZW1lbnQuaWQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHRFdmVudCA9IG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZW1pdChldmVudC50eXBlLCB0RXZlbnQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICAgICAgb2xkLmJyb2FkY2FzdCgnYmx1cicsIG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpKTtcbiAgICAgICAgICAgICAgICB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50ID0gZWxlbWVudDtcbiAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5lbWl0KGV2ZW50LnR5cGUsIHRFdmVudCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWRkKCdtb3VzZW1vdmUnLCBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLm1hcHBlci5jdXJyZW50TW91c2VFbGVtZW50O1xuICAgICAgICAgICAgaWYgKGhlbHBlcnNfMS4kbnVsbChvbGQpKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgICAgICAgICAgICAgdmFyIHRFdmVudCA9IG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQoZWxlbWVudCwgZXZlbnQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuZW1pdCgnbW91c2VvdmVyJywgdEV2ZW50KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgICAgIGlmIChvbGQuaWQgIT09IGVsZW1lbnQuaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgdmFyIHRFdmVudCA9IG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQob2xkLCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIG9sZC5lbWl0KCdtb3VzZW91dCcsIHRFdmVudCk7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQgPSBlbGVtZW50O1xuICAgICAgICAgICAgICAgICAgICB2YXIgdEV2ZW50ID0gbmV3IGV2ZW50c18xLlVJTW91c2VFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZW1pdCgnbW91c2VvdmVyJywgdEV2ZW50KTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICAgICAgICAuYWxpYXMoJ2RibGNsaWNrLCBtb3VzZWRvd24sIG1vdXNldXAsIG1vdXNlb3V0JywgJ2NsaWNrJyk7XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnRhcmdldEV2ZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBwID0gbmV3IFBvaW50XzEuUG9pbnQoZXZlbnQubGF5ZXJYLCBldmVudC5sYXllclkpO1xuICAgICAgICBpZiAoZWxlbWVudC5pbkJvdW5kc09mKHApKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFjdChlbGVtZW50LCBldmVudCk7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICBlbGVtZW50LmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKF9lbGVtZW50KSB7XG4gICAgICAgICAgICAgICAgX3RoaXMudGFyZ2V0RXZlbnQoX2VsZW1lbnQsIGV2ZW50KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7XG4gICAgICAgIHRoaXMuZWxlbWVudEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5ldmVudEhhbmRsZXJzLmdldChldmVudC50eXBlKS5jYWxsKHRoaXMsIGVsZW1lbnQsIGV2ZW50KTtcbiAgICB9O1xuICAgIENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUuYmluZEV2ZW50ID0gZnVuY3Rpb24gKGV2ZW50KSB7XG4gICAgICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgICAgIHZhciBvd25lciA9IHRoaXMub3duZXI7XG4gICAgICAgIHZhciBjRWxlbWVudCA9IHRoaXMubWFwcGVyLmN1cnJlbnRNb3VzZUVsZW1lbnQ7XG4gICAgICAgIHZhciBwRWxlbWVudCA9IHRoaXMubWFwcGVyLnByZXZpb3VzTW91c2VFbGVtZW50O1xuICAgICAgICB0aGlzLmVsZW1lbnRGb3VuZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLm1hcHBlci5wcmV2aW91c01vdXNlRWxlbWVudCA9IGNFbGVtZW50O1xuICAgICAgICBvd25lci5fZW1pdChldmVudC50eXBlLCBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KG93bmVyLCBldmVudCkpO1xuICAgICAgICBvd25lci5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgICAgICBfdGhpcy50YXJnZXRFdmVudChlbGVtZW50LCBldmVudCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoIXRoaXMuZWxlbWVudEZvdW5kICYmICFoZWxwZXJzXzEuJG51bGwodGhpcy5tYXBwZXIucHJldmlvdXNNb3VzZUVsZW1lbnQpKSB7XG4gICAgICAgICAgICBpZiAoIWhlbHBlcnNfMS4kbnVsbChwRWxlbWVudCkpXG4gICAgICAgICAgICAgICAgcEVsZW1lbnQuZW1pdCgnbW91c2VvdXQnLCBuZXcgZXZlbnRzXzEuVUlNb3VzZUV2ZW50KHBFbGVtZW50LCBldmVudCkpO1xuICAgICAgICAgICAgdGhpcy5tYXBwZXIuY3VycmVudE1vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgICAgICB0aGlzLm1hcHBlci5wcmV2aW91c01vdXNlRWxlbWVudCA9IG51bGw7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIHJldHVybiBDYW52YXNNb3VzZUV2ZW50QnJvYWRjYXN0ZXI7XG59KENhbnZhc0V2ZW50QnJvYWRjYXN0ZXJfMS5DYW52YXNFdmVudEJyb2FkY2FzdGVyKSk7XG5leHBvcnRzLkNhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3RlciA9IENhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNhbnZhc01vdXNlRXZlbnRCcm9hZGNhc3Rlci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgQm94TW9kZWxFbGVtZW50ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQm94TW9kZWxFbGVtZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEJveE1vZGVsRWxlbWVudCh0b3AsIHJpZ2h0LCBib3R0b20sIGxlZnQpIHtcbiAgICAgICAgaWYgKHRvcCA9PT0gdm9pZCAwKSB7IHRvcCA9IDA7IH1cbiAgICAgICAgaWYgKHJpZ2h0ID09PSB2b2lkIDApIHsgcmlnaHQgPSAwOyB9XG4gICAgICAgIGlmIChib3R0b20gPT09IHZvaWQgMCkgeyBib3R0b20gPSAwOyB9XG4gICAgICAgIGlmIChsZWZ0ID09PSB2b2lkIDApIHsgbGVmdCA9IDA7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuX3RvcCA9IHRvcDtcbiAgICAgICAgdGhpcy5fbGVmdCA9IGxlZnQ7XG4gICAgICAgIHRoaXMuX3JpZ2h0ID0gcmlnaHQ7XG4gICAgICAgIHRoaXMuX2JvdHRvbSA9IGJvdHRvbTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJveE1vZGVsRWxlbWVudC5wcm90b3R5cGUsIFwidG9wXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdG9wO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fdG9wID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgndG9wJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcInJpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcmlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9yaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3JpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcImJvdHRvbVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2JvdHRvbTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2JvdHRvbSA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2JvdHRvbScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJsZWZ0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbGVmdDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX2xlZnQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdsZWZ0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIHJldHVybiBCb3hNb2RlbEVsZW1lbnQ7XG59KGV2ZW50c18xLkVtaXR0YWJsZSkpO1xuZXhwb3J0cy5Cb3hNb2RlbEVsZW1lbnQgPSBCb3hNb2RlbEVsZW1lbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Cb3hNb2RlbEVsZW1lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgQ2FudmFzRXZlbnRCcm9hZGNhc3RlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcihvd25lciwgZXZlbnRzLCBhdXRvYmluZCkge1xuICAgICAgICBpZiAoZXZlbnRzID09PSB2b2lkIDApIHsgZXZlbnRzID0gW107IH1cbiAgICAgICAgaWYgKGF1dG9iaW5kID09PSB2b2lkIDApIHsgYXV0b2JpbmQgPSBmYWxzZTsgfVxuICAgICAgICB0aGlzLl9sb2FkZWQgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICB0aGlzLmV2ZW50cyA9IGV2ZW50cztcbiAgICAgICAgaWYgKGF1dG9iaW5kKVxuICAgICAgICAgICAgdGhpcy5sb2FkKCk7XG4gICAgfVxuICAgIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLmJpbmRFdmVudCA9IGZ1bmN0aW9uIChldmVudCkgeyB9O1xuICAgIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXIucHJvdG90eXBlLnJlYWN0ID0gZnVuY3Rpb24gKGVsZW1lbnQsIGV2ZW50KSB7IH07XG4gICAgQ2FudmFzRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUudGFyZ2V0RXZlbnQgPSBmdW5jdGlvbiAoZWxlbWVudCwgZXZlbnQpIHsgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQ2FudmFzRXZlbnRCcm9hZGNhc3Rlci5wcm90b3R5cGUsIFwibG9hZGVkXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fbG9hZGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBDYW52YXNFdmVudEJyb2FkY2FzdGVyLnByb3RvdHlwZS5sb2FkID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgICAgICBpZiAodGhpcy5sb2FkZWQpXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMubWFwcGVyID0gdGhpcy5vd25lci5tYXBwZXI7XG4gICAgICAgIHRoaXMuZXZlbnRzLmZvckVhY2goZnVuY3Rpb24gKGV2ZW50TmFtZSkge1xuICAgICAgICAgICAgX3RoaXMub3duZXIuY2FudmFzLmFkZEV2ZW50TGlzdGVuZXIoZXZlbnROYW1lLCBmdW5jdGlvbiAoZXZlbnQpIHtcbiAgICAgICAgICAgICAgICBfdGhpcy5iaW5kRXZlbnQoZXZlbnQpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9sb2FkZWQgPSB0cnVlO1xuICAgIH07XG4gICAgcmV0dXJuIENhbnZhc0V2ZW50QnJvYWRjYXN0ZXI7XG59KCkpO1xuZXhwb3J0cy5DYW52YXNFdmVudEJyb2FkY2FzdGVyID0gQ2FudmFzRXZlbnRCcm9hZGNhc3Rlcjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNhbnZhc0V2ZW50QnJvYWRjYXN0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIGV2ZW50c18yID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgUG9pbnRfMSA9IHJlcXVpcmUoJy4vUG9pbnQnKTtcbnZhciBDb2xsZWN0aW9uID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoQ29sbGVjdGlvbiwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBDb2xsZWN0aW9uKGhhbmRsZXIsIGFwcEluc3RhbmNlKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLmNvbGxlY3Rpb25IYW5kbGVyID0gaGFuZGxlcjtcbiAgICAgICAgdGhpcy5pdGVtcyA9IFtdO1xuICAgICAgICB0aGlzLl9kZWZhdWx0Rm9ybSA9IGFwcEluc3RhbmNlO1xuICAgIH1cbiAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5hZGQgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICBpdGVtLl9faW5qZWN0KHRoaXMuY29sbGVjdGlvbkhhbmRsZXIpO1xuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ2VsZW1lbnRJbnNlcnRlZCcsIG5ldyBldmVudHNfMi5Db2xsZWN0aW9uRXZlbnQodGhpcywgaXRlbSkpO1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUucmVtb3ZlID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdmFyIGkgPSB0aGlzLml0ZW1zLmluZGV4T2YoaXRlbSk7XG4gICAgICAgIGlmIChpID4gLTEpIHtcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0uZGlzcG9zZSgpO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgnZWxlbWVudFJlbW92ZScsIG5ldyBldmVudHNfMi5Db2xsZWN0aW9uRXZlbnQodGhpcywgdGhpcy5pdGVtc1tpXSkpO1xuICAgICAgICAgICAgdGhpcy5pdGVtcy5zcGxpY2UoaSwgMSk7XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmZvckVhY2ggPSBmdW5jdGlvbiAoY2FsbGJhY2spIHtcbiAgICAgICAgdGhpcy5pdGVtcy5mb3JFYWNoLmNhbGwodGhpcy5pdGVtcywgY2FsbGJhY2spO1xuICAgIH07XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuYnJvYWRjYXN0ID0gZnVuY3Rpb24gKGRvbUV2ZW50LCBldmVudENvbnN0cnVjdG9yLCBjaGVja0JvdW5kcywgcG9pbnQpIHtcbiAgICAgICAgaWYgKGNoZWNrQm91bmRzID09PSB2b2lkIDApIHsgY2hlY2tCb3VuZHMgPSB0cnVlOyB9XG4gICAgICAgIGlmIChwb2ludCA9PT0gdm9pZCAwKSB7IHBvaW50ID0gbmV3IFBvaW50XzEuUG9pbnQoMCwgMCk7IH1cbiAgICAgICAgdGhpcy5mb3JFYWNoKGZ1bmN0aW9uIGJyb2FkY2FzdEV2ZW50KGUpIHtcbiAgICAgICAgICAgIHZhciBpbkJvdW5kcyA9IChjaGVja0JvdW5kcykgPyBlLmluQm91bmRzT2YocG9pbnQpIDogdHJ1ZTtcbiAgICAgICAgICAgIGlmIChpbkJvdW5kcykge1xuICAgICAgICAgICAgICAgIGUuX2VtaXQoZG9tRXZlbnQudHlwZSwgZXZlbnRDb25zdHJ1Y3Rvcihkb21FdmVudC50eXBlLCBlKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgY2hlY2tCb3VuZHNSZWN1cnNpdmUgPSBjaGVja0JvdW5kcztcbiAgICAgICAgICAgIGlmIChpbkJvdW5kcylcbiAgICAgICAgICAgICAgICBjaGVja0JvdW5kc1JlY3Vyc2l2ZSA9IGZhbHNlO1xuICAgICAgICAgICAgZS5jb250cm9scy5icm9hZGNhc3QoZG9tRXZlbnQsIGV2ZW50Q29uc3RydWN0b3IsIGNoZWNrQm91bmRzUmVjdXJzaXZlLCBwb2ludCk7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgcmV0dXJuIENvbGxlY3Rpb247XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Db2xsZWN0aW9uID0gQ29sbGVjdGlvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUNvbGxlY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBoZWxwZXJzXzEgPSByZXF1aXJlKCcuLi8uLi9oZWxwZXJzJyk7XG52YXIgRm9udFN0eWxlXzEgPSByZXF1aXJlKCcuL0ZvbnRTdHlsZScpO1xudmFyIGV2ZW50c18xID0gcmVxdWlyZSgnLi4vLi4vZXZlbnRzJyk7XG52YXIgRm9udCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEZvbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gRm9udChmYW1pbHksIHNpemUsIHdlaWdodCkge1xuICAgICAgICBpZiAoZmFtaWx5ID09PSB2b2lkIDApIHsgZmFtaWx5ID0gJ3NhbnMtc2VyaWYnOyB9XG4gICAgICAgIGlmIChzaXplID09PSB2b2lkIDApIHsgc2l6ZSA9IDEwOyB9XG4gICAgICAgIGlmICh3ZWlnaHQgPT09IHZvaWQgMCkgeyB3ZWlnaHQgPSA0MDA7IH1cbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdHRhYmxlID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2ZhbWlseSA9IGZhbWlseTtcbiAgICAgICAgdGhpcy5fc2l6ZSA9IHNpemU7XG4gICAgICAgIHRoaXMuX3dlaWdodCA9IHdlaWdodDtcbiAgICAgICAgdGhpcy5fc3R5bGUgPSBGb250U3R5bGVfMS5Gb250U3R5bGUubm9ybWFsO1xuICAgIH1cbiAgICBGb250LnByb3RvdHlwZS5fb25DaGFuZ2UgPSBmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICBpZiAodGhpcy5lbWl0dGFibGUpIHtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcImhlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuICghaGVscGVyc18xLmlzc2V0KHRoaXMuX2hlaWdodCkgfHwgdHlwZW9mIHRoaXMuX2hlaWdodCA9PSAndW5kZWZpbmVkJykgPyAodGhpcy5fc2l6ZSAqIDEuMikgfCAwIDogdGhpcy5faGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnaGVpZ2h0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJ3ZWlnaHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93ZWlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl93ZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCd3ZWlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcInN0eWxlXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc3R5bGU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3N0eWxlID0gdjtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdzdHlsZScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwiZmFtaWx5XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZmFtaWx5O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9mYW1pbHkgPSB2O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ2ZhbWlseScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwic2l6ZVwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3NpemU7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX3NpemUgPSB2O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3NpemUnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgRm9udC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5zdHlsZS50b1N0cmluZygpLCB0aGlzLndlaWdodCwgdGhpcy5zaXplICsgJ3B4LycgKyB0aGlzLmhlaWdodCArICdweCcsIHRoaXMuZmFtaWx5XS5qb2luKCcgJyk7XG4gICAgfTtcbiAgICByZXR1cm4gRm9udDtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkZvbnQgPSBGb250O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rm9udC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBGb250U3R5bGUgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEZvbnRTdHlsZSh0eXBlKSB7XG4gICAgICAgIHRoaXMuX3N0eWxlVHlwZSA9IHR5cGU7XG4gICAgfVxuICAgIEZvbnRTdHlsZS5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9zdHlsZVR5cGUudG9TdHJpbmcoKTtcbiAgICB9O1xuICAgIEZvbnRTdHlsZS5ub3JtYWwgPSBuZXcgRm9udFN0eWxlKCdub3JtYWwnKTtcbiAgICBGb250U3R5bGUuaXRhbGljID0gbmV3IEZvbnRTdHlsZSgnaXRhbGljJyk7XG4gICAgcmV0dXJuIEZvbnRTdHlsZTtcbn0oKSk7XG5leHBvcnRzLkZvbnRTdHlsZSA9IEZvbnRTdHlsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZvbnRTdHlsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBHVUlEID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBHVUlEKCkge1xuICAgICAgICB2YXIgdmFsdWUgPSBHVUlELmdlbmVyYXRlKCk7XG4gICAgICAgIHRoaXMudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7IHJldHVybiB2YWx1ZTsgfTtcbiAgICB9XG4gICAgR1VJRC5nZW5lcmF0ZSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZnVuY3Rpb24gczQoKSB7XG4gICAgICAgICAgICByZXR1cm4gTWF0aC5mbG9vcigoMSArIE1hdGgucmFuZG9tKCkpICogMHgxMDAwMClcbiAgICAgICAgICAgICAgICAudG9TdHJpbmcoMTYpXG4gICAgICAgICAgICAgICAgLnN1YnN0cmluZygxKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gczQoKSArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICsgczQoKSArICctJyArXG4gICAgICAgICAgICBzNCgpICsgJy0nICsgczQoKSArIHM0KCkgKyBzNCgpO1xuICAgIH07XG4gICAgR1VJRC5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICB9O1xuICAgIEdVSUQucHJvdG90eXBlLmxlbmd0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9TdHJpbmcoKS5sZW5ndGg7XG4gICAgfTtcbiAgICByZXR1cm4gR1VJRDtcbn0oKSk7XG5leHBvcnRzLkdVSUQgPSBHVUlEO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9R1VJRC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBQb2ludCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gUG9pbnQoeCwgeSkge1xuICAgICAgICB0aGlzLnggPSB4O1xuICAgICAgICB0aGlzLnkgPSB5O1xuICAgIH1cbiAgICByZXR1cm4gUG9pbnQ7XG59KCkpO1xuZXhwb3J0cy5Qb2ludCA9IFBvaW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9UG9pbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgVGV4dEFsaWduID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBUZXh0QWxpZ24oKSB7XG4gICAgfVxuICAgIFRleHRBbGlnbi5zdGFydCA9ICdzdGFydCc7XG4gICAgVGV4dEFsaWduLmVuZCA9ICdlbmQnO1xuICAgIFRleHRBbGlnbi5sZWZ0ID0gJ2xlZnQnO1xuICAgIFRleHRBbGlnbi5jZW50ZXIgPSAnY2VudGVyJztcbiAgICBUZXh0QWxpZ24ucmlnaHQgPSAncmlnaHQnO1xuICAgIHJldHVybiBUZXh0QWxpZ247XG59KCkpO1xuZXhwb3J0cy5UZXh0QWxpZ24gPSBUZXh0QWxpZ247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1UZXh0QWxpZ24uanMubWFwIl19
