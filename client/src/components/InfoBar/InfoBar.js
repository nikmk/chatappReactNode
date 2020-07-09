import React from 'react';

import './InfoBar.css';
import closeIcon from '../../icons/closeIcon.png'
import onlineIcon from '../../icons/onlineIcon.png'
const InfoBar = ({roomName,users}) => (
<div className="infoBar">
        <div className="leftInnerContainer">
            <img src={onlineIcon} alt="online" className='onlineIcon'/>
            <h3>Room: {roomName}</h3>
           
            
        </div>
        <div><h5>Active Users: {users.length}</h5></div>
        <div className="rightInnerContainer">
    <a href="/"><img src={closeIcon} alt="close" className="closeIcon" /></a>
        </div>
    </div>
)

export default InfoBar ; 