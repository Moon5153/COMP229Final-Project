let mongoose=require('mongoose');

//create a model class
let surveyModel=mongoose.Schema({
    title: String,
    type:String,
    responses:{
        type:Number,
        default:0
    }
    
},
{
    collection:"surveys"
});
module.exports=mongoose.model('Survey',surveyModel);