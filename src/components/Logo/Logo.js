import React from 'react';
import Tilt from 'react-parallax-tilt';
import brain from './brain.png';
import './Log.css'


const Logo = () => {
    return (
        <div className='ma4 mt0 container'>
            <Tilt className='Tilt br2 shadow-2'>
                <div className='Tilt-inner pa2' style={{ height: '150px', width:'150px'}}>
                <img style={{paddingTop: '14px'}} src={brain} alt='logo'/>
                </div>
            </Tilt>
        </div>
        )
};

export default Logo