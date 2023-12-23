import { useState } from "react";
import axios from "axios";

const API_key = import.meta.env.VITE_API_KEY

function App() {
  const [nameCountri, setNameCountri] = useState("");
  const [countries, setCountries] = useState([]);
  const [temperature, setTemperature] = useState({});

  const onNameCountri = (event) => {
    const newNameCountri = event.target.value;
    setNameCountri(newNameCountri);
    if (!newNameCountri) return;
    getApi(newNameCountri)
  };

  const getApi = (name) => { 
    axios
      .get(`https://restcountries.com/v3.1/name/${name}`)
      .then((response) => {
        const data = response.data;
        if(data.length==1){
          wheaterCapital(data[0].capitalInfo)
        }
        setCountries(data);
      });
   }

  const onPresCountri = (name) => {
    getApi(name)
  };

  const wheaterCapital = (capitalInfo) => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?lat=${capitalInfo.latlng[0]}&lon=${capitalInfo.latlng[1]}&appid=${API_key}`
      )
      .then((response) => {
        const data = response.data;
        const temp = {
          temperature: parseInt(data.main.temp - 273),
          icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
          wind: `Wind: ${data.wind.speed} m/s `,
        };
        setTemperature(temp);
      });
  };

  return (
    <>
      <div>
        Find Countries: <input value={nameCountri} onChange={onNameCountri} />
      </div>
      {countries.length > 10 ? (
        "To many maches, specify another filer"
      ) : countries.length === 1 ? (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>capital: {countries[0].capital[0]}</p>
          <p>Population: {countries[0].population}</p>
          <h2>Languages</h2>
          <ul>
            {Object.values(countries[0].languages).map((element) => (
              <li key={element}>{element}</li>
            ))}
          </ul>
          <img src={countries[0].flags.svg} alt={countries[0].flags.alt} />

          <h1>Weather in {countries[0].capital[0]}</h1>

          {temperature && (
            <div>
              <p>temperature: {temperature.temperature} °C</p>
              <img src={temperature.icon} alt="" />
              <p>{temperature.wind}</p>
            </div>
          )}
        </div>
      ) : (
        countries.map((coutri) => (
          <p key={coutri.name.official}>
            {coutri.name.common}{" "}
            <button onClick={() => onPresCountri(coutri.name.common)}>
              show
            </button>
          </p>
        ))
      )}
    </>
  );
}

export default App;
