//Obtenemos los datos para la API
class Weather {
    constructor(city, countryCode) {
        this.apikey = '2c4f83af27b58ac98608cf8b4a80f78c';
        this.city = city;
        this.countryCode = countryCode;
    }


    async getWeather() {
        const URI = `https://api.openweathermap.org/data/2.5/weather?q=${this.city},${this.countryCode}&appid=${this.apikey}&units=metric`;
        const response = await fetch(URI);
        const data = await response.json();
        return data;
    }

    changeLocation(city, countryCode) {
        this.city = city;
        this.countryCode = countryCode;
    }
}

//Obtenemos DOM del HTML
class UI {
    constructor() {
        this.location = document.getElementById('weather-location');
        this.desc = document.getElementById('weather-description');
        this.string = document.getElementById('weather-string');
        this.humidity = document.getElementById('weather-humidity');
        this.wind = document.getElementById('weather-wind');
        this.image = document.getElementById('weather-image');
    }

    render(weather) {
        this.location.textContent = weather.name + ' / ' + weather.sys.country;
        this.desc.textContent = weather.weather[0].description;
        this.string.textContent = weather.main.temp + ' °C ';
        this.humidity.textContent = 'Humedad: ' + weather.main.humidity + '% ';
        this.wind.textContent = 'Viento: ' + weather.wind.speed + 'm/s ';
        this.image.setAttribute('src', 'http://openweathermap.org/img/wn/' + weather.weather[0].icon + '@2x.png');
    }
}
//Almacenamos los valores en localStorage
class Store {
    constructor() {
        this.city;
        this.countryCode;
        this.defaultCity = 'Kiev';
        this.defaultCountryCode = 'ua';
    }
    getLocationData() {
        if (localStorage.getItem('city') === null) {
            this.city = this.defaultCity;
        } else {
            this.city = localStorage.getItem('city');
        }

        if (localStorage.getItem('countryCode') === null) {
            this.countryCode = this.defaultcountryCode;
        } else {
            this.countryCode = localStorage.getItem('countryCode');
        }

        return {
            city: this.city,
            countryCode: this.countryCode
        }
    }
    setLocationData(city, countryCode) {
        localStorage.setItem('city', city);
        localStorage.setItem('countrycode', countryCode);
    }
}

const store = new Store();
const { city, countryCode } = store.getLocationData();
const ui = new UI();
const weather = new Weather(city, countryCode);

async function fetchWeather() {
    const data = await weather.getWeather();
    console.log(data);
    ui.render(data);
}

document.getElementById('changeWeather').addEventListener('click', (e) => {
    const city = document.getElementById('city').value;
    const countryCode = document.getElementById('countryCode').value;
    weather.changeLocation(city, countryCode);
    store.setLocationData(city, countryCode);
    fetchWeather();
})

document.addEventListener('DOMContentLoaded', fetchWeather);