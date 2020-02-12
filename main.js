const api = {
  key: "2416761b1a4e0e266b8e6bb58c037760",
  base: "https://api.openweathermap.org/data/2.5/"
};

const searchbox = document.querySelector(".search-box");
const button = document.querySelector(".click");
searchbox.addEventListener("keypress", setQuery);
button.addEventListener("click", setQuery);

function setQuery(evt) {
  if (evt.keyCode == 13) {
    getResults(searchbox.value);
    console.log(searchbox.value);
  } else {
    getResults(searchbox.value);
    console.log(searchbox.value);
  }
}

function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      console.log(weather.json());
      return weather.json();
    })
    .then(displayResults);
}

function displayResults(weather) {
  // console.log(weather);
  let city = document.querySelector(".location .city");
  city.innerText = `${weather.name}, ${weather.sys.country}`;

  let now = new Date();
  let date = document.querySelector(".location .date");
  date.innerText = dateBuilder(now);

  let temp = document.querySelector(".current .temp");
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°f</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `LOW ${Math.round(
    weather.main.temp_min
  )}°f / HIGH ${Math.round(weather.main.temp_max)}°f`;
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
