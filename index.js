'use strict';

var lib = require('./lib');
lib.lights.announcePicture()
    .then(function () {
        lib.camera.start(function (err) {
            if (err) {
                console.log('ERROR', err);
                lib.lights.announceFailure();
                return;
            }
            lib.fileUpload.upload('/tmp/selfie.gif', function (err, data) {
                if (err) {
                    lib.lights.announceFailure();
                    console.log('ERROR', err);
                    return;
                }

                lib.lights.announceSuccess()
                    .then(function () {
                        console.log('DONE');                            
                    });
            });
        });
    });
