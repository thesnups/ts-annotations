"use strict";
var Map = require('core-js/es6/map');
exports.primitivesMap = new Map();
exports.primitivesMap.set(String, function (val) { return ("" + val); });
exports.primitivesMap.set(Number, function (val) { return parseInt(val, 10); });
exports.primitivesMap.set(Boolean, function (val) { return !!val; });
exports.primitivesMap.set(RegExp, function (val) { return new RegExp(val); });
var ObjectMapper = (function () {
    function ObjectMapper() {
        ;
    }
    ObjectMapper.prototype.readValue = function (json, typeRef) {
        var _this = this;
        var args = [];
        for (var _i = 2; _i < arguments.length; _i++) {
            args[_i - 2] = arguments[_i];
        }
        var instance = new (typeRef.bind.apply(typeRef, [void 0].concat(args)))();
        var pathMapping = typeRef.prototype.pathMapping;
        var typeMapping = typeRef.prototype.typeMapping;
        if (pathMapping && typeMapping) {
            pathMapping.forEach(function (val, key) {
                var value = _this.getValueFromObjectPath(json, val);
                var type = typeMapping.get(key);
                if (type) {
                    var primitiveConvert = exports.primitivesMap.get(type);
                    if (primitiveConvert) {
                        value = primitiveConvert(value);
                    }
                    else {
                        value = _this.readValue(value, type);
                    }
                }
                if (value) {
                    instance[key] = value;
                }
            });
        }
        var callbacks = typeRef.prototype.deserializeCallbacks || [];
        if (callbacks.length) {
            callbacks.forEach(function (fn) {
                if (typeof instance[fn] === 'function') {
                    instance[fn].call(instance, instance, json, typeRef);
                }
            });
        }
        return instance;
    };
    ObjectMapper.prototype.getValueFromObjectPath = function (obj, path) {
        var paths = path.split('.');
        var pathsLength = paths.length;
        try {
            for (var i = 0; i < pathsLength; i++) {
                obj = obj[paths[i]];
            }
            ;
        }
        catch (e) {
            obj = undefined;
        }
        return obj;
    };
    ;
    return ObjectMapper;
}());
exports.ObjectMapper = ObjectMapper;
//# sourceMappingURL=object-mapper.class.js.map