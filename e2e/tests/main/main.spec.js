'use strict';

describe('Main View', function() {
  var page;

  beforeEach(function() {
    browser.get('/');
    page = require('./main.po.js');
  });

  it('should include jumbotron with correct data', function() {
    expect(page.h1El.getText()).toBe('Snabbt');
    expect(page.pEl.getText()).toBe('High Speed File Transfer');
    //expect(page.imgEl.getAttribute('src')).toMatch(/assets\/images\/yeoman.png$/);
    //expect(page.imgEl.getAttribute('alt')).toBe('I\'m Yeoman');
  });
});
