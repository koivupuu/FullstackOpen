import axios from 'axios'
const baseUrl = 'https://studies.cs.helsinki.fi/restcountries/api'
const weatherUrl = 'https://api.openweathermap.org/data/3.0/onecall'
const api_key = import.meta.env.VITE_WEATHER_KEY

const getAll = () => {
    const request = axios.get(`${baseUrl}/all`)
    return request.then(response => response.data)
}

const getWeather = (lat, lng) => {
    const request = axios.get(`${weatherUrl}?lat=${lat}&lon=${lng}&exclude=minutely,hourly,daily,alerts&appid=${api_key}`)
    return request.then(response => response.data)
}

export default { getAll, getWeather}
