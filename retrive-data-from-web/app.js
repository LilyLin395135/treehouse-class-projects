const https = require('https');
//Print the data
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}

function getProfile(username) {
    //connect to the API URL (https://teamtreehouse.com/profiles/lilylin2.json)
    const request = https.get(
        `https://teamtreehouse.com/profiles/${username}.json`,
        (response) => {
            let body = "";
            // console.dir(response.statusCode); //和console.log();差不多
            //Read the data
            response.on('data', (data) => {
                body += data.toString();
            });
            response.on('end', () => {
                //Parse the data
                let profile = JSON.parse(body);//把回覆的JSON格式轉成JS物件，more readable
                // console.dir(profile.points);//profile.points是個物件
                printMessage(username, profile.badges.length, profile.points.JavaScript);
            });
        });
}
const users = process.argv.slice(2);//取得命令列參數，去掉前面兩個元素
users.forEach(getProfile);//JS寫法把users陣列裡的每個元素都傳進getProfile函式裡