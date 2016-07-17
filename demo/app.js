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

},{"../events":15,"../ui":19}],4:[function(require,module,exports){
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

},{"../ui":19}],5:[function(require,module,exports){
"use strict";
var ui_1 = require('../ui');
var components_1 = require('../components');
var app = new ui_1.Form(document.getElementById('app'), function () {
    this.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    this.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    console.log('call bootstrap', this);
});
app.on('click', function () {
    alert('canvas form click!');
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
    button.top = button.top + 100;
});
app.controls.add(button);
var label = new components_1.Label(app);
label.left = 0;
label.top = 128;
label.text = "Hello world!";
label.foreColor = "#ff00aa";
label.font.size = 18;
app.controls.add(label);

},{"../components":1,"../ui":19}],6:[function(require,module,exports){
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

},{"./UIEvent":13}],13:[function(require,module,exports){
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

},{"../Event":7}],14:[function(require,module,exports){
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

},{"./UIEvent":13}],15:[function(require,module,exports){
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
var UIMouseEvent_1 = require('./event/events/UIMouseEvent');
exports.UIMouseEvent = UIMouseEvent_1.UIMouseEvent;

},{"./event/Emittable":6,"./event/Event":7,"./event/EventEmitter":8,"./event/EventGenerator":9,"./event/EventListenersCollection":10,"./event/events/CollectionEvent":11,"./event/events/PropertyChangedEvent":12,"./event/events/UIEvent":13,"./event/events/UIMouseEvent":14}],16:[function(require,module,exports){
"use strict";
var Version_1 = require('./helpers/classes/Version');
exports.Version = Version_1.Version;
var isset_1 = require('./helpers/isset');
exports.isset = isset_1.isset;

},{"./helpers/classes/Version":17,"./helpers/isset":18}],17:[function(require,module,exports){
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

},{}],18:[function(require,module,exports){
"use strict";
function isset(e) {
    return typeof e !== 'undefined';
}
exports.isset = isset;

},{}],19:[function(require,module,exports){
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

},{"./ui/ComponentMapper":20,"./ui/Form":21,"./ui/UIComponent":22,"./ui/types/BoxModelElement":23,"./ui/types/Collection":24,"./ui/types/Font":25,"./ui/types/FontStyle":26,"./ui/types/GUID":27,"./ui/types/Point":28,"./ui/types/TextAlign":29}],20:[function(require,module,exports){
"use strict";
var ComponentMapper = (function () {
    function ComponentMapper(owner) {
        this._locationMap = [];
        this._guidMap = {};
        this.owner = owner;
        this.generate();
    }
    ComponentMapper.prototype.clear = function () {
        this._locationMap.splice(0, this._locationMap.length - 1);
    };
    ComponentMapper.prototype.generate = function () {
        this.clear();
        for (var x = 1; x <= this.owner.canvas.width; x++) {
            this._locationMap[x] = new Array();
            for (var y = 1; y <= this.owner.canvas.height; y++) {
                this._locationMap[x][y] = new Array();
            }
        }
    };
    ComponentMapper.prototype._mapElement = function (element) {
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
    ComponentMapper.prototype._registerId = function (element) {
        this._guidMap[element.id.toString()] = element;
    };
    ComponentMapper.prototype.getElementById = function (eid) {
        return this._guidMap[eid];
    };
    ComponentMapper.prototype.getLocatedId = function (point) {
        var target = this._locationMap[point.x][point.y];
        return target[target.length - 1];
    };
    ComponentMapper.prototype.register = function (item) {
        this._registerId(item);
        this._mapElement(item);
    };
    return ComponentMapper;
}());
exports.ComponentMapper = ComponentMapper;

},{}],21:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../events');
var helpers_1 = require('../helpers');
var Point_1 = require('./types/Point');
var ComponentMapper_1 = require('./ComponentMapper');
var Collection_1 = require('./types/Collection');
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
        this.controls = new Collection_1.Collection(null, this);
        this.controls.on('elementInserted', function (item) {
        });
        this._emit('drawStart', new events_1.UIEvent(this, {}));
        this._map = new ComponentMapper_1.ComponentMapper(this);
        this.canvas.addEventListener('click', function (event) {
            var p = new Point_1.Point(event.layerX, event.layerY);
            try {
                var target = self._map.getLocatedId(p);
                target = (helpers_1.isset(target) && target.length > 0) ? self._map.getElementById(target) : self;
                target._emit('click', new events_1.UIMouseEvent(target, event));
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
        this._map.generate();
        return this;
    };
    return Form;
}(events_1.EventEmitter));
exports.Form = Form;

},{"../events":15,"../helpers":16,"./ComponentMapper":20,"./types/Collection":24,"./types/Point":28}],22:[function(require,module,exports){
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

},{"../events":15,"../helpers":16,"./types/BoxModelElement":23,"./types/Collection":24,"./types/Font":25,"./types/GUID":27,"./types/Point":28}],23:[function(require,module,exports){
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

},{"../../events":15}],24:[function(require,module,exports){
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var events_1 = require('../../events');
var events_2 = require('../../events');
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
    return Collection;
}(events_1.EventEmitter));
exports.Collection = Collection;

},{"../../events":15}],25:[function(require,module,exports){
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

},{"../../events":15,"../../helpers":16,"./FontStyle":26}],26:[function(require,module,exports){
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

},{}],27:[function(require,module,exports){
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

},{}],28:[function(require,module,exports){
"use strict";
var Point = (function () {
    function Point(x, y) {
        this.x = x;
        this.y = y;
    }
    return Point;
}());
exports.Point = Point;

},{}],29:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi9jb21wb25lbnRzLmpzIiwiLi4vY29tcG9uZW50cy9CdXR0b24uanMiLCIuLi9jb21wb25lbnRzL0xhYmVsLmpzIiwiLi4vY29tcG9uZW50cy9SZWN0YW5nbGUuanMiLCJhcHAuanMiLCIuLi9ldmVudC9FbWl0dGFibGUuanMiLCIuLi9ldmVudC9FdmVudC5qcyIsIi4uL2V2ZW50L0V2ZW50RW1pdHRlci5qcyIsIi4uL2V2ZW50L0V2ZW50R2VuZXJhdG9yLmpzIiwiLi4vZXZlbnQvRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLmpzIiwiLi4vZXZlbnQvZXZlbnRzL0NvbGxlY3Rpb25FdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcyIsIi4uL2V2ZW50L2V2ZW50cy9VSUV2ZW50LmpzIiwiLi4vZXZlbnQvZXZlbnRzL1VJTW91c2VFdmVudC5qcyIsIi4uL2V2ZW50cy5qcyIsIi4uL2hlbHBlcnMuanMiLCIuLi9oZWxwZXJzL2NsYXNzZXMvVmVyc2lvbi5qcyIsIi4uL2hlbHBlcnMvaXNzZXQuanMiLCIuLi91aS5qcyIsIi4uL3VpL0NvbXBvbmVudE1hcHBlci5qcyIsIi4uL3VpL0Zvcm0uanMiLCIuLi91aS9VSUNvbXBvbmVudC5qcyIsIi4uL3VpL3R5cGVzL0JveE1vZGVsRWxlbWVudC5qcyIsIi4uL3VpL3R5cGVzL0NvbGxlY3Rpb24uanMiLCIuLi91aS90eXBlcy9Gb250LmpzIiwiLi4vdWkvdHlwZXMvRm9udFN0eWxlLmpzIiwiLi4vdWkvdHlwZXMvR1VJRC5qcyIsIi4uL3VpL3R5cGVzL1BvaW50LmpzIiwiLi4vdWkvdHlwZXMvVGV4dEFsaWduLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDaEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3hCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBSZWN0YW5nbGVfMSA9IHJlcXVpcmUoJy4vY29tcG9uZW50cy9SZWN0YW5nbGUnKTtcbmV4cG9ydHMuUmVjdGFuZ2xlID0gUmVjdGFuZ2xlXzEuUmVjdGFuZ2xlO1xudmFyIExhYmVsXzEgPSByZXF1aXJlKCcuL2NvbXBvbmVudHMvTGFiZWwnKTtcbmV4cG9ydHMuTGFiZWwgPSBMYWJlbF8xLkxhYmVsO1xudmFyIEJ1dHRvbl8xID0gcmVxdWlyZSgnLi9jb21wb25lbnRzL0J1dHRvbicpO1xuZXhwb3J0cy5CdXR0b24gPSBCdXR0b25fMS5CdXR0b247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1jb21wb25lbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgTGFiZWxfMSA9IHJlcXVpcmUoJy4vTGFiZWwnKTtcbnZhciBCdXR0b24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhCdXR0b24sIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQnV0dG9uKG93bmVyKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIG93bmVyKTtcbiAgICAgICAgdGhpcy5mb3JlQ29sb3IgPSAnI2ZmZic7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENvbG9yID0gJyMwMDAnO1xuICAgICAgICB0aGlzLnBhZGRpbmcudG9wID0gNTtcbiAgICAgICAgdGhpcy5wYWRkaW5nLmJvdHRvbSA9IDU7XG4gICAgICAgIHRoaXMucGFkZGluZy5sZWZ0ID0gNTtcbiAgICAgICAgdGhpcy5wYWRkaW5nLnJpZ2h0ID0gNTtcbiAgICAgICAgdGhpcy5oZWlnaHQgPSAnYXV0byc7XG4gICAgICAgIHRoaXMud2lkdGggPSAnYXV0byc7XG4gICAgfVxuICAgIEJ1dHRvbi5wcm90b3R5cGUuX2dldFRleHRQb3NpdGlvbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdmFyIHR4dFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMudGV4dCkud2lkdGggfCAwO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgJ3knOiB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmZvbnQuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCxcbiAgICAgICAgICAgICd4JzogdGhpcy5wb3NpdGlvbi54ICsgdGhpcy5wYWRkaW5nLmxlZnRcbiAgICAgICAgfTtcbiAgICB9O1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuZ2V0QWJzb2x1dGVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIGlmICh0aGlzLmhlaWdodCA9PT0gJ2F1dG8nKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5mb250LmhlaWdodCArIHRoaXMucGFkZGluZy50b3AgKyB0aGlzLnBhZGRpbmcuYm90dG9tO1xuICAgICAgICB9XG4gICAgICAgIGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaGVpZ2h0ICsgdGhpcy5wYWRkaW5nLnRvcCArIHRoaXMucGFkZGluZy5ib3R0b207XG4gICAgICAgIH1cbiAgICB9O1xuICAgIEJ1dHRvbi5wcm90b3R5cGUuZ2V0QWJzb2x1dGVXaWR0aCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKHRoaXMud2lkdGggPT09ICdhdXRvJykge1xuICAgICAgICAgICAgdmFyIHR4dFdpZHRoID0gdGhpcy5jb250ZXh0Lm1lYXN1cmVUZXh0KHRoaXMudGV4dCkud2lkdGggfCAwO1xuICAgICAgICAgICAgcmV0dXJuIHR4dFdpZHRoICsgdGhpcy5wYWRkaW5nLmxlZnQgKyB0aGlzLnBhZGRpbmcucmlnaHQ7XG4gICAgICAgIH1cbiAgICAgICAgZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQgKyB0aGlzLnBhZGRpbmcubGVmdCArIHRoaXMucGFkZGluZy5yaWdodDtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQnV0dG9uLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgdHh0UG9zID0gdGhpcy5fZ2V0VGV4dFBvc2l0aW9uKCk7XG4gICAgICAgIHZhciBwYWRkaW5nWSA9IHRoaXMucGFkZGluZy50b3AgKyB0aGlzLnBhZGRpbmcuYm90dG9tO1xuICAgICAgICB0aGlzLmNvbnRleHQuZm9udCA9IHRoaXMuZm9udC50b1N0cmluZygpO1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gdGhpcy50ZXh0QWxpZ247XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsU3R5bGUgPSB0aGlzLmJhY2tncm91bmRDb2xvcjtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxSZWN0KHRoaXMucG9zaXRpb24ueCwgdGhpcy5wb3NpdGlvbi55LCB0aGlzLmdldEFic29sdXRlV2lkdGgoKSwgdGhpcy5nZXRBYnNvbHV0ZUhlaWdodCgpKTtcbiAgICAgICAgdGhpcy5jb250ZXh0LmZpbGxTdHlsZSA9IHRoaXMuZm9yZUNvbG9yO1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFRleHQodGhpcy50ZXh0LCB0eHRQb3MueCwgdHh0UG9zLnksIHRoaXMuY29udGV4dC5tZWFzdXJlVGV4dCh0aGlzLnRleHQpLndpZHRoKTtcbiAgICB9O1xuICAgIHJldHVybiBCdXR0b247XG59KExhYmVsXzEuTGFiZWwpKTtcbmV4cG9ydHMuQnV0dG9uID0gQnV0dG9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9QnV0dG9uLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgdWlfMSA9IHJlcXVpcmUoJy4uL3VpJyk7XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi9ldmVudHMnKTtcbnZhciBMYWJlbCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKExhYmVsLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIExhYmVsKCkge1xuICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICAgICAgdGhpcy5fdGV4dCA9ICdOZXcgTGFiZWwnO1xuICAgICAgICB0aGlzLl9hbGlnbiA9IHVpXzEuVGV4dEFsaWduLmxlZnQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1N0cikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX3RleHQudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX3RleHQgPSBuZXdTdHI7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dCcsIG9sZCwgbmV3U3RyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShMYWJlbC5wcm90b3R5cGUsIFwidGV4dEFsaWduXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYWxpZ247XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld1ZhbCkge1xuICAgICAgICAgICAgdGhpcy5fYWxpZ24gPSBuZXdWYWw7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAndGV4dEFsaWduJywgbnVsbCwgbmV3VmFsKSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIExhYmVsLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQudGV4dEFsaWduID0gdGhpcy50ZXh0QWxpZ247XG4gICAgICAgIHRoaXMuY29udGV4dC5mb250ID0gdGhpcy5mb250LnRvU3RyaW5nKCk7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsVGV4dCh0aGlzLnRleHQsIHRoaXMucG9zaXRpb24ueSwgdGhpcy5wb3NpdGlvbi54KTtcbiAgICB9O1xuICAgIHJldHVybiBMYWJlbDtcbn0odWlfMS5VSUNvbXBvbmVudCkpO1xuZXhwb3J0cy5MYWJlbCA9IExhYmVsO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9TGFiZWwuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciB1aV8xID0gcmVxdWlyZSgnLi4vdWknKTtcbnZhciBSZWN0YW5nbGUgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhSZWN0YW5nbGUsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gUmVjdGFuZ2xlKCkge1xuICAgICAgICBfc3VwZXIuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbiAgICB9XG4gICAgUmVjdGFuZ2xlLnByb3RvdHlwZS5fcmVuZGVyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuZmlsbFN0eWxlID0gdGhpcy5iYWNrZ3JvdW5kQ29sb3I7XG4gICAgICAgIHRoaXMuY29udGV4dC5maWxsUmVjdCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSwgdGhpcy53aWR0aCwgdGhpcy5oZWlnaHQpO1xuICAgIH07XG4gICAgcmV0dXJuIFJlY3RhbmdsZTtcbn0odWlfMS5VSUNvbXBvbmVudCkpO1xuZXhwb3J0cy5SZWN0YW5nbGUgPSBSZWN0YW5nbGU7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1SZWN0YW5nbGUuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgdWlfMSA9IHJlcXVpcmUoJy4uL3VpJyk7XG52YXIgY29tcG9uZW50c18xID0gcmVxdWlyZSgnLi4vY29tcG9uZW50cycpO1xudmFyIGFwcCA9IG5ldyB1aV8xLkZvcm0oZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2FwcCcpLCBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5oZWlnaHQgPSBNYXRoLm1heChkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LCB3aW5kb3cuaW5uZXJIZWlnaHQgfHwgMCk7XG4gICAgdGhpcy53aWR0aCA9IE1hdGgubWF4KGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCwgd2luZG93LmlubmVyV2lkdGggfHwgMCk7XG4gICAgY29uc29sZS5sb2coJ2NhbGwgYm9vdHN0cmFwJywgdGhpcyk7XG59KTtcbmFwcC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYWxlcnQoJ2NhbnZhcyBmb3JtIGNsaWNrIScpO1xufSk7XG52YXIgcmVjdCA9IG5ldyBjb21wb25lbnRzXzEuUmVjdGFuZ2xlKGFwcCk7XG5yZWN0LmhlaWdodCA9IDMyO1xucmVjdC53aWR0aCA9IDMyO1xucmVjdC5sZWZ0ID0gMDtcbnJlY3QudG9wID0gMDtcbnJlY3QuYmFja2dyb3VuZENvbG9yID0gJ3JlZCc7XG5hcHAuY29udHJvbHMuYWRkKHJlY3QpO1xucmVjdC5vbignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYWxlcnQoJ3JlY3QgY2xpY2snKTtcbn0pO1xudmFyIGJ1dHRvbiA9IG5ldyBjb21wb25lbnRzXzEuQnV0dG9uKGFwcCk7XG5idXR0b24ubGVmdCA9IDEyODtcbmJ1dHRvbi50b3AgPSAxMjg7XG5idXR0b24udGV4dCA9IFwiQ2xpY2sgb24gbWUhXCI7XG5idXR0b24uZm9udC5zaXplID0gMTI7XG5idXR0b24uZm9yZUNvbG9yID0gJyNmZmYnO1xuYnV0dG9uLm9uKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgIGJ1dHRvbi50b3AgPSBidXR0b24udG9wICsgMTAwO1xufSk7XG5hcHAuY29udHJvbHMuYWRkKGJ1dHRvbik7XG52YXIgbGFiZWwgPSBuZXcgY29tcG9uZW50c18xLkxhYmVsKGFwcCk7XG5sYWJlbC5sZWZ0ID0gMDtcbmxhYmVsLnRvcCA9IDEyODtcbmxhYmVsLnRleHQgPSBcIkhlbGxvIHdvcmxkIVwiO1xubGFiZWwuZm9yZUNvbG9yID0gXCIjZmYwMGFhXCI7XG5sYWJlbC5mb250LnNpemUgPSAxODtcbmFwcC5jb250cm9scy5hZGQobGFiZWwpO1xuIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudHMvUHJvcGVydHlDaGFuZ2VkRXZlbnQnKTtcbnZhciBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoJy4vRXZlbnRFbWl0dGVyJyk7XG52YXIgRW1pdHRhYmxlID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRW1pdHRhYmxlLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIEVtaXR0YWJsZSgpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuZW1pdHRhYmxlID0gZmFsc2U7XG4gICAgfVxuICAgIEVtaXR0YWJsZS5wcm90b3R5cGUuX29uQ2hhbmdlID0gZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgaWYgKHRoaXMuZW1pdHRhYmxlKSB7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBQcm9wZXJ0eUNoYW5nZWRFdmVudF8xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsIHByb3AsIG51bGwsIG51bGwpKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgcmV0dXJuIEVtaXR0YWJsZTtcbn0oRXZlbnRFbWl0dGVyXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkVtaXR0YWJsZSA9IEVtaXR0YWJsZTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUVtaXR0YWJsZS5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudCA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgIHRoaXMuX2FyZ3MgPSBhcmdzO1xuICAgICAgICB0aGlzLl90YXJnZXQgPSB0YXJnZXQ7XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShFdmVudC5wcm90b3R5cGUsIFwidGFyZ2V0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fdGFyZ2V0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl90YXJnZXQgPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRXZlbnQucHJvdG90eXBlLCBcImFyZ3NcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9hcmdzO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLl9hcmdzID0gdjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgcmV0dXJuIEV2ZW50O1xufSgpKTtcbmV4cG9ydHMuRXZlbnQgPSBFdmVudDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEV2ZW50R2VuZXJhdG9yXzEgPSByZXF1aXJlKCcuL0V2ZW50R2VuZXJhdG9yJyk7XG52YXIgRXZlbnRFbWl0dGVyID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gICAgICAgIHRoaXMuX19lID0gbmV3IEV2ZW50R2VuZXJhdG9yXzEuRXZlbnRHZW5lcmF0b3IodGhpcyk7XG4gICAgfVxuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub24gPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBsaXN0ZW5lcikgeyB9O1xuICAgIEV2ZW50RW1pdHRlci5wcm90b3R5cGUub2ZmID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgbGlzdGVuZXIpIHsgfTtcbiAgICBFdmVudEVtaXR0ZXIucHJvdG90eXBlLl9lbWl0ID0gZnVuY3Rpb24gKGV2ZW50TmFtZSwgZXZlbnRBcmdzKSB7IH07XG4gICAgO1xuICAgIHJldHVybiBFdmVudEVtaXR0ZXI7XG59KCkpO1xuZXhwb3J0cy5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudEVtaXR0ZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL0V2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbicpO1xudmFyIEV2ZW50R2VuZXJhdG9yID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBFdmVudEdlbmVyYXRvcihldmVudEdlbmVyYXRvciwgaW5qZWN0KSB7XG4gICAgICAgIGlmIChpbmplY3QgPT09IHZvaWQgMCkgeyBpbmplY3QgPSB0cnVlOyB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVycyA9IHt9O1xuICAgICAgICB0aGlzLl9vd25lciA9IGV2ZW50R2VuZXJhdG9yO1xuICAgICAgICBpZiAoaW5qZWN0KVxuICAgICAgICAgICAgdGhpcy5pbmplY3QoKTtcbiAgICB9XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmhhc0xpc3RlbmVycyA9IGZ1bmN0aW9uIChldmVudE5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9saXN0ZW5lcnNbZXZlbnROYW1lXSAhPT0gJ3VuZGVmaW5lZCc7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuaW5qZWN0ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIHRoaXMuX293bmVyLm9uID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgc2VsZi5vbi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vd25lci5vZmYgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBzZWxmLm9mZi5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgICB0aGlzLl9vd25lci5fZW1pdCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHNlbGYuZW1pdC5hcHBseShzZWxmLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbiAoZXZlbnROYW1lLCBldmVudEFyZ3MpIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzTGlzdGVuZXJzKGV2ZW50TmFtZSkpIHtcbiAgICAgICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnRyaWdnZXJFdmVudChldmVudEFyZ3MpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSkge1xuICAgICAgICAgICAgdGhpcy5fbGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBuZXcgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEuRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uKHRoaXMuX293bmVyLCBldmVudE5hbWUpO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLmFkZEV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgICAgICByZXR1cm4gdGhpcy5fb3duZXI7XG4gICAgfTtcbiAgICBFdmVudEdlbmVyYXRvci5wcm90b3R5cGUucmVtb3ZlRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChldmVudE5hbWUsIGxpc3RlbmVyKSB7XG4gICAgICAgIGlmICghdGhpcy5oYXNMaXN0ZW5lcnMoZXZlbnROYW1lKSlcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2xpc3RlbmVyc1tldmVudE5hbWVdLnJlbW92ZUV2ZW50TGlzdGVuZXIobGlzdGVuZXIpO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9uID0gZnVuY3Rpb24gKGV2ZW50TmFtZXMsIGxpc3RlbmVyKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgZXZlbnROYW1lcy50cmltKCkuc3BsaXQoJyAnKS5mb3JFYWNoKGZ1bmN0aW9uIChlTmFtZSkge1xuICAgICAgICAgICAgc2VsZi5hZGRFdmVudExpc3RlbmVyKGVOYW1lLCBsaXN0ZW5lcik7XG4gICAgICAgIH0pO1xuICAgIH07XG4gICAgRXZlbnRHZW5lcmF0b3IucHJvdG90eXBlLm9mZiA9IGZ1bmN0aW9uIChldmVudE5hbWVzLCBsaXN0ZW5lcikge1xuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XG4gICAgICAgIGV2ZW50TmFtZXMudHJpbSgpLnNwbGl0KCcgJykuZm9yRWFjaChmdW5jdGlvbiAoZU5hbWUpIHtcbiAgICAgICAgICAgIHNlbGYucmVtb3ZlRXZlbnRMaXN0ZW5lcihlTmFtZSwgbGlzdGVuZXIpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudEdlbmVyYXRvcjtcbn0oKSk7XG5leHBvcnRzLkV2ZW50R2VuZXJhdG9yID0gRXZlbnRHZW5lcmF0b3I7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudEdlbmVyYXRvci5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbihzb3VyY2UsIG5hbWUpIHtcbiAgICAgICAgdGhpcy5faG9va3MgPSBbXTtcbiAgICAgICAgdGhpcy5ldmVudE5hbWUgPSBuYW1lO1xuICAgICAgICB0aGlzLl9ldmVudFNvdXJjZSA9IHNvdXJjZTtcbiAgICB9XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS50cmlnZ2VyRXZlbnQgPSBmdW5jdGlvbiAoZXZlbnRBcmdzKSB7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5faG9va3MuZm9yRWFjaChmdW5jdGlvbiAoaG9vaykge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBob29rID09ICdmdW5jdGlvbicpXG4gICAgICAgICAgICAgICAgaG9vay5jYWxsKHNlbGYuX2V2ZW50U291cmNlLCBldmVudEFyZ3MpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIEV2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbi5wcm90b3R5cGUuZ2V0TGlzdGVuZXJzQ291bnQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9ob29rcy5sZW5ndGg7XG4gICAgfTtcbiAgICBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb24ucHJvdG90eXBlLmFkZEV2ZW50TGlzdGVuZXIgPSBmdW5jdGlvbiAoZXZlbnRMaXN0ZW5lcikge1xuICAgICAgICB0aGlzLl9ob29rcy5wdXNoKGV2ZW50TGlzdGVuZXIpO1xuICAgIH07XG4gICAgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmVFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKGV2ZW50TGlzdGVuZXIpIHtcbiAgICAgICAgdmFyIGhvb2tJZCA9IHRoaXMuX2hvb2tzLmluZGV4T2YoZXZlbnRMaXN0ZW5lcik7XG4gICAgICAgIGlmIChob29rSWQgPiAtMSlcbiAgICAgICAgICAgIHRoaXMuX2hvb2tzLnNwbGljZShob29rSWQsIDEpO1xuICAgICAgICByZXR1cm4gKGhvb2tJZCA+IC0xKTtcbiAgICB9O1xuICAgIHJldHVybiBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG59KCkpO1xuZXhwb3J0cy5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG4vLyMgc291cmNlTWFwcGluZ1VSTD1FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBFdmVudF8xID0gcmVxdWlyZSgnLi4vRXZlbnQnKTtcbnZhciBDb2xsZWN0aW9uRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uRXZlbnQsIF9zdXBlcik7XG4gICAgZnVuY3Rpb24gQ29sbGVjdGlvbkV2ZW50KHRhcmdldCwgaXRlbSkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzLCB0YXJnZXQsIHtcbiAgICAgICAgICAgIGl0ZW06IGl0ZW1cbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBDb2xsZWN0aW9uRXZlbnQ7XG59KEV2ZW50XzEuRXZlbnQpKTtcbmV4cG9ydHMuQ29sbGVjdGlvbkV2ZW50ID0gQ29sbGVjdGlvbkV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29sbGVjdGlvbkV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgVUlFdmVudF8xID0gcmVxdWlyZSgnLi9VSUV2ZW50Jyk7XG52YXIgUHJvcGVydHlDaGFuZ2VkRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhQcm9wZXJ0eUNoYW5nZWRFdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBQcm9wZXJ0eUNoYW5nZWRFdmVudCh0YXJnZXQsIHByb3BOYW1lLCBvbGRWYWx1ZSwgbmV3VmFsdWUpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcywgdGFyZ2V0LCB7XG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWU6IHByb3BOYW1lLFxuICAgICAgICAgICAgb2xkVmFsdWU6IG9sZFZhbHVlLFxuICAgICAgICAgICAgbmV3VmFsdWU6IG5ld1ZhbHVlXG4gICAgICAgIH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG59KFVJRXZlbnRfMS5VSUV2ZW50KSk7XG5leHBvcnRzLlByb3BlcnR5Q2hhbmdlZEV2ZW50ID0gUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qcm9wZXJ0eUNoYW5nZWRFdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIEV2ZW50XzEgPSByZXF1aXJlKCcuLi9FdmVudCcpO1xudmFyIFVJRXZlbnQgPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhVSUV2ZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVJRXZlbnQodGFyZ2V0LCBhcmdzKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwgYXJncyk7XG4gICAgfVxuICAgIHJldHVybiBVSUV2ZW50O1xufShFdmVudF8xLkV2ZW50KSk7XG5leHBvcnRzLlVJRXZlbnQgPSBVSUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VUlFdmVudC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIFVJRXZlbnRfMSA9IHJlcXVpcmUoJy4vVUlFdmVudCcpO1xudmFyIFVJTW91c2VFdmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVJTW91c2VFdmVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBVSU1vdXNlRXZlbnQodGFyZ2V0LCB3aW5kb3dDbGlja0V2ZW50KSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMsIHRhcmdldCwge1xuICAgICAgICAgICAgdHlwZTogd2luZG93Q2xpY2tFdmVudC50eXBlLFxuICAgICAgICAgICAgdGFyZ2V0OiB0YXJnZXQsXG4gICAgICAgICAgICBrZXlzOiB7XG4gICAgICAgICAgICAgICAgY3RybDogd2luZG93Q2xpY2tFdmVudC5jdHJsS2V5LFxuICAgICAgICAgICAgICAgIGFsdDogd2luZG93Q2xpY2tFdmVudC5hbHRLZXksXG4gICAgICAgICAgICAgICAgc2hpZnQ6IHdpbmRvd0NsaWNrRXZlbnQuc2hpZnRLZXksXG4gICAgICAgICAgICAgICAgbWV0YTogd2luZG93Q2xpY2tFdmVudC5tZXRhS2V5XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcG9zaXRpb246IHtcbiAgICAgICAgICAgICAgICB4OiB3aW5kb3dDbGlja0V2ZW50LmxheWVyWCxcbiAgICAgICAgICAgICAgICB5OiB3aW5kb3dDbGlja0V2ZW50LmxheWVyWVxuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG4gICAgcmV0dXJuIFVJTW91c2VFdmVudDtcbn0oVUlFdmVudF8xLlVJRXZlbnQpKTtcbmV4cG9ydHMuVUlNb3VzZUV2ZW50ID0gVUlNb3VzZUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VUlNb3VzZUV2ZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEVtaXR0YWJsZV8xID0gcmVxdWlyZSgnLi9ldmVudC9FbWl0dGFibGUnKTtcbmV4cG9ydHMuRW1pdHRhYmxlID0gRW1pdHRhYmxlXzEuRW1pdHRhYmxlO1xudmFyIEV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L0V2ZW50Jyk7XG5leHBvcnRzLkV2ZW50ID0gRXZlbnRfMS5FdmVudDtcbnZhciBFdmVudEVtaXR0ZXJfMSA9IHJlcXVpcmUoJy4vZXZlbnQvRXZlbnRFbWl0dGVyJyk7XG5leHBvcnRzLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcl8xLkV2ZW50RW1pdHRlcjtcbnZhciBFdmVudEdlbmVyYXRvcl8xID0gcmVxdWlyZSgnLi9ldmVudC9FdmVudEdlbmVyYXRvcicpO1xuZXhwb3J0cy5FdmVudEdlbmVyYXRvciA9IEV2ZW50R2VuZXJhdG9yXzEuRXZlbnRHZW5lcmF0b3I7XG52YXIgRXZlbnRMaXN0ZW5lcnNDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL2V2ZW50L0V2ZW50TGlzdGVuZXJzQ29sbGVjdGlvbicpO1xuZXhwb3J0cy5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb24gPSBFdmVudExpc3RlbmVyc0NvbGxlY3Rpb25fMS5FdmVudExpc3RlbmVyc0NvbGxlY3Rpb247XG52YXIgQ29sbGVjdGlvbkV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9Db2xsZWN0aW9uRXZlbnQnKTtcbmV4cG9ydHMuQ29sbGVjdGlvbkV2ZW50ID0gQ29sbGVjdGlvbkV2ZW50XzEuQ29sbGVjdGlvbkV2ZW50O1xudmFyIFByb3BlcnR5Q2hhbmdlZEV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9Qcm9wZXJ0eUNoYW5nZWRFdmVudCcpO1xuZXhwb3J0cy5Qcm9wZXJ0eUNoYW5nZWRFdmVudCA9IFByb3BlcnR5Q2hhbmdlZEV2ZW50XzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQ7XG52YXIgVUlFdmVudF8xID0gcmVxdWlyZSgnLi9ldmVudC9ldmVudHMvVUlFdmVudCcpO1xuZXhwb3J0cy5VSUV2ZW50ID0gVUlFdmVudF8xLlVJRXZlbnQ7XG52YXIgVUlNb3VzZUV2ZW50XzEgPSByZXF1aXJlKCcuL2V2ZW50L2V2ZW50cy9VSU1vdXNlRXZlbnQnKTtcbmV4cG9ydHMuVUlNb3VzZUV2ZW50ID0gVUlNb3VzZUV2ZW50XzEuVUlNb3VzZUV2ZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9ZXZlbnRzLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFZlcnNpb25fMSA9IHJlcXVpcmUoJy4vaGVscGVycy9jbGFzc2VzL1ZlcnNpb24nKTtcbmV4cG9ydHMuVmVyc2lvbiA9IFZlcnNpb25fMS5WZXJzaW9uO1xudmFyIGlzc2V0XzEgPSByZXF1aXJlKCcuL2hlbHBlcnMvaXNzZXQnKTtcbmV4cG9ydHMuaXNzZXQgPSBpc3NldF8xLmlzc2V0O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBWZXJzaW9uID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBWZXJzaW9uKG1ham9yLCBtaW5vciwgcGF0Y2gpIHtcbiAgICAgICAgaWYgKG1ham9yID09PSB2b2lkIDApIHsgbWFqb3IgPSAwOyB9XG4gICAgICAgIGlmIChtaW5vciA9PT0gdm9pZCAwKSB7IG1pbm9yID0gMDsgfVxuICAgICAgICBpZiAocGF0Y2ggPT09IHZvaWQgMCkgeyBwYXRjaCA9IDA7IH1cbiAgICAgICAgdGhpcy5tYWpvciA9IG1ham9yO1xuICAgICAgICB0aGlzLm1pbm9yID0gbWlub3I7XG4gICAgICAgIHRoaXMucGF0Y2ggPSBwYXRjaDtcbiAgICB9XG4gICAgVmVyc2lvbi5wcm90b3R5cGUudG9TdHJpbmcgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBbdGhpcy5tYWpvciwgdGhpcy5taW5vciwgdGhpcy5wYXRjaF0uam9pbignLicpO1xuICAgIH07XG4gICAgcmV0dXJuIFZlcnNpb247XG59KCkpO1xuZXhwb3J0cy5WZXJzaW9uID0gVmVyc2lvbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVZlcnNpb24uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG5mdW5jdGlvbiBpc3NldChlKSB7XG4gICAgcmV0dXJuIHR5cGVvZiBlICE9PSAndW5kZWZpbmVkJztcbn1cbmV4cG9ydHMuaXNzZXQgPSBpc3NldDtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWlzc2V0LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFBvaW50XzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL1BvaW50Jyk7XG5leHBvcnRzLlBvaW50ID0gUG9pbnRfMS5Qb2ludDtcbnZhciBCb3hNb2RlbEVsZW1lbnRfMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvQm94TW9kZWxFbGVtZW50Jyk7XG5leHBvcnRzLkJveE1vZGVsRWxlbWVudCA9IEJveE1vZGVsRWxlbWVudF8xLkJveE1vZGVsRWxlbWVudDtcbnZhciBHVUlEXzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0dVSUQnKTtcbmV4cG9ydHMuR1VJRCA9IEdVSURfMS5HVUlEO1xudmFyIFRleHRBbGlnbl8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9UZXh0QWxpZ24nKTtcbmV4cG9ydHMuVGV4dEFsaWduID0gVGV4dEFsaWduXzEuVGV4dEFsaWduO1xudmFyIEZvbnRfMSA9IHJlcXVpcmUoJy4vdWkvdHlwZXMvRm9udCcpO1xuZXhwb3J0cy5Gb250ID0gRm9udF8xLkZvbnQ7XG52YXIgRm9udFN0eWxlXzEgPSByZXF1aXJlKCcuL3VpL3R5cGVzL0ZvbnRTdHlsZScpO1xuZXhwb3J0cy5Gb250U3R5bGUgPSBGb250U3R5bGVfMS5Gb250U3R5bGU7XG52YXIgQ29sbGVjdGlvbl8xID0gcmVxdWlyZSgnLi91aS90eXBlcy9Db2xsZWN0aW9uJyk7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uXzEuQ29sbGVjdGlvbjtcbnZhciBDb21wb25lbnRNYXBwZXJfMSA9IHJlcXVpcmUoJy4vdWkvQ29tcG9uZW50TWFwcGVyJyk7XG5leHBvcnRzLkNvbXBvbmVudE1hcHBlciA9IENvbXBvbmVudE1hcHBlcl8xLkNvbXBvbmVudE1hcHBlcjtcbnZhciBVSUNvbXBvbmVudF8xID0gcmVxdWlyZSgnLi91aS9VSUNvbXBvbmVudCcpO1xuZXhwb3J0cy5VSUNvbXBvbmVudCA9IFVJQ29tcG9uZW50XzEuVUlDb21wb25lbnQ7XG52YXIgRm9ybV8xID0gcmVxdWlyZSgnLi91aS9Gb3JtJyk7XG5leHBvcnRzLkZvcm0gPSBGb3JtXzEuRm9ybTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPXVpLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIENvbXBvbmVudE1hcHBlciA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gQ29tcG9uZW50TWFwcGVyKG93bmVyKSB7XG4gICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwID0gW107XG4gICAgICAgIHRoaXMuX2d1aWRNYXAgPSB7fTtcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICB0aGlzLmdlbmVyYXRlKCk7XG4gICAgfVxuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUuY2xlYXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwLnNwbGljZSgwLCB0aGlzLl9sb2NhdGlvbk1hcC5sZW5ndGggLSAxKTtcbiAgICB9O1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2VuZXJhdGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuY2xlYXIoKTtcbiAgICAgICAgZm9yICh2YXIgeCA9IDE7IHggPD0gdGhpcy5vd25lci5jYW52YXMud2lkdGg7IHgrKykge1xuICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIGZvciAodmFyIHkgPSAxOyB5IDw9IHRoaXMub3duZXIuY2FudmFzLmhlaWdodDsgeSsrKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF1beV0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5fbWFwRWxlbWVudCA9IGZ1bmN0aW9uIChlbGVtZW50KSB7XG4gICAgICAgIHZhciBndWlkID0gZWxlbWVudC5pZC50b1N0cmluZygpO1xuICAgICAgICB2YXIgY29vcmRzID0gZWxlbWVudC5wb2ludHMoKTtcbiAgICAgICAgdmFyIHgxID0gY29vcmRzWzBdLngsIHgyID0gY29vcmRzWzFdLngsIHkxID0gY29vcmRzWzFdLnksIHkyID0gY29vcmRzWzJdLnk7XG4gICAgICAgIGZvciAodmFyIHkgPSB5MSArIDA7IHkgPD0geTI7IHkrKykge1xuICAgICAgICAgICAgZm9yICh2YXIgeCA9IHgxICsgMDsgeCA8PSB4MjsgeCsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKCF0aGlzLl9sb2NhdGlvbk1hcFt4XSlcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbG9jYXRpb25NYXBbeF0gPSBuZXcgQXJyYXkoKTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldID09ICd1bmRlZmluZWQnKVxuICAgICAgICAgICAgICAgICAgICB0aGlzLl9sb2NhdGlvbk1hcFt4XVt5XSA9IFtdO1xuICAgICAgICAgICAgICAgIHRoaXMuX2xvY2F0aW9uTWFwW3hdW3ldLnB1c2goZ3VpZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9O1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUuX3JlZ2lzdGVySWQgPSBmdW5jdGlvbiAoZWxlbWVudCkge1xuICAgICAgICB0aGlzLl9ndWlkTWFwW2VsZW1lbnQuaWQudG9TdHJpbmcoKV0gPSBlbGVtZW50O1xuICAgIH07XG4gICAgQ29tcG9uZW50TWFwcGVyLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChlaWQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX2d1aWRNYXBbZWlkXTtcbiAgICB9O1xuICAgIENvbXBvbmVudE1hcHBlci5wcm90b3R5cGUuZ2V0TG9jYXRlZElkID0gZnVuY3Rpb24gKHBvaW50KSB7XG4gICAgICAgIHZhciB0YXJnZXQgPSB0aGlzLl9sb2NhdGlvbk1hcFtwb2ludC54XVtwb2ludC55XTtcbiAgICAgICAgcmV0dXJuIHRhcmdldFt0YXJnZXQubGVuZ3RoIC0gMV07XG4gICAgfTtcbiAgICBDb21wb25lbnRNYXBwZXIucHJvdG90eXBlLnJlZ2lzdGVyID0gZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgdGhpcy5fcmVnaXN0ZXJJZChpdGVtKTtcbiAgICAgICAgdGhpcy5fbWFwRWxlbWVudChpdGVtKTtcbiAgICB9O1xuICAgIHJldHVybiBDb21wb25lbnRNYXBwZXI7XG59KCkpO1xuZXhwb3J0cy5Db21wb25lbnRNYXBwZXIgPSBDb21wb25lbnRNYXBwZXI7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Db21wb25lbnRNYXBwZXIuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uL2V2ZW50cycpO1xudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMnKTtcbnZhciBQb2ludF8xID0gcmVxdWlyZSgnLi90eXBlcy9Qb2ludCcpO1xudmFyIENvbXBvbmVudE1hcHBlcl8xID0gcmVxdWlyZSgnLi9Db21wb25lbnRNYXBwZXInKTtcbnZhciBDb2xsZWN0aW9uXzEgPSByZXF1aXJlKCcuL3R5cGVzL0NvbGxlY3Rpb24nKTtcbnZhciBGb3JtID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9ybSwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb3JtKGhhbmRsZXIsIGJvb3RzdHJhcCkge1xuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xuICAgICAgICB0aGlzLmVsZW1lbnQgPSBoYW5kbGVyO1xuICAgICAgICB0aGlzLmNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgICBpZiAoYm9vdHN0cmFwKVxuICAgICAgICAgICAgYm9vdHN0cmFwLmNhbGwoc2VsZiwgaGFuZGxlcik7XG4gICAgICAgIHRoaXMuZWxlbWVudC5hcHBlbmRDaGlsZCh0aGlzLmNhbnZhcyk7XG4gICAgICAgIHRoaXMuY29udHJvbHMgPSBuZXcgQ29sbGVjdGlvbl8xLkNvbGxlY3Rpb24obnVsbCwgdGhpcyk7XG4gICAgICAgIHRoaXMuY29udHJvbHMub24oJ2VsZW1lbnRJbnNlcnRlZCcsIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9lbWl0KCdkcmF3U3RhcnQnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCB7fSkpO1xuICAgICAgICB0aGlzLl9tYXAgPSBuZXcgQ29tcG9uZW50TWFwcGVyXzEuQ29tcG9uZW50TWFwcGVyKHRoaXMpO1xuICAgICAgICB0aGlzLmNhbnZhcy5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uIChldmVudCkge1xuICAgICAgICAgICAgdmFyIHAgPSBuZXcgUG9pbnRfMS5Qb2ludChldmVudC5sYXllclgsIGV2ZW50LmxheWVyWSk7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIHZhciB0YXJnZXQgPSBzZWxmLl9tYXAuZ2V0TG9jYXRlZElkKHApO1xuICAgICAgICAgICAgICAgIHRhcmdldCA9IChoZWxwZXJzXzEuaXNzZXQodGFyZ2V0KSAmJiB0YXJnZXQubGVuZ3RoID4gMCkgPyBzZWxmLl9tYXAuZ2V0RWxlbWVudEJ5SWQodGFyZ2V0KSA6IHNlbGY7XG4gICAgICAgICAgICAgICAgdGFyZ2V0Ll9lbWl0KCdjbGljaycsIG5ldyBldmVudHNfMS5VSU1vdXNlRXZlbnQodGFyZ2V0LCBldmVudCkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY2F0Y2ggKGV4KSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcihleCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLm9uKCdyZWRyYXcnLCBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICB0aGlzLmNsZWFyKCk7XG4gICAgICAgICAgICB0aGlzLmNvbnRyb2xzLmZvckVhY2goZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICAgICAgICBlLnJlZHJhdygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5jYW52YXMuaGVpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB0aGlzLmNhbnZhcy5oZWlnaHQgPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmNhbnZhcy53aWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5jYW52YXMud2lkdGggPSB2O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9ybS5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb3JtLnByb3RvdHlwZSwgXCJtYXBwZXJcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9tYXA7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIEZvcm0ucHJvdG90eXBlLnJlZHJhd0NvbnRleHQgPSBmdW5jdGlvbiAoZm9yY2UpIHtcbiAgICAgICAgdGhpcy5fbWFwLmdlbmVyYXRlKCk7XG4gICAgICAgIHRoaXMuX2VtaXQoJ3JlZHJhdycsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIHsgJ2ZvcmNlJzogZm9yY2UgfSkpO1xuICAgIH07XG4gICAgRm9ybS5wcm90b3R5cGUucmVnaXN0ZXJFbGVtZW50ID0gZnVuY3Rpb24gKGVsZW1lbnQpIHtcbiAgICAgICAgdGhpcy5tYXBwZXIucmVnaXN0ZXIoZWxlbWVudCk7XG4gICAgfTtcbiAgICBGb3JtLnByb3RvdHlwZS5nZXRFbGVtZW50QnlJZCA9IGZ1bmN0aW9uIChpZCkge1xuICAgICAgICByZXR1cm4gdGhpcy5fbWFwLmdldEVsZW1lbnRCeUlkKGlkKTtcbiAgICB9O1xuICAgIEZvcm0ucHJvdG90eXBlLmNsZWFyID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB0aGlzLmNvbnRleHQuY2xlYXJSZWN0KDAsIDAsIHRoaXMud2lkdGgsIHRoaXMuaGVpZ2h0KTtcbiAgICAgICAgdGhpcy5fbWFwLmdlbmVyYXRlKCk7XG4gICAgICAgIHJldHVybiB0aGlzO1xuICAgIH07XG4gICAgcmV0dXJuIEZvcm07XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5Gb3JtID0gRm9ybTtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPUZvcm0uanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uL2V2ZW50cycpO1xudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoJy4uL2hlbHBlcnMnKTtcbnZhciBCb3hNb2RlbEVsZW1lbnRfMSA9IHJlcXVpcmUoJy4vdHlwZXMvQm94TW9kZWxFbGVtZW50Jyk7XG52YXIgQ29sbGVjdGlvbl8xID0gcmVxdWlyZSgnLi90eXBlcy9Db2xsZWN0aW9uJyk7XG52YXIgR1VJRF8xID0gcmVxdWlyZSgnLi90eXBlcy9HVUlEJyk7XG52YXIgUG9pbnRfMSA9IHJlcXVpcmUoJy4vdHlwZXMvUG9pbnQnKTtcbnZhciBGb250XzEgPSByZXF1aXJlKCcuL3R5cGVzL0ZvbnQnKTtcbnZhciBVSUNvbXBvbmVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKFVJQ29tcG9uZW50LCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIFVJQ29tcG9uZW50KG93bmVyKSB7XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl9oZWlnaHQgPSAxMjg7XG4gICAgICAgIHRoaXMuX3dpZHRoID0gMTI4O1xuICAgICAgICB0aGlzLl9pbmplY3RlZCA9IGZhbHNlO1xuICAgICAgICB0aGlzLl9iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLDAsMCwwKSc7XG4gICAgICAgIHRoaXMuX2ZvcmVDb2xvciA9ICcjMDAwJztcbiAgICAgICAgdGhpcy5fcGFkZGluZyA9IG5ldyBCb3hNb2RlbEVsZW1lbnRfMS5Cb3hNb2RlbEVsZW1lbnQoKTtcbiAgICAgICAgdGhpcy5fbWFyZ2luID0gbmV3IEJveE1vZGVsRWxlbWVudF8xLkJveE1vZGVsRWxlbWVudCgpO1xuICAgICAgICB0aGlzLl9mb250ID0gbmV3IEZvbnRfMS5Gb250KCk7XG4gICAgICAgIHRoaXMuX2RyYXduID0gZmFsc2U7XG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcbiAgICAgICAgdGhpcy5vd25lciA9IG93bmVyO1xuICAgICAgICB0aGlzLl9jb250ZXh0ID0gb3duZXIuY29udGV4dDtcbiAgICAgICAgdGhpcy5fX3Bvc2l0aW9uX18gPSBuZXcgUG9pbnRfMS5Qb2ludCgwLCAwKTtcbiAgICAgICAgdGhpcy5jb250cm9scyA9IG5ldyBDb2xsZWN0aW9uXzEuQ29sbGVjdGlvbih0aGlzLCBvd25lcik7XG4gICAgICAgIGZ1bmN0aW9uIGZuT25VcGRhdGUoKSB7XG4gICAgICAgICAgICBzZWxmLl9vblVwZGF0ZSgpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9wRXZlbnQgPSAncHJvcGVydHlDaGFuZ2UnO1xuICAgICAgICB0aGlzLm9uKCdsYXllclVwZGF0ZScsIHRoaXMuX29uVXBkYXRlKTtcbiAgICAgICAgdGhpcy5vbigncHJvcGVydHlDaGFuZ2UnLCB0aGlzLl9vblVwZGF0ZSk7XG4gICAgICAgIHRoaXMuX2ZvbnQub24ocHJvcEV2ZW50LCBmbk9uVXBkYXRlKTtcbiAgICAgICAgdGhpcy5fcGFkZGluZy5vbihwcm9wRXZlbnQsIGZuT25VcGRhdGUpO1xuICAgICAgICB0aGlzLl9tYXJnaW4ub24ocHJvcEV2ZW50LCBmbk9uVXBkYXRlKTtcbiAgICB9XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJkcmF3blwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2RyYXduO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInBhZGRpbmdcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9wYWRkaW5nO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcIm1hcmdpblwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX21hcmdpbjtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJmb250XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fZm9udDtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJpZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmhhc0lkKCkpXG4gICAgICAgICAgICAgICAgdGhpcy5fR1VJRCA9IG5ldyBHVUlEXzEuR1VJRCgpO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX0dVSUQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5oYXNJZCA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHR5cGVvZiB0aGlzLl9HVUlEICE9PSAndW5kZWZpbmVkJztcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiY29udGV4dFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2NvbnRleHQ7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiaXNJbmplY3RlZFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2luamVjdGVkO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuX29uVXBkYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBpZiAoIXRoaXMuZHJhd24pXG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIHRoaXMub3duZXIuX2VtaXQoJ3JlZHJhdycsIHsgcmVsYXRlZFRhcmdldDogdGhpcyB9KTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwiYmFja2dyb3VuZENvbG9yXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fYmFja2dyb3VuZENvbG9yO1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uIChuZXdDb2xvcikge1xuICAgICAgICAgICAgdmFyIG9sZCA9IHRoaXMuX2JhY2tncm91bmRDb2xvci50b1N0cmluZygpO1xuICAgICAgICAgICAgdGhpcy5fYmFja2dyb3VuZENvbG9yID0gbmV3Q29sb3I7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnYmFja2dyb3VuZENvbG9yJywgb2xkLCBuZXdDb2xvcikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImZvcmVDb2xvclwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2ZvcmVDb2xvcjtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3Q29sb3IpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB0aGlzLl9mb3JlQ29sb3IudG9TdHJpbmcoKTtcbiAgICAgICAgICAgIHRoaXMuX2ZvcmVDb2xvciA9IG5ld0NvbG9yO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ2ZvcmVDb2xvcicsIG9sZCwgbmV3Q29sb3IpKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KFVJQ29tcG9uZW50LnByb3RvdHlwZSwgXCJoZWlnaHRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKG5ld0hlaWdodCkge1xuICAgICAgICAgICAgdGhpcy5faGVpZ2h0ID0gbmV3SGVpZ2h0O1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3dpZHRoJywgbnVsbCwgbmV3SGVpZ2h0KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwid2lkdGhcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl93aWR0aDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3V2lkdGgpIHtcbiAgICAgICAgICAgIHRoaXMuX3dpZHRoID0gbmV3V2lkdGg7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdwcm9wZXJ0eUNoYW5nZScsIG5ldyBldmVudHNfMS5Qcm9wZXJ0eUNoYW5nZWRFdmVudCh0aGlzLCAnd2lkdGgnLCBudWxsLCBuZXdXaWR0aCkpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuZ2V0QWJzb2x1dGVIZWlnaHQgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiB0aGlzLmhlaWdodDtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5nZXRBYnNvbHV0ZVdpZHRoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy5oZWlnaHQ7XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcInRvcFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX19wb3NpdGlvbl9fLnk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSB2ICsgMDtcbiAgICAgICAgICAgIHRoaXMuX19wb3NpdGlvbl9fLnkgPSB2O1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3RvcCcsIG9sZCwgdikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoVUlDb21wb25lbnQucHJvdG90eXBlLCBcImxlZnRcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXy54O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2KSB7XG4gICAgICAgICAgICB2YXIgb2xkID0gdiArIDA7XG4gICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXy54ID0gdjtcbiAgICAgICAgICAgIHRoaXMuX2VtaXQoJ3Byb3BlcnR5Q2hhbmdlJywgbmV3IGV2ZW50c18xLlByb3BlcnR5Q2hhbmdlZEV2ZW50KHRoaXMsICdsZWZ0Jywgb2xkLCB2KSk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwicG9zaXRpb25cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9fcG9zaXRpb25fXztcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAobmV3UG9zaXRpb24pIHtcbiAgICAgICAgICAgIHZhciBvbGQgPSBuZXcgUG9pbnRfMS5Qb2ludChuZXdQb3NpdGlvbi54LCBuZXdQb3NpdGlvbi55KTtcbiAgICAgICAgICAgIHRoaXMudG9wID0gbmV3UG9zaXRpb24ueTtcbiAgICAgICAgICAgIHRoaXMubGVmdCA9IG5ld1Bvc2l0aW9uLng7XG4gICAgICAgICAgICB0aGlzLl9fcG9zaXRpb25fXyA9IG5ld1Bvc2l0aW9uO1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgJ3Bvc2l0aW9uJywgb2xkLCBuZXdQb3NpdGlvbikpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUucG9pbnRzID0gZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgcDEgPSBuZXcgUG9pbnRfMS5Qb2ludCh0aGlzLnBvc2l0aW9uLngsIHRoaXMucG9zaXRpb24ueSksIHAyID0gbmV3IFBvaW50XzEuUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5nZXRBYnNvbHV0ZVdpZHRoKCksIHRoaXMucG9zaXRpb24ueSksIHAzID0gbmV3IFBvaW50XzEuUG9pbnQodGhpcy5wb3NpdGlvbi54ICsgdGhpcy5nZXRBYnNvbHV0ZVdpZHRoKCksIHRoaXMucG9zaXRpb24ueSArIHRoaXMuZ2V0QWJzb2x1dGVIZWlnaHQoKSksIHA0ID0gbmV3IFBvaW50XzEuUG9pbnQodGhpcy5wb3NpdGlvbi54LCB0aGlzLnBvc2l0aW9uLnkgKyB0aGlzLmdldEFic29sdXRlSGVpZ2h0KCkpO1xuICAgICAgICByZXR1cm4gW3AxLCBwMiwgcDMsIHA0XTtcbiAgICB9O1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShVSUNvbXBvbmVudC5wcm90b3R5cGUsIFwicGFyZW50XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fcGFyZW50O1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuaGFzUGFyZW50ID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gKGhlbHBlcnNfMS5pc3NldCh0aGlzLnBhcmVudCkgJiYgdGhpcy5wYXJlbnQgIT09IG51bGwpO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLnJlZHJhdyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgaWYgKCF0aGlzLmlzSW5qZWN0ZWQpXG4gICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIHRoaXMub3duZXIucmVnaXN0ZXJFbGVtZW50KHRoaXMpO1xuICAgICAgICB0aGlzLl9lbWl0KCdyZWRyYXcnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCB7ICdmb3JjZSc6IGZhbHNlIH0pKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuX3JlbmRlciA9IGZ1bmN0aW9uICgpIHsgfTtcbiAgICBVSUNvbXBvbmVudC5wcm90b3R5cGUuX2RyYXdDaGlsZHJlbiA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgdGhpcy5jb250cm9scy5mb3JFYWNoKGZ1bmN0aW9uIF9mbkRyYXdDaGlsZChlKSB7XG4gICAgICAgICAgICBlLnJlZHJhdygpO1xuICAgICAgICB9KTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5yZW5kZXIgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2RyYXduID0gZmFsc2U7XG4gICAgICAgIHRoaXMuX2VtaXQoJ3JlbmRlcicsIG5ldyBldmVudHNfMS5VSUV2ZW50KHRoaXMsIG51bGwpKTtcbiAgICAgICAgdGhpcy5fcmVuZGVyKCk7XG4gICAgICAgIHRoaXMuX2RyYXdDaGlsZHJlbigpO1xuICAgICAgICB0aGlzLl9kcmF3biA9IHRydWU7XG4gICAgICAgIHRoaXMuX2VtaXQoJ3JlbmRlcmVkJywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgbnVsbCkpO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLl9faW5qZWN0ID0gZnVuY3Rpb24gKHBhcmVudCkge1xuICAgICAgICB0aGlzLl9wYXJlbnQgPSBwYXJlbnQ7XG4gICAgICAgIHRoaXMuX2luamVjdGVkID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5fZm9udC5lbWl0dGFibGUgPSB0cnVlO1xuICAgICAgICB0aGlzLm93bmVyLnJlZ2lzdGVyRWxlbWVudCh0aGlzKTtcbiAgICAgICAgdGhpcy5fZW1pdCgnaW5qZWN0JywgbmV3IGV2ZW50c18xLlVJRXZlbnQodGhpcywgeyAncGFyZW50JzogcGFyZW50IH0pKTtcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcbiAgICB9O1xuICAgIFVJQ29tcG9uZW50LnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHZhciBwYXJlbnQgPSB0aGlzLmhhc1BhcmVudCgpID8gdGhpcy5wYXJlbnQgOiB0aGlzLm93bmVyO1xuICAgICAgICBwYXJlbnQuY29udHJvbHMucmVtb3ZlKHRoaXMpO1xuICAgIH07XG4gICAgVUlDb21wb25lbnQucHJvdG90eXBlLmRpc3Bvc2UgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHRoaXMuX2VtaXQoJ2Rpc3Bvc2UnLCBuZXcgZXZlbnRzXzEuVUlFdmVudCh0aGlzLCBudWxsKSk7XG4gICAgICAgIHRoaXMuX2luamVjdGVkID0gZmFsc2U7XG4gICAgfTtcbiAgICByZXR1cm4gVUlDb21wb25lbnQ7XG59KGV2ZW50c18xLkV2ZW50RW1pdHRlcikpO1xuZXhwb3J0cy5VSUNvbXBvbmVudCA9IFVJQ29tcG9uZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9VUlDb21wb25lbnQuanMubWFwIiwiXCJ1c2Ugc3RyaWN0XCI7XG52YXIgX19leHRlbmRzID0gKHRoaXMgJiYgdGhpcy5fX2V4dGVuZHMpIHx8IGZ1bmN0aW9uIChkLCBiKSB7XG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XG4gICAgZnVuY3Rpb24gX18oKSB7IHRoaXMuY29uc3RydWN0b3IgPSBkOyB9XG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xufTtcbnZhciBldmVudHNfMSA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIEJveE1vZGVsRWxlbWVudCA9IChmdW5jdGlvbiAoX3N1cGVyKSB7XG4gICAgX19leHRlbmRzKEJveE1vZGVsRWxlbWVudCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBCb3hNb2RlbEVsZW1lbnQodG9wLCByaWdodCwgYm90dG9tLCBsZWZ0KSB7XG4gICAgICAgIGlmICh0b3AgPT09IHZvaWQgMCkgeyB0b3AgPSAwOyB9XG4gICAgICAgIGlmIChyaWdodCA9PT0gdm9pZCAwKSB7IHJpZ2h0ID0gMDsgfVxuICAgICAgICBpZiAoYm90dG9tID09PSB2b2lkIDApIHsgYm90dG9tID0gMDsgfVxuICAgICAgICBpZiAobGVmdCA9PT0gdm9pZCAwKSB7IGxlZnQgPSAwOyB9XG4gICAgICAgIF9zdXBlci5jYWxsKHRoaXMpO1xuICAgICAgICB0aGlzLl90b3AgPSB0b3A7XG4gICAgICAgIHRoaXMuX2xlZnQgPSBsZWZ0O1xuICAgICAgICB0aGlzLl9yaWdodCA9IHJpZ2h0O1xuICAgICAgICB0aGlzLl9ib3R0b20gPSBib3R0b207XG4gICAgfVxuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShCb3hNb2RlbEVsZW1lbnQucHJvdG90eXBlLCBcInRvcFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3RvcDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3RvcCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3RvcCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJyaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JpZ2h0O1xuICAgICAgICB9LFxuICAgICAgICBzZXQ6IGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgdGhpcy5fcmlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdyaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoQm94TW9kZWxFbGVtZW50LnByb3RvdHlwZSwgXCJib3R0b21cIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9ib3R0b207XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9ib3R0b20gPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdib3R0b20nKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEJveE1vZGVsRWxlbWVudC5wcm90b3R5cGUsIFwibGVmdFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX2xlZnQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9sZWZ0ID0gdmFsdWU7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnbGVmdCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICByZXR1cm4gQm94TW9kZWxFbGVtZW50O1xufShldmVudHNfMS5FbWl0dGFibGUpKTtcbmV4cG9ydHMuQm94TW9kZWxFbGVtZW50ID0gQm94TW9kZWxFbGVtZW50O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Qm94TW9kZWxFbGVtZW50LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIF9fZXh0ZW5kcyA9ICh0aGlzICYmIHRoaXMuX19leHRlbmRzKSB8fCBmdW5jdGlvbiAoZCwgYikge1xuICAgIGZvciAodmFyIHAgaW4gYikgaWYgKGIuaGFzT3duUHJvcGVydHkocCkpIGRbcF0gPSBiW3BdO1xuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcbn07XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciBldmVudHNfMiA9IHJlcXVpcmUoJy4uLy4uL2V2ZW50cycpO1xudmFyIENvbGxlY3Rpb24gPSAoZnVuY3Rpb24gKF9zdXBlcikge1xuICAgIF9fZXh0ZW5kcyhDb2xsZWN0aW9uLCBfc3VwZXIpO1xuICAgIGZ1bmN0aW9uIENvbGxlY3Rpb24oaGFuZGxlciwgYXBwSW5zdGFuY2UpIHtcbiAgICAgICAgX3N1cGVyLmNhbGwodGhpcyk7XG4gICAgICAgIHRoaXMuY29sbGVjdGlvbkhhbmRsZXIgPSBoYW5kbGVyO1xuICAgICAgICB0aGlzLml0ZW1zID0gW107XG4gICAgICAgIHRoaXMuX2RlZmF1bHRGb3JtID0gYXBwSW5zdGFuY2U7XG4gICAgfVxuICAgIENvbGxlY3Rpb24ucHJvdG90eXBlLmFkZCA9IGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgIGl0ZW0uX19pbmplY3QodGhpcy5jb2xsZWN0aW9uSGFuZGxlcik7XG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcbiAgICAgICAgdGhpcy5fZW1pdCgnZWxlbWVudEluc2VydGVkJywgbmV3IGV2ZW50c18yLkNvbGxlY3Rpb25FdmVudCh0aGlzLCBpdGVtKSk7XG4gICAgfTtcbiAgICBDb2xsZWN0aW9uLnByb3RvdHlwZS5yZW1vdmUgPSBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgaSA9IHRoaXMuaXRlbXMuaW5kZXhPZihpdGVtKTtcbiAgICAgICAgaWYgKGkgPiAtMSkge1xuICAgICAgICAgICAgdGhpcy5pdGVtc1tpXS5kaXNwb3NlKCk7XG4gICAgICAgICAgICB0aGlzLl9lbWl0KCdlbGVtZW50UmVtb3ZlJywgbmV3IGV2ZW50c18yLkNvbGxlY3Rpb25FdmVudCh0aGlzLCB0aGlzLml0ZW1zW2ldKSk7XG4gICAgICAgICAgICB0aGlzLml0ZW1zLnNwbGljZShpLCAxKTtcbiAgICAgICAgfVxuICAgIH07XG4gICAgQ29sbGVjdGlvbi5wcm90b3R5cGUuZm9yRWFjaCA9IGZ1bmN0aW9uIChjYWxsYmFjaykge1xuICAgICAgICB0aGlzLml0ZW1zLmZvckVhY2guY2FsbCh0aGlzLml0ZW1zLCBjYWxsYmFjayk7XG4gICAgfTtcbiAgICByZXR1cm4gQ29sbGVjdGlvbjtcbn0oZXZlbnRzXzEuRXZlbnRFbWl0dGVyKSk7XG5leHBvcnRzLkNvbGxlY3Rpb24gPSBDb2xsZWN0aW9uO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Q29sbGVjdGlvbi5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBfX2V4dGVuZHMgPSAodGhpcyAmJiB0aGlzLl9fZXh0ZW5kcykgfHwgZnVuY3Rpb24gKGQsIGIpIHtcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cbiAgICBkLnByb3RvdHlwZSA9IGIgPT09IG51bGwgPyBPYmplY3QuY3JlYXRlKGIpIDogKF9fLnByb3RvdHlwZSA9IGIucHJvdG90eXBlLCBuZXcgX18oKSk7XG59O1xudmFyIGhlbHBlcnNfMSA9IHJlcXVpcmUoJy4uLy4uL2hlbHBlcnMnKTtcbnZhciBGb250U3R5bGVfMSA9IHJlcXVpcmUoJy4vRm9udFN0eWxlJyk7XG52YXIgZXZlbnRzXzEgPSByZXF1aXJlKCcuLi8uLi9ldmVudHMnKTtcbnZhciBGb250ID0gKGZ1bmN0aW9uIChfc3VwZXIpIHtcbiAgICBfX2V4dGVuZHMoRm9udCwgX3N1cGVyKTtcbiAgICBmdW5jdGlvbiBGb250KGZhbWlseSwgc2l6ZSwgd2VpZ2h0KSB7XG4gICAgICAgIGlmIChmYW1pbHkgPT09IHZvaWQgMCkgeyBmYW1pbHkgPSAnc2Fucy1zZXJpZic7IH1cbiAgICAgICAgaWYgKHNpemUgPT09IHZvaWQgMCkgeyBzaXplID0gMTA7IH1cbiAgICAgICAgaWYgKHdlaWdodCA9PT0gdm9pZCAwKSB7IHdlaWdodCA9IDQwMDsgfVxuICAgICAgICBfc3VwZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgdGhpcy5lbWl0dGFibGUgPSBmYWxzZTtcbiAgICAgICAgdGhpcy5fZmFtaWx5ID0gZmFtaWx5O1xuICAgICAgICB0aGlzLl9zaXplID0gc2l6ZTtcbiAgICAgICAgdGhpcy5fd2VpZ2h0ID0gd2VpZ2h0O1xuICAgICAgICB0aGlzLl9zdHlsZSA9IEZvbnRTdHlsZV8xLkZvbnRTdHlsZS5ub3JtYWw7XG4gICAgfVxuICAgIEZvbnQucHJvdG90eXBlLl9vbkNoYW5nZSA9IGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIGlmICh0aGlzLmVtaXR0YWJsZSkge1xuICAgICAgICAgICAgdGhpcy5fZW1pdCgncHJvcGVydHlDaGFuZ2UnLCBuZXcgZXZlbnRzXzEuUHJvcGVydHlDaGFuZ2VkRXZlbnQodGhpcywgcHJvcCwgbnVsbCwgbnVsbCkpO1xuICAgICAgICB9XG4gICAgfTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwiaGVpZ2h0XCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gKCFoZWxwZXJzXzEuaXNzZXQodGhpcy5faGVpZ2h0KSB8fCB0eXBlb2YgdGhpcy5faGVpZ2h0ID09ICd1bmRlZmluZWQnKSA/ICh0aGlzLl9zaXplICogMS4yKSB8IDAgOiB0aGlzLl9oZWlnaHQ7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgICB0aGlzLl9oZWlnaHQgPSB2YWx1ZTtcbiAgICAgICAgICAgIHRoaXMuX29uQ2hhbmdlKCdoZWlnaHQnKTtcbiAgICAgICAgfSxcbiAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlXG4gICAgfSk7XG4gICAgT2JqZWN0LmRlZmluZVByb3BlcnR5KEZvbnQucHJvdG90eXBlLCBcIndlaWdodFwiLCB7XG4gICAgICAgIGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3dlaWdodDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgIHRoaXMuX3dlaWdodCA9IHZhbHVlO1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3dlaWdodCcpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoRm9udC5wcm90b3R5cGUsIFwic3R5bGVcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9zdHlsZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5fc3R5bGUgPSB2O1xuICAgICAgICAgICAgdGhpcy5fb25DaGFuZ2UoJ3N0eWxlJyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJmYW1pbHlcIiwge1xuICAgICAgICBnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9mYW1pbHk7XG4gICAgICAgIH0sXG4gICAgICAgIHNldDogZnVuY3Rpb24gKHYpIHtcbiAgICAgICAgICAgIHRoaXMuX2ZhbWlseSA9IHY7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnZmFtaWx5Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIGVudW1lcmFibGU6IHRydWUsXG4gICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgIH0pO1xuICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eShGb250LnByb3RvdHlwZSwgXCJzaXplXCIsIHtcbiAgICAgICAgZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5fc2l6ZTtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0OiBmdW5jdGlvbiAodikge1xuICAgICAgICAgICAgdGhpcy5fc2l6ZSA9IHY7XG4gICAgICAgICAgICB0aGlzLl9vbkNoYW5nZSgnc2l6ZScpO1xuICAgICAgICB9LFxuICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICBjb25maWd1cmFibGU6IHRydWVcbiAgICB9KTtcbiAgICBGb250LnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIFt0aGlzLnN0eWxlLnRvU3RyaW5nKCksIHRoaXMud2VpZ2h0LCB0aGlzLnNpemUgKyAncHgvJyArIHRoaXMuaGVpZ2h0ICsgJ3B4JywgdGhpcy5mYW1pbHldLmpvaW4oJyAnKTtcbiAgICB9O1xuICAgIHJldHVybiBGb250O1xufShldmVudHNfMS5FdmVudEVtaXR0ZXIpKTtcbmV4cG9ydHMuRm9udCA9IEZvbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Gb250LmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEZvbnRTdHlsZSA9IChmdW5jdGlvbiAoKSB7XG4gICAgZnVuY3Rpb24gRm9udFN0eWxlKHR5cGUpIHtcbiAgICAgICAgdGhpcy5fc3R5bGVUeXBlID0gdHlwZTtcbiAgICB9XG4gICAgRm9udFN0eWxlLnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMuX3N0eWxlVHlwZS50b1N0cmluZygpO1xuICAgIH07XG4gICAgRm9udFN0eWxlLm5vcm1hbCA9IG5ldyBGb250U3R5bGUoJ25vcm1hbCcpO1xuICAgIEZvbnRTdHlsZS5pdGFsaWMgPSBuZXcgRm9udFN0eWxlKCdpdGFsaWMnKTtcbiAgICByZXR1cm4gRm9udFN0eWxlO1xufSgpKTtcbmV4cG9ydHMuRm9udFN0eWxlID0gRm9udFN0eWxlO1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9Rm9udFN0eWxlLmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIEdVSUQgPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIEdVSUQoKSB7XG4gICAgICAgIHZhciB2YWx1ZSA9IEdVSUQuZ2VuZXJhdGUoKTtcbiAgICAgICAgdGhpcy50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuIHZhbHVlOyB9O1xuICAgIH1cbiAgICBHVUlELmdlbmVyYXRlID0gZnVuY3Rpb24gKCkge1xuICAgICAgICBmdW5jdGlvbiBzNCgpIHtcbiAgICAgICAgICAgIHJldHVybiBNYXRoLmZsb29yKCgxICsgTWF0aC5yYW5kb20oKSkgKiAweDEwMDAwKVxuICAgICAgICAgICAgICAgIC50b1N0cmluZygxNilcbiAgICAgICAgICAgICAgICAuc3Vic3RyaW5nKDEpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzNCgpICsgczQoKSArICctJyArIHM0KCkgKyAnLScgKyBzNCgpICsgJy0nICtcbiAgICAgICAgICAgIHM0KCkgKyAnLScgKyBzNCgpICsgczQoKSArIHM0KCk7XG4gICAgfTtcbiAgICBHVUlELnByb3RvdHlwZS50b1N0cmluZyA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH07XG4gICAgR1VJRC5wcm90b3R5cGUubGVuZ3RoID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gdGhpcy50b1N0cmluZygpLmxlbmd0aDtcbiAgICB9O1xuICAgIHJldHVybiBHVUlEO1xufSgpKTtcbmV4cG9ydHMuR1VJRCA9IEdVSUQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1HVUlELmpzLm1hcCIsIlwidXNlIHN0cmljdFwiO1xudmFyIFBvaW50ID0gKGZ1bmN0aW9uICgpIHtcbiAgICBmdW5jdGlvbiBQb2ludCh4LCB5KSB7XG4gICAgICAgIHRoaXMueCA9IHg7XG4gICAgICAgIHRoaXMueSA9IHk7XG4gICAgfVxuICAgIHJldHVybiBQb2ludDtcbn0oKSk7XG5leHBvcnRzLlBvaW50ID0gUG9pbnQ7XG4vLyMgc291cmNlTWFwcGluZ1VSTD1Qb2ludC5qcy5tYXAiLCJcInVzZSBzdHJpY3RcIjtcbnZhciBUZXh0QWxpZ24gPSAoZnVuY3Rpb24gKCkge1xuICAgIGZ1bmN0aW9uIFRleHRBbGlnbigpIHtcbiAgICB9XG4gICAgVGV4dEFsaWduLnN0YXJ0ID0gJ3N0YXJ0JztcbiAgICBUZXh0QWxpZ24uZW5kID0gJ2VuZCc7XG4gICAgVGV4dEFsaWduLmxlZnQgPSAnbGVmdCc7XG4gICAgVGV4dEFsaWduLmNlbnRlciA9ICdjZW50ZXInO1xuICAgIFRleHRBbGlnbi5yaWdodCA9ICdyaWdodCc7XG4gICAgcmV0dXJuIFRleHRBbGlnbjtcbn0oKSk7XG5leHBvcnRzLlRleHRBbGlnbiA9IFRleHRBbGlnbjtcbi8vIyBzb3VyY2VNYXBwaW5nVVJMPVRleHRBbGlnbi5qcy5tYXAiXX0=
