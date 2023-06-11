
	// Import the functions you need from the SDKs you need
	import { initializeApp } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-app.js";
	import { getDatabase, ref, set, update } from "https://www.gstatic.com/firebasejs/9.21.0/firebase-database.js";
	import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut} from "https://www.gstatic.com/firebasejs/9.21.0/firebase-auth.js";

	// TODO: Add SDKs for Firebase products that you want to use
	// https://firebase.google.com/docs/web/setup#available-libraries
  
	// Your web app's Firebase configuration
	const firebaseConfig = {
		apiKey: "AIzaSyBad8knBKI6CSjCZWonJBinsOOElVXBt6M",
		authDomain: "swe-363-abnb.firebaseapp.com",
		databaseURL: "https://swe-363-abnb-default-rtdb.asia-southeast1.firebasedatabase.app",
		projectId: "swe-363-abnb",
		storageBucket: "swe-363-abnb.appspot.com",
		messagingSenderId: "898846020774",
		appId: "1:898846020774:web:883f2453709bdc4dc11067"
	  };
	
  
	// Initialize Firebase
	const app = initializeApp(firebaseConfig);
	const database = getDatabase(app);
	const auth = getAuth();
	
	SubmitSignUpBtn.addEventListener('click',(e) =>{
	var phone=	document.getElementById('phone').value;
	var email = document.getElementById('email-signup').value;
	var password = document.getElementById('password-signup').value;
	var country = document.getElementById('country').value;

	createUserWithEmailAndPassword(auth, email, password, phone, country).then((userCredential) => {
    // Signed in
    const user = userCredential.user;

	set(ref(database, 'users/' + user.uid),{
		email: email,
		password: password,
		phone: phone,
		country: country,
	});
	})

  	.catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	alert("errorMessage");
  	});
	});


	login.addEventListener('click',(e) =>{
	var email =	document.getElementById('email').value;
	var password = document.getElementById('password-login').value;

	signInWithEmailAndPassword(auth, email, password) .then((userCredential) => {
   	 // Signed in 
	const dt= new Date();
    const user = userCredential.user;
	update(ref (database, 'users/' + user.uid),{
		last_login: dt,
	});
	alert("You have successfully logged in!");
  
})
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
	alert("Failed to login!");

  });
	});

	const user = auth.currentUser;

	onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    // ...
  } else {
    // User is signed out
    // ...
  }
})

	logout.addEventListener('click',(e) =>{
		signOut(auth).then(() => {
  		// Sign-out successful.
		alert("You have logged out!");
		}).catch((error) => {
 		 // An error happened.
		});
});

