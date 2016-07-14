'use strict';

var request = require('request');

var sendLink = function (link, fn) {

    var data = {
        text: link
    };
    console.log('Sending to SLACK');
    request({
        method: 'POST',
        uri: 'https://hooks.slack.com/services/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',
        json: true,
        body: data
    }, function callback(err, res, body) {
        if (err) {
            console.log(err);
            return;
        }
        console.log('Sent to SLACK');
        fn();
    });
}

module.exports = sendLink;
