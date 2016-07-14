'use strict';

var request = require('request');

var sendLink = function (link) {

    var data = {
        text: link
    };

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
    });
}

module.exports = sendLink;