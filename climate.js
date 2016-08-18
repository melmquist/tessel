var tessel = require('tessel');
var climatelib = require('climate-si7020');
var climate = climatelib.use(tessel.port['A']);

climate.on('ready', function() {

setInterval(function() {
      climate.readTemperature('f', function (err, temp) {
        console.log(temp);

        if (temp > 90) {
          console.log("Oh no! It's getting hot...");
        }
      });
  }, 1000);
});