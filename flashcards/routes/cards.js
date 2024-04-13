const express = require("express"); //引入express套件
const router = express.Router();

//因為我們在app.js中設定了app.use("/cards",cardRoutes);
//所以這裡的路由都是/cards開頭，可以只寫"/"，不用寫"/cards"
router.get("/", (request, response) => {
    response.render("card", {
      prompt: "Who is buried in Grant's tomb?",
      hint: "Think about whose tomb it is.",
      colors,
    });
  });

  //export
module.exports = router; //匯出router