const astrosUrl = 'http://api.open-notify.org/astros.json'; //回傳所有在太空的人員
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';//回傳wiki的資料
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

// xhr常被用來Make an AJAX request
function getJSON(url) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', url);
  xhr.onload = () => {
    if(xhr.status === 200) {
      let data = JSON.parse(xhr.responseText);
      console.log(data);
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

//call getJSON function and pass it the astrosUrl
//在index.html中f12可以看到7名太空人的資料
getJSON(astrosUrl);
