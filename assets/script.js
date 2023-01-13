const key = "29a67ac11f6f49d8a7cb3c8a5ecd2cf3";
const wrapper = document.querySelector(".wrapper"),
  section_input = wrapper.querySelector(".section_input"),
  info = section_input.querySelector(".info"),
  inputfield = section_input.querySelector("input"),
  humidity = document.querySelector("#humidity"),
  temp = document.querySelector("#temp"),
  comment = document.querySelector("#comment"),
  locationbutton = document.querySelector("button"),
  cityName = document.querySelector("#region"),
  weatherimg = document.querySelector(".weather img");
document.getElementById("notFound").style.display = "none";
document.getElementById("weather").style.display = "none";

inputfield.addEventListener("keyup", (e) => {
  if (e.key == "Enter" && inputfield.value != "") {
    requestApi(inputfield.value);
  }
});

function requestApi(city) {
  fetch(
    `https://api.weatherbit.io/v2.0/forecast/daily?city=${city}&units=m&days=5&key=${key}`
  )
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      if (json.data) {
        document.getElementById("notFound").style.display = "none";
        document.getElementById("weather").style.display = "block";
        cityName.innerHTML = json.city_name;
        document.getElementById(
          "weatherimg"
        ).src = `https://www.weatherbit.io/static/img/icons/${json.data[0].weather.icon}.png`;
        comment.innerHTML = json.data[0].weather.description;
        temp.innerHTML = json.data[0].temp + "°c";
        humidity.innerHTML = json.data[0].rh + "%";
      } else {
        document.getElementById("weather").style.display = "none";
        document.getElementById("notFound").style.display = "block";
      }
    });
}

locationbutton.addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(onSuccess);
    function onSuccess(position) {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const options = {
        method: "GET",
        headers: {
          "X-RapidAPI-Host": "geocodeapi.p.rapidapi.com",
          "X-RapidAPI-Key":
            "74b7fa0b4fmshc678ad4b44aa16bp1410a2jsnaef7c54639da",
        },
      };
      fetch(
        `https://geocodeapi.p.rapidapi.com/GetNearestCities?latitude=${lat}&longitude=${long}&range=0`,
        options
      )
        .then((response) => response.json())
        .then((json) => {
          console.log(json);
          requestApi(json[0].City);
        });
    }
  } else {
    alert("Your browser does not support geolocation");
  }
});
