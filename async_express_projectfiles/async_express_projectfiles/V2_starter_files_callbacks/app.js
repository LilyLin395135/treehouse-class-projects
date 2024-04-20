const express = require('express');
const fs = require('fs');
const path = require('path');
const { title } = require('process');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//CALL BACKS
function getUsers(cb){
  fs.readFile('data.json', 'utf8', (err, data) => {//到data.json拿資料
    if (err) return cb(err);
    const users = JSON.parse(data);
    return cb(null, users);//一旦拿到資料就會呼叫cb(是一個callback function)。
    //我們傳什麼function就用，並會把拿到的資料users給這個function。
  });
}

app.get('/', (req,res) => {
  //遵照上面callback的規則，第一個參數是error，第二個參數是data。
  //先給一個匿名函式，並記得放入兩個參數。
  getUsers((err,users)=>{
    //如果有error，就render一個error page
    if(err){
      return res.render('error', {error: err});//可以看到error.pug是放error變數，所以這裡要放error。
    }
    else{//如果沒有error，就render index page
      return res.render('index', {title: "users",users:users.users});
    }
  });
}); 


app.listen(3000, () => console.log('App listening on port 3000! http://localhost:3000/'));