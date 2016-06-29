"use strict";
var core_1 = require('./core');
var ui_1 = require('./ui');
var kratos = (function () {
    function kratos() {
    }
    kratos.UI = ui_1.ui;
    kratos.core = core_1.core;
    return kratos;
}());
exports.kratos = kratos;
console.log(ui_1.ui);
console.warn(core_1.core);
//# sourceMappingURL=kratos.js.map