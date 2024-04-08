const https = require('https');
const http = require('http');
//Print the data
function printMessage(username, badgeCount, points) {
    const message = `${username} has ${badgeCount} total badge(s) and ${points} points in JavaScript`;
    console.log(message);
}
function printError(error) {
    console.error(error.message);
}

function getProfile(username) {
    try {
        //connect to the API URL (https://teamtreehouse.com/profiles/lilylin2.json)
        const request = https.get(
            `https://teamtreehouse.com/profiles/${username}.json`,
            (response) => {
                if(response.statusCode === 200) {
                let body = "";
                // console.dir(response.statusCode); //和console.log();差不多
                //Read the data
                response.on('data', (data) => {
                    body += data.toString();
                });
                response.on('end', () => {
                    try {
                        //Parse the data
                        let profile = JSON.parse(body);//把回覆的JSON格式轉成JS物件，more readable

                        printMessage(username, 
                            profile.badges.length, 
                            profile.points.JavaScript
                        );
                    }
                    catch (error) {
                        printError(error);
                    }
                });
            }
            else {
                const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
                const statusCodeError = new Error(message);
                printError(statusCodeError);
            }
            });
        //Error handling
        request.on('error', (error) => {
            printError(error);
        });
    }
    catch (error) {
        printError(error);
    }
}
const users = process.argv.slice(2);//取得命令列參數，去掉前面兩個元素
users.forEach(getProfile);//JS寫法把users陣列裡的每個元素都傳進getProfile函式裡