"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _1 = require('../../');
var Address = (function () {
    function Address() {
        this.address = '';
        this.city = '';
        this.state = '';
        this.zip = '';
    }
    __decorate([
        _1.JsonProperty('streetAddress'), 
        __metadata('design:type', String)
    ], Address.prototype, "address", void 0);
    __decorate([
        _1.JsonProperty('city'), 
        __metadata('design:type', String)
    ], Address.prototype, "city", void 0);
    __decorate([
        _1.JsonProperty('stateCode'), 
        __metadata('design:type', String)
    ], Address.prototype, "state", void 0);
    __decorate([
        _1.JsonProperty('zip_code'), 
        __metadata('design:type', String)
    ], Address.prototype, "zip", void 0);
    return Address;
}());
exports.Address = Address;
//# sourceMappingURL=address.class.js.map