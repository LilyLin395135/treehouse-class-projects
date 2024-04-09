//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/home', (req, res) => {
    res.end('Hello World!');
});//瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回'Hello World!'

//每個網站的首頁幾乎都是用'/'表示，所以這裡用'/'表示首頁
app.get('/', (req, res) => {
    res.end('Home');
});

//Post
app.post('/login', (req, res) => {
    res.end('login login');
});

//可以使用all方法，任何請求方法都可以，只要路徑是對的，就會執行這個函數
//1.Get方法→直接網址http://127.0.0.1:3000/test，前往成功
//2.Post方法→html按鈕網址改http://127.0.0.1:3000/test，前往成功
app.all('/test', (req, res) => {
    res.end('test test');
});

//404 Not Found
//如果上面的路由都沒有匹配成功，則執行這個函數
app.all('/*', (req, res) => {
    res.end('404 Not Found!');
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});//當伺服器啟動後，輸出這句話
//以上在CLI node 01_初體驗.js。會看到Server is running at http://localhost:3000
//在瀏覽器上輸入127.0.0.1:3000/home，會看到Hello World!
//ctrl+c 關閉伺服器