const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const { Config } = require('./source/service/config');

// Cross Origin Resource Sharing
const corsOptions = {
    origin: ['https://www.yoursite.com', 'http://127.0.0.1:5500', 'http://localhost:3500'],
    optionsSuccessStatus: 200
}
app.use(cors(corsOptions));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/', express.static(path.join(__dirname, '/public')), require('./route/root'))

app.all('*', (req, res) => {
    res.status(404);
    if (req.accepts('html')) {
        res.sendFile(path.join(__dirname, 'views', '404.html'));
    } else if (req.accepts('json')) {
        res.json({ "error": "404 Not Found" });
    } else {
        res.type('txt').send("404 Not Found");
    }
});

app.listen(Config.PORT, () => console.log(`Server running on port http://${Config.HOST}:${Config.PORT}`));