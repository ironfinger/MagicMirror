const express = require('express');
const path = require('path');
const hbs = require('hbs');
const request = require('request');

const app = express();

// Server setup:
var data = {
    temp: null
};

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let key = '668bf60cf034c2c299111995b6d32d81';
    let lat = '51';
    let lng = '0';

    request({
        url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
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

app.get('/', (req, res) => {
    res.render('main.hbs', {
        temperature: data.temp
    });
});

app.listen(3000, () => console.log("App running on port 3000"));