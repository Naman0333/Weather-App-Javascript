// API key and URL for OpenWeatherMap API
// const apiKey = "ffbeeadebe5b6d47ee2318aa82cd257a"
const apiKey = "YOUR_API_KEY"
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';


// Get DOM elements
const searchBox = document.querySelector('.search input');
const searchBtn = document.querySelector('.search button');
const weatherIcon = document.querySelector('.weather-icon');


// Event listener for search button click
searchBtn.addEventListener('click', ()=>{
    const cityNameValue = searchBox.value.trim();
    checkWeather(cityNameValue);
})


// Function to fetch weather data
async function checkWeather(city){
    try{
        // Fetch weather data from API
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`)
        const data = await response.json();
        
        // If response is successful, update weather information
        if(response.ok){
            updateWeatherInfo(data);
            
            // Clear search input value
            searchBox.value = "";

        }
        else{
            alert('City not found. Please enter a valid city name.');

        }
    }
    catch(error){
        alert('An error occurred while fetching weather data.');
    }
}


// Function to update weather information in UI

function updateWeatherInfo(data){
    // Update weather icon
    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    // Update city name
    document.querySelector('.city').innerHTML = data.name;
    // Update temperature
    document.querySelector('.temp').innerHTML = `${Math.round(data.main.temp)}°C`;
    // Update humidity
    document.querySelector('.humidity').innerHTML = `${data.main.humidity}%`;
    // Update wind speed
    document.querySelector('.wind').innerHTML = `${data.wind.speed}Km/h`;
    // Display weather information container
    document.querySelector('.weather').style.display = 'block';
}


