/**
 * Created by Devon on 5/4/2015.
 */
"use strict";

describe('the forgot password page', function() {
  it('should start be accessible through the login page', function() {
    browser.get('/login');
    element(by.css('#forgotPassword')).click().then(function(){
      expect(browser.getLocationAbsUrl()).toMatch('/forgotpassword');
    });
  });

  it('should have one input field', function() {
    expect(element(by.model("accountEmail")).isPresent()).toBe(true);
  });

  it('should display an error with invalid email', function() {
    var emailInput = element(by.model("accountEmail"));
    emailInput.sendKeys('testInvalidEmail');
    element(by.css('.submitButton')).click().then(function() {
      expect(element(by.css('.invalidEmail')).isDisplayed()).toBeTruthy();
    });
  });

  it('should display a success with a valid email', function() {
    var emailInput = element(by.model("accountEmail"));
    emailInput.sendKeys('valid@email.com');
    element(by.css('.submitButton')).click().then(function() {
      expect(element(by.css('.alert-success')).isDisplayed()).toBeTruthy();
    });
  })
});
