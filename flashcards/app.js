
//require方法使用套件Express，放進express變數中，之後都用此變數操作express
const express = require("express");

//啟用一個Express應用程式
const app = express();

//建立一個路由
app.get("/",(request,response)=>{
    //回應一個字串
    response.send("<h1>Hello World!</h1>");
});

//建立伺服器路由port 3000
app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000 or http://127.0.0.1:3000/");
});