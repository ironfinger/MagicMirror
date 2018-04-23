const request = require('request');

var data = [];

request({
    url: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=8d72934b72c44fd897d6e2d2c51862c5`,
    json: true
}, (err, res, body) => {
    console.log(body);
    indexData(body);
});

function indexData(body) {
    for (let i = 0; i < body.length; i++) {
        
    }
}