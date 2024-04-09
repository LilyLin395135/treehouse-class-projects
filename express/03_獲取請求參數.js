//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/request', (req, res) => {
    //原生操作(使用原本的語言、基礎，不用打包好的框架，這裡就是不用Express)
    console.log(req.method);//請求的方法 //回傳了GET
    console.log(req.url);//請求的路徑 //用網址http://localhost:3000/Request?a=100&b=200 回傳了"/Request?a=100&b=200"
    console.log(req.httpVersion);//請求的HTTP版本 //回傳了1.1
    console.log(req.headers);//請求的標頭 //回傳一串JSON

    //Express操作
    console.log(req.path);//請求的路徑 //用網址http://localhost:3000/Request?a=100&b=200 回傳了"/Request"
    console.log(req.query);//請求的查詢參數 //用網址http://localhost:3000/Request?a=100&b=200 回傳了{ a: '100', b: '200' }
    //取得使用者IP
    console.log(req.ip);//回傳::1
    //取得請求header
    console.log(req.get('host'));//回傳localhost:3000



    res.end('Hello World!');
});//瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回'Hello World!'

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});//當伺服器啟動後，輸出這句話
//以上在CLI node 01_初體驗.js。會看到Server is running at http://localhost:3000
//在瀏覽器上輸入127.0.0.1:3000/home，會看到Hello World!
//ctrl+c 關閉伺服器