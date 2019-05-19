var express = require('express');
var Router = express.Router();
var path = require('path');
// var AliPayHelper = require('./AliPayHelper');
var Alipay = require('./lib/alipay');

// let outTradeId = Date.now().toString();

var ali = new Alipay({
  	appId:"2016100100637667",
  	notifyUrl: 'http://192.168.31.120:9090/pay/getNotifyUrl',
  	rsaPrivate:path.resolve('../public/app-private.pem'),
  	rsaPublic:path.resolve('../public/ali-public.pem'),
  	sandbox:true,
  	signType:"RSA2"
});

Router.get('/getPayUrl', function(req, res) {
	const { subject, amount, body } =req.query
	console.log(subject, amount, body)
    var param = {};
    /*param.subject= 'asdfasdf'
    param.body= 'sssssss'
    param.outTradeId= Date.now().toString()
    timeout= '10s'
    param.amount= amount||'1.00'
    goodsType= '0'*/
    param.subject= subject
    param.body= body
    param.outTradeId= Date.now().toString()
    timeout= '10s'
    param.amount= amount||'1.00'
    goodsType= '0'
  	/*param.subject = subject;
  	param.outTradeId = outTradeId;
  	param.amount = amout;
  	param.body = body;*/
  	param.charset = "utf-8"
  	param.method = "alipay.trade.page.pay"
  	param.product_code = "FAST_INSTANT_TRADE_PAY"
  	param.return_url= "http://192.168.31.120:3000/user/charge"
  	var urlparm = ali.webPay(
    	param
  	);
  	var url_API = ('https://openapi.alipaydev.com/gateway.do?'+ urlparm)
    return res.json({code: 0, data:url_API, msg: '支付宝地址获取成功'})
});

Router.post('/getNotifyUrl', function(req, res) {
  console.log('getNotifyUrl')
  console.log(req)
  console.log(res)
})

module.exports = Router