var socket = io.connect('https://coincap.io');

var alertON = null;
var audio = new Audio('/audio/sound.mp3');
//audio.play();

socket.on('trades', (body) => {
    if (body.coin == 'BTC' || body.coin == 'BCH' || body.coin == 'ETH' || body.coin == 'LTC') {
        $(document).ready(() => {
            $(`#${body.coin}`).text(`$${Math.round(body.msg.price * 100) / 100}`);
            console.log(`${body.coin}: ${body.msg.price}`);
            if (body.coin == 'BTC') {
                if (alertON == true) {
                    audio.play();
                }
            }
        });               
    }
});

socket.on('trades', (body) => { 
    console.log(`${body.coin}: ${body.msg.price}`);
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