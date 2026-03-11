const BACKEND_URL = "https://structures-turns-possibility-combined.trycloudflare.com";

// 🔱 UPDATED LOGIN FUNCTION
async function login() {
    let user = document.getElementById("username").value;
    let pass = document.getElementById("password").value;

    // 1. Founder Access (Nammude Secret Key)
    if(user === "AiraAdam" && pass === "Aira123") {
        alert("Welcome Founder 🚀 (Master Override)");
        window.location.href = "home.html";
        return;
    }

    // 2. Real-Time Backend Access (From Termux)
    try {
        const response = await fetch(`${BACKEND_URL}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user, password: pass })
        });

        const result = await response.json();

        if (response.ok) {
            alert("Login Success, muthe! 💎");
            window.location.href = "home.html";
        } else {
            alert(result.message); // "Invalid login" or "User not found"
        }
    } catch (error) {
        console.error("Connection Error:", error);
        alert("Backend Engine (Termux) ON aano muthe? Onnu check cheyyu! 🚫");
    }
}

// 🔱 REST OF YOUR CLEAN CODE (Message, Post, Profile)
function send(){
    let msg = document.getElementById("msg").value;
    if(msg === "") return;
    let chat = document.getElementById("chat");
    let div = document.createElement("div");
    div.innerText = msg;
    chat.appendChild(div);
    document.getElementById("msg").value = "";
}

function createPost(){
    let caption = document.getElementById("caption").value;
    if(caption === "") return;
    let feed = document.getElementById("feed");
    let post = document.createElement("div");
    post.className = "post";
    post.innerHTML = `<h4>@AiraAdam <span class="redtick">✔</span></h4><p>${caption}</p>`;
    feed.prepend(post);
    document.getElementById("caption").value = "";
}

function uploadPic(event){
    let file = event.target.files[0];
    if(!file) return;
    let reader = new FileReader();
    reader.onload = function(){
        document.getElementById("profilePic").src = reader.result;
    };
    reader.readAsDataURL(file);
}
