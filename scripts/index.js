let API_key = "695638d80acdfb03cba47e2d9be48680";

let tempData = [];

//geoloaction...................................................................................//

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
    navigator.geolocation.getCurrentPosition(function success(position) {
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

//check weekdays..........................................................................//

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
    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

//append5days.............................................................................//

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
  sunset.style.color = "#2b619e";

  let sunrise = document.getElementById("sunrise");
  sunrise.innerText = sunsetTime;
  sunrise.style.color = "#2b619e";

  let cityTemp = document.getElementById("city_temp");
  cityTemp.innerText = data.city.name;

  GetHumidity(data.list[0]);

  for (let i = 0; i < 7; i++) {
    const element = data.list[i];
    tempData.push(Math.floor(data.list[i].main.temp));
    console.log(data.list[i].main.temp);

    document.getElementById("day" + (i + 1) + "Min").innerHTML =
      Number(element.main.temp_min) + " °C";

    document.getElementById("day" + (i + 1) + "Max").innerHTML =
      Number(element.main.temp_max) + " °C";

    document.getElementById(
      "img" + (i + 1)
    ).src = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;

    document.getElementById("day" + (i + 1)).innerText = weekDays[CheckDay(i)];
  }

  myChart.update();
}

//humidity................................................................//

function GetHumidity(data) {
  let humidity = document.getElementById("humidity");
  humidity.innerText = data.main.humidity + "%";
  humidity.style.color = "#2b619e";

  let pressure = document.getElementById("pressure");
  pressure.innerText = data.main.pressure + " hpa";
  pressure.style.color = "#2b619e";

  let temp = document.getElementById("temp");
  temp.innerText = data.main.temp + "°C";

  let weather_type = document.getElementById("weather_type");
  weather_type.innerText = data.weather[0].main;

  let weather_desc = document.getElementById("weather_desc");
  weather_desc.innerText = data.weather[0].description;

  let weather_img = document.getElementById("weather_img");
  weather_img.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
}

let search = document.getElementById("search-bar");
let searchBtn = document.getElementById("searchBtn");
searchBtn.addEventListener("click", () => {
  getWeatherData(search.value);
});

// chart.js------------------------------------------------------------------------------------------//

const ctx = document.getElementById("myChart").getContext("2d");

const myChart = new Chart(ctx, {
  type: "line",
  data: {
    labels: ["9:am", "12:pm", "3:pm", "6:pm", "9:pm", "12:am"],
    datasets: [
      {
        label: "Tempreature",

        data: tempData,
        backgroundColor: [
          "#ff3c69",
          "#ff3c69",
          "#ff3c69",
          "#ff3c69",
          "#ff3c69",
          "#ff3c69",
          "#ff3c69",
          "#ff3c69",
        ],
        borderColor: [
          "#2b619e",
          "#2b619e",
          "#2b619e",
          "#2b619e",
          "#2b619e",
          "#2b619e",
          "#2b619e",
          "#2b619e",
        ],
        borderWidth: 2,
      },
    ],
  },
});
