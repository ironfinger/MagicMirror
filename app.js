const express = require('express');
const path = require('path');

// Create Express app:
const app = express();

// dependancies:
app.use(express.static('css'));

// Route GET request: 
app.get('/', (req, res) => {
    //res.send('Magic Mirror');
    res.sendFile(path.join(__dirname+'/index.html'));
});

app.listen(3000, () => {
    console.log('Magic Mirror listening on part 3000!');
});