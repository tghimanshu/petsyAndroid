document.addEventListener("deviceready", onDeviceReady, false);
// if (
//   !window.localStorage.getItem("x-auth") &&
//   window.location.pathname !== "/" &&
//   window.location.pathname !== "/index.html"
// ) {
//   window.location = "/";
// } else

function onDeviceReady() {
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyDTauCP-fbTox34cPInaX2ShNsK_yhYsPs",
    authDomain: "petsyhome-ad112.firebaseapp.com",
    projectId: "petsyhome-ad112",
    storageBucket: "petsyhome-ad112.appspot.com",
    messagingSenderId: "411634778336",
    appId: "1:411634778336:web:07ca4c7635bafb5bc45085",
    measurementId: "G-KZ7RL3M30C",
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  const db = firebase.firestore();
  // db.collection("users")
  //   .add({
  //     first: "Ada",
  //     last: "Lovelace",
  //     born: 1815,
  //   })
  //   .then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });
  // db.collection("users")
  //   .add({
  //     first: "Alan",
  //     middle: "Mathison",
  //     last: "Turing",
  //     born: 1912,
  //   })
  //   .then((docRef) => {
  //     console.log("Document written with ID: ", docRef.id);
  //   })
  //   .catch((error) => {
  //     console.error("Error adding document: ", error);
  //   });
  // db.collection("users")
  //   .get()
  //   .then((querySnapshot) => {
  //     querySnapshot.forEach((doc) => {
  //       console.log(`${doc.id} => ${doc.data()}`);
  //     });
  //   });
  const auth = firebase.auth();
  $(document).ready(function () {
    // toggle cat dog tabs

    let myPet = window.localStorage.getItem("pet");
    console.log(myPet);
    if (
      window.location.pathname.includes("toggle.html") ||
      window.location.pathname.includes("features.html")
    ) {
      switch (myPet) {
        case "dog":
          $("#tab1")[0].checked = true;
          break;
        case "cat":
          $("#tab2")[0].checked = true;
          break;
      }
    }

    // booking trainer
    if (window.location.pathname.includes("trainer.html")) {
      console.log($("#rateForm"));
      $("#rateForm").submit(function (e) {
        e.preventDefault();
        console.log($("#rate")[0].value, $("#rateText")[0].value);
      });
      $("#trainerForm").submit(function (e) {
        e.preventDefault();
        const date = $("#trainer_date")[0].value;
        const user = JSON.parse(window.localStorage.getItem("x-auth"));
        db.collection("trainer_bookings")
          .doc(user.authId)
          .set({
            user: user,
            date: date.toString(),
          })
          .then((docRef) => {
            console.log("Document written with ID: ", docRef);
            window.location = "trainer_success.html";
          })
          .catch((error) => {
            console.error("Error adding document: ", error);
          });
      });
    }

    // Cat Registration
    $("#catRegisterForm").submit(function (e) {
      e.preventDefault();
      let pet = $("#cr_type")[0].value;
      let name = $("#cr_name")[0].value;
      let email = $("#cr_email")[0].value;
      let password = $("#cr_password")[0].value;
      console.log(pet, name, email, password);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);

          db.collection("users")
            .doc(user.uid)
            .set({
              name: name,
              pet: pet,
              authId: user.uid,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef);
              window.localStorage.setItem(
                "x-auth",
                JSON.stringify({
                  uid: user.uid,
                  name: name,
                  email: email,
                  pet: pet,
                })
              );
              window.localStorage.setItem("pet", pet);
              window.location = "features.html";
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error);
          // ..
        });
      e.preventDefault();
    });
    // Dog Registration
    $("#dogRegisterForm").submit(function (e) {
      e.preventDefault();
      let pet = $("#dr_type")[0].value;
      let name = $("#dr_name")[0].value;
      let email = $("#dr_email")[0].value;
      let password = $("#dr_password")[0].value;
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user);

          db.collection("users")
            .doc(user.uid)
            .set({
              name: name,
              pet: pet,
              authId: user.uid,
            })
            .then((docRef) => {
              console.log("Document written with ID: ", docRef);
              window.localStorage.setItem(
                "x-auth",
                JSON.stringify({
                  uid: user.uid,
                  name: name,
                  email: email,
                  pet: pet,
                })
              );
              window.localStorage.setItem("pet", pet);
              window.location = "features.html";
            })
            .catch((error) => {
              console.error("Error adding document: ", error);
            });
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          console.log(error);
          // ..
        });
      e.preventDefault();
    });
    // Login
    $("#loginForm").submit(function (e) {
      e.preventDefault();
      let email = $("#l_email")[0].value;
      let password = $("#l_password")[0].value;
      auth
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          var user = userCredential.user;
          console.log(user.uid);
          firebase
            .firestore()
            .collection("users")
            .doc(user.uid)
            .get()
            .then((doc) => {
              const data = doc.data();
              window.localStorage.setItem("x-auth", JSON.stringify(doc.data()));
              window.localStorage.setItem("pet", data.pet);
              window.location = "features.html";
            })
            .catch((err) => console.log(err));
        })
        .catch((error) => {
          var errorMessage = error.message;
          console.log(errorMessage);
        });
    });
  });
}
