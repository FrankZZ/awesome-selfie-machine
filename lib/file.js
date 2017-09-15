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
    // var body = fs.createReadStream(filename);
    // var fileKey = AWS.config.uploadKeyPrefix + uuid() + '.gif';

    // console.log('Uploading file');
    // s3.upload({
    //     Bucket: AWS.config.bucket,
    //     Key: fileKey,
    //     ContentType: 'image/jpeg',
    //     Body: body
    // }, fn);
    fn();
    return;
}

//upload('images/breakfast.jpg');
module.exports.upload = upload;
