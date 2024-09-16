import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyCvRzo7VVpe8s4kHZcZe4xFzI1SjaGdJTs",
    authDomain: "advaits-project.firebaseapp.com",
    projectId: "advaits-project",
    storageBucket: "advaits-project.appspot.com",
    messagingSenderId: "40216233392",
    appId: "1:40216233392:web:d85ce68ee2865d189ac275",
    measurementId: "G-1F02DBZ265"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

document.getElementById('login-form').addEventListener('submit', async (event) => {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        await signInWithEmailAndPassword(auth, email, password);
        window.location.href = 'home.html';
    } catch (error) {
        document.getElementById('error-message').textContent = error.message;
    }
});
