// Model静态方法

/*
与实例方法相对应的是静态方法。只要在Schema.statics中添加新声明的方法即可
想查询一下Phone到底存储了多少个手机型号，可以定义一个静态方法printCount()
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
ar phoneSchema = new Schema({
	device 		: String,    //设备名称
	isSmart 	: Boolean,   //是否为智能手机
	releaseTime	: Date,      //发布时间 
	price		: Number,    //售价
	apps		: [{name : String}], //手机中安装的App名称,是数组
	manufacturer: {         //手机厂商
		name 	: String,   //厂商名称
		country	: String    //厂商国籍
	}
});
var Phone = mongoose.model('Phone', phoneSchema);

// 这里，为Model添加静态方法。
phoneSchema.statics.printCount = function () {
	console.log(this.device, '￥'+this.price);
	this.count({}, (err, count) => {
		console.log('---printCount()-----------------------------')
		if (err) {
			console.log(err);
		} else {
			console.log('phone count=' + count);
		}
	});
};


	
Phone.printCount();
