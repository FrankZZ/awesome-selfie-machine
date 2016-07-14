'use strict';

var lib = require('./lib');
lib.slack('Taking an *AwesomeSelfie* in 3 seconds!', function () {
    setTimeout(function () {
        lib.slack(':D Cheese! :D', function () {
            lib.camera.start(function (err) {
                if (err) {
                    console.log('ERROR', err);
                    return;
                }
                lib.fileUpload.upload('/tmp/selfie.gif', function (err, data) {
                    if (err) {
                        console.log('ERROR', err);
                        return;
                    }
                    lib.slack('Oh my god, it\'s *Awesome*! \nhttp://awesomeselfiemachine.s3-website-eu-west-1.amazonaws.com/' + data.key, function () {
                        console.log('DONE');
                    });
                });
            });
        });
    }, 3000);
});
