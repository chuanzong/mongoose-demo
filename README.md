# mongoose-demo
node Mongoose的使用
```
mongod.exe ./db
```
> 启动mongo服务器

---
**mglj.js**
``` javascript
// 导入mongoose库
var mongoose = require('mongoose');
// 获得db对象
db = mongoose.connection;
```
---
**schema.js**
``` javascript
// 1. 准备工作
    var Schema = mongoose.Schema;
    
// 2. Schema的定义
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
    
// 3. 对Schema进行动态扩展
    phoneSchma.add({color : 'string'})
    
// 4. 创建Model
    var Phone = mongoose.model('Phone', phoneSchema);
    
// 5. 创建数据实例
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
```
---
**model.js**
``` javascript
// 这里，为Model添加实例方法。
phoneSchema.methods.printBrief = function () {
	console.log(this.device, '￥'+this.price);
};

iPhoneSE.printBrief();
/*Model实例方法只能被Model的实例调用，不能被Model直接调用，否则会抛出is not a function异常*/
```
---

**model2.js**
``` javascript
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
```
---
**save.js**
``` javascript
// 查找数据库 所有信息
    Phone.find(err, phones) => {})
    
// 先删除所有的数据
    Phone.remove({}, (err)=>{})
    
// 多条数据批量存储
    Phone.insertMany(arrPhone, (err, arrPhone)=>{})
    
// 单条数据存储
    iPhoneSE.save((err, phone)=>{})
// 条件查询
    /*找出非智能手机*/
    Phone.find({isSmart : false}).exec((err, phones) => {})
    
// 条件查询—数组
    Phone.find({'apps.name' : 'Radio'}).exec((err, phones)=>{})
```