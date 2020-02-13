const api = {
  key: "2416761b1a4e0e266b8e6bb58c037760",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
const button = document.querySelector(".click");

button.addEventListener("click", setQuery);

function setQuery() {
  getResults(searchbox.value);
  console.log(searchbox.value);
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      //console.log(weather.json());
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let pic = document.querySelector(".wthrPic");
  pic.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  let weather_desc = document.querySelector(".current .description");
  weather_desc.innerText = weather.weather[0].description;

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `LOW ${Math.round(
    weather.main.temp_min
  )}°f / HIGH ${Math.round(weather.main.temp_max)}°f`;

  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerText = ` wind speed at ${weather.wind.speed}  mph`;

  let windGusts = document.querySelector(".windGust");
  windGusts.innerText = ` Gusts @ ${weather.wind.gust}`;

  let pressHumid = document.querySelector(".press");
  pressHumid.innerText = ` pressure @ ${weather.main.pressure} millibars & humidity  @ ${weather.main.humidity} %`;

  let feelsLike = document.querySelector(".feels");
  feelsLike.innerText = ` Feels like ${weather.main.feels_like} °f`;
}

function dateBuilder(d) {
  let months = [
    "January",
    "Feburary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let day = days[d.getDay()];
  let date = d.getDate();
  let month = months[d.getMonth()];
  let year = d.getFullYear();

  return `${day} ${date} ${month} ${year}`;
}
