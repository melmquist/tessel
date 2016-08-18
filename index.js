// Import the interface to Tessel hardware


var tessel = require('tessel');
var camera = require('camera-vc0706').use(tessel.port['A']);

var notificationLED = tessel.led[3];

camera.on('ready', function() {
  notificationLED.high();

  camera.takePicture(function(err, image) {
    if (err) {
      console.log('error taking image', err);
    } else {
      notificationLED.low();
      var name = 'Culprit' + Math.floor(Date.now()*1000) + '.jpg';
      console.log('Picture saving as', name, '...');
      process.sendfile(name, image);
      console.log('done.');
      camera.disable();
    }
  });
});