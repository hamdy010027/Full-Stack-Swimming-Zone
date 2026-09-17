const verifyForm = document.getElementById("verifyForm");

verifyForm.addEventListener("submit", function (e) {

e.preventDefault();

const code = document.getElementById("code").value;

console.log("Verification Code:", code);

// مؤقتًا بعد إدخال الكود
alert("Code verified successfully!");
      window.location.href = "../front-swimmingzone/index.html";


});