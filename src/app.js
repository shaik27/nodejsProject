const express = require('express')
const app = express()

app.use(('/test'),(req,res)=>{
    res.send('hello world')
})

app.listen(3002, ()=>{
    console.log('server is successfully listening');
})