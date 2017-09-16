'use strict';
var exec = require('exec');

function upload(filename, fn) {
    var newFileName = new Date().toISOString() + '.gif';
    exec('mv /tmp/selfie.gif /var/www/html/selfie/' + newFileName, function(err, out, code) {
        console.log('Moved /tmp/selfie.gif to /var/www/html/selfie/' + newFileName);
        fn();
        return;
    });
}

module.exports.upload = upload;
