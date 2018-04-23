const request = require('request');
const path = require('path');

let url = 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH&tsyms=GBP';

request({
    url: url,
    json: true
}, (error, res, body) => {
    console.log(body.BTC.GBP);
});
