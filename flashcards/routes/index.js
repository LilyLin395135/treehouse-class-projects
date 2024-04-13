const express = require("express"); //引入express套件
const router = express.Router(); //使用express.Router方法，建立一個路由
//a router is like a mini router that only handles routes

router.get("/", (request, response) => {
  const name = request.cookies.username; //取得cookie的username值
  if (name) {
    response.render("index", { name: name }); //回應一個index.pug檔案
  } else {
    response.redirect("/hello"); //重新導向到hello路由
  }
});

//建立hello路由
router.get("/hello", (request, response) => {
  response.render("hello"); //回應一個hello.pug檔案，並傳入一個變數name，值為request.cookies.username
});

//建立hello路由，Post method
router.post("/hello", (request, response) => {
  //set a cookie
  response.cookie("username", request.body.username); //設定一個cookie，名稱為username，值為request.body.username
  response.redirect("/");
});

//建立goodbye路由，Post method
router.post("/goodbye", (request, response) => {
  response.clearCookie("username"); //清除cookie
  response.redirect("/hello"); //重新導向到hello路由
});

//export the router, so that it can be used in app.js files
module.exports = router; //匯出router