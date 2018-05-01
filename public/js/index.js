import request from 'request';

request({
    url: 'https://min-api.cryptocompare.com/data/pricemulti?fsyms=BTC,ETH,LTC,DASH&tsyms=GBP',
    json: true
}, (error, res, body) => {
    console.log(body);
});
