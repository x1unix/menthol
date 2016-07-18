"use strict";
var Domain_1 = require('./classes/Domain');
function $async(method, onError) {
    if (onError === void 0) { onError = console.error; }
    var localDomain = new Domain_1.Domain();
    localDomain.on('error', onError);
    localDomain.run(method);
}
exports.$async = $async;
//# sourceMappingURL=$async.js.map