//require方法使用套件Express，放進express變數中，之後都用此變數操作express
const express = require("express");
const bodyParser = require("body-parser"); //引入body-parser套件
const cookieParser = require("cookie-parser"); //引入cookie-parser套件

//啟用一個Express應用程式
const app = express();

const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

app.set("view engine", "pug"); //set方法做Express的設置，設定view engine為pug
app.use(bodyParser.urlencoded({ extended: false })); //使用body-parser套件，解析urlencoded格式的請求
app.use(cookieParser()); //使用cookie-parser套件

app.use((request, response, next) => {
    console.log("Hello");
    return next();
});

app.use((request, response, next) => {
    console.log("World");
    return next();
});

//建立一個路由
app.get("/", (request, response) => {
  const name = request.cookies.username; //取得cookie的username值
  if(name){
    response.render("index", { name: name }); //回應一個index.pug檔案
    }
    else{
      response.redirect("/hello"); //重新導向到hello路由
    }
});

//建立cards由，第二個頁面
app.get("/cards", (request, response) => {
  response.render("card", {
    prompt: "Who is buried in Grant's tomb?",
    hint: "Think about whose tomb it is.",
    colors,
  });
});

//建立hello路由
app.get("/hello", (request, response) => {
  response.render("hello"); //回應一個hello.pug檔案，並傳入一個變數name，值為request.cookies.username
});

//建立hello路由，Post method
app.post("/hello", (request, response) => {
  //set a cookie
  response.cookie("username", request.body.username); //設定一個cookie，名稱為username，值為request.body.username
  response.redirect("/");
});

//建立goodbye路由，Post method
app.post("/goodbye", (request, response) => {
    response.clearCookie("username"); //清除cookie
    response.redirect("/hello"); //重新導向到hello路由
  });

//Handling 404 Errors
app.use((request, response, next) => {
    const error = new Error("Not Found"); //建立一個錯誤物件
    error.status = 404; //設定錯誤物件的狀態碼為404
    next(error); //呼叫next方法，並傳入錯誤物件
  });

//Error Handling Middleware
app.use((error, request, response, next) => {
    // response.locals.error = error; //locals是Express的一個物件，可以存放一些變數，這裡存放error變數
    // response.render("error"); //回應一個error.pug檔案
    //上面等於response.render("error", { error });
    response.status(error.status); //設定response的狀態碼為500
    response.render("error", { error }); //回應一個error.pug檔案，並傳入一個變數error，值為error


  });

//建立伺服器路由port 3000
app.listen(3000, () => {
  console.log(
    "Server is running on http://localhost:3000 or http://127.0.0.1:3000/"
  );
});
