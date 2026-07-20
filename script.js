const firebaseConfig = {
apiKey: "AIzaSyDWV3n0zFzyhcEiYKdNLJHmK7KC2nBQy1s",
authDomain: "vnx-topup.firebaseapp.com",
projectId: "vnx-topup",
storageBucket: "vnx-topup.firebasestorage.app",
messagingSenderId: "115152787058",
appId: "1:115152787058:web:ea006bc4b26324c80e14eb"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const products = {
  diamond: [
  ["25 Diamond", "৳30"],
  ["50 Diamond", "৳45"],
  ["75 Diamond", "৳70"],
  ["115 Diamond", "৳86"],
  ["240 Diamond", "৳170"],
  ["355 Diamond", "৳250"],
  ["480 Diamond", "৳330"],
  ["610 Diamond", "৳415"],
  ["850 Diamond", "৳568"],
  ["1090 Diamond", "৳740"],
  ["1240 Diamond", "৳830"],
  ["2530 Diamond", "৳1640"],
  ["5060 Diamond", "৳3300"]
],
  weekly: [
  ["Weekly Lite", "৳50"],
  ["Weekly Membership", "৳165"]
],
  monthly: [
  ["Monthly Membership", "৳810"]
],
levelup: [
  ["Level 6 +120 Diamond", "৳60"],
  ["Level 10 +200 Daimond", "৳80"],
  ["Level 15 +200 Diamond", "৳85"],
  ["Level 20 +200 Diamond", "৳90"],
  ["Level 25 +200 Diamond", "৳100"],
  ["Level 30 +200 Diamond", "৳130"],
  ["Full Package +1270 Diamond", "৳535"]
],
  premium: [
  ["CapCut Pro (1 বছর )", "৳99"],
  ["PicsArt Gold (1 বছর )", "৳99"],
  ["Remini Pro (1 বছর)", "৳99"]
]
};

let current = "diamond";
let selectedName = "";
let selectedPrice = "";
let paymentMethod = "";

function showCategory(type){
  current = type;
  document.querySelectorAll(".cat").forEach(btn=>{
    btn.classList.remove("active");
  });
  loadProducts();
}

function loadProducts(){

  const list = document.querySelector(".product-list");
  if(!list) return;

  list.innerHTML = "";

  let img = "images/diamond.png";

  if(current==="weekly") img="images/weekly.png";
  if(current==="monthly") img="images/monthly.png";
  if(current==="levelup") img="images/levelup.png";

products[current].forEach(item=>{

  let image = "";

  if(current==="premium"){
  if(item[0].includes("CapCut")) image="capcut.png";
  if(item[0].includes("PicsArt")) image="picsart.png";
  if(item[0].includes("Remini")) image="remini.png";
}

  list.innerHTML += `
    <div class="card" onclick="selectPackage(event,'${item[0]}','${item[1]}')">
      ${image ? `<img src="${image}" class="product-img">` : ""}
      <div class="name">${item[0]}</div>
      <div class="price">${item[1]}</div>
    </div>
  `;

});

}

function selectPackage(event, name, price){

const uid = document.getElementById("uid");
const uidValue = uid.value.trim();

if(uidValue==""){
  alert("⚠️ আগে আপনার Free Fire UID লিখুন");
  return;
}

if(!/^[0-9]{8,12}$/.test(uidValue)){
  alert("❌ সঠিক Free Fire UID লিখুন (৮–১২ সংখ্যার)");
  return;
}
  document.querySelectorAll(".card").forEach(card=>{
  card.classList.remove("selected");
});

event.currentTarget.classList.add("selected");
  selectedName=name;
  selectedPrice=price;
document.getElementById("summary").style.display="block";
document.getElementById("summaryName").innerHTML="💎 " + name;
document.getElementById("summaryPrice").innerHTML="💰 " + price;
  document.getElementById("nextBtn").style.display="block";

}

window.onload = function () {

  loadProducts();

  const nextBtn = document.getElementById("nextBtn");

  if (!nextBtn) return;

  nextBtn.onclick = function () {

    if (selectedName == "") {
      alert("আগে একটি Package নির্বাচন করুন");
      return;
    }

    document.getElementById("orderPopup").style.display = "flex";

  };

};
function closePopup() {
  document.getElementById("orderPopup").style.display = "none";
}

function selectPayment(method){

alert("Clicked: " + method);

paymentMethod = method;

const paymentBox = document.getElementById("paymentBox");
const paymentTitle = document.getElementById("paymentTitle");
const paymentNumber = document.getElementById("paymentNumber");

paymentBox.style.display = "block";

paymentTitle.innerHTML = "Payment : " + method;

if(method==="bKash"){

document.getElementById("paymentNumber").innerHTML=`
<b>নাম্বার:</b>
<span id="payNumber">01635751294</span>

<button onclick="copyNumber()">📋 Copy</button>

<br><br>

<b>পাঠাতে হবে:</b> ${selectedPrice}

<br>

⚠️ শুধুমাত্র Personal (Send Money)

`;

}else{

document.getElementById("paymentNumber").innerHTML=`
<b>নাম্বার:</b>
<span id="payNumber">01768227140</span>

<button onclick="copyNumber()">📋 Copy</button>

<br><br>

<b>পাঠাতে হবে:</b> ${selectedPrice}

<br>

⚠️ শুধুমাত্র Personal (Send Money)

`;

}
}

function toggleHelp(){

  const menu = document.getElementById("helpMenu");

  if(menu.style.display=="block"){
    menu.style.display="none";
  }else{
    menu.style.display="block";
  }

}

window.addEventListener("scroll",function(){

  const help=document.getElementById("helpBox");

  if(window.scrollY>500){
    help.style.display="none";
  }else{
    help.style.display="block";
  }

});

async function submitOrder(){

const uid = document.getElementById("uid").value.trim();
const trx = document.getElementById("trxid").value.trim();
const sender = document.getElementById("senderNumber").value.trim();

if(paymentMethod==""){
alert("Payment Method নির্বাচন করুন");
return;
}

if(sender==""){
alert("আপনার bKash/Nagad নাম্বার লিখুন");
return;
}

if(trx==""){
alert("Transaction ID লিখুন");
return;
}

try{

await db.collection("orders").add({

uid: uid,
package: selectedName,
price: selectedPrice,
payment: paymentMethod,
sender: sender,
trxid: trx,
status: "Pending",
time: firebase.firestore.FieldValue.serverTimestamp()

});

alert("✅ Order সফলভাবে Submit হয়েছে");

closePopup();

document.getElementById("senderNumber").value="";
document.getElementById("trxid").value="";

}catch(error){

alert("❌ Error: " + error.message);

}

}

function copyNumber() {
  const number = document.getElementById("payNumber").innerText;
  navigator.clipboard.writeText(number);
  alert("নাম্বার কপি হয়েছে");
}