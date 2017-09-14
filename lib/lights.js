const Milight = require('node-milight-promise').MilightController;
const commands = require('node-milight-promise').commands2;

const light = new Milight({
    ip: "192.168.2.255",
    delayBetweenCommands: 75,
    commandRepeat: 2
});

const zone = 1;

function flashPicture() {
    console.log('Starting flashPicture');
    light.sendCommands(commands.rgbw.whiteMode(zone), commands.rgbw.brightness(100));
    light.pause(2000);
    light.sendCommands(commands.rgbw.brightness(0));
    light.pause(1500);
    light.sendCommands(commands.rgbw.effectModeNext(zone), commands.rgbw.effectModeNext(zone), commands.rgbw.effectModeNext(zone), commands.rgbw.effectModeNext(zone), commands.rgbw.effectModeNext(zone), commands.rgbw.effectModeNext(zone), commands.rgbw.on(zone));
    light.pause(10000);
    light.sendCommands(commands.rgbw.off(zone));
    light.close().then(function () {
        console.log("All command have been executed - closing Milight");
    });
    console.log("Invocation of asynchronous Milight commands done");
}

function blinkProcessing() {
    console.log('Starting blinkProcessing');
    light.sendCommands(commands.rgbw.on(zone), commands.rgbw.rgb255(0,255,0));
    // Pulsating
    for (let x = 0; x < 5; x++) {
        light.sendCommands(commands.rgbw.brightness(10));
        light.pause(400);
        light.sendCommands(commands.rgbw.brightness(70))
        light.pause(400);    
    }    
    light.sendCommands(commands.rgbw.off(zone));
    light.close().then(function () {
        console.log("All command have been executed - closing Milight");
    });
    console.log("Invocation of asynchronous Milight commands done");
}

module.exports = {
    blinkProcessing,
    flashPicture
};
// blinkProcessing();
flashPicture();
