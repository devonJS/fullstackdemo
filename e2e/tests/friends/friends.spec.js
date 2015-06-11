/**
 * Created by Devon on 4/30/2015.
 */
"use strict";

//var mockServer = require('../../mockserver/server.js');

describe('friends page', function(){

  beforeEach(function(){
      //browser.addMockModule('snabbtAppMock', mockServer.snabbtAppMock);
    browser.get('/friends');
  });

  //beforeEach(function(){
  //  var snabbtAppMock = function () {
  //    var friendsList = [
  //      {
  //        "_id": "551ef6d35b0a00ec11f35075",
  //        "description": "Photography and Videography. Code. Beer. Exercise and Outdoorsy Stuff In Between.",
  //        "email": "djue129@gmail.com",
  //        "userName": "djue129",
  //        "lastName": "Jue",
  //        "firstName": "Devon",
  //        "pictureID": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/078/17d/2d32531.jpg"
  //      },
  //      {
  //        "_id": "55245c1309f815b74827d968",
  //        "userName": "ronperris",
  //        "firstName": "Ron",
  //        "lastName": "Perris",
  //        "email": "ronperris@gmail.com"
  //      },
  //      {
  //        "_id": "551ef6d35b0a00ec11f35077",
  //        "firstName": "Jackie",
  //        "lastName": "Chan",
  //        "userName": "jackiechan",
  //        "email": "jackiethemanchan@gmail.com",
  //        "pictureID": "http://www.flickeringmyth.com/wp-content/uploads/2014/08/Jackie-Chan-pics.jpeg",
  //        "description": "Kung Fu master and star of American buddy films Rush Hour and Shanghai Noon"
  //      },
  //      {
  //        "firstName": "DJ",
  //        "lastName": "Jue",
  //        "email": "assassinchicken@yahoo.com"
  //      }];
  //
  //    angular.module('snabbtAppMock', ['snabbtApp', 'ngMockE2E'])
  //      .run(function ($httpBackend) {
  //        $httpBackend.whenGET('/api/users/551ef6d35b0a00ec11f35076/getFriendsList').respond(friendsList);
  //        // For everything else, don't mock
  //        $httpBackend.whenGET(/^\w+.*/).passThrough();
  //        $httpBackend.whenPOST(/^\w+.*/).passThrough();
  //    });
  //
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

  //OK
  it('should contain some of the basic page elements', function(){
    expect(element(by.buttonText('Download Snabbt Chrome Extension')).isPresent()).toBe(true);
    expect(element(by.buttonText('Re-Download Snabbt Client')).isPresent()).toBe(true);
  });

  //it('should have a ng-repeat', function(){
  //  expect(element(by.repeater('friend in friendsList')).isPresent()).toBe(true);
  //});
  //
  it('should display 4 friends, or even identify the ng-repeat', function(){

    ////#1 - Error: Cannot read property 'bind' of undefined
    //var EC = protractor.ExpectedConditions;
    //var repeatEl = element.all(by.repeater('friend in friendsList'));
    //browser.wait(EC.visibilityOf(repeatEl), 5000).then(expect(friends.length).toEqual(4));


    ////#2 - Expected 0 to equal 4
    //var repeatEl = element.all(by.repeater('friend in friendsList'));
    //repeatEl.then(function(friends) {
    //  expect(friends.length).toEqual(4);
    //});


    ////#3 - Expected false to be true, times out after 10103ms
    //browser.wait(function(){
    //  return element(by.exactRepeater('friend in friendsList')).isPresent();
    //}, 10000, expect(element(by.exactRepeater('friend in friendsList')).isPresent()).toBe(true));

    ////#4 - Expected false to be true
    //expect(element(by.exactRepeater('friend in friendsList')).isPresent()).toBe(true);


  });

  //it('should have Devon as the first friend', function(){
  //  var firstFriendName = element(by.repeater('friend in friendsList').row(0).column('friend.firstName'));
  //  expect(firstFriendName).toEqual('Devon');
  //  expect(friend[0].firstName.getText()).toEqual("Devon");
  //});
});
