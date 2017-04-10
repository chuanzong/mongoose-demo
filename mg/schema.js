// 准备工作
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// -------------------------------------------------------------------------------
// Schema的定义
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
	
phoneSchma.add({color : 'string'}) // 对Schema进行动态扩展
/*
	Schema中所支持的数据类型有：
		String
		Number
		Date
		Buffer
		Boolean
		Mixed
		Objectid
		Array
*/
// -------------------------------------------------------------------------------------

// 创建Model

/*
	需要将定义好的phoneSchema转换为Model
	mongoose.model(modelName, schema)进行转换
*/
	
var Phone = mongoose.model('Phone', phoneSchema);

/*Schema用来也只用来定义数据结构，具体对数据的增删改查操作都由Model来执行*/

// ---------------------------------------------------------------------------------

// 创建数据实例

/*Model相当于数据的构造函数。当需要实例化出一个数据对象实例时，可以使用new操作符来实现。*/
var iPhoneSE = new Phone(
	{
		device			: "iPhone SE",
		isSmart			: "true",
		releaseTime 	: "2016-03-21 10:00:00",
		price			: 4999,
		apps			: [{name : "Safari"}, {name : "Map"}, {name : "Tinder"}],
		manufacturer	: {
			name		: "Apple",
			country		: "The United States"
		}
	}
);









// console.log(phoneSchema)
console.log("phoneSchema")
