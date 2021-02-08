import Axios from 'axios'
import React, { Component } from 'react'

export default class WeatherCard extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            access_key: 'cf877768023cd66d2bc236d3feb567c0',
            location: 'coimbatore',
            query: (string) => {
                string = string.split(' ');
                let newStr = [];
                for(let i = 0; i < string.length; i++) {
                    newStr.push(string[i].charAt(0).toUpperCase() + string[i].slice(1));
                }
                return newStr.join('%20');
            }
        }

        this.weatherCardRef = React.createRef()
    }

    componentDidMount() {
        Axios.get(`http://api.weatherstack.com/current?access_key=${this.state.access_key}&query=${this.state.query(this.state.location)}`)
            .then(res => {
                let output = '';
                const { name, country, region } = res.data.location;
                const { feelslike, humidity, precip, pressure, temperature, wind_speed, wind_dir } = res.data.current;
                const icon = res.data.current.weather_icons[0];
                const weather_description = res.data.current.weather_descriptions[0];
                output = `
                    <div className="location-name"> ${name} , ${region}, ${country}</div>
                    <div className="weather">
                        <div className="weather-icon">
                            <div className="weather-i">
                                <img src=${icon} alt=${weather_description} ></img>
                            </div>
                            <div className="weather-i-alt">${weather_description}</div>
                        </div>
                        <div className="weather-data">${temperature} &deg; C</div>
                    </div>
                    <div className="weather-extra">
                        <div className="wind-speed">Wind speed: ${wind_speed} kmph</div>
                        <div className="percip">Percip: ${precip} mm</div>
                        <div className="pressure">Pressure: ${pressure} mb</div>
                        <div className="feelslike">Feelslike: ${feelslike} &deg; C</div>
                        <div className="humidity">Humidity: ${humidity}</div>
                        <div className="wind-dir">Wind direction: ${wind_dir}</div>
                    </div> 
                `;
                this.weatherCardRef.current.innerHTML = output;
            })
            .catch(err => console.log(err))
    }
    
    render() {
        return (
            <div className="weather-card" ref={this.weatherCardRef} >                             
            </div>
        )
    }
}
