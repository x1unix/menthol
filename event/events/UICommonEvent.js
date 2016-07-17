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
//# sourceMappingURL=UICommonEvent.js.map