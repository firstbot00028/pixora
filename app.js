// 🔱 Ninte Magic Cloudflare URL (Termux-il active aaya link)
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
            // Form switch cheyyaan ulla function (undengil)
            if (typeof toggleForm === "function") toggleForm();
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Backend Offline! Termux-il python server check cheyyu! 🚫");
    }
}

// 🔱 2. LOGIN FUNCTION
async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // Founder Access (Master Override)
    if(user === "AiraAdam" && pass === "Aira123") {
        alert("Welcome Founder 🚀 (Aira-Adam Sovereign)");
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
            alert("Login Success! 💎");
            window.location.href = "home.html";
        } else {
            alert(result.message);
        }
    } catch (error) {
        alert("Server connection failed! Check Cloudflare Tunnel. 🚫");
    }
}

// 🔱 3. MESSAGE SYSTEM
function send() {
    let msg = document.getElementById("msg").value;
    if(msg === "") return;

    let chat = document.getElementById("chat");
    let div = document.createElement("div");
    div.style.padding = "10px";
    div.style.margin = "5px";
    div.style.background = "#1a1a1a";
    div.style.color = "#00ff00";
    div.style.borderRadius = "8px";
    div.style.fontFamily = "monospace";
    div.innerText = `> ${msg}`;

    chat.appendChild(div);
    document.getElementById("msg").value = "";
    chat.scrollTop = chat.scrollHeight; 
}

// 🔱 4. CREATE POST
function createPost() {
    let caption = document.getElementById("caption").value;
    if(caption === "") return;

    let feed = document.getElementById("feed");
    let post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `
        <div style="border: 1px solid #333; padding: 15px; margin-bottom: 15px; border-radius: 15px; background: #0a0a0a; box-shadow: 0 4px 10px rgba(0,0,0,0.5);">
            <h4 style="margin: 0; color: #ff0000;">@AiraAdam <span class="redtick" style="color: red;">✔</span></h4>
            <p style="color: #eee; margin-top: 10px; font-size: 1.1rem;">${caption}</p>
        </div>
    `;

    feed.prepend(post);
    document.getElementById("caption").value = "";
}

// 🔱 5. PROFILE PHOTO UPLOAD
function uploadPic(event) {
    let file = event.target.files[0];
    if(!file) return;

    let reader = new FileReader();
    reader.onload = function() {
        document.getElementById("profilePic").src = reader.result;
    };
    reader.readAsDataURL(file);
}
