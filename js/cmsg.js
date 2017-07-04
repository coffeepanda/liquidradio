// Initialize Firebase
const config = {
    apiKey: "AIzaSyBVhORfuPzxP1c-lFJCgsaxBLRG3bTCUg8",
    authDomain: "liquid-radio.firebaseapp.com",
    databaseURL: "https://liquid-radio.firebaseio.com",
    projectId: "liquid-radio",
    storageBucket: "",
    messagingSenderId: "131166525981"
};
firebase.initializeApp(config);


// Retrieve Firebase Messaging object.
const messaging = firebase.messaging();
messaging.requestPermission()
    .then(() => {
        log.debug('GCM: Notification permission granted.');

        // Get Instance ID token. Initially this makes a network call, once retrieved
        // subsequent calls to getToken will return from cache.
        messaging.getToken()
            .then((currentToken) => {
                if (currentToken) {
                    // sendTokenToServer(currentToken); //TODO
                    // updateUIForPushEnabled(currentToken); //TODO
                    log.debug("currentToken", currentToken);
                } else {
                    // Show permission request.
                    log.debug('No Instance ID token available. Request permission to generate one.');
                    // Show permission UI.
                    //updateUIForPushPermissionRequired(); //TODO
                    //setTokenSentToServer(false); //TODO
                }
            })
            .catch((err) => {
                log.debug('An error occurred while retrieving token. ', err);
                //showToken('Error retrieving Instance ID token. ', err); //TODO
                //setTokenSentToServer(false); //TODO
            });
        // Callback fired if Instance ID token is updated.
        messaging.onTokenRefresh(() => {
            messaging.getToken()
                .then((refreshedToken) => {
                    log.debug('Token refreshed.', refreshedToken);
                    // Indicate that the new Instance ID token has not yet been sent to the
                    // app server.
                    // setTokenSentToServer(false); // TODO
                    // Send Instance ID token to app server.
                    // sendTokenToServer(refreshedToken); //TODO
                    // ...
                })
                .catch((err) => {
                    log.debug('Unable to retrieve refreshed token ', err);
                    // showToken('Unable to retrieve refreshed token ', err); //TODO
                });
        });
    })
    .catch((err) => {
        log.debug('GCM: Unable to get permission to notify.', err);
    });


