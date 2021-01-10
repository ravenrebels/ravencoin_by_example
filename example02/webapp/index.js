// Your web app's Firebase configuration

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    document.body.setAttribute("data-route", "route__landing");
    document.querySelector(".landing-section__welcome-message").innerHTML = "Welcome "+  user.email;
    subscribeToBeerTokens();
  } else {
    document.body.setAttribute("data-route", "route__signin");
    signIn();
  }
});

function subscribeToBeerTokens() {
  const ref = firebase.database().ref("addresses/" + getAddressForUser());
  ref.on("value", (snapshot) => {
    const numberOfBeerTokens = snapshot.val();
    const dom = document.querySelector(".landing-section__number-of-beers");
    dom.innerHTML = numberOfBeerTokens;
  });
}
document.querySelector(".nav__sign-out").addEventListener("click", function () {
  firebase.auth().signOut();
});

function signIn() {
   //Create an instance of firebase AuthUI, if does not exist
  const ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(firebase.auth());
  const uiConfig = {
    callbacks: {
      signInSuccessWithAuthResult: function (authResult, redirectUrl) {
        return false;
      },
      uiShown: function () {},
    },
    // Will use popup for IDP Providers sign-in flow instead of the default, redirect.
    signInFlow: "popup",
    signInSuccessUrl: "#",
    signInOptions: [
      // Leave the lines as is for the providers you want to offer your users.
      firebase.auth.EmailAuthProvider.PROVIDER_ID,
    ],
    // Terms of service url.
    tosUrl: "<your-tos-url>",
    // Privacy policy url.
    privacyPolicyUrl: "<your-privacy-policy-url>",
  };

  ui.start("#firebaseui-auth-container", uiConfig);
}

function getAddressForUser(userId) {
  return "RWCoW9JHtyRSDL5eEXgynR6iE8f33Png3X";
}
