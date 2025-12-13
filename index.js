const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();

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
app.get('/json/users/:id',(req,res)=>{
    const id =Number(req.params.id);
    const user = users.find(user=>user.id===id);
    res.json(user)
})
app.get('/users/:id',(req,res)=>{
    const id =Number(req.params.id);
    const user = users.find(user=>user.id===id);
    res.send(user.first_name)
})

app.listen(67,()=>{
    console.log("Server is listenong on port 67")
})