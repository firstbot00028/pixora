// LOGIN FUNCTION

function login(){

let username = document.getElementById("username").value
let password = document.getElementById("password").value

if(username === "AiraAdam" && password === "Aira123"){

alert("Welcome Founder 🚀")

window.location.href = "home.html"

}else{

alert("Invalid login ❌")

}

}



// MESSAGE SYSTEM

function send(){

let msg = document.getElementById("msg").value

if(msg === "") return

let chat = document.getElementById("chat")

let div = document.createElement("div")

div.innerText = msg

chat.appendChild(div)

document.getElementById("msg").value = ""

}



// CREATE POST

function createPost(){

let caption = document.getElementById("caption").value

if(caption === "") return

let feed = document.getElementById("feed")

let post = document.createElement("div")

post.className = "post"

post.innerHTML = `
<h4>@AiraAdam <span class="redtick">✔</span></h4>
<p>${caption}</p>
`

feed.prepend(post)

document.getElementById("caption").value = ""

}



// PROFILE PHOTO UPLOAD

function uploadPic(event){

let file = event.target.files[0]

if(!file) return

let reader = new FileReader()

reader.onload = function(){

document.getElementById("profilePic").src = reader.result

}

reader.readAsDataURL(file)

}
