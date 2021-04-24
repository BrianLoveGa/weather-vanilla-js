/// I should hide this api key but front end security is not my strong point yet
/// and it's a free account

/// and it's expired so no works no more

/// to get weather data for free
const api = {
  key: "2416761b1a4e0e266b8e6bb58c037760",
  base: "https://api.openweathermap.org/data/2.5/"
};

// the search box
let searchbox = document.querySelector(".search-box");
let destination = searchbox.value;
// let cleanSearch = destination.replace(/\s*,\s*/g, ",");

// the f system button
const buttonUS = document.querySelector(".click");
buttonUS.addEventListener("click", setQuery);

function setQuery() {
  getResults(destination);
  getForecast(destination);
  console.log("cleanSearch");
  console.log(destination);
}
// imperial in url for american units
function getResults(query) {
  fetch(`${api.base}weather?q=${query}&units=imperial&APPID=${api.key}`)
    .then(weather => {
      //console.log(weather.json());
      return weather.json();
    })
    .then(displayResults);
}
// the c system button (b/c life is about choices)
const buttonIntl = document.querySelector(".klick");
buttonIntl.addEventListener("click", goMetric);

function goMetric() {
  getMetricResults(searchbox.value); /// maybe not the best way to swap units but it works
  getForecast(searchbox.value); /// not using any digits so no need to swap this to metric
  console.log("searchbox.value");
  console.log(searchbox.value);
  console.log("the city should be near me");
}

// metric in same url as above. And forecast instead of weather at bottom of page... I should reduce / refactor them more but they are working
function getMetricResults(city) {
  fetch(`${api.base}weather?q=${city}&units=metric&APPID=${api.key}`)
    .then(weather => {
      //console.log(weather.json());
      return weather.json();
    })
    .then(displayMetricResults);
}

/// dom manip - lets show some forecst
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

  factSwap(); // learning is fun!
}
/// the same info with a c instead of f and a k instead of m .... or vice versa if you read this upside down...
function displayMetricResults(weather) {
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
  temp.innerHTML = `${Math.round(weather.main.temp)}<span>°c</span>`;

  let weather_el = document.querySelector(".current .weather");
  weather_el.innerText = weather.weather[0].main;

  let hilow = document.querySelector(".hi-low");
  hilow.innerText = `LOW ${Math.round(
    weather.main.temp_min
  )}°c / HIGH ${Math.round(weather.main.temp_max)}°c`;

  let windSpeed = document.querySelector(".windSpeed");
  windSpeed.innerText = ` wind speed at ${weather.wind.speed}  kph`;

  let windGusts = document.querySelector(".windGust");
  windGusts.innerText = ` Gusts @ ${weather.wind.gust}`;

  let pressHumid = document.querySelector(".press");
  pressHumid.innerText = ` pressure @ ${weather.main.pressure} millibars & humidity  @ ${weather.main.humidity} %`;

  let feelsLike = document.querySelector(".feels");
  feelsLike.innerText = ` Feels like ${weather.main.feels_like} °c`;

  factSwap(); // knowledge is power
}

/// since open weather api has such a lovely date format, let's make it more readable
/// and tie it to the users computer with js built in date function
// helper functions below

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

// because who doesn't like math and fun facts?
// in the middle of the weather page

const funFacts = document.querySelector(".fact");

const facts = [
  "Wind comes from changes in pressure.",
  "Cirrus clouds (the thin and wispy ones) are made of ice crystals.",
  "The average pressure at sea level is 1013.25 millibars.",
  "You can tell the temperature by counting a cricket’s chirps.",
  "A mudslide can carry rocks, trees, vehicles and entire buildings!",
  "About 2,000 thunderstorms rain down on Earth every minute.",
  "A 2003 heatwave turned grapes to raisins before they were picked from the vine!",
  "In 1972, a blizzard dumped 8m of snowfall on Iran, burying 200 villages.",
  "In 1684, it was so cold that the River Thames froze solid for two months.",
  "At any given time, on average there are about 1800 thunderstorms occurring on Earth with 100 lightning strikes per second.",
  "A cubic mile of ordinary fog contains less than a gallon of water.",
  "Snowflakes falling at 2-4 mph can take up to 1 hour to reach the ground."
];

function factSwap() {
  let n = Math.floor(Math.random() * 12);
  funFacts.innerText = facts[n];
}

/// forecast  / future weather below current

// get functions - 'merican
function getForecast(city) {
  fetch(`${api.base}forecast?q=${city}&units=imperial&APPID=${api.key}`)
    .then(forecast => {
      return forecast.json();
    })
    .then(displayResultsForecast);
}

// get metric - not needed unless we try to figure out how to get high and low since data is so ugly
// an array of 40 weather chunks - too much info for this little page
// function getMetricForecast(city) {
//   fetch(`${api.base}forecast?q=${city}&units=metric&APPID=${api.key}`)
//     .then(forecast => {
//       return forecast.json();
//     })
//     .then(displayMetricResultsForecast);
// }


// html elements to change
// functions to make the changes
function displayResultsForecast(forecast) {
  console.log(forecast);
  console.log(forecast.list);
  let tomorrow = document.querySelector(".tomorrow");

  tomorrow.innerText = `Tomorrow will be: ${forecast.list[6].weather[0].main}`;

  let twoDays = document.querySelector(".twoDays");
  twoDays.innerText = ` In two days it will be: ${forecast.list[15].weather[0].main}`
}

