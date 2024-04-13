const express = require("express"); //引入express套件
const router = express.Router();
// const data = require("../data/flashcardData.json").data; //引入flashcardData.json檔案
// const cards = data.cards; //引入flashcardData.json檔案
//以下ES6寫法等於上面寫法
const { data } = require("../data/flashcardData.json"); //引入flashcardData.json檔案
const { cards } = data; //separated out the cards 解構賦值，取得data物件的cards屬性

//show random card
router.get("/", (request, response) => {
    const numberOfCards = cards.length; //取得cards陣列的長度
    const flashcardId = Math.floor(Math.random() * numberOfCards); //取得一個隨機數字
    response.redirect(`/cards/${flashcardId}?side=question`); //重新導向到/cards/flashcardId?side=question
  });

//因為我們在app.js中設定了app.use("/cards",cardRoutes);
//所以這裡的路由都是/cards開頭，可以只寫"/"，不用寫"/cards"
//用冒號( colon ) 告訴express冒號後有參數id (a route parameter called id)
router.get("/:id", (request, response) => {
    //query string to get question or answer
    const { side } = request.query; //解構賦值，取得query物件的side屬性
    const { id } = request.params; //解構賦值，取得params物件的id屬性
    if (!side) { //如果side不存在
      response.redirect(`/cards/${id}?side=question`); //重新導向到/cards/id?side=question
    }
    const text = cards[id][side]; //取得cards陣列的id索引的side屬性
    const { hint } = cards[id]; //解構賦值，取得cards陣列的id索引的hint屬性

    const templateData = {id, text};//建立一個templateData物件，值為text
    if(side==="question"){ //如果side等於question
        templateData.hint = hint; //設定hint值為hint
        templateData.sideToShow = "answer"; //設定sideToShow值為answer
        templateData.sideToShowDisplay = "Answer"; //設定sideToShowDisplay值為Answer
    }
    else if(side==="answer"){ //如果side等於answer
        templateData.sideToShow = "question"; //設定sideToShow值為question
        templateData.sideToShowDisplay = "Question"; //設定sideToShowDisplay值為Question
    }

    response.render("card", templateData); //回應一個card.pug檔案，並傳入templateData
    
  });

  //export
module.exports = router; //匯出router