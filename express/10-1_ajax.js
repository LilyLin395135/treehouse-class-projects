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
});

//jQuery get服務
app.get('/jquery-server', (request, response) => {

    //設置回應Header，允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');//允許所有網域訪問

    const data = {name: 'Lily', age: 20};

    //回應一個字串
    response.send(JSON.stringify(data));
});

//jQuery post服務
app.post('/jquery-server', (request, response) => {

    //設置回應Header，允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');//允許所有網域訪問

    const data = {name: 'Lily'};
    //回應一個字串
    response.send(JSON.stringify(data));
});

//超時回應
app.get('/delay', (request, response) => {
    //設置回應Header，允許跨域
    response.setHeader('Access-Control-Allow-Origin', '*');//允許所有網域訪問

    setTimeout(() => {
        //回應一個字串
        response.send('延時回應');
    }, 3000);
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});