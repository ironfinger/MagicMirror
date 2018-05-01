const path = require('path');
const hbs = require('hbs');
const request = require('request');

const express = require('express');
const app = express();
const http = require('http').Server(app);
var io = require('socket.io')(http);

// Server setup:
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

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

// Middleware:
app.use(express.static(__dirname + '/public'));

app.use(express.static(__dirname + '/node_modules'));

app.use((req, res, next) => { // Time.
    // Time
    next();
});

app.use((req, res, next) => { // Google maps location.
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

app.use((req, res, next) => { // Dark Sky Weather API.
    let key = '668bf60cf034c2c299111995b6d32d81';
    let lat = '51';
    let lng = '0';

    console.log(`Retrieved lat and lng = (${data.lat},${data.lng})`);

    request({
        url: `https://api.darksky.net/forecast/${key}/${lat},${lng}?units=auto`,
        json: true
    }, (error, res, body) => {
        console.log(`Body of req: ${body}`);

        data.temp = body.currently.temperature
        console.log(`Pulled temp: ${data.temp}`);
        console.log('Temperature is now assigned');
    });
    console.log(`Value of temp: ${data.temp}`);
    next();
});


app.use((req, res, next) => { // Crypto Information.
    let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH&tsyms=GBP';
    request({
        url: url,
        json: true
    }, (error, res, body) => {
        data.BTC = body.BTC.GBP;
        data.ETH = body.ETH.GBP;
        data.LTC = body.LTC.GBP;
        data.DASH = body.LTC.GBP;
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

// Functions:
const time = () => {
    var d = new Date();
    
    var hours = `${d.getHours()}`;
    var min = `${d.getMinutes()}`;

    if (hours.length < 2) {
        hours = `0${hours}`;
    }

    if (min.length < 2) {
        min = `0${d.getMinutes}`;
    }

    return `${hours}:${min}`;
}

// Routes:
app.get('/', (req, res) => {
    res.render('main.hbs', {
        time: time,
        temperature: data.temp,
        btc: data.BTC,
        eth: data.ETH,
        ltc: data.LTC,
        dash: data.DASH
    });
});

// Sockets:
io.on('connection', () => {
    console.log('a user connected');
});

http.listen(3000, () => {
    console.log('listening on *:3000');
});