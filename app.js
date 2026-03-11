// 🔱 Cloudflare URL (Update this if tunnel restarts)
const BACKEND_URL = "https://cape-billion-uncle-mrna.trycloudflare.com";

// 🔱 1. SIGNUP FUNCTION
async function signup() {
    let user = document.getElementById("new-username").value;
    let pass = document.getElementById("new-password").value;

    if(user === "" || pass === "") {
        alert("Username-um Password-um adikkaathe enganeya muthe signup cheyyuka? 🚫");
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/signup`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Signup Success! Inni Login cheythu mass kaanikku! 💎");
            if (typeof toggleForm === "function") toggleForm();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Backend Offline! Termux check cheyyu! 🚫");
    }
}

// 🔱 2. LOGIN FUNCTION (Updated for Instant Username)
async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // Local Storage-il Instant aayi peru save cheyyunnu
    const saveUserLocally = (u) => {
        localStorage.setItem("currentUser", u);
    };

    if(user === "AiraAdam" && pass === "Aira123") {
        saveUserLocally("AiraAdam");
        alert("Welcome Founder 🚀");
        window.location.href = "home.html";
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        const result = await response.json();

        if (response.ok) {
            saveUserLocally(user); // 🔱 Login success aayaal udane peru save cheyyum
            alert("Login Success! 💎");
            window.location.href = "home.html";
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Server connection failed! 🚫");
    }
}

// 🔱 3. PROFILE PHOTO UPLOAD (Updated for Permanent Storage)
function uploadPic(event) {
    let file = event.target.files[0];
    if(!file) return;

    let reader = new FileReader();
    reader.onload = function() {
        let imageData = reader.result;
        document.getElementById("profilePic").src = imageData;
        // 🔱 Image browser memory-il save cheyyunnu (Reload-ine thadayaan)
        localStorage.setItem("savedProfilePic", imageData);
    };
    reader.readAsDataURL(file);
}

// 🔱 4. LOAD PROFILE DATA (Ithu oro page load aakumpolum work aakum)
window.onload = function() {
    let loggedUser = localStorage.getItem("currentUser");
    let savedPic = localStorage.getItem("savedProfilePic");

    // Profile page-il name set cheyyaan
    if (loggedUser && document.getElementById("userDisplay")) {
        document.getElementById("userDisplay").innerHTML = `@${loggedUser} <span id="verifiedTick" class="redtick">✔</span>`;
        
        // Founder logic for ticks and followers
        if (loggedUser === "AiraAdam") {
            if(document.getElementById("verifiedTick")) document.getElementById("verifiedTick").style.display = "inline";
            if(document.getElementById("followerCount")) document.getElementById("followerCount").innerText = "100M";
        } else {
            if(document.getElementById("followerCount")) document.getElementById("followerCount").innerText = "0";
        }
    }

    // Saved image load cheyyaan
    if (savedPic && document.getElementById("profilePic")) {
        document.getElementById("profilePic").src = savedPic;
    }
};

// 🔱 5. MESSAGE & POST SYSTEM (Old logic - clean and sharp)
function send() {
    let msg = document.getElementById("msg").value;
    if(msg === "") return;
    let chat = document.getElementById("chat");
    let div = document.createElement("div");
    div.style.padding = "10px"; div.style.margin = "5px"; div.style.background = "#1a1a1a";
    div.style.color = "#00ff00"; div.style.borderRadius = "8px"; div.innerText = `> ${msg}`;
    chat.appendChild(div);
    document.getElementById("msg").value = "";
    chat.scrollTop = chat.scrollHeight; 
}

function createPost() {
    let caption = document.getElementById("caption").value;
    let loggedUser = localStorage.getItem("currentUser") || "User";
    if(caption === "") return;

    let feed = document.getElementById("feed");
    let post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `
        <div style="border: 1px solid #333; padding: 15px; margin-bottom: 15px; border-radius: 15px; background: #0a0a0a;">
            <h4 style="margin: 0; color: #ff0000;">@${loggedUser}</h4>
            <p style="color: #eee; margin-top: 10px;">${caption}</p>
        </div>
    `;
    feed.prepend(post);
    document.getElementById("caption").value = "";
}
