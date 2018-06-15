import firebase from 'firebase'


//Will prob move this later to same place store url to app sending requests to.
var config = {
    apiKey: "AIzaSyADrVRU9CSIktkXnvQXcXFeOPicmYtC91M",
    authDomain: "ceswebsite-cf841.firebaseapp.com",
    databaseURL: "https://ceswebsite-cf841.firebaseio.com",
    projectId: "ceswebsite-cf841",
    storageBucket: "ceswebsite-cf841.appspot.com",
    messagingSenderId: "612020639792"
  };

 const fire = firebase.initializeApp(config);

 export default fire;