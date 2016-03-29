var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var models = require("./models");

// Docs
for(var m in models){ 
	mongoose.model(m,new Schema(models[m]));
};

// Sub Docs 功能参与者
var participant = new mongoose.Schema({
	user_id : {type:String,required:true},
	delete_flag : {type:String,required:true}
});

var params = new mongoose.Schema({
	param : {type:String,required:true},
	value : {type:String,required:true},
	delete_flag : {type:String,required:true}
});

mongoose.model('function',new Schema({
	name:{type:String,required:true},
	description:{type:String,required:true},
	creator_id:{type:String,required:true},
	participant_id:[participant],
	delete_flag:{type:String,required:true}
}));

mongoose.model('interface',new Schema({
	name:{type:String,required:true},
	description:{type:String,required:true},
	method:{type:String,required:true},
	req_data:[params],
	res_data:[params],
	func_id:{type:String,required:true},
	func_name:{type:String,required:true},
	creator_id:{type:String,required:true},
	delete_flag:{type:String,required:true}
}));

module.exports = { 
	getModel: function(type){ 
		return _getModel(type);
	}
};

var _getModel = function(type){ 
	return mongoose.model(type);
};