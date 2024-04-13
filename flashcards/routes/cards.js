const express = require("express"); //引入express套件
const router = express.Router();
// const data = require("../data/flashcardData.json").data; //引入flashcardData.json檔案
// const cards = data.cards; //引入flashcardData.json檔案
//以下ES6寫法等於上面寫法
const { data } = require("../data/flashcardData.json"); //引入flashcardData.json檔案
const { cards } = data; //separated out the cards 解構賦值，取得data物件的cards屬性

const colors = ["red", "orange", "yellow", "green", "blue", "purple"];

//因為我們在app.js中設定了app.use("/cards",cardRoutes);
//所以這裡的路由都是/cards開頭，可以只寫"/"，不用寫"/cards"
router.get("/", (request, response) => {
    response.render("card", {
      prompt: cards[0].question,
      hint: cards[0].hint,
      colors
    });
  });

  //export
module.exports = router; //匯出router