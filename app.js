// LOGIN FUNCTION

function login(){

let username=document.getElementById("username").value
let password=document.getElementById("password").value

if(username==="AiraAdam" && password==="Aira123"){

alert("Welcome Founder")

window.location="home.html"

}else{

alert("Invalid login")

}

}


// SIMPLE MESSAGE SYSTEM

function send(){

let msg=document.getElementById("msg").value

if(msg==="") return

let chat=document.getElementById("chat")

let div=document.createElement("div")

div.innerText=msg

chat.appendChild(div)

document.getElementById("msg").value=""

}


// SIMPLE POST CREATE (frontend demo)

function createPost(){

let caption=document.getElementById("caption").value

let feed=document.getElementById("feed")

let post=document.createElement("div")

post.className="post"

post.innerHTML=`
<h4>@AiraAdam <span class="redtick">✔</span></h4>
<p>${caption}</p>
`

feed.prepend(post)

}
function uploadPic(event){

let reader=new FileReader()

reader.onload=function(){

let output=document.getElementById("profilePic")
output.src=reader.result

}

reader.readAsDataURL(event.target.files[0])

}
