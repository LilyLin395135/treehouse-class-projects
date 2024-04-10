//導入express
const express = require("express");

//建立一個express伺服器
const app = express();

//建立一個路由
app.get("/home", (req, res) => {
  res.send("前台首頁");
});

//宣告Middleware函式
let checkCodeMiddleware=(req,res,next)=> {
  //判斷URL中是否code參數等於521
  //http://localhost:3000/admin?code=521
  if (req.query.code === "521") {
    next();
  } else {
    res.send("驗證失敗");
  }
};

//後台
app.get("/admin",checkCodeMiddleware, (req, res) => {
  res.send("後台首頁");
});

//後台設置
app.get("/setting",checkCodeMiddleware, (req, res) => {
  res.send("後台設置");
});

app.all("*", (req, res) => {
  res.send(`<h1>404 找不到網頁</h1>`);
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
