var kratos;
(function (kratos) {
    var Application = (function () {
        function Application(handler) {
            this.element = handler;
            this.canvas = document.createElement('canvas');
            this.element.appendChild(this.canvas);
            this.controls = new kratos.Collection(null, this);
        }
        Object.defineProperty(Application.prototype, "context", {
            get: function () {
                return this.canvas.getContext('2d');
            },
            enumerable: true,
            configurable: true
        });
        return Application;
    }());
    kratos.Application = Application;
    var Collection = (function () {
        function Collection(handler, appInstance) {
            this.collectionHandler = handler;
            this.$defaultApplication = appInstance;
        }
        Collection.prototype.add = function (item) {
            item.$$inject(this.collectionHandler);
            this.items.push(item);
        };
        Collection.prototype.remove = function (item) {
            var i = this.items.indexOf(item);
            if (i > -1) {
                this.items[i].dispose();
                this.items.splice(i, 1);
            }
        };
        return Collection;
    }());
    kratos.Collection = Collection;
    var Point = (function () {
        function Point(x, y) {
            this.x = x;
            this.y = y;
        }
        return Point;
    }());
    kratos.Point = Point;
    var UIControl = (function () {
        function UIControl(owner) {
            this.owner = owner;
            this.context = owner.context;
            this.controls = new kratos.Collection(this, owner);
        }
        Object.defineProperty(UIControl.prototype, "position", {
            get: function () {
                return this.__position__;
            },
            set: function (newPosition) {
                this.__position__ = newPosition;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(UIControl.prototype, "parent", {
            get: function () {
                return this.$parent;
            },
            enumerable: true,
            configurable: true
        });
        UIControl.prototype.render = function () {
        };
        UIControl.prototype.$$inject = function (parent) {
            this.$parent = parent;
            this.render();
        };
        UIControl.prototype.dispose = function () {
        };
        return UIControl;
    }());
    kratos.UIControl = UIControl;
})(kratos || (kratos = {}));
//# sourceMappingURL=kratos.js.map