/*
 * Group no: 6
 * Group Name: Meta Web
 * Team members: Shafiya Heena, Najmun Nahar, Karanjot Singh
 * Date - 27/11/2021
 */

let express=require('express');
let router=express.Router();
let mongoose=require('mongoose');
const survey = require('../models/survey');

//create a reference to db schema
let Survey=require('../models/survey');

module.exports.displaySurveyList=(req,res,next)=>{
    Survey.find((err,surveyList)=>{
        if(err)
        {
            return console.error(err);
        }
        else
        {
            res.render('survey/list',{title:'Active Surveys',SurveyList:surveyList,displayName: req.user?req.user.displayName:''});
        }
    })
}

module.exports.displayAddPage=(req,res,next)=>{
    res.render('survey/add',{title:'Create Survey',displayName: req.user?req.user.displayName:''});
}
module.exports.processAddPage=(req,res,next)=>{
    let newSurvey = Survey({
        "title": req.body.title,
        "type": req.body.type,
        "responses":req.body.responses
    });
    Survey.create(newSurvey,(err,Survey)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the book list
            res.redirect('/survey-list');
        }
    });
}
module.exports.displayEditPage=(req,res,next)=>{
    let id=req.params.id;

    Survey.findById(id,(err,surveyToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/edit',{title:'Edit Survey',survey: surveyToEdit,displayName: req.user?req.user.displayName:''});
        }
    });
}
module.exports.processEditPage=(req,res,next)=>{
    let id=req.params.id;

    let updateSurvey=Survey({
        "_id": id,
        "title": req.body.title,
        "type": req.body.type,
        "responses":req.body.responses
    });
    Survey.updateOne({_id:id},updateSurvey,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/survey-list');
        }
    });
}
module.exports.performDelete=(req,res,next)=>{
    let id=req.params.id;

    Survey.remove({_id: id}, (err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //refresh the contact list
            res.redirect('/survey-list');
        }
    })
}
module.exports.displayResponsePage=(req,res,next)=>{
    let id=req.params.id;

    Survey.findById(id,(err,surveyToEdit)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            //show the edit view
            res.render('survey/response',{title:'Thank you for your valuable opinion. Do you want to submit your response?',survey: surveyToEdit});
        }
    });
}
module.exports.processResponsePage=(req,res,next)=>{
    let id=req.params.id;

    let updateSurvey=Survey({
        "_id": id,
        "title": req.body.title,
        "type": req.body.type,
        "responses":req.body.responses
    });
    Survey.updateOne({_id:id},updateSurvey,(err)=>{
        if(err)
        {
            console.log(err);
            res.end(err);
        }
        else
        {
            survey.responses++;
            //refresh the contact list
            res.redirect('/survey-list');
        }
    });
}