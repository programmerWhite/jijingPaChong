var express = require('express');
var router = express.Router();
var jiJingManage = require('./manageJiJingData/manageJiJingData');


var request = require('request');
var cheerio = require('cheerio');
/* GET home page. */
router.get('/', function(req, res, next) {
    var jiJingObj = new jiJingManage();
    jiJingObj.getJiJingListData();
    /* GET users listing. */
    //var jiJingArray = [];
    //request('http://fund.eastmoney.com/f10/FundArchivesDatas.aspx?type=jjcc&code=161725&topline=20&year=&month=&rt=0.3509313181292837',
    //    function(error, response, body) {
    //        if (!error && response.statusCode == 200) {
    //            $ = cheerio.load(body,{decodeEntities: false});
    //            $('.boxitem table').each(function(index1){
    //                if(index1 == 0){
    //                    var dom = $(this);
    //                    dom.find('tbody tr').each(function(){
    //                        var dom1 = $(this);
    //                        var jiJingObj = {};
    //                        dom1.find('td').each(function (index) {
    //                            if(index == 1){
    //                                jiJingObj.guPiaoId  = $(this).text();
    //                            }else if(index == 2){
    //                                jiJingObj.guPiaoName  = $(this).text();
    //                            }else if(index == 6){
    //                                jiJingObj.guPiaoRate  = $(this).text();
    //                            }else if(index == 7){
    //                                jiJingObj.guPiaoNumber  = $(this).text().replace(/,/g,'');
    //                            } else if(index == 8){
    //                                jiJingObj.guPiaoMoney  = $(this).text().replace(/,/g,'');
    //                            }
    //                        });
    //                        jiJingArray.push(jiJingObj);
    //                    });
    //                }
    //
    //            });
    //            console.log(jiJingArray)
    //
    //            res.render('index',{title:$.html()});
    //        }
    //    });
});

module.exports = router;
