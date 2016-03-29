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
	}
};