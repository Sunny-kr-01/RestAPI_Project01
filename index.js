const express = require('express');
const fs=require('fs')
const users = require('./MOCK_DATA.json')
const app = express();

app.use(express.urlencoded({extended:false})) // this is a middleware 

app.use((req,res,next)=>{
    console.log("Middleware was used")
    //res.end("Middleware 1")
    next()
})

app.use((req,res,next)=>{
    console.log("Middleware 2")
    next();
})

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

app.post('/json/users',(req,res)=>{
    const body = req.body;
    console.log(body)
    users.push({id:users.length+1,...body}); 
    fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),(err,data)=>{
        res.json({sttus : "success" , id :users.length});
    })
    
})

app.listen(67,()=>{
    console.log("Server is listenong on port 67")
})