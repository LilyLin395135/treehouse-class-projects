const astrosUrl = 'http://api.open-notify.org/astros.json'; //回傳所有在太空的人員
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';//回傳wiki的資料
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// xhr常被用來Make an AJAX request
//加上callback function，從astrosUrl拿回太空人員的資料後，再執行callback去拿wiki的資料
//getJSON用url參數做AJAX request，並且在請求完成時執行callback function
function getJSON(url, callback) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if (xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);//astrosUrl拿回的資料
      return callback(data);//執行callback function,去拿wiki的資料
    }
  };//當請求完成時，會執行這個函數這是一個callback function
  xhr.send();//發送請求
}

// Generate the markup for each profile
function generateHTML(data) {
  const section = document.createElement('section');
  peopleList.appendChild(section);
  // Check if request returns a 'standard' page from Wiki
  if (data.type === 'standard') {
    section.innerHTML = `
      <img src=${data.thumbnail.source}>
      <h2>${data.title}</h2>
      <p>${data.description}</p>
      <p>${data.extract}</p>
    `;
  } else {
    section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${data.title}</h2>
      <p>Results unavailable for ${data.title}</p>
      ${data.extract_html}
    `;
  }
}

//add event listener, click the button to getJSON
//callback function occurs only when the button is clicked
//a click will add a task to the callback queue, each event will eventually go onto the call stack to be executed
btn.addEventListener('click', (event) => {
  getJSON(
    astrosUrl,
    (json) => {//astrosUrl完成後的資料，我們放進json變數
      //json結構是物件，裡面有一個key屬性people，裡面是一個陣列，裡面是太空人員的資料有name和craft
      json.people.map(person => {//person代表people中每一個人
        getJSON(
          //放入wikiUrl+person.name，去拿wiki的資料
          wikiUrl + person.name,//完成後就會執行generateHTML，建立append new DOM elements，顯示太空人在網頁上
          generateHTML
        );
      });
    });
  event.target.remove();//remove the button after it's clicked
});