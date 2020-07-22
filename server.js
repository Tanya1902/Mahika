const express = require("express");
const app = express();
app.use(express.static('public'));
app.get("*",function(req,res){
    res.end("<h1>response from express server</h1>");
})
const port = process.env.PORT || 3000;
app.listen(port,function(){
    console.log("server is listening");
})