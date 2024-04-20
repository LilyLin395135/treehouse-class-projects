const express = require('express');
const fs = require('fs');
const path = require('path');
const { title } = require('process');

const app = express();

app.set('view engine', 'pug');
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//使用middleware自動包起我們的routes進try catch
//這樣就不用在每個route裡面寫try catch
function asyncHandler(cb) {
  //會回傳一個Asynchronous function作為我們route的handler callback
  //所以會有req,res,next三個參數
  return async (req, res, next) => {
    //在try會await任何放進asyncHandler的函式
    try {
      await cb(req, res, next);
    }
    //catch error and render error page
    //就不用在每個route裡面都寫error了，現在就可以到route拿掉error handling的try catch了
    catch (err) {
      res.render('error', { error: err });
    }
  };
}

//CALL BACKS
// function getUsers(cb){
//   fs.readFile('data.json', 'utf8', (err, data) => {//到data.json拿資料
//     if (err) return cb(err);
//     const users = JSON.parse(data);
//     return cb(null, users);//一旦拿到資料就會呼叫cb(是一個callback function)。
//     //我們傳什麼function就用，並會把拿到的資料users給這個function。
//   });
// }

// app.get('/', (req,res) => {
//   //遵照上面callback的規則，第一個參數是error，第二個參數是data。
//   //先給一個匿名函式，並記得放入兩個參數。
//   getUsers((err,users)=>{
//     //如果有error，就render一個error page
//     if(err){
//       return res.render('error', {error: err});//可以看到error.pug是放error變數，所以這裡要放error。
//     }
//     else{//如果沒有error，就render index page
//       return res.render('index', {title: "users",users:users.users});
//     }
//   });
// });  




//PROMISES
function getUsers() {
  //要能用.then() .catch()，getUsers要先讓方法return一個promise。
  //new Promise()使用callback function，有兩個參數，resolve和reject。
  return new Promise((resolve, reject) => {
    fs.readFile('data.json', 'utf8', (err, data) => {
      //如果有error，就reject
      if (err) {
        reject(err);
      }
      //如果沒有error，就resolve
      else {
        const users = JSON.parse(data);
        resolve(users);
      }
      //完成回傳promise，就可以用.then() .catch()來處理。
    });
  });
};

// app.get('/', (req,res) => {
//   //promise可以用then和catch來處理。讓我們的程式碼更乾淨
//   //首先call getUsers，.then() .catch()
//   //而要能用.then() .catch()，getUsers要先讓方法return一個promise。
//   getUsers()
//   //then方法接受一個function，所以會放匿名函式，這個function會接受resolve的值。
//   .then((users)=>{
//     //(我們用then回傳假的error，來看看error page是否有成功。)
//     // throw new Error('fake error');
//     //會有個參數users，以取得getUsers()方法提供的資料
//     //現在有了users，就可以render index page
//     res.render('index', {title: "users",users:users.users});
//     //就可以嘗試開啟網頁看是否成功了
//   })
//   //當有更多要達到的事項，就可以用then來達成，而不是callback hell

//   //如果有error，就catch
//   //也接受callback function
//   .catch((err)=>{
//     //會define a parameter for error，然後再render error page
//     res.render('error', {error: err});
//     //我們用then回傳假的error，來看看是否有成功。
//   });
// });

//async/await 一般都會與promise一起使用
//首先await會用在asnchronous函式裡面
//→所以要將getUsers callback function 轉成promise。在function 前面加上async，這會讓JavaScript知道這是一個asynchronous function。
//在async function裡面就可以使用await，並存入一個變數
app.get('/', asyncHandler(async (req, res) => {
  const users = await getUsers();
  //確認error page是否有成功
  // throw new Error('fake error');
  res.render('index', { title: "users", users: users.users });
}));
//用asyncHandler來做error handling
//asyncHandler會變成callback在我們的route裡面
//所以會先移動現在的callback function暫時往下移，再放進asyncHandler




app.listen(3000, () => console.log('App listening on port 3000! http://localhost:3000/'));