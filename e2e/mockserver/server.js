/**
 * Created by Devon on 4/30/2015.
 */
//'use strict';
//
//exports.snabbtAppMock = function () {
//  angular.module('snabbtAppMock', ['snabbtApp', 'ngMockE2E'])
//    .run(function ($httpBackend) {
//      $httpBackend.whenPOST('/auth/local').passThrough();
//
//      $httpBackend.whenGET('/api/users/me').respond({
//        "_id": {
//          "$oid": "551ef6d35b0a00ec11f35076"
//        },
//        "firstName": "Joe",
//        "lastName": "Schmo",
//        "provider": "local",
//        "email": "jschmo@gmail.com",
//        "userName": "jschmomeister",
//        "hashedPassword": "dONStOxc7adug5WsQEqqzaD8qyYBY0z3JlQBmrvSsuJJ+uQvgnIPMwWNTYx0Z2wkpWhVxXPc4CpkCI3dag26Mg==",
//        "salt": "CiyLFkBvenBGWcoUPXX6+Q==",
//        "sendingBadgeCount": 0,
//        "receivingBadgeCount": 0,
//        "pictureID": "https://pmcvariety.files.wordpress.com/2013/01/6a00d8341bfc7553ef017c355fa15e970b-pi.jpg",
//        "description": "Avid McDonalds and That 70's Show Fan",
//        "friendsList": [
//          {
//            "_id": "551ef6d35b0a00ec11f35075",
//            "description": "Photography and Videography. Code. Beer. Exercise and Outdoorsy Stuff In Between.",
//            "email": "djue129@gmail.com",
//            "userName": "djue129",
//            "lastName": "Jue",
//            "firstName": "Devon",
//            "pictureID": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/078/17d/2d32531.jpg"
//          },
//          {
//            "_id": "55245c1309f815b74827d968",
//            "userName": "ronperris",
//            "firstName": "Ron",
//            "lastName": "Perris",
//            "email": "ronperris@gmail.com"
//          },
//          {
//            "_id": "551ef6d35b0a00ec11f35077",
//            "firstName": "Jackie",
//            "lastName": "Chan",
//            "userName": "jackiechan",
//            "email": "jackiethemanchan@gmail.com",
//            "pictureID": "http://www.flickeringmyth.com/wp-content/uploads/2014/08/Jackie-Chan-pics.jpeg",
//            "description": "Kung Fu master and star of American buddy films Rush Hour and Shanghai Noon"
//          },
//          {
//            "firstName": "DJ",
//            "lastName": "Jue",
//            "email": "assassinchicken@yahoo.com"
//          }
//        ],
//        "role": "user",
//        "__v": 4
//      });
//
//      $httpBackend.whenGET('/api/users/551ef6d35b0a00ec11f35076/getFriendsList').respond([
//          {
//            "_id": "551ef6d35b0a00ec11f35075",
//            "description": "Photography and Videography. Code. Beer. Exercise and Outdoorsy Stuff In Between.",
//            "email": "djue129@gmail.com",
//            "userName": "djue129",
//            "lastName": "Jue",
//            "firstName": "Devon",
//            "pictureID": "https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/5/005/078/17d/2d32531.jpg"
//          },
//          {
//            "_id": "55245c1309f815b74827d968",
//            "userName": "ronperris",
//            "firstName": "Ron",
//            "lastName": "Perris",
//            "email": "ronperris@gmail.com"
//          },
//          {
//            "_id": "551ef6d35b0a00ec11f35077",
//            "firstName": "Jackie",
//            "lastName": "Chan",
//            "userName": "jackiechan",
//            "email": "jackiethemanchan@gmail.com",
//            "pictureID": "http://www.flickeringmyth.com/wp-content/uploads/2014/08/Jackie-Chan-pics.jpeg",
//            "description": "Kung Fu master and star of American buddy films Rush Hour and Shanghai Noon"
//          },
//          {
//            "firstName": "DJ",
//            "lastName": "Jue",
//            "email": "assassinchicken@yahoo.com"
//          }]
//      );
//
//      // For everything else, don't mock
//      $httpBackend.whenGET(/^\w+.*/).passThrough();
//      $httpBackend.whenPOST(/^\w+.*/).passThrough();
//
//      console.log("Mock Finished");
//  });
//};
