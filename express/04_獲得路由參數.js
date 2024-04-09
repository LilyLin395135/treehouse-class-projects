//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/1008411211995.html', (req, res) => {
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end('商品詳情');
});//到網址http://localhost:3000/1008411211995.html 畫面上有"商品詳情"

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});