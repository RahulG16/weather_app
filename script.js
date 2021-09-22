const inputBar = document.querySelector(".input-bar");
const container = document.querySelector(".city-container");

async function fetchData(city) {
  let response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=904da8f4360ea75a68960b5595f5da69`
  );
  let data = await response.json();
  return data;
}

function displayInfo(city) {
  let file = fetchData(city);

  file.then((data) => {
    let weather = "";
    let climate = data.weather[0].main;
    // console.log(data);
    if (climate === "Rain") {
      weather = "./rainy.png";
    } else if (climate === "Clouds") {
      weather = "./cloud.png";
    } else if (climate === "Clear") {
      weather = "./sunny.png";
    } else if (climate === "Thunderstorm") {
      weather = "./storm.png";
    } else if (climate === "Snow") {
      weather = "./snowflake.png";
    } else if (climate === "Mist") {
      weather = "./fog.png";
    } else {
      weather = "./cloud.png";
    }

    return (container.innerHTML = `
    <p class="climate">${data.weather[0].description}</p>
    <p class="place">${data.name}</p>
    <p class="country-code">${data.sys.country}</p>
    <img src="${weather}" class="icon" alt="" />
    <div class="info">
      <p><i class="fas fa-wind"></i> ${data.wind.speed}m/s</p>
      <p><i class="fas fa-tachometer-alt"></i> ${data.main.pressure}hPa</p>
      <p><i class="fas fa-tint"></i>${data.main.humidity}%</p>
    </div>
    <p class="temp">${Math.floor(data.main.temp - 273.15)}°</p>
  `);
  });
}

function inputHandler(e) {
  if (e.key === "Enter") {
    let text = inputBar.value;
    displayInfo(text);
  }
}

inputBar.addEventListener("keydown", inputHandler);
