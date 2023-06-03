//this.setState({imageUrl: this.state.input})
    fetch("https://api.clarifai.com/v2/models/" + 'face-detection' + "/outputs", setupClarifai(this.state.input))
    .then(response => response.json())
    .then(response =>{
      if (response) {
        fetch('http://localhost:3000/image',{
          method: 'put',
          headers: {'Content-type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response =>response.json())
          .then(count =>{
            this.setState(Object.assign(this.state.user,{entries:count}))
          })
          .catch(err => console.log(err));
      }
      
    })


----------------

const setupClarifai = (imageUrl) => {
  const PAT = '68e968acba3b47b197dc7a096a71347b';
  // Specify the correct user_id/app_id pairings
  // Since you're making inferences outside your app's scope
  const USER_ID = 'akpbadnawar';       
  const APP_ID = 'Face-Detector';
  // Change these to whatever model and image URL you want to use
  const MODEL_ID = 'face-detection';
  const IMAGE_URL = imageUrl;

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
return requestOptions
}
---------------------

    this.setState({imageUrl:this.state.input});
    app.models.predict('face-detection', this.state.input)
      .then(response => {
        console.log('hi', response)
        if (response) {
          fetch('http://localhost:3000/image', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count}))
            })

        }
        this.displayFaceBox(this.calculateFaceLocation(response))
      })
      .catch(err => console.log(err));
----------

const app = new Clarifai.App({
  apiKey: '9ab5333f16b1491faa22510cf8b183fc'
 });
