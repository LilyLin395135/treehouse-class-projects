//導入express
const express = require('express');

//建立一個express伺服器
const app = express();
const fs = require('fs');
const path = require('path');

//宣告一個中間件函式
function recordMiddleware(req, res, next) {//next是一個函式，用來執行下一個中間件
    //取得URL 和 IP
    let {url, ip} = req;
    //將訊息保存在文件中access.log
    //fs：這是Node.js的內建模組，提供了對檔案系統的操作功能。我們使用它來進行檔案的讀寫操作。
    //appendFileSync：這是fs模組中的一個函式，用於將內容附加到指定的檔案中。它是同步的，這意味著程式會等待檔案寫入完成後才會繼續執行。
    //path.resolve(__dirname, ".access.log")：這是一個路徑解析的函式，用於解析檔案的絕對路徑。__dirname是一個Node.js中的全域變數，代表目前執行的檔案所在的目錄。.access.log是要附加內容的檔案名稱。
    fs.appendFileSync(path.resolve(__dirname,".access.log"), `URL: ${url}, IP: ${ip}\r\n`);
    //執行下一個中間件
    next();
}

//使用中間件
app.use(recordMiddleware);

//建立一個路由
app.get('/home', (req, res) => {
    res.send("前台首頁");
});

app.get("/admin", (req, res) => {
    res.send("後台首頁");
});

app.all("*", (req, res) => {
    res.send(`<h1>404 找不到網頁</h1>`);
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});