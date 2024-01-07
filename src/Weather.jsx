import React, { useEffect, useState } from 'react'
import axios from 'axios';
import './style/Weather.css'
import { BiSearchAlt2 } from "react-icons/bi";
import { FaTemperatureLow } from "react-icons/fa";
import { FiWind } from "react-icons/fi";
import { WiHumidity } from "react-icons/wi";
import AirConditions from './components/AirConditions';
import { TiWeatherCloudy } from "react-icons/ti";
import { LuSunDim } from "react-icons/lu";
import { IoRainyOutline } from "react-icons/io5";
import { BsCloudDrizzle } from "react-icons/bs";
import { RiMistLine } from "react-icons/ri";
import { IoPartlySunnyOutline } from "react-icons/io5";
import { WEATHER_API_ULR } from './api';
import { WEATHER_API_KEY } from './api';

const Weather = () => {
    const [showButton, setShowButton] = useState('none')
    const [input, setInput] = useState('')
    const [color, setColor] = useState('black')
    const [data, setData] = useState({
        temperature: '',
        location: '',
        feels_like: '',
        temp_min: '',
        wind: '',
        humidity: '',
        icon: ''
    })

    useEffect(() => {
        const apiUrl = `${WEATHER_API_ULR}/weather?q=Belgrade&appid=${WEATHER_API_KEY}&units=metric`
        axios.get(apiUrl)
            .then(response => {
                let weather_icon = ''
                switch (response.data.weather[0].main) {
                    case 'Clouds': {
                        weather_icon = <TiWeatherCloudy />
                        break;
                    }
                    case 'Clear': {
                        weather_icon = <LuSunDim />
                        break;
                    }
                    case 'Rain': {
                        weather_icon = <IoRainyOutline />
                        break;
                    }
                    case 'Drizzle': {
                        weather_icon = <BsCloudDrizzle />
                        break;
                    }
                    case 'Mist': {
                        weather_icon = <RiMistLine />
                        break;
                    }
                    default: {
                        weather_icon = <IoPartlySunnyOutline />
                    }
                }
                setData({
                    ...data, temperature: response.data.main.temp, location: response.data.name,
                    feels_like: response.data.main.feels_like, temp_min: response.data.main.temp_min,
                    wind: response.data.wind.speed, humidity: response.data.main.humidity,
                    icon: weather_icon
                })
            })
            .catch(err => console.log(err))
    }, [])

    const handleSearch = () => {
        if (input !== '') {
            const apiUrl = `${WEATHER_API_ULR}/weather?q=${input}&appid=${WEATHER_API_KEY}&units=metric`
            axios.get(apiUrl)
                .then(response => {
                    let weather_icon = ''
                    switch (response.data.weather[0].main) {
                        case 'Clouds': {
                            weather_icon = <TiWeatherCloudy />
                            break;
                        }
                        case 'Clear': {
                            weather_icon = <LuSunDim />
                            break;
                        }
                        case 'Rain': {
                            weather_icon = <IoRainyOutline />
                            break;
                        }
                        case 'Drizzle': {
                            weather_icon = <BsCloudDrizzle />
                            break;
                        }
                        case 'Mist': {
                            weather_icon = <RiMistLine />
                            break;
                        }
                        default: {
                            weather_icon = <IoPartlySunnyOutline />
                        }
                    }
                    setData({
                        ...data, temperature: response.data.main.temp, location: response.data.name,
                        feels_like: response.data.main.feels_like, temp_min: response.data.main.temp_min,
                        wind: response.data.wind.speed, humidity: response.data.main.humidity,
                        icon: weather_icon
                    })
                })
                .catch(err => {
                    if (err.response.status === 404) {
                        setInput('*Invalid input*')
                        setColor('red')
                        setTimeout(() => {
                            setInput('')
                            setColor('black')
                        }, 800)
                    } else {
                        setInput(input)
                    }
                })
            setShowButton(showButton => showButton = 'block')
            setInput('')
        }
    }

    return (
        <div className="container">
            <h1>Weather App</h1>
            <div className="weather">
                <div className="weather__top">
                    <div className="weather__search">
                        <input
                            type="text"
                            style={{ color: color }}
                            pattern='[a-zA-Z ]*'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder='Search'
                        />
                        <button onClick={handleSearch}>
                            <BiSearchAlt2 />
                        </button>
                    </div>
                </div>
                <div className="weather__middle">
                    <div className="weather__info">
                        <div className="weather__info__left">
                            <h1>{Math.round(data.temperature)}&deg;</h1>
                        </div>
                        <div className="weather__info__right">
                            <h1>{data.location}</h1>
                            <h2>{data.icon}</h2>
                        </div>
                    </div>
                </div>
                <div className="weather__bottom">
                    <AirConditions
                        icon={<FaTemperatureLow />}
                        title='Real Feel'
                        parametar={Math.round(data.feels_like)}
                        units='&deg;'
                    />
                    <AirConditions
                        icon={<FiWind />}
                        title='Wind'
                        parametar={Math.round(data.wind)}
                        units='km/h'
                    />
                    <AirConditions
                        icon={<WiHumidity />}
                        title='Humidity'
                        parametar={Math.round(data.humidity)}
                        units='%'
                    />
                </div>
            </div>
        </div>
    )
}

export default Weather