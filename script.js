const url =
	'https://api.openweathermap.org/data/2.5/weather';
const apiKey =
	'f00c38e0279b7bc85480c3fe775d518c';

$(document).ready(function () {
	weatherFn('Pune');
});

async function weatherFn(cName) {
    console.log("Entered the fn");
	const temp =
		`${url}?q=${cName}&appid=${apiKey}&units=metric`;
	try {
		const res = await fetch(temp);
		const data = await res.json();
		if (res.ok) {
			weatherShowFn(data);
		} else {
			alert('City not found. Please try again.');
		}
	} catch (error) {
		console.error('Error fetching weather data:', error);
	}
}

function weatherShowFn(data) {
	const timezoneOffset = data.timezone;
	const utcTime = new Date(); // Current UTC time 
    const localTime = new Date(utcTime.getTime() + timezoneOffset * 1000);
    const hours = localTime.getUTCHours();
	const card = document.querySelector('.card-body');

	const formattedTime = localTime.toUTCString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        });
	
	
	switch(data.weather[0].main){
			case 'Clouds':
				src = "images/cloud.png";
				break;
			case 'Clear':
				src = "images/clear.png";
				break;
			case 'Rain':
				src = "images/rain.png";
				break;
			case 'Mist':
				src = "images/mist.png";
				break;
			case 'Snow':
				src = "images/snow.png";
				break;
			
	}   
	document.querySelector('#date').innerHTML = `${formattedTime}`;
	$('#city-name').text(data.name);
	$('#temperature').
		html(`${data.main.temp}°C`);
	$('#description').
		text(data.weather[0].description);
	$('#wind-speed').
		html(`Wind Speed: ${data.wind.speed} m/s`);
	$('#weather-icon').
		attr('src',
			src);
	// $('#weather-info').fadeIn();

	

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
}
