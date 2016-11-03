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
var _2 = require('./');
var AccountDetails = (function () {
    function AccountDetails() {
        this.name = '';
        this.age = -1;
        this.awesomeness = false;
        this.regex = null;
        this.address = null;
    }
    __decorate([
        _1.JsonProperty('account.details.name'), 
        __metadata('design:type', String)
    ], AccountDetails.prototype, "name", void 0);
    __decorate([
        _1.JsonProperty('account.details.age'), 
        __metadata('design:type', Number)
    ], AccountDetails.prototype, "age", void 0);
    __decorate([
        _1.JsonProperty('account.details.isAwesome'), 
        __metadata('design:type', Boolean)
    ], AccountDetails.prototype, "awesomeness", void 0);
    __decorate([
        _1.JsonProperty('account.details.regex'), 
        __metadata('design:type', RegExp)
    ], AccountDetails.prototype, "regex", void 0);
    __decorate([
        _1.JsonProperty('account.details.summary.location.address'), 
        __metadata('design:type', _2.Address)
    ], AccountDetails.prototype, "address", void 0);
    return AccountDetails;
}());
exports.AccountDetails = AccountDetails;
//# sourceMappingURL=account-details.class.js.map