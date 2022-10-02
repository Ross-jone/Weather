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
  fetch(`https://weatherdbi.herokuapp.com/data/weather/${city}`)
    .then((response) => response.json())
    .then((json) => {
      if (json.currentConditions) {
        document.getElementById("notFound").style.display = "none";
        document.getElementById("weather").style.display = "block";
        cityName.innerHTML = json.region;
        document.getElementById(
          "weatherimg"
        ).src = `./assets/weatherimg/${json.currentConditions.comment}.png`;
        comment.innerHTML = json.currentConditions.comment;
        temp.innerHTML = json.currentConditions.temp.c + "°c";
        humidity.innerHTML = json.currentConditions.humidity;
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
