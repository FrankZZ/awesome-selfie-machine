'use strict';


var fs = require('fs');
var AWS = require('aws-sdk');

AWS.config.loadFromPath('./config/aws.json');
AWS.config.bucket = 'awesomeselfiemachine';
AWS.config.uploadKeyPrefix = 'uploads/';

function upload(filename) {
    var body = fs.createReadStream(filename);
    var s3obj = new AWS.S3({params: {Bucket: AWS.config.bucket, Key: AWS.config.uploadKeyPrefix + filename}});
    s3obj.upload({Body: body}).
    on('httpUploadProgress', function(evt) {
        console.log(evt);
    }).
    send(function(err, data) {
        console.log(err, data)
    });
}

upload('images/breakfast.jpg');


// module.exports = upload;