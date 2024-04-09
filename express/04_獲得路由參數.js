//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/:id.html', (req, res) => {
    //取得URL router參數
    console.log(req.params.id);//回傳id的值 (這個id必須和上面路由的id長一樣)
    res.setHeader('Content-Type', 'text/html;charset=utf-8');
    res.end('商品詳情');
});//router改用id就任何一組數字都能看到"商品詳情"了

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});