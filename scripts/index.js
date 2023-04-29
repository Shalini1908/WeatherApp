let API_key = "695638d80acdfb03cba47e2d9be48680";

let searchbtn = document.getElementById("searchbtn");
searchbtn.addEventListener("click", getWeather);

searchbtn.addEventListener("click", getWeather5days);

async function getWeather() {
  let city = document.getElementById("search-bar").value;

  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    );
    console.log("res:", res);
    let data = await res.json();
    appendData(data);

    console.log("data:", data);
  } catch (error) {
    console.log("error:", error);
  }
}

// fetch for 5 days
async function getWeather5days() {
  let city = document.getElementById("search-bar").value;
  console.log("days:", city);

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
    console.log("getDay:", d.getDay());

    return day + d.getDay() - 7;
  } else {
    return day + d.getDay();
  }
}

function append5days(data) {
  for (let i = 0; i < 7; i++) {
    const element = data.list[i];

    document.getElementById("day" + (i + 1) + "Min").innerHTML =
      "Min:" + Number(element.main.temp_min) + " °C";

    document.getElementById("day" + (i + 1) + "Max").innerHTML =
      "Max:" + Number(element.main.temp_max) + " °C";

    document.getElementById(
      "img" + (i + 1)
    ).src = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;

    document.getElementById("weatherdata").innerText = element.weather[0].main;

    document.getElementById("day" + (i + 1)).innerText = weekDays[CheckDay(i)];
  }
}

// function search(){
//      city=document.getElementById("search").value
//     // console.log(city)
//     DisplayData(city)
// }

document
  .getElementById("search-bar")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      getWeather();
      getWeather5days();
    }
  });

function showWeatherData(data) {
  let container = document.getElementById("maxmin");

  container.innerHTML = null;

  data.forEach((el) => {
    let card = document.createElement("div");

    let tempMax = document.createElement("p");
    tempMax.innerText = el.main.temp_max;
    tempMax.style.marginRight = "8px";

    let tempMin = document.createElement("p");
    tempMin.innerText = el.main.temp_min;

    container.append(card);
    card.append(tempMax, tempMin);
  });
}
