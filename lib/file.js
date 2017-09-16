'use strict';

var uuid = require('uuid');
var fs = require('fs');
var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';
// AWS.config.loadFromPath('./config/aws.json');
AWS.config.bucket = 'awesomeselfiemachine';
AWS.config.uploadKeyPrefix = 'uploads/';

var s3 = new AWS.S3();

function upload(filename, fn) {
    var newFileName = new Date.toISOString() + '.gif';
    exec('mv /tmp/selfie.gif /var/www/html/selfie/' + newFileName, function(err, out, code) {
        console.log('Moved /tmp/selfie.gif to /var/www/html/selfie/' + newFileName);
        fn();
        return;
    });
}

module.exports.upload = upload;
