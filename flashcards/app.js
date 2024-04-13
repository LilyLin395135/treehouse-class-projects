//require方法使用套件Express，放進express變數中，之後都用此變數操作express
const express = require("express");
const bodyParser = require("body-parser"); //引入body-parser套件
const cookieParser = require("cookie-parser"); //引入cookie-parser套件

//啟用一個Express應用程式
const app = express();

app.set("view engine", "pug"); //set方法做Express的設置，設定view engine為pug
app.use(bodyParser.urlencoded({ extended: false })); //使用body-parser套件，解析urlencoded格式的請求
app.use(cookieParser()); //使用cookie-parser套件

//import the router from routes/index.js
const mainRoutes = require("./routes"); //引入routes/index.js檔案
const cardRoutes = require("./routes/cards"); //引入cards.js檔案

//use the routes variable to make middleware
app.use(mainRoutes);
app.use("/cards", cardRoutes); //使用cards路由

app.use((request, response, next) => {
  console.log("Hello");
  return next();
});

app.use((request, response, next) => {
  console.log("World");
  return next();
});

//Handling 404 Errors
app.use((request, response, next) => {
  const error = new Error("Not Found"); //建立一個錯誤物件
  error.status = 404; //設定錯誤物件的狀態碼為404
  next(error); //呼叫next方法，並傳入錯誤物件
});

//Error Handling Middleware
app.use((error, request, response, next) => {
  const statusCode = error.status || 500; // 如果 error.status 是 undefined，則使用 500 作為默認值
  response.status(statusCode); //設定response的狀態碼為500
  response.render("error", { error}); //回應一個error.pug檔案，並傳入一個變數error，值為error.message或error
});

//建立伺服器路由port 3000
app.listen(3000, () => {
  console.log(
    "Server is running on http://localhost:3000 or http://127.0.0.1:3000/"
  );
});
