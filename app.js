// 🔱 Cloudflare URL (Backend connection)
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
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Backend Offline! Termux check cheyyu! 🚫");
    }
}

// 🔱 2. LOGIN FUNCTION (Updated for Instant Username Storage)
async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    const finalizeLogin = (u) => {
        localStorage.setItem("currentUser", u); // 🔱 Instant Storage!
        alert(`Welcome ${u}! 🚀`);
        window.location.href = "home.html";
    };

    if(user === "AiraAdam" && pass === "Aira123") {
        finalizeLogin("AiraAdam");
        return;
    }

    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });
        if (response.ok) {
            finalizeLogin(user); // 🔱 Login success aayaal udane peru save cheyyum
        } else {
            alert("Invalid Credentials! ❌");
        }
    } catch (error) {
        alert("Server connection failed! 🚫");
    }
}

// 🔱 3. PROFILE PHOTO UPLOAD (Permanent Storage Logic)
function uploadPic(event) {
    let file = event.target.files[0];
    if(!file) return;

    let reader = new FileReader();
    reader.onload = function() {
        let imageData = reader.result;
        let picDisplay = document.getElementById("profilePic");
        if(picDisplay) {
            picDisplay.src = imageData;
            // 🔱 Browser memory-il permanent aayi save cheyyunnu
            localStorage.setItem("savedProfilePic", imageData);
        }
    };
    reader.readAsDataURL(file);
}

// 🔱 4. LOAD DATA (Instant Recovery on Page Load)
window.onload = function() {
    let loggedUser = localStorage.getItem("currentUser");
    let savedPic = localStorage.getItem("savedProfilePic");

    // Profile Page IDs: userDisplay or profileName
    let nameElement = document.getElementById("profileName") || document.getElementById("userDisplay");
    let followers = document.getElementById("profileFollowers") || document.getElementById("followerCount");

    if (loggedUser && nameElement) {
        nameElement.innerHTML = `@${loggedUser} <span id="verifiedTick" class="redtick">✔</span>`;
        
        // Founder Logic (Red Tick & 100M)
        if (loggedUser === "AiraAdam") {
            let tick = document.getElementById("verifiedTick");
            if(tick) tick.style.display = "inline";
            if(followers) followers.innerText = "100M";
        } else {
            if(followers) followers.innerText = "0";
        }
    }

    // 🔱 Image Recovery (Reload-ine thadayaam)
    if (savedPic && document.getElementById("profilePic")) {
        document.getElementById("profilePic").src = savedPic;
    }
};

// 🔱 5. MESSAGE & POST SYSTEM
function send() {
    let msg = document.getElementById("msg").value;
    if(msg === "") return;
    let chat = document.getElementById("chat");
    let div = document.createElement("div");
    div.className = "msg-box";
    div.innerText = `> ${msg}`;
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
