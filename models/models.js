// 数据模型

/*
 Bug tips : Sub Docs 此处只解决单个文档模型
 */
module.exports = { 
	// user需要提供查询接口
	user:{ 
		name:{type:String,required:true},
		password:{type:String,required:true},
		delete_flag:{type:String,required:true}
	},
	interface:{ 
		name:{type:String,required:true},
		description:{type:String,required:true},
		method:{type:String,required:true},
		func_id:{type:String,required:true},
		func_name:{type:String,required:true},
		creator_id:{type:String,required:true},
		delete_flag:{type:String,required:true}
	},
	req:{
		name : {type:String,required:true}, // value
		type : {type:String,required:true},
		meaning : {type:String,required:true},
		comment : {type:String,required:true},
		if_id:{type:String,required:true}, // 根据interface _id来获取数据
		value : {type:String,required:true}, // key 核心实现
		delete_flag : {type:String,required:true}
	},
	res:{
		name : {type:String,required:true}, // value
		type : {type:String,required:true},
		meaning : {type:String,required:true},
		comment : {type:String,required:true},
		if_name:{type:String,required:true}, // 根据interface _id来获取数据
		value : {type:String,required:true}, // key 核心实现
		delete_flag : {type:String,required:true}
	}
};