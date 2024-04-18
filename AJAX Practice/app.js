//require方法使用套件Express，放進express變數中，之後都用此變數操作express
const express = require("express");

//啟用一個Express應用程式
const app = express();

const path = require('path'); // 確保已經引入 path 模組

app.use(express.static(__dirname + "/public"));

//建立一個路由
app.get('/home', (request, response) => {
    response.send('Hello World!');
});//瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回'Hello World!'

//每個網站的首頁幾乎都是用'/'表示，所以這裡用'/'表示首頁
app.get('/', (request, response) => {
    //response example1.html頁面
    response.sendFile(path.join(__dirname, '/public/example1.html'));
    
});

app.post('/login', (request, response) => {
    response.send('login login');
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000 or http://127.0.0.1:3000/');
});//當伺服器啟動後，輸出這句話
//以上在CLI node 01_初體驗.js。會看到Server is running at http://localhost:3000
//在瀏覽器上輸入127.0.0.1:3000/home，會看到Hello World!
//ctrl+c 關閉伺服器