/**
 * Created by Devon on 4/30/2015.
 */
'use strict';
describe('login', function(){

  beforeEach(function(){
    browser.get('/login');
  });

  it('should direct to /login when the location is /login', function(){
    expect(browser.getLocationAbsUrl()).toMatch('/login');
  });

  it('should show input fields for email and password and login and register buttons, as well as seven links (some are hidden)', function(){
    expect(element(by.model('user.email')).isPresent()).toBe(true);
    expect(element(by.model('user.password')).isPresent()).toBe(true);
    expect(element(by.buttonText('Login')).isPresent()).toBe(true);
    expect(element(by.buttonText('Register')).isPresent()).toBe(true);
  });

  it('should show email and password error when nothing is entered', function(){
    element(by.css('.btn-login')).click().then(function(){
      expect(element(by.css('.emailPasswordError')).isDisplayed()).toBeTruthy();
    });
  });

  it('should show valid email error when an invalid email is entered', function(){
    var email = element(by.model('user.email'));
    email.sendKeys('testInvalidEmail');
    element(by.css('.btn-login')).click().then(function(){
      expect(element(by.css('.invalidEmailError')).isDisplayed()).toBeTruthy();
    });
  });

  it('should redirect to register page when you click the register button', function(){
    element(by.css('.btn-register')).click().then(function(){
      expect(browser.getLocationAbsUrl()).toMatch('/signup');
    });
  });

  it('should login correctly with a valid user', function(){
    var email = element(by.model('user.email'));
    var password = element(by.model('user.password'));
    email.sendKeys('jschmo@gmail.com');
    password.sendKeys('cookies');

    element(by.css('.btn-login')).click().then(function(){
      expect(browser.getLocationAbsUrl()).toMatch('/friends');
    });
  });
});
