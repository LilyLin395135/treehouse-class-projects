const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getJSON(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onload = () => {//這裡是個要等待的callback function
      if (xhr.status === 200) {
        let data = JSON.parse(xhr.responseText);
        resolve(data);//turn the promise from pending to fulfilled
      } else {
        reject(Error(xhr.statusText));
      }
    };
    xhr.onerror = () => reject(Error('A network error occurred'));
    //因為connectivity issues當HttpRequest失敗不會回傳status code，所以用onerror
    //來reject promise
    xhr.send();
  });
}

function getProfiles(json) {
  const profiles = json.people.map(person => {
    return getJSON(wikiUrl + person.name);
  });
  return Promise.all(profiles);
  //Promise.all()接收一個promise陣列，並且在所有promise都完成後，回傳一個新的promise
  //只要有一個promise被rejected，Promise.all()就會被rejected
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map(person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    // Check if request returns a 'standard' page from Wiki
    if (person.type === 'standard') {
      section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
    } else {
      section.innerHTML = `
      <img src="img/profile.jpg" alt="ocean clouds seen from space">
      <h2>${person.title}</h2>
      <p>Results unavailable for ${person.title}</p>
      ${person.extract_html}
    `;
    }
  });

}

btn.addEventListener('click', (event) => {
  event.target.textContent = "Loading...";

  getJSON(astrosUrl)
    .then(getProfiles)//如果是fulfilled，就執行getProfiles
    .then(generateHTML)//如果是fulfilled，就執行generateHTML
    .catch(err => {
      peopleList.innerHTML = '<h3>Something went wrong!</h3>';
      console.log(err)
    })//結果是rejected就在畫面上顯示Something went wrong!，並且在console.log顯示錯誤訊息
    .finally(() => event.target.remove());//不管是fulfilled還是rejected，都會執行finally
});