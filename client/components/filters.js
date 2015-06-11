/**
 * Created by Devon on 4/6/2015.
 */
'use strict';
angular.module('snabbtApp')
    .filter("parenthesis", function(){
        return function(userName){
            var parenthesisUser = "";
            if(!userName){
              return userName;
            }
            else{
              for(var i=0;i < userName.length; i++){
                if(i === 0){
                  parenthesisUser += "(" + userName[i];
                }
                else if(i === userName.length - 1){
                  parenthesisUser = parenthesisUser + userName[i] + ")";
                }
                else{
                  parenthesisUser += userName[i];
                }
              }
              return parenthesisUser;
            }
        };
    });
