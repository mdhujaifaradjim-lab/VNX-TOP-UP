function login(){

const email=document.getElementById("email").value;
const password=document.getElementById("password").value;

  if(email==="jimbhai1212@gmail.com" && password==="vnxtopup"){

document.getElementById("loginPage").style.display="none";
document.getElementById("dashboard").style.display="flex";

}else{

alert("❌ ভুল Email অথবা Password");

}

}

function logout(){

document.getElementById("dashboard").style.display="none";
document.getElementById("loginPage").style.display="flex";

document.getElementById("email").value="";
document.getElementById("password").value="";

}

function showPage(page){

document.querySelectorAll(".page").forEach(function(item){

item.style.display="none";

});

document.getElementById(page).style.display="block";

}