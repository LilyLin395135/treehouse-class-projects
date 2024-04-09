//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/response', (req, res) => {
    //原生響應
    // res.statusCode = 400;
    // res.statusMessage = 'Bad Request';
    // res.setHeader('Content-Type', 'text/plain');
    // res.write('Hello Express!');
    // res.end('你好 World!');

    //express響應
    // res.status(500);
    // res.set('Content-Type', 'text/plain');
    // res.send('Hello Express!');
    res.status(200).set('Content-Type', 'text/plain').send('Hello 你好嗎 Express!');

});

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});