// Any copyright is dedicated to the Public Domain.
// http://creativecommons.org/publicdomain/zero/1.0/

/*********************************************
This camera example takes a picture. If a
directory is specified with the --upload-dir
flag, the picture is saved to that directory.
*********************************************/

var tessel = require('tessel');
var http = require('http');
var servolib = require('servo-pca9685');
var climatelib = require('climate-si7020');
var av = require("tessel-av");
var camera = new av.Camera({
  width: 640,
  height: 480,
});
var port = 3000;

var servo = servolib.use(tessel.port['B']);
var climate = climatelib.use(tessel.port['A']);

var servo1 = 1;

var options = {
  method : 'POST',
  host : '192.168.4.245',
  port : '3000',
  path : '/'
};

var req = http.request(options, function(res) {
 console.log('got it')
 res.setEncoding('utf8');
 res.on('data', function (body) {
   console.log('Body: ' + body);
 });
});
req.on('error', function(e) {
 console.log('problem with request: ' + e.message);
});


climate.on('ready', function() {

setInterval(function() {
        climate.readTemperature('f', function (err, temp) {
        console.log(temp);

        if (temp > 90) {

            // capture.on('data', function(data) {
            //     http.write(options, image);
            //     http.end()
            // });
            
            console.log("Oh no! It's getting hot...");
            var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

            var image = camera.capture()
            http.write(options, image)
            servo.configure(servo1, 0.05, 0.12, function () {
            setInterval(function () {
                console.log('Position (in range 0-1):', position);
                servo.move(servo1, position);
                position += 0.1;
                if (position > 1) {
                position = 0; // Reset servo position
                }             
                            
            }, 1000); // Every 500 milliseconds
            });
        }
        });
    }, 1000);
});


    
    // servo.on('ready', function () {

// setInterval(function() {
//         climate.readTemperature('f', function (err, temp) {
//         console.log(temp);

//         if (temp > 90) {
//             console.log("Oh no! It's getting hot...");
//             var position = 0;  //  Target position of the servo between 0 (min) and 1 (max).

//             servo.configure(servo1, 0.05, 0.12, function () {
//             setInterval(function () {
//                 console.log('Position (in range 0-1):', position);
//                 servo.move(servo1, position);


//                 position += 0.1;
//                 if (position > 1) {
//                 position = 0; // Reset servo position
//                 }

                
//                 camera.takePicture(function(err, image) {
//                     if (err) {
//                         console.log('error taking image', err);
//                     } else {
//                         notificationLED.low();
//                         var name = 'Culprit' + Math.floor(Date.now()*1000) + '.jpg';
//                         console.log('Picture saving as', name, '...');
//                         req.write(image);
//                         req.end();
//                         camera.disable();
//                     }      
//                  });
                            
//             }, 1000); // Every 500 milliseconds
//             });
//         }
//         });
//     }, 1000);
// });
// });
// });


// 
//   notificationLED.high();
  
// });

