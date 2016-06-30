!function t(e,n,o){function r(s,c){if(!n[s]){if(!e[s]){var u="function"==typeof require&&require;if(!c&&u)return u(s,!0);if(i)return i(s,!0);var h=new Error("Cannot find module '"+s+"'");throw h.code="MODULE_NOT_FOUND",h}var f=n[s]={exports:{}};e[s][0].call(f.exports,function(t){var n=e[s][1][t];return r(n?n:t)},f,f.exports,t,e,n,o)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)r(o[s]);return r}({1:[function(t,e,n){"use strict";var o;!function(t){var e=function(){function t(){}return t.toString=function(){return[this.major,this.minor,this.patch].join(".")},t.major=0,t.minor=0,t.patch=0,t}();t.version=e;var n=function(){function t(t,e){this.$hooks=[],this.eventName=e,this.$eventSource=t}return t.prototype.triggerEvent=function(t){this.$hooks.forEach(function(e){"function"==typeof e&&e.call(this.$eventSource,t)})},t.prototype.getListenersCount=function(){return this.$hooks.length},t.prototype.addEventListener=function(t){this.$hooks.push(t)},t.prototype.removeEventListener=function(t){var e=this.$hooks.indexOf(t);return e>-1&&this.$hooks.splice(e,1),e>-1},t}();t.EventListenersCollection=n;var o=function(){function e(){this.$listeners={}}return e.prototype.hasListeners=function(t){return"undefined"!=typeof this.$listeners[t.toString()]},e.prototype.on=function(e,n){this.hasListeners(e)||(this.$listeners[e.toString()]=new t.EventListenersCollection(this.$owner,e)),this.$listeners[e.toString()].addEventListener(n)},e.prototype.off=function(t,e){return this.hasListeners(t)?this.$listeners[t.toString()].removeEventListener(e):!1},e}();t.EventEmitter=o;var r=function(){function e(e){this.element=e,this.canvas=document.createElement("canvas"),this.element.appendChild(this.canvas),this.controls=new t.Collection(null,this)}return Object.defineProperty(e.prototype,"context",{get:function(){return this.canvas.getContext("2d")},enumerable:!0,configurable:!0}),e.prototype.redrawContext=function(){},e}();t.Application=r;var i=function(){function t(t,e){this.collectionHandler=t,this.items=[],this.$defaultApplication=e}return t.prototype.add=function(t){t.$$inject(this.collectionHandler),this.items.push(t)},t.prototype.remove=function(t){var e=this.items.indexOf(t);e>-1&&(this.items[e].dispose(),this.items.splice(e,1))},t}();t.Collection=i;var s=function(){function t(t,e){this.x=t,this.y=e}return t}();t.Point=s;var c=function(){function t(){}return t.start="start",t.end="end",t.left="left",t.center="center",t.right="right",t}();t.TextAlign=c;var u=function(){function e(e){this.$height=128,this.$width=128,this.$injected=!1,this.$backgroundColor="#dedede",this.$foreColor="#000",this.owner=e,this.$context=e.context,this.controls=new t.Collection(this,e)}return Object.defineProperty(e.prototype,"context",{get:function(){return this.$context},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"isInjected",{get:function(){return this.$injected},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"backgroundColor",{get:function(){return this.$backgroundColor},set:function(t){this.$backgroundColor=t,this.redrawContext()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"foreColor",{get:function(){return this.$foreColor},set:function(t){this.$foreColor=t,this.context.fillStyle=t,this.redrawContext()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"height",{get:function(){return this.$height},set:function(t){this.$height=t,this.redrawContext()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"width",{get:function(){return this.$width},set:function(t){this.$width=t,this.redrawContext()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"position",{get:function(){return this.__position__},set:function(t){this.__position__=t,this.redrawContext()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"parent",{get:function(){return this.$parent},enumerable:!0,configurable:!0}),e.prototype.redrawContext=function(t){return void 0===t&&(t=!1),this.isInjected&&t?(this.parent.redrawContext(t),!0):!1},e.prototype.render=function(){},e.prototype.$$inject=function(t){this.$parent=t,this.$injected=!0,this.render()},e.prototype.dispose=function(){this.$injected=!1},e}();t.UIControl=u}(o=n.core||(n.core={}))},{}],2:[function(t,e,n){window.kratos=t("./core.js").core,window.kratos.ui=t("./ui.js").ui},{"./core.js":1,"./ui.js":3}],3:[function(t,e,n){"use strict";var o,r=this&&this.__extends||function(t,e){function n(){this.constructor=t}for(var o in e)e.hasOwnProperty(o)&&(t[o]=e[o]);t.prototype=null===e?Object.create(e):(n.prototype=e.prototype,new n)},i=t("./core");!function(t){var e=function(t){function e(){t.apply(this,arguments),this.$text="New Label",this.$align=i.core.TextAlign.left}return r(e,t),Object.defineProperty(e.prototype,"text",{get:function(){return this.$text},set:function(t){this.$text=t,this.redrawContext()},enumerable:!0,configurable:!0}),Object.defineProperty(e.prototype,"textAlign",{get:function(){return this.$align},set:function(t){this.$align=t,this.redrawContext()},enumerable:!0,configurable:!0}),e.prototype.render=function(){this.context.fillText(this.text,this.height,this.width)},e}(i.core.UIControl);t.Label=e}(o=n.ui||(n.ui={}))},{"./core":1}]},{},[2]);