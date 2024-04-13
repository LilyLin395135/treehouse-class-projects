const express = require("express"); //引入express套件
const router = express.Router();
// const data = require("../data/flashcardData.json").data; //引入flashcardData.json檔案
// const cards = data.cards; //引入flashcardData.json檔案
//以下ES6寫法等於上面寫法
const { data } = require("../data/flashcardData.json"); //引入flashcardData.json檔案
const { cards } = data; //separated out the cards 解構賦值，取得data物件的cards屬性

//因為我們在app.js中設定了app.use("/cards",cardRoutes);
//所以這裡的路由都是/cards開頭，可以只寫"/"，不用寫"/cards"
//用冒號( colon ) 告訴express冒號後有參數id (a route parameter called id)
router.get("/:id", (request, response) => {
    //query string to get question or answer
    const { side } = request.query; //解構賦值，取得query物件的side屬性
    const { id } = request.params; //解構賦值，取得params物件的id屬性
    const text = cards[id][side]; //取得cards陣列的id索引的side屬性
    const { hint } = cards[id]; //解構賦值，取得cards陣列的id索引的hint屬性

    const templateData = { text, hint }; //建立一個templateData物件，包含text、id、hint
    response.render("card", templateData); //回應一個card.pug檔案，並傳入templateData
    
  });

  //export
module.exports = router; //匯出router