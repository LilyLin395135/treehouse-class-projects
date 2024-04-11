//導入express
const express = require('express');

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/server', (request, response) => {

    //設置回應Header，允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');//允許所有網域訪問

    //回應一個字串
    response.send('Hello World!');
});//瀏覽器把請求發送過來後，如果是get請求，且路徑是'/'，則執行這個函數，並且返回'Hello World!'

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});