let API_key = "695638d80acdfb03cba47e2d9be48680";

function ipLookUp() {
  fetch("http://ip-api.com/json")
    .then((response) => response.json())
    .then((data) => {
      console.log("User's Location Data is ", data);
      getWeatherData(data.city);
    })
    .catch((error) => console.error("Request failed", error));
}

function getLocation() {
  if ("geolocation" in navigator) {
    // check if geolocation is supported/enabled on current browser
    navigator.geolocation.getCurrentPosition(function success(position) {
      // for when getting location is a success
      ipLookUp();
    });
  } else {
    console.log("geolocation is not enabled on this browser");
  }
}

getLocation();

async function getWeatherData(city) {
  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`
    );
    let Fivedays = await res.json();
    console.log("Fivedays:", Fivedays);
    append5days(Fivedays);
  } catch (error) {
    console.log("error:", error);
  }
}

const d = new Date();
const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function CheckDay(day) {
  if (day + d.getDay() > 6) {
    // console.log("getDay:", d.getDay());

    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

function append5days(data) {
  console.log("append data", data);
  const sunriseTimestamp = data.city.sunset;
  const sunsetTimestamp = data.city.sunrise;

  const sunriseDate = new Date(sunriseTimestamp * 1000);
  const sunsetDate = new Date(sunsetTimestamp * 1000);

  const sunriseTime = sunriseDate.toLocaleTimeString();
  const sunsetTime = sunsetDate.toLocaleTimeString();

  let sunset = document.getElementById("sunset");
  sunset.innerText = sunriseTime;

  let sunrise = document.getElementById("sunrise");
  sunrise.innerText = sunsetTime;

  let cityTemp = document.getElementById("city_temp");
  cityTemp.innerText = data.city.name;

  GetHumidity(data.list[0]);

  for (let i = 0; i < 7; i++) {
    const element = data.list[i];

    document.getElementById("day" + (i + 1) + "Min").innerHTML =
      Number(element.main.temp_min) + " °C";

    document.getElementById("day" + (i + 1) + "Max").innerHTML =
      Number(element.main.temp_max) + " °C";

    document.getElementById(
      "img" + (i + 1)
    ).src = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;

    document.getElementById("day" + (i + 1)).innerText = weekDays[CheckDay(i)];
  }
}

function GetHumidity(data) {
  let humidity = document.getElementById("humidity");
  humidity.innerText = data.main.humidity + "%";
  let pressure = document.getElementById("pressure");
  pressure.innerText = data.main.pressure + " hPa";
  let temp = document.getElementById("temp");
  temp.innerText = data.main.temp + " C";
  let weather_type = document.getElementById("weather_type");
  weather_type.innerText = data.weather[0].main;
  let weather_desc = document.getElementById("weather_desc");
  weather_desc.innerText = data.weather[0].description;
}

let search = document.getElementById("search-bar");
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  // console.log(search.value);
  getWeatherData(search.value);
});

// ------------------------------------------------------------------------------------------

