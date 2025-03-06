// Firebase থেকে প্রয়োজনীয় ফাংশন ইমপোর্ট
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.6.1/firebase-database.js";

// 🔥 Firebase Config (তোমার Firebase থেকে পাওয়া কোড)
const firebaseConfig = {
    apiKey: "AIzaSyAsx5E-UoF069Jog5jaZgRHWfObk1NUZIQg",
    authDomain: "chat-box-d3abf.firebaseapp.com",
    databaseURL: "https://chat-box-d3abf-default-rtdb.firebaseio.com",
    projectId: "chat-box-d3abf",
    storageBucket: "chat-box-d3abf.appspot.com",
    messagingSenderId: "23891153815",
    appId: "1:23891153815:web:314cf9642fd6d7b652ead2",
};

// ✅ Firebase Initializing
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const messagesRef = ref(db, "messages");

// ✅ UI Elements
const loginSection = document.getElementById("login-section");
const chatSection = document.getElementById("chat-section");
const messageBox = document.getElementById("message-box");
const messageInput = document.getElementById("message-input");
const sendBtn = document.getElementById("send-btn");
const usernameInput = document.getElementById("username");
const loginBtn = document.getElementById("login-btn");

let username = "";

// ✅ ইউজার লগইন হ্যান্ডলিং
loginBtn.addEventListener("click", function () {
    username = usernameInput.value.trim();
    if (username) {
        loginSection.style.display = "none";
        chatSection.style.display = "block";
    } else {
        alert("⚠️ Please enter a valid username!");
    }
});

// ✅ মেসেজ পাঠানো (Firebase-এ সংরক্ষণ)
function sendMessage() {
    const messageText = messageInput.value.trim();
    if (messageText !== "") {
        push(messagesRef, { user: username, text: messageText });
        messageInput.value = "";
    }
}

// ✅ "Send" বাটন ক্লিক করলে মেসেজ যাবে
sendBtn.addEventListener("click", sendMessage);

// ✅ "Enter" চাপলে মেসেজ যাবে
messageInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// ✅ Firebase থেকে রিয়েল-টাইম মেসেজ লোড করা
onChildAdded(messagesRef, (snapshot) => {
    const { user, text } = snapshot.val();
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message");
    messageDiv.innerHTML = `<strong>${user}:</strong> ${text}`;
    messageBox.appendChild(messageDiv);
    messageBox.scrollTop = messageBox.scrollHeight;
});
