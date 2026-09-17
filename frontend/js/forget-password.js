const forgotForm = document.getElementById("forgotForm");

forgotForm.addEventListener("submit", function (e) {

e.preventDefault();

const email = document.getElementById("email").value;

console.log("Email:", email);

// الانتقال لصفحة إدخال الكود
window.location.href = "../html/verify-code.html";

});