var express = require('express');
var router = express.Router();

var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res, next) {
    /* GET users listing. */
    request('http://fund.eastmoney.com/f10/FundArchivesDatas.aspx?type=jjcc&code=002443&topline=20&year=&month=&rt=0.3509313181292837',
        function(error, response, body) {
            console.log(body)
            if (!error && response.statusCode == 200) {
                $ = cheerio.load(body);
                res.render('index',{title:$.html()});
            }
        });
});

module.exports = router;
