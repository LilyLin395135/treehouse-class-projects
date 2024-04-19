const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

function getProfiles(json) {
  const profiles = json.people.map(person => {
    const craft = person.craft;
    return fetch(wikiUrl + person.name)//改用fetch API，取代getJSON
      .then(response => response.json())//把fetch的結果轉成json格式
      .then(profile => {
        return { ...profile, craft };//把profile和craft合併成一個新的物件
      })
      .catch(err => console.log('Error Fetching Wiki: ', err));//如果fetch失敗，就在console.log顯示錯誤訊息
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
      <span>${person.craft}</span>
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

  fetch(astrosUrl)//fetch是一個API，用來發送AJAX request，並且回傳一個promise
    .then(res => res.json())//把fetch的結果轉成json格式
    .then(getProfiles)//如果是fulfilled，就執行getProfiles
    .then(generateHTML)//如果是fulfilled，就執行generateHTML
    .catch(err => {
      peopleList.innerHTML = '<h3>Something went wrong!</h3>';
      console.log(err)
    })//結果是rejected就在畫面上顯示Something went wrong!，並且在console.log顯示錯誤訊息
    .finally(() => event.target.remove());//不管是fulfilled還是rejected，都會執行finally
});