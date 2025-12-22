const express = require('express');
const fs=require('fs')
const mongoose = require('mongoose')
const users = require('./MOCK_DATA.json')
const app = express();

//connecting mongodb
mongoose.connect('mongodb://127.0.0.1:27017/mongodb_first')
.then(()=>{
    console.log("MongoDB Connected")
})
.catch((err)=>{
    console.log("Mongo Error : ",err);
})


app.use(express.urlencoded({extended:false})) // this is a middleware 

//creating schema
const userSchema=new mongoose.Schema({
    firstName : {
        type : String,
        required : true
    },
    lastName : {
        type:String,
    },
    email : {
        type:String,
        required:true,
        unique:true
    },
    job:{
        type:String
    },
    gender:{
        type:String
    }
})

//creating model
const my_users=mongoose.model('user',userSchema)

app.route('/json/users/:id')
.get((req,res)=>{
    const id=Number(req.params.id);
    const user= users.find((user)=>{
        return user.id===id;
    })
    res.json(user);
})
.patch((req,res)=>{
    const userId=Number(req.params.id);
    const body = req.body;
    const index = users.findIndex(user=>user.id===userId);
    users[index]={id:userId,...body}
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if(err){
            res.json({status : "Error happened"})
        }
    })
    res.json({
        status : `Done updating user with id : ${userId}`})
})
.delete((req,res)=>{
    const id= req.params.id;
    const index= users.findIndex(user=>user.id==id);
    if(index==-1){
        res.json({
            status : "user not found"
        })
    }
    const user_to_del=users.splice(index,1);
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        if(err){
            res.json({
                status : "Error 404"
            })
        }
    })
    res.json({status:`Deleted`,
        deleted : user_to_del[0]
    })
})

app.get('/',(req,res)=>{
    res.send("Home page");
})
app.get('/json',(req,res)=>{
    res.send("For JSON format");
})
app.get('/json/users',(req,res)=>{
    return res.json(users);
})
app.get('/users',(req,res)=>{
    const html= `
    <ul>
        ${
            users.map((user)=>{
                return `<li>${user.first_name}</li>`
            }).join("")
        }
    </ul>
    `
    return res.send(html);
})
app.get('/users/:id',(req,res)=>{
    const id =Number(req.params.id);
    const user = users.find(user=>user.id===id);
    res.send(user.first_name+" "+user.last_name)
})

app.post('/json/users',async(req,res)=>{
    const body = req.body;
    //don't need that
    
    const result=await my_users.create({
        firstName:body.first_name,
        lastName:body.last_name,
        email:body.email,
        gender:body.gender,
        job:body.Job_Title
    })
    console.log(result)
    res.status(201).json({status : "Success"})
})

app.listen(67,()=>{
    console.log("Server is listenong on port 67")
})