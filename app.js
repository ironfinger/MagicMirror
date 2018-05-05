const path = require('path'); // Access paths.
const hbs = require('hbs'); // Templating engine.
const request = require('request'); // Make http requests.
const express = require('express'); // Import server library.
const app = express(); // Initiate express app.
const http = require('http').Server(app); // Enable http.
const io = require('socket.io')(http); // Get socket.io.
const port = process.env.PORT || 3000; // Heroku port Environment OR port 3000.

var data = {
    // Weather, time and location:
    temp: null,
    lat: null,
    lng: null,
    place: encodeURIComponent('London'),
    // Crypto:
    BTC: null,
    ETH: null,
    DASH: null,
    LTC: null
};

hbs.registerPartials(__dirname + '/views/partials'); // Setup hbs.

// Middleware:
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use((req, res, next) => { // Google maps location for weather, only needed once.
    let key = 'AIzaSyB2g-IAb-RKCIO5vsMK5AQMzU7xnvPMHkA';

    request({
        url: `https://maps.googleapis.com/maps/api/geocode/json?address=${data.place}&key=${key}`,
        json: true
    }, (error, res, body) => {
        data.lat = body.results[0].geometry.location.lat;
        data.lng = body.results[0].geometry.location.lng;
    });
    next();
});
app.use((req, res, next) => { // News.
    let url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8d72934b72c44fd897d6e2d2c51862c5';

    request({
        url: url,
        json: true
    }, (error, res, body) => {
        console.log(body.articles[0].title);
    });

    next();
});

// Routes:
app.get('/', (req, res) => {
    res.render('main.hbs', {
        time: time,
        temperature: `${data.temp} C`,
        btc: data.BTC,
        eth: data.ETH,
        ltc: data.LTC,
        dash: data.DASH
    });
});

// Sockets:
io.on('connection', (socket) => {
    console.log('a user conected');

    setInterval(() => {
        let key = '668bf60cf034c2c299111995b6d32d81';
        let lat = '51';
        let lng = '0';

        var weatherData = {
            current: null,
            day01: null,
            day02: null,
            day03: null, 
            day04: null
        }

        request({
            url: `https://api.darksky.net/forecast/${key}/${lat},${lng}?units=auto`,
            json: true
        }, (error, res, body) => {
            if (!error) {
                weatherData.current = body.currently.temperature;
                weatherData.day01 = body.daily.data[0].temperatureMin;
                weatherData.day02 = body.daily.data[1].temperatureMin;
                weatherData.day03 = body.daily.data[2].temperatureMin;
                weatherData.day04 = body.daily.data[3].temperatureMin;

                socket.emit('weather', weatherData);
            } else {
                console.log(error);
            }
        })
    }, 60000);
});

http.listen(port, () => {
    console.log(`listening on *:${port}`);
});
