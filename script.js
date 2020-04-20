//-----------------------for the time ------------------------------

function leadingZero(time) {
    if (time <= 9) {
        time = "0" + time;
    }
    return time;
}

function updateTime(){
  var date = new Date();


months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

  // document.querySelector("#Time h2").innerHTML = Date.getUTCHours() + ":" + minute + ":" + second;
  document.querySelector("#Time h3").innerHTML = leadingZero(date.getHours()) + ":" + leadingZero(date.getMinutes()) + ":" + leadingZero(date.getSeconds());
  document.querySelector("#Time h4").innerHTML = days[date.getDay()] + "-" + months[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
}

// updateTime()
setInterval(updateTime, 10);

// -------------------------For the weather------------------------------
function rnd(x,p) {
  return Math.round(x*100)/100;
}

function weatherBalloon( ) {
  var key = '5e7f764b378e6d752dd86373d0d0cb74';
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Saskatoon' + '&appid=' + key)
  .then(function(resp) { return resp.json() }) // Convert data to json
  .then(function(data) {
    console.log(data);
    updateWeather(data)
  })
  .catch(function() {
    // catch any errors
  });
}


function updateWeather(data){
  var celcius = rnd(parseFloat(data.main.temp)-273.15);
  var celcius_feel = rnd(parseFloat(data.main.feels_like)-273.15);

  // -----Temparature
  document.querySelector("#temp").innerHTML = celcius + "&deg;" + "C";
  document.querySelector("#feel").innerHTML = "Feels like " + celcius_feel + "&deg;" + "C";
  document.querySelector("#celcius").onclick = function () {
    var celcius = rnd(parseFloat(data.main.temp)-273.15);
    var celcius_feel = rnd(parseFloat(data.main.feels_like)-273.15);

    document.querySelector("#temp").innerHTML = celcius + "&deg;" + "C";
    document.querySelector("#feel").innerHTML = "Feels like " + celcius_feel + "&deg;" + "C";
  }

  document.querySelector("#fahrenheit").onclick = function () {
    var fahrenheit = rnd(((parseFloat(data.main.temp)-273.15)*1.8)+32);
    var fahrenheit_feel = rnd(((parseFloat(data.main.feels_like)-273.15)*1.8)+32);
    document.querySelector("#temp").innerHTML = fahrenheit + "&deg;" + "F";
    document.querySelector("#feel").innerHTML = "Feels like " + fahrenheit_feel + "&deg;" + "F";
  }

  document.querySelector("#kelvin").onclick = function () {
    document.querySelector("#temp").innerHTML = rnd(parseFloat(data.main.temp)) + "K";
    document.querySelector("#feel").innerHTML = "Feels like " + rnd(parseFloat(data.main.feels_like)) + "K";
  }

  // ---------Condition
  function direction(deg){
    if(deg >= 348.75 || deg < 11.25 ){
      return 'N'
    }
    else if (deg >= 11.25 && deg < 33.75) {
      return 'NNE'
    }
    else if (deg >= 33.75 && deg < 56.25) {
      return 'NE'
    }
    else if (deg >= 56.25 && deg < 78.75) {
      return 'ENE'
    }
    else if (deg >= 78.75 && deg < 101.25) {
      return 'E'
    }
    else if (deg >= 101.25 && deg < 123.75) {
      return 'ESE'
    }
    else if (deg >= 123.75 && deg < 146.25) {
      return 'SE'
    }
    else if (deg >= 146.25 && deg < 168.75) {
      return 'SSE'
    }
    else if (deg >= 168.75 && deg < 191.25) {
      return 'S'
    }
    else if (deg >= 191.25 && deg < 213.75) {
      return 'SSW'
    }
    else if (deg >= 213.75 && deg < 236.25) {
      return 'SW'
    }
    else if (deg >= 236.25 && deg < 258.75) {
      return 'WSW'
    }
    else if (deg >= 258.75 && deg < 281.25) {
      return 'W'
    }
    else if (deg >= 281.25 && deg < 303.75) {
      return 'WNW'
    }
    else if (deg >= 303.75 && deg < 326.25) {
      return 'NW'
    }
    else if (deg >= 326.25 && deg < 348.75) {
      return 'NNW'
    }
  }
  document.querySelector("#cond").innerHTML = data.weather[0].main;
  document.querySelector("#cond-desc").innerHTML =  data.weather[0].description;

  var iconurl = "http://openweathermap.org/img/w/" + data.weather[0].icon + ".png";
  document.getElementById("cond-icon").src = iconurl
  document.querySelector("#wind-speed").innerHTML = "Wind-speed: " + rnd(parseFloat(data.wind.speed)*3.6) + " km/h";
  document.querySelector("#wind-direction").innerHTML = "Wind-direction: " + direction(rnd(parseFloat(data.wind.deg)));

}





weatherBalloon();
