//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/other-response', (req, res) => {
    //跳轉回應
    //(常見於網站查看購物車先跳轉頁面到登入頁要你先登入)
    res.redirect('http://www.google.com');
    //下載回應
    res.download('./singers.json');

    
    
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});