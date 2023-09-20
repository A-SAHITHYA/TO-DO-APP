const mongoose=require('mongoose');
const studentSchema =new mongoose.Schema({
    description:{type:String,required:true},
    category:{type:String},
    duedate:{type:String}
});
const task=mongoose.model('tododata',studentSchema);
module.exports=task;