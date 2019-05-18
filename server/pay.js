var express = require('express');
var router = express.Router();
var path = require('path');
// var AliPayHelper = require('./AliPayHelper');
var Alipay = require('./lib/alipay');

let outTradeId = Date.now().toString();

var ali = new Alipay({
  	appId:"2016100100637667",
  	notifyUrl: 'http://localhost:3000/user/repair',
  	rsaPrivate:path.resolve('../public/app-private.pem'),
  	rsaPublic:path.resolve('../public/ali-public.pem'),
  	sandbox:true,
  	signType:"RSA2"
});

router.get('/getPayUrl', function(req, res) {
	const { subject, amount, body } =req.query
	console.log(subject, amount, body)
    var param = {};
    param.subject= subject
    param.body= body
    param.outTradeId= outTradeId
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
  	param.return_url= "http://localhost:3000/user/repair"
  	var urlparm = ali.webPay(
    	param
  	);
  	var url_API = ('https://openapi.alipaydev.com/gateway.do?'+ urlparm)
    res.json({code: 0, data:url_API, msg: '支付宝地址获取成功'})
});

module.exports = router