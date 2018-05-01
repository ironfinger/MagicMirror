var socket = io.connect('https://coincap.io');

socket.on('trades', (body) => {
    console.log(body);
});