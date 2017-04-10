/*为了对Phone进行存储以及后续的查询，需要提前准备一些手机型号的数据以供练习使用。
为此准备了如下5个手机型号的数据*/
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

phoneSchema.methods.printBrief = function () {
	console.log(this.device, '￥'+this.price);
};

// 这里，为Model添加静态方法。
phoneSchema.statics.printCount = function() {
	// 其它的count()计算方法见以下链接：http://mongoosejs.com/docs/api.html#query_Query-count

		// console.log('=================printCount()=======================')

	// Model.count([selector], [callback])
	this.count({},(err, count) => {
		console.log('---printCount()-----------------------------')
		if (err) {
			console.log(err);
		} else {
			console.log('phone count=' + count);
		}
		db.close()
	});
};




var Phone = mongoose.model('Phone', phoneSchema);

var arrPhone = [];

var raw;

raw = require('./raw.iPhoneSE.json');
var iPhoneSE = new Phone(raw);
iPhoneSE.printBrief();
arrPhone.push(iPhoneSE);
  
raw = require('./raw.huawei.Mate8.json');
var huaweiMate8 = new Phone(raw);
huaweiMate8.printBrief();
arrPhone.push(huaweiMate8);
  
raw = require('./raw.mi.max.json');
var miMax = new Phone(raw);
miMax.printBrief();
arrPhone.push(miMax);
  
raw = require('./raw.samsung.S6Edge.json');
var s6Edge = new Phone(raw);
s6Edge.printBrief();
arrPhone.push(s6Edge);
  
raw = require('./raw.nokia1000.json');
var nokia1000 = new Phone(raw);
nokia1000.printBrief();
arrPhone.push(nokia1000);

console.log('------------------------------------------');
db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.on('open', ()=>{
	console.log('db open');
	// findAllPhone();
	// findNoSmartPhone()
	// findPhoneInstalledRadio()
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
mongoose.Promise = global.Promise;  
mongoose.connect('mongodb://localhost:27017/Phone');


// 查找数据库 所有信息
function findAllPhone() {
	console.log('=================findAllPhone=================');

	Phone.find((err, phones) => {
		if (err) {
			console.log('findAllPhone err:', err);
		} else {
			console.log('---findAllPhone---------------------------------------');
			
			phones.forEach((element, index, phones) => {
				console.log(index, element);
			});
		}

	});
}

// 先删除所有的数据
function delAll(){
	Phone.remove({}, (err)=>{
		console.log('---clean db ---------------------------------------');
		if (err) {
			console.log('Phone remove all occur a error:', err);
		} else {
			console.log('Phone remove all success.');
			// findAllPhone();
			// console.log(Phone);
			// savePhoneArr(false);

		}
	});
	mongoose.disconnect();
}



// 多条数据批量存储
function saveAll(){
	console.log('====================insertMany()====================');
	Phone.insertMany(arrPhone, (err, arrPhone)=>{
		if (err) {
			console.log('insertMany() failed.');
		} else {
			console.log('---insertMany()---------------------------------------');
			console.log('All phone devices saved.insertMany() saved.');
		}
		// 批量存储后，打印当前存储个数
		Phone.printCount();
	})
}


// 单条数据存储
function saveOne(){
	iPhoneSE.save((err, phone)=>{
		if (err) {
			console.log(err);
		} else {
			console.log('Phone[' + phone.device + '] saved.');
			Phone.printCount();
		}
	});
}




// 条件查询
/*找出非智能手机*/
function findNoSmartPhone() {
	Phone.find({isSmart : false}).exec((err, phones) => {
		console.log('---findNoSmartPhone()---------------------------------');
		if (err) {
			console.log(err);
		} else {
			phones.forEach((element, index, phones) => {
				console.log(index, element);
			});
		}
	});
}



// 条件查询—数组

function findPhoneInstalledRadio() {
	Phone.find({'apps.name' : 'Radio'}).exec((err, phones)=>{
		console.log('---findPhoneInstalledRadio()---------------------');
		if (err) {
			console.log(err);
		} else {
			phones.forEach((element, index, phones) => {
				console.log(index, element);
			})
		}
	});
}


