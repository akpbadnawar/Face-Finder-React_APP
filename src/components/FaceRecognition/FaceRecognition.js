import React from 'react';


const FaceRecognition = ({imageUrl}) => {
    return (
        <div className='center'>
         <img src={imageUrl} alt='img'></img>
        </div>
    );
}

export default FaceRecognition;