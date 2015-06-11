/**
 * Created by Devon on 5/4/2015.
 */
"use strict";

describe('settings page to change password while logged in', function() {
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

  it('should go to settings page on navbar click', function() {
    element(by.css('#settings')).click().then(function(){
      expect(browser.getLocationAbsUrl()).toMatch('/settings');
    });
  });

  it('should have two input fields', function() {
    expect(element(by.model('user.oldPassword')).isPresent()).toBe(true);
    expect(element(by.model('user.newPassword')).isPresent()).toBe(true);
  });

  it('should show error upon entering new password less than  6 characters', function() {
    var currentPassword = element(by.model('user.oldPassword'));
    var newPassword = element(by.model('user.newPassword'));

    currentPassword.sendKeys("cookies");
    newPassword.sendKeys('12345');

    element(by.css('.submitButton')).click().then(function(){
      expect(element(by.css('.minPasswordLengthError')).isDisplayed()).toBeTruthy();
    });
  });

  it('should show error upon entering wrong current password', function() {
    var currentPassword = element(by.model('user.oldPassword'));
    var newPassword = element(by.model('user.newPassword'));

    currentPassword.sendKeys("coffee");
    newPassword.sendKeys('1234567');

    element(by.css('.submitButton')).click().then(function(){
      expect(element(by.css('.wrongPassword')).isDisplayed()).toBeTruthy();
    });
  });
});
