const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();

app.route('/josn/users/:id')
.get((req,res)=>{
    const id=Number(req.params.id);
    const user= users.find((user)=>{
        return user.id===id;
    })
    res.json(user);
})
.patch((req,res)=>{

})
.delete((req,res)=>{

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
    // to create new user 
    return res.json({status:"pending"})
})

app.listen(67,()=>{
    console.log("Server is listenong on port 67")
})