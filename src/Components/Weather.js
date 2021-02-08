import Axios from 'axios';
import React, { useEffect, useReducer } from 'react'
import LocInput from './LocInput';

const initialState = {
    access_key: 'cf877768023cd66d2bc236d3feb567c0',
    location: '',
    query: (string) => {
        string = string.split(' ');
        let newStr = [];
        for(let i = 0; i < string.length; i++) {
            newStr.push(string[i].charAt(0).toUpperCase() + string[i].slice(1));
        }
        return newStr.join('%20');
    },
    weatherData: {}
}

const reducer = (curState, action) => {
    switch(action.type) {
        case 'update_location':
            return { ...curState, location: action.payLoad }
        default:
            return curState;
    }
}


export default function Weather() {

    const [ state, dispatch ] = useReducer(reducer, initialState)

    useEffect(() => {
        Axios.get(`http://api.weatherstack.com/current?access_key=${state.access_key}&query=${state.query(state.location)}`)
            .then(res => state.weatherData = res.data)
            .catch(err => console.log(err))
    }, [state])
    
    console.log(state)
    return (
        <div>
            <LocInput state={state} dispatch={dispatch} />
            {
                (state.weatherData.current) && ( 
                    <React.Fragment>
                        <div className="location-name"> {state.weatherData.location.name} , {state.weatherData.location.region}, {state.weatherData.location.country}</div>
                        <div className="weather">
                            <div className="weather-icon">
                                <div className="weather-i">
                                    <img src={state.weatherData.current.weather_icons[0]} alt={state.weatherData.current.weather_descriptions[0]} ></img>
                                </div>
                                <div className="weather-i-alt">{state.weatherData.current.weather_descriptions[0]}</div>
                            </div>
                            <div className="weather-data">{state.weatherData.current.temperature} &deg; C</div>
                        </div>
                        <div className="weather-extra">
                            <div className="wind-speed">Wind speed: {state.weatherData.current.wind_speed} kmph</div>
                            <div className="percip">Percip: {state.weatherData.current.precip} mm</div>
                            <div className="pressure">Pressure: {state.weatherData.current.pressure} mb</div>
                            <div className="feelslike">Feelslike: {state.weatherData.current.feelslike} &deg; C</div>
                            <div className="humidity">Humidity: {state.weatherData.current.humidity}</div>
                        </div>
                    </React.Fragment>
                )
            }
        </div>
    )
}
