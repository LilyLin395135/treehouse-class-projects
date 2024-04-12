
//require方法使用套件Express，放進express變數中，之後都用此變數操作express
const express = require("express");

//啟用一個Express應用程式
const app = express();

app.set("view engine","pug");//set方法做Express的設置，設定view engine為pug

//建立一個路由
app.get("/",(request,response)=>{
    response.render("index"); //回應一個index.pug檔案
});

//建立第二個路由，第二個頁面
app.get("/about",(request,response)=>{
    //回應一個字串
    response.send("<h1>JavaScript & Express, Hi.</h1>");
});

//建立伺服器路由port 3000
app.listen(3000,()=>{
    console.log("Server is running on http://localhost:3000 or http://127.0.0.1:3000/");
});