'use strict';

var lib = require('./lib');
lib.slack('Taking an *AwesomeSelfie*! Just hold on...', function () {
    lib.camera.start(function (err) {
        lib.fileUpload.upload('/tmp/selfie.gif', function (err, data) {
            if (err) {
                console.log('ERROR', err);
                return;
            }
            lib.slack('http://awesomeselfiemachine.s3-website-eu-west-1.amazonaws.com/' + data.key, function () {
                console.log('DONE');
            });
        });

    });
});
