//audio.play();

var socket = io.connect('https://coincap.io'); // Cryptocurrency Socket.
var prices = {
    btc: null,
    bch: null,
    eth: null,
    ltc: null
};
var alertON = null;
var audio = new Audio('/audio/sound.mp3');
socket.on('trades', (body) => {
    if (body.coin == 'BTC' || body.coin == 'BCH' || body.coin == 'ETH' || body.coin == 'LTC') {
        $(document).ready(() => {
            $(`#${body.coin}`).text(`$${Math.round(body.msg.price * 100) / 100}`);
            console.log(`${body.coin}: ${body.msg.price}`);
            /*
            if (body.coin == 'BTC') {
                if (alertON == true) {
                    // audio.play();
                }
            }else if (body.coin == 'BCH') {
                
            }else if (body.coin == 'ETH') {
                
            }else if (body.coin == 'LTC') {
                
            }*/
        });               
    }
});

socket.on('trades', (body) => { 
    console.log(body);
});

$(document).ready(() => {
    $('#alert-button').click(() => {
        if (alertON == true) {
            alertON == false;
        }else if (alertON == false) {
            alertON == true;
        }else if (alertON == null) {
            alertON = true;
        }
    });
});

// MARK: Real-time Time.
setInterval(() => {
    $(document).ready(() => {
        var d = new Date();
        
        var hours = `${d.getHours()}`;
        var min = `${d.getMinutes()}`;
        
        if (hours.length < 2) {
            hours = `0${hours}`;
        }
        
        if (min.length < 2) {
            min = `0${min}`;
        }
        
        $('.Time').text(`${hours}:${min}`)
    });
});

// MARK: Realtime Weather.
var io = io(); // Server Sockets.

io.on('weather', (body) => {
    console.log(body);
});