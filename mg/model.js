// Model实例方法

/*Phone的内容很多，但客户最关心哪个手机价格是多少，
那么可以添加一个实例方法printBrief()用来打印出这两个信息*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var phoneSchema = new Schema({
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


// 这里，为Model添加实例方法。
phoneSchema.methods.printBrief = function () {
	console.log(this.device, '￥'+this.price);
};
/*Model实例方法只能被Model的实例调用，不能被Model直接调用，否则会抛出is not a function异常*/

var Phone = mongoose.model('Phone', phoneSchema);

var raw;
raw = require('./iphonese.json');

// var iPhoneSE = new Phone(raw);

var iPhoneSE = new Phone(raw);
console.log("iPhoneSE")
iPhoneSE.printBrief();
