var button = document.querySelector('.button');
var inputValue = document.querySelector('.inputValue');
var name = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');

var apiKey = '34da8f37bb9ed34e9c200c6bc96a2047';

button.addEventListener('click', function() {
  var url = 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=' + apiKey;
  fetch(url)
    .then(response => {
      if (!response.ok) {
        // make the promise be rejected if we didn't get a 2xx response
        //404-es válasz is válasz, azt nem kapja el a catch...
        //meg kell vizsgálni a választ, és kivételt dobni, hogy a catch elkapja
        const err = new Error("Not 2xx response");
        err.response = response.json();
        throw err;
      } else {
        return response.json();
      }
    })
    //.then(response => response.json())
    .then(data => console.log(data))
    .catch(err => {
      //Ha nem jött válasz:
      if (err.response == undefined) {
        console.log("[ERROR] " + err.message)
      } else {  //Ha jött válasz, de hibás (pl. 404 status code)
        console.log("[WARNING] " + err.message);
        err.response.then(data => console.log("[WARNING] Server responsed: " + data.cod + ', ' + data.message));
        //err.response.then(data => console.log(data));
      }
    });
});




