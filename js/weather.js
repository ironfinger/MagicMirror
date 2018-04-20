const request = require('request');
const path = require('path');
const $ = require('jquery');

const darkSkyReq = (lat, lng) => {
    let key = '668bf60cf034c2c299111995b6d32d81';

    request({
        url: `https://api.darksky.net/forecast/${key}/${lat},${lng}`,
        json: true
    }, (error, res, body) => {
        console.log(body);
    })
}

var place = encodeURIComponent('London');

// Google:
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${place}`,
    json: true
  }, (error, response, body) => {
    console.log(`Address: ${body.results[0].formatted_address}`);
    console.log(`Latitude: ${body.results[0].geometry.location.lat}`);
    console.log(`Longitude: ${body.results[0].geometry.location.lng}`);

    var lat = body.results[0].geometry.location.lat;
    var lng = body.results[0].geometry.location.lng;


  });