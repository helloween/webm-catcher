require('dotenv').config();

var app     = require('koa')();
var views   = require('koa-views');
var favicon = require('koa-favicon');
var router  = require('./routes');

app.use(favicon(__dirname + '/build/favicon.ico'));
app.use(views(__dirname + '/build'));
app.use(router.routes());

app.listen(process.env.APP_PORT);
