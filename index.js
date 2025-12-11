const express = require('express');

const app = express();

app.get('/',(req,res)=>{
    res.send("this is home page")
})

app.listen(67)