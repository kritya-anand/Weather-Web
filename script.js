//defining all the required data
const menuBtn = document.querySelector('.menu-btn');
const navlinks = document.querySelector('.nav-links');
const inputBox = document.querySelector('.city-input');
const searchbtn = document.getElementById('.city-input-button');
const temperature = document.querySelector('.temperature');
const humidity = document.querySelector('.humidity');
const windspeed = document.querySelector('.wind-speed');
const cname = document.querySelector('.city-name');
const weatherimg = document.querySelector('.weather-icon');
const weather_body = document.querySelector('.weatherbox');
const location_not_found = document.querySelector('.location-not-found');
const card = document.querySelector('.container');
const temptoggle = document.getElementById('temptoggle');
const searchbar = document.querySelector('.searchbar');

menuBtn.addEventListener('click',()=>{
    navlinks.classList.toggle('mobile-menu');
})
//creating a function to check weather using API
async function checkweather(city){
    const apiKey="f345ca3ae47a8d3e4ccbdf84450197b3";
    const apiUrl= `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const weather_data = await fetch(`${apiUrl}`).then(response => response.json());

    //city not found
    if(weather_data.cod === `404`){
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        card.style.background = 'linear-gradient(135deg, #654ea3, #eaafc8)';
        console.log("error");
        return;
    }

    const tempC = Math.round(weather_data.main.temp - 273.15); //temperature in Celsius
    const tempF = Math.round(tempC*9/5 +32); 
    humidity.innerHTML = `Humidity: ${weather_data.main.humidity}%`; //humidity
    windspeed.innerHTML = `Wind Speed: ${weather_data.wind.speed} Km/H`;//windspeed
    cname.innerHTML = `${weather_data.name}`;
    const timezoneOffset = weather_data.timezone; 


    console.log("run");
    weather_body.style.display = "flex";
    location_not_found.style.display = "none";
    temptoggle.checked=false;

    temperature.innerHTML = `Temperature: ${tempC}°C`;  
    temptoggle.addEventListener("change", () => {  //toggle between F and C
        if (temptoggle.checked) {
            temperature.innerHTML = `Temperature: ${tempF}°F`;
        } else {
            temperature.innerHTML = `Temperature: ${tempC}°C`;
        }
    });
    
    //different images according to weather conditions
    switch(weather_data.weather[0].main){
        case 'Clouds':
            weatherimg.src = "images/cloud.png";
            break;
        case 'Clear':
            weatherimg.src = "images/clear.png";
            break;
        case 'Rain':
            weatherimg.src = "images/rain.png";
            break;
        case 'Mist':
            weatherimg.src = "images/mist.png";
            break;
        case 'Snow':
            weatherimg.src = "images/snow.png";
            break;
        
}   

    // Calculate local time
    const utcTime = new Date(); // Current UTC time 
    const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
    const hours = localTime.getUTCHours();
    

    // Update time display
    const formattedTime = localTime.toUTCString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        });

    document.querySelector('.date').innerHTML = `${formattedTime}`;

// Change background color based on the time of day
    if (parseInt(hours) >= 5 && parseInt(hours) < 12) {
        card.style.background = 'linear-gradient(135deg, #ffcc70, #ff7e5f)';
    } 
    else if (parseInt(hours) >= 12 && parseInt(hours) < 17) {
        card.style.background = 'linear-gradient(120deg, #00c6ff, #0072ff)';
    } 
    else if (parseInt(hours) >= 17 && parseInt(hours) < 20) {
        card.style.background = 'linear-gradient(135deg, #ff9a9e, #fad0c4)'; // Evening: Orange
    } 
    else {
        card.style.background= 'linear-gradient(180deg, #2c3e50, #4ca1af)';

    }
    console.log(weather_data);
    
}


searchbtn.addEventListener('click', ()=>{
    checkweather(inputBox.value);
});
