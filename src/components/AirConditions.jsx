import React from 'react'
import '../style/AirConditions.css'

const AirConditions = ({ icon, title, parametar, units }) => {
    return (
        <div className="air__conditions">
            <div className="air__conditions__content">
                <div className="air__condition__title">
                    <p>{icon}</p>
                    <h5>{title}</h5>
                </div>
                <div className="air__condition__parametar">
                    <h2>{parametar}</h2>
                    <p>{units}</p>
                </div>
            </div>
        </div>
    )
}

export default AirConditions