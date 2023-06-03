import ParticlesBg from 'particles-bg'
import React from 'react';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Rank from './components/Rank/Rank'
import './App.css';

const PAT = '68e968acba3b47b197dc7a096a71347b';
const USER_ID = 'akpbadnawar';       
const APP_ID = 'Face-Detector';
const MODEL_ID = 'face-detection';



 

class App extends React.Component {
  constructor(){
    super();
    this.state = {
      input: '',
      imageUrl: '',
    }
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({imageUrl: this.state.input});
    console.log('click')
    const IMAGE_URL = this.state.input;
    const raw = JSON.stringify({
      "user_app_id": {
          "user_id": USER_ID,
          "app_id": APP_ID
      },
      "inputs": [
          {
              "data": {
                  "image": {
                      "url": IMAGE_URL
                  }
              }
          }
      ]
  });
  
  const requestOptions = {
      method: 'POST',
      headers: {
          'Accept': 'application/json',
          'Authorization': 'Key ' + PAT
      },
      body: raw
  };
    fetch("https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs", requestOptions)
        .then(response => response.text())
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
  }

  render(){  
    return (
      <div className="App">
        <>
          <ParticlesBg type="cobweb" bg={true} />
        </>
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>    
        <FaceRecognition imageUrl = {this.state.imageUrl}/>
      </div>
    );
  }
}

export default App;
