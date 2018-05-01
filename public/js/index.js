var socket = io.connect('https://coincap.io');

socket.on('trades', (body) => {
    if (body.coin == 'BTC' || body.coin == 'BCH' || body.coin == 'ETH' || body.coin == 'LTC') {
        $(document).ready(() => {
            $(`#${body.coin}`).text(`${body.coin}: $${body.msg.price}`);
            console.log(`${body.coin}: ${body.msg.price}`);
        });
    }
});