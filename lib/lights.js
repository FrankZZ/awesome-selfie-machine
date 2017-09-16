var Milight = require('node-milight-promise').MilightController;
var commands = require('node-milight-promise').commands2;

var light = new Milight({
    ip: "192.168.1.255",
    delayBetweenCommands: 75,
    commandRepeat: 2
});
var processing = false;
var zone = 3;

function announcePicture() {
    console.log('Starting announcePicture');
    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.brightness(0));
    
    light.sendCommands(commands.rgbw.rgb255(255,0,0));
    light.sendCommands(commands.rgbw.brightness(100));
    light.pause(400);
    light.sendCommands(commands.rgbw.brightness(0))
    light.pause(400);
    
    light.sendCommands(commands.rgbw.rgb255(255,204,0));
    light.sendCommands(commands.rgbw.brightness(100));
    light.pause(400);
    light.sendCommands(commands.rgbw.brightness(0))
    light.pause(400);
    
    light.sendCommands(commands.rgbw.rgb255(0,255,0));
    light.sendCommands(commands.rgbw.brightness(100));
    light.pause(400);
    light.sendCommands(commands.rgbw.brightness(0))
    light.pause(400);
    

    light.sendCommands(commands.rgbw.whiteMode(zone), commands.rgbw.brightness(100));
    return light.close().then(function () {
        console.log("Announced picture, light's on now. Smile!");
    });
}

function blinkProcessing() {
    processing = true;
    console.log('Starting blinkProcessing');
    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.rgb255(255,204,0));
    // Pulsating
    for (var x = 0; x < 19; x++) {
        light.sendCommands(commands.rgbw.brightness(0));
        light.pause(400);
        light.sendCommands(commands.rgbw.brightness(80))
        light.pause(400);
    }
    light.sendCommands(commands.rgbw.off(zone));
    return light.close().then(function () {
        console.log("Blinked processing!");
    });
}

function announceSuccess() {
    console.log('Announcing success!');
    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.rgb255(0,255,0), commands.rgbw.brightness(75));
    light.pause(3000);
    light.sendCommands(commands.rgbw.rgb255(255, 0, 0), commands.rgbw.brightness(0), commands.rgbw.off(zone));
    return light.close();
}

function announceFailure() {
    console.log('Announcing failre!');
    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.rgb255(0,255,0), commands.rgbw.brightness(75));
    light.pause(3000);
    light.sendCommands(commands.rgbw.rgb255(255, 0, 0), commands.rgbw.brightness(0), commands.rgbw.off(zone));
    return light.close();
}

module.exports = {
    announcePicture,
    blinkProcessing,
    announceSuccess,
    announceFailure
};
