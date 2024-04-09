//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/home', (req, res) => {
    res.end('Hello World!');
});//瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回'Hello World!'

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});//當伺服器啟動後，輸出這句話
//以上在CLI node 01_初體驗.js。會看到Server is running at http://localhost:3000
//在瀏覽器上輸入127.0.0.1:3000/home，會看到Hello World!
//ctrl+c 關閉伺服器