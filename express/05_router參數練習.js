//導入express
const express = require('express');
//導入singers.json //輸出物件有大括號，讓singers少掉一層大括號，這邊是變陣列
const { singers } = require('./singers.json');
// console.log(singers);//檢查singers是否有資料

//建立一個express伺服器
const app = express();

//建立一個路由
app.get('/singer/:id.html', (req, res) => {
    //取得URL router參數
    let { id } = req.params;
    //在陣列中尋找對應的id
    let result = singers.find(singer => {
        if (singer.id === Number(id)) {
            return true;
        };//Number()強轉型別
    });

    //如果result是undefined，就跳出並顯示404頁面。
    if (!result) {
        res.status(404);
        res.end('<h1> 404 - Not Found </h1>');
        return;
    }

    res.end(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="UTF-8"> <!-- 指定字符編碼為 UTF-8，這是一個常用的支持中文的字符編碼。 -->
        <title>Document</title>
    </head>
    <body>
        <h2>${result.singer_name}</h2>
        <img src="${result.singer_pic}" alt="${result.singer_name}">
    </body>
    </html>`
    );
});

//設定伺服器監聽的埠號
app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});