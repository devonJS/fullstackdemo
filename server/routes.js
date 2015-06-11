/**
 * Main application routes
 */

'use strict';

var errors = require('./components/errors');
var ChangePasswordKey = require('./api/changePasswordKey/changePasswordKey.model');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/changePasswordKeys', require('./api/changePasswordKey'));
  app.use('/api/quickusers', require('./api/quickuser'));
  app.use('/api/transfergrave', require('./api/transferGrave'));
  app.use('/api/transfers', require('./api/transfer'));
  app.use('/api/mandrill', require('./api/mandrill'));
  app.use('/api/things', require('./api/thing'));
  app.use('/api/users', require('./api/user'));

  app.use('/auth', require('./auth'));

  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendfile(app.get('appPath') + '/index.html');
    });
};
