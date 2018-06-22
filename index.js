var express = require('express');
var app = express();

app.get('/test',function (req, res) {
   res.sendFile("./browser/game.html", {root:__dirname});
});

app.get('/game',function (req, res) {
    res.sendFile("./dist/browser/bundle.js", {root:__dirname});
});

app.get('/stats',function (req, res) {
    res.sendFile("./browser/stats.js", {root:__dirname});
});

app.listen(8082);