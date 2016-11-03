"use strict";
var _1 = require('../');
var _2 = require('./models/');
var _3 = require('./constants/');
describe('ObjectMapper', function () {
    it('should exist', function () {
        expect(_1.ObjectMapper).toBeDefined();
    });
    it('should be a constructor', function () {
        var mapper = new _1.ObjectMapper();
        expect(mapper).toBeDefined();
    });
    describe('#readValue', function () {
        var mapper;
        beforeEach(function () {
            mapper = new _1.ObjectMapper();
        });
        it('should correctly map a JSON object to a class', function () {
            var accountDetails = mapper.readValue(_3.rawAccountDetails, _2.AccountDetails);
            expect(accountDetails.name).toEqual(_3.rawAccountDetails.account.details.name);
            expect(accountDetails.age).toEqual(_3.rawAccountDetails.account.details.age);
            expect(accountDetails.awesomeness).toEqual(_3.rawAccountDetails.account.details.isAwesome);
            expect(accountDetails.regex).toEqual(jasmine.any(RegExp));
            var strRegex = accountDetails.regex.toString();
            strRegex = strRegex.substring(1, strRegex.length - 1);
            expect(strRegex).toEqual(_3.rawAccountDetails.account.details.regex);
            expect(accountDetails.address).toEqual(jasmine.any(_2.Address));
            expect(accountDetails.address.address).toEqual(_3.rawAccountDetails.account.details.summary.location.address.streetAddress);
            expect(accountDetails.address.city).toEqual(_3.rawAccountDetails.account.details.summary.location.address.city);
            expect(accountDetails.address.state).toEqual(_3.rawAccountDetails.account.details.summary.location.address.stateCode);
            expect(accountDetails.address.zip).toEqual(_3.rawAccountDetails.account.details.summary.location.address.zip_code);
        });
    });
});
//# sourceMappingURL=object-mapper.class.spec.js.map