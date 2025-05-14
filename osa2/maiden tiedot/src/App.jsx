import { useState, useEffect } from "react"
import countryServices from './services/countries'

function App() {

  useEffect(() => {
    countryServices
      .getAll()
      .then(countries => {
        setCountryList(countries)
      })
  }, []);

  const [countryInput, setCountryInput] = useState('');
  const [countryList, setCountryList] = useState([]);


  const handleInput = (event) => {
    setCountryInput(event.target.value)
  }

  return (
    <div>
      find countries
      <input onChange={handleInput}></input>
      <CountryList countryList={countryList} countryInput={countryInput} setCountryInput={setCountryInput} />
    </div>
  )
}

const CountryList = ({ countryList, countryInput, setCountryInput }) => {
  const countiresToShow = countryList
    .filter(({ name }) => name.common.toLowerCase().includes(countryInput.toLowerCase()))
    .map(country => <CountryListObject key={country.name.common} name={country.name.common} setCountryInput={setCountryInput} />)

  if (countiresToShow.length > 10) {
    return (
      <div>
        Too many matches, specify another filter
      </div>
    )
  }
  else if (countiresToShow.length === 1) {
    const countryToShow =
      countryList
        .find(({ name }) => name.common.toLowerCase().includes(countryInput.toLowerCase()))
    return (
      <CountryToShow countryToShow={countryToShow} />
    )
  } else {
    return (
      <div>
        {countiresToShow}
      </div>
    )
  }
}

const CountryToShow = ({ countryToShow }) => {
  const [weather, setWeather] = useState();
  const latitude = countryToShow.capitalInfo.latlng[0]
  const longitude = countryToShow.capitalInfo.latlng[1]

  useEffect(() => {
    countryServices
      .getWeather(latitude, longitude)
      .then(weather => {
        setWeather(weather)
      })
  }, []);

  const url = countryToShow.flags.svg
  if (weather) {
    const weather_url = `https://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png`
    return (
      <div>
        <h1>{countryToShow.name.common}</h1>
        <div>Capital {countryToShow.capital}</div>
        <div>Area {countryToShow.area}</div>
        <h2>Languages</h2>
        <ul>{Object.entries(countryToShow.languages).map(([key, language]) => <li key={key}>{language}</li>)}</ul>
        <img className="flag" src={url} />
        <h2>Weather in {countryToShow.capital}</h2>
        <div>Temperature {parseFloat(weather.current.temp - 273.15).toFixed(2)} Celsius</div>
        <img src={weather_url} />
        <div>Wind {weather.current.wind_speed} m/s</div>
      </div>
    )
  } else {
    return (
      <div></div>
    )
  }
}

const CountryListObject = ({ name, setCountryInput }) => {
  const handleCountry = () => {
    setCountryInput(name)
  }
  return (
    <li key={name}>{name} <button onClick={handleCountry}>Show</button> </li>
  )
}

export default App
