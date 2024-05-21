const container = document.querySelector(".container");
const search = document.querySelector(".search-box button");
const weatherBox = document.querySelector(".weather-box");
const weatherDetails = document.querySelector(".weather-details");

search.addEventListener("click", () => {
    const APIkey = '1e293232dd6c599bc4780de8892b9f66';
    const city = document.querySelector(".search-box input").value;
    if (city === "") return;

    fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}&units=metric`
    )
        .then((response) => response.json())
        .then((json) => {
            if (json.cod === "404") {
                alert("City not found");
                return;
            }

            const image = document.querySelector(`.weather-box img`);
            const temperature = document.querySelector(`.weather-box .temprature`);
            const description = document.querySelector(`.weather-box .description`);
            const humidity = document.querySelector(`.weather-details .humidity span`);
            const wind = document.querySelector(`.weather-details .wind span`);
            
            switch (json.weather[0].main) {
                case "Clear":
                    image.src = "images/sun and cloud.png";
                    break;
                case "Rain":
                    image.src = "images/rain-removebg-preview.png";
                    break;
                case "Snow":
                    image.src = "images/snow-removebg-preview.png";
                    break;
                case "Clouds":
                    image.src = "images/cloud-removebg-preview.png";
                    break;
                case "Mist":
                case "Haze":
                    image.src = "images/mist or haze.png";
                    break;
                default:
                    image.src = "images/cloud-removebg-preview.png";
            }
            
            temperature.innerHTML = `${Math.round(json.main.temp)}<span>°C</span>`;
            description.innerHTML = `${json.weather[0].description}`;
            humidity.innerHTML = `${json.main.humidity}%`;
            wind.innerHTML = `${parseFloat(json.wind.speed).toFixed(1)} Km/H`;
        })
        .catch((error) => {
            console.error("Error fetching weather data:", error);
        });
});
