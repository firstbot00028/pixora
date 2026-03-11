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

// 🔱 2. LOGIN FUNCTION
async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    const finalizeLogin = (u) => {
        localStorage.setItem("currentUser", u); 
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
            finalizeLogin(user); 
        } else {
            alert("Invalid Credentials! ❌");
        }
    } catch (error) {
        alert("Server connection failed! 🚫");
    }
}

// 🔱 3. PROFILE PHOTO UPLOAD (New Multi-User Logic)
function uploadPic(event) {
    let file = event.target.files[0];
    let loggedUser = localStorage.getItem("currentUser"); // 🦾 User-e check cheyyunnu
    
    if(!file || !loggedUser) return;

    let reader = new FileReader();
    reader.onload = function() {
        let imageData = reader.result;
        let picDisplay = document.getElementById("profilePic");
        if(picDisplay) {
            picDisplay.src = imageData;
            // 🔱 DIAMOND LOGIC: Oro user-num prathyekam key (e.g., savedPic_AiraAdam)
            localStorage.setItem("savedPic_" + loggedUser, imageData);
        }
    };
    reader.readAsDataURL(file);
}

// 🔱 4. LOAD DATA (Instant recovery based on WHO is logged in)
window.onload = function() {
    let loggedUser = localStorage.getItem("currentUser");

    if (loggedUser) {
        // 1. Recover User-Specific Image
        let userPic = localStorage.getItem("savedPic_" + loggedUser);
        let picDisplay = document.getElementById("profilePic");
        if (userPic && picDisplay) {
            picDisplay.src = userPic;
        } else if (picDisplay) {
            // Default image if no pic saved
            picDisplay.src = "https://via.placeholder.com/120";
        }

        // 2. Recover Name and Stats
        let nameElement = document.getElementById("profileName") || document.getElementById("userDisplay");
        let followers = document.getElementById("profileFollowers") || document.getElementById("followerCount");

        if (nameElement) {
            nameElement.innerHTML = `@${loggedUser} <span id="verifiedTick" class="redtick">✔</span>`;
            
            if (loggedUser === "AiraAdam") {
                let tick = document.getElementById("verifiedTick");
                if(tick) tick.style.display = "inline";
                if(followers) followers.innerText = "100M";
            } else {
                let tick = document.getElementById("verifiedTick");
                if(tick) tick.style.display = "none"; // 🛡️ Normal users-inu red tick hide cheyyunnu
                if(followers) followers.innerText = "0";
            }
        }
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
