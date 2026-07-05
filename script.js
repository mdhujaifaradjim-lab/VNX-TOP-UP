const products = {
  diamond: [
  ["25 Diamond", "৳30"],
  ["50 Diamond", "৳50"],
  ["115 Diamond", "৳89"],
  ["240 Diamond", "৳175"],
  ["355 Diamond", "৳260"],
  ["480 Diamond", "৳340"],
  ["610 Diamond", "৳425"],
  ["850 Diamond", "৳585"],
  ["1090 Diamond", "৳740"],
  ["1240 Diamond", "৳830"],
  ["2530 Diamond", "৳1660"],
  ["5060 Diamond", "৳3350"]
],
  weekly: [
  ["Weekly Lite", "৳65"],
  ["Weekly Membership", "৳175"]
],
  monthly: [
  ["Monthly Membership", "৳830"]
],
levelup: [
  ["Level 6 +120 Diamond", "৳60"],
  ["Level 15 +200 Diamond", "৳90"],
  ["Level 20 +200 Diamond", "৳100"],
  ["Level 25 +200 Diamond", "৳110"],
  ["Level 30 +200 Diamond", "৳125"],
  ["Full Package +1270 Diamond", "৳485"]
]
};

let current = "diamond";
let selectedName = "";
let selectedPrice = "";

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

    list.innerHTML += `
      <div class="card" onclick="selectPackage(event,'${item[0]}','${item[1]}')">
        <div class="name">${item[0]}</div>
        <div class="price">${item[1]}</div>
      </div>
    `;

  });

}

function selectPackage(name,price){

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

function goWhatsApp() {

  const uid = document.getElementById("uid").value;

  const msg = `আমি টপ-আপ করতে চাই

UID: ${uid}

Package: ${selectedName}

Price: ${selectedPrice}`;

  window.open(
    "https://wa.me/8801635751294?text=" + encodeURIComponent(msg),
    "_blank"
  );

  closePopup();
}

function goFacebook() {

window.open(
"https://m.me/1190630324137970",
"_blank"
);

  closePopup();
}