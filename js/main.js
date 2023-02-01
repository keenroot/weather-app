const apiKey = 'f5ace00e37b44a0283d140316230102';

//!!!поиск элементов на странице
const main = document.querySelector('.main');
const weatherContainer = document.querySelector('.weather__container');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

let cityName = 'Moscow';
//!!!вывод дефолтной карточки
fillWeatherCard();

//!!!обработка события отправки формы
form.onsubmit = function (event) {
  event.preventDefault();
  cityName = input.value.trim();
  fillWeatherCard();
};

async function fillWeatherCard() {
  //!!!получение json из wether api
  const jsonData = await getWeatherApi();
  // console.log(jsonData);
  //!!!удаление старой карточки
  weatherContainer.remove();
  //!!!добавление новой карточки с разметкро и данными из api
  main.innerHTML = `<div class="weather__container">
                      <span class="span__city">${jsonData.location.name}</span>
                      <div class="weather__row">
                        <span class="span__temperature">${jsonData.current.temp_c}<sup class="units">°с</sup></span>
                        <img class="weather__img" src="./img/cloudy.svg" alt="weather" />
                      </div>
                      <span class="span__weather">
                        ${jsonData.current.condition.text}
                      </span>
                    </div>`;
}

async function getWeatherApi() {
  //запрос api
  const respone = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
  );
  return await respone.json();
}
