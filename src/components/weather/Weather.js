import React, { Component } from 'react';
import axios from 'axios';
import cloud from './image/cloud.png';
import Mist from './image/Mist.png';
import Rain from './image/rain.png';
import Thunderstorm from './image/cloud_thunderStorm.png';
import './weather.css';

let lodash = require('lodash');
const WEATHER_KEY = process.env.REACT_APP_WEATHER_API_KEY;

class Weather extends Component {
  constructor(props) {
    super(props);

    this.state = { 
      weatherData: [],
      zipCode: ''
     }
     this.updateNewWeather = this.updateNewWeather.bind(this);
  }

  updateNewWeather() {
    let { zipCode } = this.state;
    axios.get(`https://api.openweathermap.org/data/2.5/weather?zip=${ zipCode },us&APPID=${WEATHER_KEY}`)
    .then((response) => this.setState({ weatherData: response.data }))
  };

  render() { 
    let { weatherData } = this.state;
    let mainLayerWeather = weatherData.main
    let mainLayerWeather1 = lodash.map(mainLayerWeather)
    let temp = (((mainLayerWeather1[0]-273.15)*1.8)+32)     // <= CONVERT KELVIN TO FAHRENHEIT
    let fahrenheitTemp = Math.round(temp);    // <= ROUND MATH
    let descriptionLayerWeather = weatherData.weather;
    let descriptionLayerWeatherIndex = lodash.map(descriptionLayerWeather, 'main')
    let finaldescription = descriptionLayerWeatherIndex[0]

    const imgageOfTheWeatherFN = () => {
      switch (finaldescription) {
        case 'Clouds': 
        return(
          <img src={ cloud } alt='Cloud_Rain'></img>
        )
        break;
        case 'Mist':
        return(
          <img src={ Mist } alt='Mist'></img>
        )
        break;
        case 'Clear':
        return(
          <img src={ cloud } alt='Clear'></img>
        )
        break;
        case 'Haze':
        return(
          <img src={ cloud } alt='Haze'></img>
        )
        break;
        case 'Rain':
        return(
          <img src={ Rain } alt='Rain'></img>
        )
        break;
        case 'Drizzle':
        return(
          <img src={ Rain } alt='Drizzle'></img>
        )
        break;
        case 'Thunderstorm':
        return(
          <img src={ Thunderstorm } alt='Thunderstorm'></img>
        )
        break;
      }
     }

    return ( 
      <div>
        <div className='weather_box'>
          <p>Weather box</p>
          <input onChange={ (e) => this.setState({ zipCode: e.target.value })}
                  placeholder='Enter Zip Code'>
          </input>
          <button onClick={ () => this.updateNewWeather() } >Search</button>
          <br/> 
            { imgageOfTheWeatherFN() }
          <p>weather: { finaldescription } </p>
          <p>City: { weatherData.name }</p>
          <p>Temp: { fahrenheitTemp } °</p>
        </div>
      </div>
     );
  }
}
 
export default Weather;