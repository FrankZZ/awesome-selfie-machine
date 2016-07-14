'use strict';

var exec = require('exec');
var RaspiCam = require('raspicam');
var camera = RaspiCam({
    mode: 'timelapse',
    output: '/tmp/selfie-%04d.jpg',
    encoding: 'jpg',
    timeout: 5000,
    timelapse: 300,
    height: 360,
    width: 480,
    burst: true,
    vflip: true,
    nopreview: true
});


var imageFx = [
    'none',
    //'negative',
    'solarise',
    'sketch',
    //'denoise',
    'emboss',
    'pastel',
    'oilpaint',
    //'hatch',
    //'gpen',
    'watercolour',
    //'film',
    //'blur',
    //'saturation',
    //'colourswap',
    //'washedout',
    //'posterise',
    //'colourpoint',
    //'colourbalance',
    'cartoon'
];

camera.on('read', function (file) {
    console.log('Got a shot', file);
});

var _start = function (fn) {
    exec('rm -f /tmp/selfie*', function(err, out, code) {
        if (err instanceof Error)
          throw err;

        camera.set('imxfx', imageFx[Math.floor(Math.random()*imageFx.length)]);

        camera.on('exit', function () {
            console.log('Camera timeout of ' + camera.get('t') + 's exceeded');
            console.log('Generating animated gif out of stills');
            camera.stop();
            exec('convert -layers Optimize -delay 30 /tmp/selfie-*.jpg /tmp/selfie.gif', function(err, out, code) {
                if (err instanceof Error)
                    return fn(err);

                console.log(out, code);
                console.log('Animated gif is at /tmp/selfie.gif');
                fn();
            });
        });

        camera.start();
        console.log('Starting capture');
    });
}

module.exports = {
    start: _start
};
