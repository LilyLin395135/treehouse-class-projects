//導入express
const express = require("express");

//建立一個express伺服器
const app = express();

//static file middleware設置
app.use(express.static(__dirname + "/public")); //把public資料夾設置為靜態資源目錄

//建立一個路由
app.get("/home", (req, res) => {
  res.end("Hello World!");
}); //瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回'Hello World!'

//設定伺服器監聽的埠號
app.listen(3000, () => {
  console.log("Server is running at http://localhost:3000");
});
