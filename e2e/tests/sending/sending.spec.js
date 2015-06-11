/**
 * Created by Devon on 5/4/2015.
 */
"use strict";

describe('sending transfers page', function() {

  //FAKE BACKEND NOT WORKING

  //beforeEach(function(){
  //  var snabbtAppMock = function () {
  //    var sentTransfers = [
  //      {
  //        "_id": {
  //          "$oid": "553fd15740d7b9382821d403"
  //        },
  //        "transferSender": "551ef6d35b0a00ec11f35076",
  //        "transferReceiver": "551ef6d35b0a00ec11f35075",
  //        "transferStatus": {
  //          "status": "Cancelled by Sender",
  //          "date": "2015-04-30T00:37:14.780Z"
  //        },
  //        "removedBy": {
  //          "receiver": false,
  //          "sender": true
  //        },
  //        "transferHistory": [
  //          {
  //            "status": "Initialized",
  //            "date": "2015-04-28T18:28:38.872Z"
  //          },
  //          {
  //            "date": "2015-04-30T00:37:14.780Z",
  //            "status": "Cancelled by Sender"
  //          }
  //        ],
  //        "__v": 2
  //      },
  //      {
  //        "_id": {
  //          "$oid": "553fd15740d7b9382821d403"
  //        },
  //        "transferSender": "551ef6d35b0a00ec11f35076",
  //        "transferReceiver": "551ef6d35b0a00ec11f35075",
  //        "transferStatus": {
  //          "status": "Initialized",
  //          "date": "2015-04-28T18:28:38.872Z"
  //        },
  //        "removedBy": {
  //          "receiver": false,
  //          "sender": false
  //        },
  //        "transferHistory": [
  //          {
  //            "status": "Initialized",
  //            "date": "2015-04-28T18:28:38.872Z"
  //          }
  //        ],
  //        "__v": 2
  //      }];
  //
  //    angular.module('snabbtAppMock', ['snabbtApp', 'ngMockE2E'])
  //      .run(function ($httpBackend) {
  //        $httpBackend.whenGET('/api/users/551ef6d35b0a00ec11f35076/getSentTransfers').respond(sentTransfers);
  //        // For everything else, don't mock
  //        $httpBackend.whenGET(/^\w+.*/).passThrough();
  //        $httpBackend.whenPOST(/^\w+.*/).passThrough();
  //    });
  //    browser.addMockModule('snabbtAppMock', snabbtAppMock);
  //  };
  //});

  it('should login with valid credentials', function(){
    browser.get('/login');
    var email = element(by.model('user.email'));
    var password = element(by.model('user.password'));
    email.sendKeys('jschmo@gmail.com');
    password.sendKeys('cookies');

    element(by.css('.btn-login')).click().then(function(){
      expect(browser.getLocationAbsUrl()).toMatch('/friends');
    });
  });

  it('should go to sending page on navbar click', function() {
    element(by.css('#sending')).click().then(function(){
      expect(browser.getLocationAbsUrl()).toMatch('/sending');
    });
  });

  it('should have list of sending transfers', function() {
    expect(element(by.exactRepeater('transfer in sentTransfers')).isPresent()).toBe(true);
  });


  //REMOVE THIS ASSERTION LATER, ONLY WORKS WITH FIXED AMOUNT OF TRANSFERS, UNLESS FAKE BACKEND GETS WORKING
  it('should have 1 transfer listed', function() {
    //the way the code is set up, 1 equals 3.  There are 3 transfer in sentTransfer repeaters in the code
    var transfers = element.all(by.repeater('transfer in sentTransfers'));
    expect(transfers.count()).toEqual(3);
  });

});
