// 导入mongoose库
var mongoose = require('mongoose');
  
// 获得db对象
db = mongoose.connection;
  
// 各种事件
// connection的事件列表可查看:http://mongoosejs.com/docs/api.html#connection_Connection
// 或 ./node_modules/mongoose/lib/connection.js#Connection()
db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', ()=>{
	console.log('db open');
});
db.on('connecting', ()=>{
	console.log('db connecting...');
});
db.on('connected', ()=>{
	console.log('db connected');
});
db.on('disconnecting', ()=>{
	console.log('db disconnecting...');
});
db.on('disconnected', ()=>{
	console.log('db disconnected');
});
db.on('close', ()=>{
	console.log('db close');
});
  
  
// 启动db链接
mongoose.connect('mongodb://localhost:27017/Phone');
  
  
// 关闭的两种方式
// mongoose.connection.close(); 等同于 db.close();
mongoose.disconnect();