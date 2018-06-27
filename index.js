var express = require('express');
var app = express();

app.all('*',function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    // res.header("Access-Control-Allow-Headers", "X-Requested-With");
    // res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
    // res.header("X-Powered-By",' 3.2.1');
    // res.header("Content-Type", "application/html;charset=utf-8");
    next();
});

app.get('/test',function (req, res) {
   res.sendFile("./browser/game.html", {root:__dirname});
});

app.get('/game',function (req, res) {
    res.sendFile("./dist/browser/bundle.js", {root:__dirname});
});

app.get('/stats',function (req, res) {
    res.sendFile("./browser/stats.js", {root:__dirname});
});

app.get('/moonmap',function (req, res) {
    res.sendFile("./res/moonmap.bmp", {root:__dirname});
});

app.listen(8082);