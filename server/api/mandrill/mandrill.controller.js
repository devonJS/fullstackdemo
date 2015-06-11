'use strict';

var mandrill = require('mandrill-api/mandrill');
var mandrill_client = new mandrill.Mandrill('NsjIy-ecVE1Kpkz52jY7EQ');

exports.sendConnectRequestEmail = function(req,res){

  var message = {
    "html":
    "<h1 style='text-align: center'>Snabbt</h1> " +
    "<h3 style='text-align: center'>" + req.body.senderFirstName + " has started a file transfer with you</h3><br>" +
    "<div style='text-align: center'><a style='background: #3498db;color: #ffffff;font-size: 21px; padding: 10px 20px 10px 20px;text-decoration: none;' href='http://localhost:9000/login'>Click Here to Login</a></div>",
    "text": "",
    "subject": "Snabbt: " + req.body.senderFirstName + " Wants To Transfer a File To You",
    "from_email": "devon@snabbt.com",
    "from_name": req.body.senderFirstName,
    "to": [{
      "email": req.body.receiverEmail,
      "name": req.body.receiverFirstName,
      "type": "to"
    }],
    "headers": {
      "Reply-To": "header@reply-to.com"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "message.bcc_address@example.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp",
    "global_merge_vars": [],
    "merge_vars": [],
    "tags": [
      "connection request emails"
    ],
    "subaccount": "snabbtrunner",
    "google_analytics_domains": [
      "example.com"
    ],
    "google_analytics_campaign": "",
    "metadata": {
      "website": ""
    },
    "recipient_metadata": [{
      "rcpt": "",
      "values": {
        "user_id": 0
      }
    }],
    "attachments": [],
    "images": []
  };
  var async = false;
  var ip_pool = "";
  var send_at = "";
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
    res.send(result);
    /*
     [{
     "email": "recipient.email@example.com",
     "status": "sent",
     "reject_reason": "hard-bounce",
     "_id": "abc123abc123abc123abc123abc123"
     }]
     */
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    res.send('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
};

exports.sendChangePasswordEmail = function(req, res){
  var message = {
    "html":
    "<h1 style='text-align: center'>Snabbt</h1> " +
    "<h3 style='text-align: center'>" + req.body.firstName + ", you've seemed to forgot your password</h3><br>" +
    "<div style='text-align: center'><a style='background: #3498db;color: #ffffff;font-size: 21px; padding: 10px 20px 10px 20px;text-decoration: none;' href=" + 'http://localhost:9000/changepasswordemail/' + req.body.key + ">Click Here to Reset Your Password</a></div>",
    "text": "",
    "subject": "Snabbt: Password Recovery",
    "from_email": "devon@snabbt.com",
    "from_name": "Snabbt Services",
    "to": [{
      "email": req.body.email,
      "name": req.body.firstName,
      "type": "to"
    }],
    "headers": {
      "Reply-To": "header@reply-to.com"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "message.bcc_address@example.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp",
    "global_merge_vars": [],
    "merge_vars": [],
    "tags": [
      "connection request emails"
    ],
    "subaccount": "snabbtrunner",
    "google_analytics_domains": [
      "example.com"
    ],
    "google_analytics_campaign": "",
    "metadata": {
      "website": ""
    },
    "recipient_metadata": [{
      "rcpt": "",
      "values": {
        "user_id": 0
      }
    }],
    "attachments": [],
    "images": []
  };
  var async = false;
  var ip_pool = "";
  var send_at = "";
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
    res.send(result);
    /*
     [{
     "email": "recipient.email@example.com",
     "status": "sent",
     "reject_reason": "hard-bounce",
     "_id": "abc123abc123abc123abc123abc123"
     }]
     */
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    res.send('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
};


exports.sendSignUpConfirmation = function(req, res){
  var message = {
    "html":
    "<h1 style='text-align: center'>Snabbt</h1> " +
    "<h3 style='text-align: center'> Congratulations " + req.body.firstName + ", you've succesfully signed up</h3><br>" +
    "<div style='text-align: center'><a style='background: #3498db;color: #ffffff;font-size: 21px; padding: 10px 20px 10px 20px;text-decoration: none;' href='http://localhost:9000/login/'>Click Here to Login</a></div><br>" +
    "<h6 style='text-align: center'>If you received this email by error, please contact support@snabbt.com</h6>",
    "text": "",
    "subject": "Snabbt: Sign-Up Successful!",
    "from_email": "devon@snabbt.com",
    "from_name": "Snabbt Services",
    "to": [{
      "email": req.body.email,
      "name": req.body.firstName,
      "type": "to"
    }],
    "headers": {
      "Reply-To": "header@reply-to.com"
    },
    "important": false,
    "track_opens": null,
    "track_clicks": null,
    "auto_text": null,
    "auto_html": null,
    "inline_css": null,
    "url_strip_qs": null,
    "preserve_recipients": null,
    "view_content_link": null,
    "bcc_address": "message.bcc_address@example.com",
    "tracking_domain": null,
    "signing_domain": null,
    "return_path_domain": null,
    "merge": true,
    "merge_language": "mailchimp",
    "global_merge_vars": [],
    "merge_vars": [],
    "tags": [
      "connection request emails"
    ],
    "subaccount": "snabbtrunner",
    "google_analytics_domains": [
      "example.com"
    ],
    "google_analytics_campaign": "",
    "metadata": {
      "website": ""
    },
    "recipient_metadata": [{
      "rcpt": "",
      "values": {
        "user_id": 0
      }
    }],
    "attachments": [],
    "images": []
  };
  var async = false;
  var ip_pool = "";
  var send_at = "";
  mandrill_client.messages.send({"message": message, "async": async, "ip_pool": ip_pool, "send_at": send_at}, function(result) {
    res.send(result);
    /*
     [{
     "email": "recipient.email@example.com",
     "status": "sent",
     "reject_reason": "hard-bounce",
     "_id": "abc123abc123abc123abc123abc123"
     }]
     */
  }, function(e) {
    // Mandrill returns the error as an object with name and message keys
    res.send('A mandrill error occurred: ' + e.name + ' - ' + e.message);
    // A mandrill error occurred: Unknown_Subaccount - No subaccount exists with the id 'customer-123'
  });
};

function handleError(res, err) {
  return res.send(500, err);
}
