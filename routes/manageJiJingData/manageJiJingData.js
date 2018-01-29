/**
 * Created by Raintree on 2018/1/29.
 */
var request = require('request');
var cheerio = require('cheerio');

function manageJiJing(){
    this.currentListPage = 1;
}

manageJiJing.prototype.getJiJingListData = function(){
    var This = this;
    request('http://fund.eastmoney.com/data/rankhandler.aspx?' +
        'op=ph&dt=kf&ft=hh&rs=&gs=0&sc=zzf&st=desc&sd=2017-01-29&ed=2018-01-29&qdii=&tabSubtype=,,,,,&pi='+this.currentListPage+'&pn=50&dx=2&v=0.37357298103057857',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                This.dealJiJingListData(body);
                //var data = JSON.parse(body.match(/\{(.+?)\}/g));
            }
        });
};

var indexN = 0;
manageJiJing.prototype.dealJiJingListData = function(data){
    var listData = data.match(/"(.+?)"/g);
    if(!!listData){
        for(var i=0;i<listData.length;i++){
            indexN++;
            var tempData = listData[i].replace(/"/g,"");
            var tempData1 = tempData.split(',');
            console.log(tempData1[0]+"---"+tempData1[1]);
        }
        if(listData.length != 0){
            this.currentListPage++;
            this.getJiJingListData();
        }
    }else{
        console.log("over");
    }
};

manageJiJing.prototype.getGuPiaoInfo = function(jiJingCode) {
    var jiJingArray = [];
    request('http://fund.eastmoney.com/f10/FundArchivesDatas.aspx?type=jjcc&code='+jiJingCode+'&topline=20&year=&month=&rt=0.3509313181292837',
        function(error, response, body) {
            if (!error && response.statusCode == 200) {
                $ = cheerio.load(body,{decodeEntities: false});
                $('.boxitem table').each(function(index1){
                    if(index1 == 0){
                        var dom = $(this);
                        dom.find('tbody tr').each(function(){
                            var dom1 = $(this);
                            var jiJingObj = {};
                            dom1.find('td').each(function (index) {
                                if(index == 1){
                                    jiJingObj.guPiaoId  = $(this).text();
                                }else if(index == 2){
                                    jiJingObj.guPiaoName  = $(this).text();
                                }else if(index == 6){
                                    jiJingObj.guPiaoRate  = $(this).text();
                                }else if(index == 7){
                                    jiJingObj.guPiaoNumber  = $(this).text().replace(/,/g,'');
                                } else if(index == 8){
                                    jiJingObj.guPiaoMoney  = $(this).text().replace(/,/g,'');
                                }
                            });
                            jiJingArray.push(jiJingObj);
                        });
                    }

                });
                console.log(jiJingArray)

                res.render('index',{title:$.html()});
            }
        });
};


module.exports = manageJiJing;