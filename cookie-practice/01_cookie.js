//導入express
const express = require('express');
const cookieParser = require('cookie-parser');

//建立一個express伺服器
const app = express();
app.use(cookieParser());

//建立get方法的 '/' router
app.get('/set-cookie', (req, res) => {
    //cookie(key, value)
    // res.cookie('name', 'Lily');//會在瀏覽器關閉時銷毀
    res.cookie('name', 'Lily', {maxAge: 1000 * 60 * 60});//另一種設定方式，Cookie依照設定的時間存活(單位毫秒)，就算關掉瀏覽器也還是會在。
    res.cookie('theme', 'dark');
    res.send('home');
});

//刪除cookie
app.get('/remove-cookie', (req, res) => {
    res.clearCookie('name');
    res.send('刪除成功');
});

//取得cookie
app.get('/get-cookie', (req, res) => {
    console.log(req.cookies);
    res.send(`歡迎您${req.cookies.name}`);
});


//設定伺服器監聽的port
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000 or you can use http://127.0.0.1:3000');
});