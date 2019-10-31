$("#find-City").on("click", function () {
  event.preventDefault();
  var city = $("#searchTerm").val().trim();
  //  https://api.openweathermap.org/data/2.5/weather?q=denver&units=imperial&apikey=578ad2cb2ea2be81327aea87f120fe2e
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&apikey=578ad2cb2ea2be81327aea87f120fe2e";
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&apikey=578ad2cb2ea2be81327aea87f120fe2e";
  var uvindex = "http://api.openweathermap.org/data/2.5/uvi?appid=578ad2cb2ea2be81327aea87f120fe2e&lat=33.25&lon={lon}"

  console.log("below is the city")
  console.log(city)
 
  $.ajax({
    url: queryURL,
    method: 'GET'
  }).then(function (response) {
    console.log('weather', response)
    console.log("test:", response.weather[0].main);
    console.log(response.main.temp);
    console.log(response.wind.speed);
    $("#city").text(response.name)
    $("#temp").text(response.main.temp)
    $("#humidity").text(response.main.humidity)
    $("#w-speed").text(response.wind.speed)
    $("#searchTerm").val("")

  });

  $.ajax({
    url: forecastURL,
    method: 'GET'
  }).then(function (response) {
   
    console.log('forecast', response)
   
    var city = response.city.name;
    

    for (var i = 4; i < response.list.length; i += 8) {
      var temp = response.list[i].main.temp
      console.log("temp", temp);
      var icon = response.list[i].weather[0].icon
      console.log("icon", icon);
      var humidity = response.list[i].main.humidity
      console.log("humidity", humidity);
      var date = response.list[i].dt_txt.split(" ")[0]
      var maindiv = $("<div>").addClass("col-2")
      var card = $("<div>").addClass("card")
      var cardbody = $("<div>").addClass("card-body")
      var title = $("<h5>").addClass("card-title")
      title.text(date);
     
      var tempText = $("<p>").text("Temp: " + temp);
      var humidityText = $("<p>").text("Humidity: " + humidity);
      var iconImg =$("<img>").attr("src", "http://openweathermap.org/img/w/" + icon + ".png")

      cardbody.append(title, tempText, humidityText,iconImg)
      card.append(cardbody);
      maindiv.append(card);
      $("#five-day").append(maindiv);

    }
  });

  $.ajax({
    url: URL,
    method: 'GET'
  }).then(function (response) {
    console.log("uv-index", response)
})
})