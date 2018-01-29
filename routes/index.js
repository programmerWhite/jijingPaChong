var express = require('express');
var router = express.Router();
var jiJingManage = require('./manageJiJingData/manageJiJingData');


var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res, next) {
    var jiJingObj = new jiJingManage();
    jiJingObj.getJiJingListData();
});

module.exports = router;
