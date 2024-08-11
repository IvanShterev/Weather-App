
const cityName = document.getElementById('city-input');
const search = document.getElementById('search-btn');
const weatherDisplay = document.querySelector('.weather-display');
const additionalInfo = document.querySelector('.additional-info');
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '68269fc3b3505617b0e7a3d3203bbc9a';

search.addEventListener('click', () => {
    weatherDisplay.innerHTML = '';
    additionalInfo.innerHTML = '';
    let currentCity = cityName.value;
    cityName.value = '';

    async function checkWeather(){
        let res = await fetch(`${apiUrl}units=metric&q=${currentCity}&appid=${apiKey}`);
        let data = await res.json();
        console.log(data)

        let pictureWeather = document.createElement('img');
        if(data.weather[0].main == 'Clear'){
            pictureWeather.src = 'images/clear.png';
        }
        else if(data.weather[0].main == 'Clouds'){
            pictureWeather.src = 'images/clouds.png';
        }
        else if(data.weather[0].main == 'Drizzle'){
            pictureWeather.src = 'images/drizzle.png';
        }
        else if(data.weather[0].main == 'Mist'){
            pictureWeather.src = 'images/mist.png';
        }
        else if(data.weather[0].main == 'Rain'){
            pictureWeather.src = 'images/rain.png';
        }
        else if(data.weather[0].main == 'Snow'){
            pictureWeather.src = 'images/snow.png';
        }
        let temperature = document.createElement('span');
        let tempNum = data.main.temp.toString().split('');
        if(tempNum[1] != '.'){
            temperature.textContent = `${tempNum[0]}${tempNum[1]}°c`;
        } else {
            temperature.textContent = `${tempNum[0]}°c`;
        }
        temperature.id = 'temp';

        let city = document.createElement('span');
        city.textContent = currentCity;
        city.id = 'city';

        weatherDisplay.appendChild(pictureWeather);
        weatherDisplay.appendChild(temperature);
        weatherDisplay.appendChild(city);

        const humidityContainer = document.createElement('div');
        humidityContainer.classList.add('humidityAndWind');
        const humidityImg = document.createElement('img');
        humidityImg.id = 'humidityImg';
        humidityImg.src = 'images/humidity.png';
        const humidityNumTextContainer = document.createElement('div');
        humidityNumTextContainer.classList.add('NumTextContainer');
        let humidityNum = document.createElement('span');
        humidityNum.textContent = `${data.main.humidity}%`;
        humidityNum.id = 'humidityNum';
        const humidityText = document.createElement('span');
        humidityText.id = 'humidityText';
        humidityText.textContent = 'Humidity';

        const windContainer = document.createElement('div');
        windContainer.classList.add('humidityAndWind');
        const windImg = document.createElement('img');
        windImg.id = 'windImg';
        windImg.src = 'images/wind.png';
        const windNumTextContainer = document.createElement('div');
        windNumTextContainer.classList.add('NumTextContainer');
        let windNum = document.createElement('span');
        windNum.textContent = `${data.wind.speed} km/h`;
        windNum.id = 'windNum';
        const windText = document.createElement('span');
        windText.id = 'windText';
        windText.textContent = 'Wind Speed';

        humidityContainer.appendChild(humidityImg);
        humidityNumTextContainer.appendChild(humidityNum);
        humidityNumTextContainer.appendChild(humidityText);
        humidityContainer.appendChild(humidityNumTextContainer);

        windContainer.appendChild(windImg);
        windNumTextContainer.appendChild(windNum);
        windNumTextContainer.appendChild(windText);
        windContainer.appendChild(windNumTextContainer);

        additionalInfo.appendChild(humidityContainer);
        additionalInfo.appendChild(windContainer);
    }
    
    checkWeather();
});
