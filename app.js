//listening to when the whole page has loaded
window.addEventListener('load', ()=>{
  let long;
  let lat;
  let id;

  let temperatureDescription = document.querySelector('.temperature-description');
  let temperatureDegree = document.querySelector('.temperature-degree');
  let locationTimezone = document.querySelector('.location-timezone');
  let iconElement = document.querySelector('.icon');
  let temperatureSection = document.querySelector('.temperature');
  const temperatureSpan = document.querySelector('.temperature span')
  let windSpeed = document.querySelector('.wind-speed');
  let feelsLike = document.querySelector('.feels-like');
  let warningMessage = document.querySelector('.warning');

//checking if geolocation is enabled, otherwise display an alert
  if(navigator.geolocation){
    //getting longitude, latitude and id values from position to use then in api link
    navigator.geolocation.getCurrentPosition(position => {
      console.log(position);
      long = position.coords.longitude;
      lat = position.coords.latitude;
      id = position.id;

      //storing the api key 
      const key = "8f5fc1625d6f75b4bddfeb55a2ccac72";
      const proxy = `https://cors-anywhere.herokuapp.com/`;
      const api = `${proxy}http://api.openweathermap.org/data/2.5/weather?id=${id}&lat=${lat}&lon=${long}&appid=${key}&units=metric&type=like`

      //get variable values from api then covert it json 
      fetch(api)
        .then(response =>{
          return response.json();
        })


        .then(data =>{
          console.log(data);
          const {temp, feels_like} = data.main;
          const {description, icon} = data.weather[0];


          temperatureDegree.textContent = temp;

          if(temp >= 45){
              warningMessage.textContent = "WARNING: Temperature is too high. Drink enough water and avoid exposure to the sun alot to prevent heatstrokes";
          }else{
              warningMessage.textContent ="";
          }

          temperatureDescription.textContent = description;
          locationTimezone.textContent= data.name;
          windSpeed.textContent = data.wind.speed;
          feelsLike.textContent = feels_like;



          //displaying icons based on the current weather
          iconElement.innerHTML =
           `<img src="icons/${icon}.png"/>`;

          //converting from celsius to fahrenheit as the user clicks the temperature degree
          let fahrenheit = (temp * 9/5) + 32
          temperatureDegree.addEventListener('click', () =>{
            if(temperatureSpan.textContent === "°C"){
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = Math.floor(fahrenheit);

            }else{
              temperatureSpan.textContent = "°C";
              temperatureDegree.textContent = temp;
            }
          })

          
        })

    })

  }else{
    h1.textContent = "please enable geolocation to proceed"
  }


});
