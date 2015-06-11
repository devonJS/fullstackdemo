///**
// * Created by Devon on 3/30/2015.
// */

'use strict';
describe ('sign-up form', function(){

  beforeEach(function(){
    browser.get('/signup')
  });

  it('should redirect to /signup when location is /signup', function(){
    expect(browser.getLocationAbsUrl()).toMatch("/signup");
  });

  it('should show input field to first name, last name, user name, email and password', function () {
    expect(element(by.model('user.firstName')).isPresent()).toBe(true);
    expect(element(by.model('user.lastName')).isPresent()).toBe(true);
    expect(element(by.model('user.userName')).isPresent()).toBe(true);
    expect(element(by.model('user.email')).isPresent()).toBe(true);
    expect(element(by.model('user.password')).isPresent()).toBe(true);
    expect(element(by.css('.help-block')).isPresent()).toBe(true);
    expect(element(by.css('.btn')).isPresent()).toBe(true);
  });

  it('should show sign-up successful alert ONLY when form is validated and submitted, not only with submit', function(){
    element(by.css('.btn-login')).click().then(function(){
      expect(element(by.css('.alert')).isDisplayed()).toBeFalsy();
    });
  });

  it('should not authenticate if password field is too short and posts text telling user to fix it', function(){
    var email = element(by.model('user.email'));
    var password = element(by.model('user.password'));
    email.sendKeys('admin@app.com');
    password.sendKeys('1234');

    element(by.css('.btn-login')).click().then(function(){
      expect(element(by.css('.passwordHelp')).isDisplayed()).toBeTruthy();
    });
  });
});
