const express = require('express');
const mongoose = require('./config/mongoose');
const path = require('path');
const tododata = require('./models/contact_schema');
const PORT = 8888;
const app = express();
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(express.static("public"));
app.use(express.urlencoded()); 
app.get('/',function(req,res){
    res.send("<h1>Hellooooooo...... \n I am in homepage</h1>");
});
app.get('/delete-contact',function(req,res){
    var id=req.query;
    var len = Object.keys(id).length;
    var deletePromises = [];
    for(let i=0;i<len;i++){
        deletePromises.push(tododata.findByIdAndDelete(Object.keys(id)[i]));
    }
    Promise.all(deletePromises)
    .then(() =>{
        console.log("Deleted successfully");
        return res.redirect('back');
    })
    .catch((err) => {
        console.log("Error in deleting data",err);
        return res.redirect('back');
    })
    });
app.get('/contact',function(req,res){
    const todos = tododata.find({}).exec();
    todos
    .then(data =>{
        console.log(data);
        res.render('contact',{data:data});
    })
    .catch(err => {
        console.log("error while fetching data from db");
    });
});
app.post('/add-todo',function(req,res){
    const tdlist = new Promise((resolve,reject) => {
        tododata.create({
            description:req.body.description,
            category:req.body.category,
            duedate:req.body.duedate
        })
        .then(newData => {
            console.log("***newData***");
            resolve(newData);
        })
        .catch(err =>{
            console.log("Error in Adding data",err);
            reject(err);
        });
    });
    tdlist.then((newData) => {
        res.redirect('back');
    })
.   catch(err =>{
        console.log("Error",err);
    })
});
app.listen(PORT,function(err){
    if(err){
        console.log("Server is not running");
        return;
    }
    console.log("Server is UP & Running on port:",PORT)
});