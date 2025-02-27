
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-app.js";
  import { getDatabase,ref,set,get,child} from "https://www.gstatic.com/firebasejs/11.3.1/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBZP3rqkKxr7js7XjjeUdPNy9McSXw-dYY",
    authDomain: "fp-project-76c3a.firebaseapp.com",
    projectId: "fp-project-76c3a",
    storageBucket: "fp-project-76c3a.firebasestorage.app",
    messagingSenderId: "1002695896109",
    appId: "1:1002695896109:web:6e71dfe80cc2b6659c5ca4",
    measurementId: "G-C61Y4FG8SV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

  const db=getDatabase(app);

  document.getElementById("submit").addEventListener("click", function(e){
    set(ref(db,'user/' + document.getElementById("username").value),
    {
        username:document.getElementById("username").value,
        email:document.getElementById("email").value,
        phone:document.getElementById("phone").value
    });

    alert("login")
  })
