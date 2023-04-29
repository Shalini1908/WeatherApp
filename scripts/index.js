let API_key = "695638d80acdfb03cba47e2d9be48680";

let searchbtn = document.getElementById("search-bar");
searchbtn.addEventListener("oninput", getWeather);

searchbtn.addEventListener("oninput", getWeather5days);

async function getWeather() {
  //   let city = document.getElementById("search-bar").value;

  try {
    let query = document.getElementById("search-bar").value;

    try {
      let res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_key}&units=metric`
      );
      let result = await res.json();
   console.log("res",result);
      getWeather5days();
      showWeatherData(result);
    } catch (error) {
      console.log("error:", error);
    }
  } catch (e) {
    console.log(e);
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
    let main=document.getElementById("curve");

    let d = document.createElement("div");
    d.style.display="flex"
    let sunset = document.createElement("h1");
    sunset.innerText =`Sunset: ${data.city.sunset}`;

    let sunrise = document.createElement("h1");
    sunrise.innerText =`Sunrise: ${data.city.sunrise}`;

    d.append(sunrise,sunset);
    main.append(d);


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



let id;

let debouncing = (func, time) => {
  if (id) {
    clearTimeout(id);
  }

  id = setTimeout(() => {
    func();
  }, time);
};

function showWeatherData(data) {
   
  let container = document.getElementById("tempAndstatus");
  let main=document.getElementById("curve");
  //    container.innerHTML=null
  let div = document.createElement("div");
  let temp = document.createElement("h1");
  temp.innerText = `${data.main.temp}°C`;
  let tem = document.createElement("h1");
  tem.innerText = data.weather[0].main;

  
  div.append(temp, tem);
  container.append(div);
  
    let d = document.createElement("div");
    d.style.display="flex"
    d.style.justifyContent="space-around"
  
    let pressure = document.createElement("h2");
    pressure.innerText =`Pressure : ${data.main.pressure} hpa`;

    let humidity = document.createElement("h2");
    humidity.innerText =`Humidity: ${data.main.humidity} %`;

    d.append(pressure,humidity);
    main.append(d)

}






