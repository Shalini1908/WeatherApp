let API_key = "695638d80acdfb03cba47e2d9be48680";

let searchbtn = document.getElementById("search-bar");
searchbtn.addEventListener("submit", getWeather);

searchbtn.addEventListener("submit", getWeather5days);

async function getWeather() {
  let city = document.getElementById("search-bar").value;

  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`
    );
    // console.log("res:", res);
    let data = await res.json();

    showWeatherData(data);
    // showWeatherData(data.list)
    // console.log("data:", data);
  } catch (error) {
    console.log("error:", error);
  }
}

// fetch for 5 days
async function getWeather5days() {
  let city = document.getElementById("search-bar").value;
//   console.log("days:", city);

  try {
    let res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_key}&units=metric`
    );
    let Fivedays = await res.json();
    // console.log("Fivedays:", Fivedays);
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
  for (let i = 0; i < 7; i++) {
    const element = data.list[i];

    document.getElementById("day" + (i + 1) + "Min").innerHTML =
      Number(element.main.temp_min) + " °C";

    document.getElementById("day" + (i + 1) + "Max").innerHTML =
      Number(element.main.temp_max) + " °C";

    document.getElementById(
      "img" + (i + 1)
    ).src = `http://openweathermap.org/img/wn/${element.weather[0].icon}.png`;

    // document.getElementById("weatherdata").innerText = element.weather[0].main;

    document.getElementById("day" + (i + 1)).innerText = weekDays[CheckDay(i)];

    
  }
}

document
  .getElementById("search-bar")
  .addEventListener("keypress", function (event) {
    if (event.key == "Enter") {
      getWeather();
      getWeather5days();
    }
  });



function showWeatherData(data) {
     console.log(data);
   let container = document.getElementById("tempAndstatus");
//    container.innerHTML=null
   let div=document.createElement("div");
   let temp = document.createElement("h1");
   temp.innerText=`${data.main.temp}°C`
   let tem = document.createElement("h1");
   tem.innerText=data.weather[0].main

    div.append(temp,tem)
    container.append(div);
    
}
