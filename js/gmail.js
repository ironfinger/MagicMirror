const request = require('request');


/*
const express = require('express');
const request = require('request');
const path = require('path');

const app = express();


let url = 'https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=GBP';
let key = '';

// respond with a hello world when a get request is made to the homepage.
app.get('/', (req, res) => {
    /*
    var appBody;
    request(url, {json: true}, (err, res, body) => {
        if (err) {
            console.log(err);
        }
        var json = JSON.parse(body);
        console.log(json);
        res.json(request.json);
    })
    

   res.sendFile(path.join(__dirname+'/front/index.html'));
});

request(url, {json: true}, (err, res, body) => {
    if (err) {
        return console.log(err);
    }

    console.log(body.url);
    console.log(body);
});

app.listen(5000, () => {
    console.log('Example app listening on port 5000!')
});

/*
request('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', { json: true }, (err, res, body) => {
  if (err) { return console.log(err); }
  console.log(body.url);
  console.log(body.explanation);
});
*/
