const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');

const app = express();

// Server setup:
var data = {
    temp: null,
    lat: null,
    lng: null,
    place: encodeURIComponent('London'),
    BTC: null,
    ETH: null,
    DASH: null,
    LTC: null
};

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
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

app.use((req, res, next) => {
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

app.use((req, res, next) => {
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

app.get('/', (req, res) => {
    res.render('main.hbs', {
        temperature: data.temp,
        btc: data.BTC,
        eth: data.ETH,
        ltc: data.LTC,
        dash: data.DASH
    });
});

app.listen(3000, () => console.log("App running on port 3000"));