const express = require('express');
const users = require('./MOCK_DATA.json')
const app = express();

app.get('/',(req,res)=>{
    res.json(users)
})

app.listen(67)