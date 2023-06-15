import ParticlesBg from "particles-bg";
import React, { useState } from "react";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import Signin from "./components/Signin/Signin";
import Register from "./components/Register/Register";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";
import Rank from "./components/Rank/Rank";
import "./App.css";


const PAT = "68e968acba3b47b197dc7a096a71347b";
const USER_ID = "akpbadnawar";
const APP_ID = "Face-Detector";
const MODEL_ID = "face-detection";

const App = () => {
  const initialState = {
    input: "",
    imageUrl: "",
    box: {},
    route: "signin",
    isSignedIn: false,
  };

  const [startstate, setStartState] = useState(initialState);

  React.useEffect(()=>{
    console.log('values? :', startstate)
    },[startstate])

  const calculateFaceLocation = (data) => {
    console.log(data);
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    console.log(clarifaiFace + "test");
    if (clarifaiFace) {
      const image = document.getElementById("inputimage");
      const width = Number(image.width);
      const height = Number(image.height);
      return {
        leftCol: clarifaiFace.left_col * width,
        topRow: clarifaiFace.top_row * height,
        rightCol: width - clarifaiFace.right_col * width,
        bottomRow: height - clarifaiFace.bottom_row * height,
      };
    }
  };

  const displayFaceBox = (box) => {
    console.log(box)
    setStartState({ ...startstate, box: box });
  };

  const onInputChange = (event) => {
    setStartState({ ...startstate, input: event.target.value,imageUrl:event.target.value });
  };

  const onButtonSubmit = () => {
    // setStartState({ ...startstate, imageUrl: startstate.input });
    const IMAGE_URL = startstate.input;
    const raw = JSON.stringify({
      user_app_id: {
        user_id: USER_ID,
        app_id: APP_ID,
      },
      inputs: [
        {
          data: {
            image: {
              url: IMAGE_URL,
            },
          },
        },
      ],
    });

    const requestOptions = {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: "Key " + PAT,
      },
      body: raw,
    };
    
    
    fetch(
      "https://api.clarifai.com/v2/models/" + MODEL_ID + "/outputs",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => displayFaceBox(calculateFaceLocation(result)))
      .catch((error) => console.log("error", error));
  };

  const onRouteChange = (router) => {
    if (router === "signout") {
      setStartState({ ...startstate, isSignedIn: false });
    } else if (router === "home") {
      setStartState({ ...startstate, isSignedIn: true });
    }
    console.log(router + 'check')
    setStartState({ ...startstate, route: router,isSignedIn:true });
  };

  const { isSignedIn, imageUrl, route, box } = startstate;
  return (
    <div className="App">
      <>
        <ParticlesBg type="cobweb" bg={true} />
      </>
      <Navigation isSignedIn={startstate.isSignedIn} onRouteChange={onRouteChange} />
      {startstate.route === "home" ? (
        <div>
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={onInputChange}
            onButtonSubmit={onButtonSubmit}
          />
          <FaceRecognition box={startstate.box} imageUrl={startstate.imageUrl} />
        </div>
      ) : startstate.route === "signin" ? (
        <Signin onRouteChange={onRouteChange} />
      ) : (
        <Register onRouteChange={onRouteChange} />
      )}
    </div>
  );
};

export default App;
