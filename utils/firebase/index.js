const firebase = require('firebase');
const defaultConfig = {
    apiKey: "AIzaSyCdrt1miT-yUIIbgc_4rQHqB5O3i5mxnaw",
    authDomain: "vietlott-dd31b.firebaseapp.com",
    databaseURL: "https://vietlott-dd31b.firebaseio.com",
    storageBucket: "vietlott-dd31b.appspot.com",
    messagingSenderId: "772884332151"
};

function initFirebaseApp(config = defaultConfig) {
    return firebase.initializeApp(config);
}

module.exports = initFirebaseApp;
