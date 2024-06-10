document.addEventListener('DOMContentLoaded', () => {
    const cityElement = document.getElementById('city');
    const tempElement = document.getElementById('temp');
    const humidityElement = document.getElementById('humidity');

    if (!cityElement || !tempElement) {
        console.error('City or temperature element not found in the document.');
        return;
    }

    if ('geolocation' in navigator) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const apiKey = '2e3868d6df7e06f9d23edf21aa443453';  // Replace with your actual API key
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
            
            try {
                const response = await fetch(apiUrl);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                
                const city = data.name;
                const temperature = data.main.temp;
                const humidity = data.main.humidity;
                
                cityElement.textContent = city;
                tempElement.textContent = `${temperature.toFixed(1)}°C`;
               humidityElement.textContent =`${ humidity}%`;
            } catch (error) {
                cityElement.textContent = 'Unable to fetch data';
                tempElement.textContent = '--°C';
                console.error('Error fetching weather data:', error);
            }
        }, error => {
            cityElement.textContent = 'Location access denied';
            tempElement.textContent = '--°C';
            console.error('Geolocation error:', error);
        });
    } else {
        cityElement.textContent = 'Geolocation not supported';
        tempElement.textContent = '--°C';
    }
});
