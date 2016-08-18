var express = require('express');
var router = express.Router();
var twitter = require('twitter');
var util = require('util');

var Twitter = require('twitter');

var fs = require('fs')
  , options

// var request = http.get(options, function(res){
//     var imagedata = ''
//     res.setEncoding('binary')

//     res.on('data', function(chunk){
//         imagedata += chunk
//     })

//     res.on('end', function(){
//         fs.writeFile('logo.png', imagedata, 'binary', function(err){
//             if (err) throw err
//             console.log('File saved.')
//         })
//     })

// })

var client = new Twitter({
  consumer_key: '2G2JBJMZ4UdfiHdxvkuxqRQKE',
  consumer_secret: 'pbs6gq8Y8uAlgXJwwxCGt4W4c9QqiQHdzVW1rVfN93751JrBR2',
  access_token_key: '764191771492491264-wNxhIh1zpu4gsxswO6oXA3EEtFfmJRD',
  access_token_secret: 'KYooiIVH5b675h65M04J25vfBpnZ22Cm7Gvq5H03gYNOd'
});

router.post('/', function(req, res, next) {

    var writeStream = fs.createWriteStream('fireimage.png')
    req.pipe(writeStream)
    req.on('end', function(result) {
        var data = fs.readFileSync('fireimage.png');
        client.post('media/upload', {media: data}, function(error, media, response) {
            if (!error) {

                // If successful, a media object will be returned.
                console.log(media);

                // Lets tweet it
                var status = {
                status: "Temp\'s a-changin",
                media_ids: media.media_id_string // Pass the media id string
                }

                client.post('statuses/update', status, function(error, tweet, response) {
                if (!error) {
                    console.log(tweet);
                }
                });
                res.sendStatus(302)
            }
        })
    })
    
})

module.exports = router;