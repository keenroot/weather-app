const apiKey = 'f5ace00e37b44a0283d140316230102';

//!!!поиск элементов на странице
const main = document.querySelector('.main');
const weatherContainer = document.querySelector('.weather__container');
const form = document.querySelector('#form');
const input = document.querySelector('#inputCity');

let cityName = 'Москва';

//!!! вывод дефолтной карточки
fillWeatherCard();

//!!! обработка события отправки формы
form.onsubmit = function (event) {
  //!!! отключение релоада страницы
  event.preventDefault();
  cityName = input.value.trim();
  fillWeatherCard();
};

async function fillWeatherCard() {
  main.innerHTML = '<div class="weather__container">Loading...</div>';
  //!!! получение json из wether api
  const jsonWeatherData = await getWeatherApi();
  //!!! получение json словаря с кондициями погоды
  const jsonConditionsDictonary = await getConditionsDictonary();
  //!!! поиск кода в словаре
  const condition = jsonConditionsDictonary.filter(
    (obj) => obj.code === jsonWeatherData.current.condition.code
  );

  /* ~~~плохой код~~~ используй тернарный оператор
  const weatherObject = {
    locationName: jsonWeatherData.location.name,
    currentTemp_c: jsonWeatherData.current.temp_c,
  };
  if (jsonWeatherData.current.is_day) {
    weatherObject.currentConditionText = condition[0].languages[23].day_text;
  } else {
    weatherObject.currentConditionText = condition[0].languages[23].night_text;
  } ~~~плохой код~~~ */

  //!!! объект с данными для вывода
  const weatherObject = {
    locationName: jsonWeatherData.location.name,
    currentTemp_c: jsonWeatherData.current.temp_c,
    //!!! получение дневной ночной кондиции погоды тернарным оператором из отфильтрованного словаря
    currentConditionText: jsonWeatherData.current.is_day
      ? condition[0].languages[23].day_text
      : condition[0].languages[23].night_text,
  };
  //!!! вызов функции вывода
  drawWeatherCard(weatherObject);
}

async function getWeatherApi() {
  //!!! запрос api
  const respone = await fetch(
    `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${cityName}`
  );
  return await respone.json();
}

async function getConditionsDictonary() {
  const respone = await fetch(
    'https://www.weatherapi.com/docs/conditions.json'
  );
  return await respone.json();
}

function drawWeatherCard(weatherObject) {
  //!!! удаление старой карточки
  //weatherContainer.remove();
  //!!! добавление новой карточки с разметкро и данными из api
  main.innerHTML = `<div class="weather__container">
                        <span class="span__city">${weatherObject.locationName}</span>
                        <div class="weather__row">
                          <span class="span__temperature">${weatherObject.currentTemp_c}<sup class="units">°с</sup></span>
                          <img class="weather__img" src="./img/cloudy.svg" alt="weather" />
                        </div>
                        <span class="span__weather">
                          ${weatherObject.currentConditionText}
                        </span>
                      </div>`;
}
