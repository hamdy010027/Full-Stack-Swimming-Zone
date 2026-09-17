const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  try {
    const response = await fetch(
      "http://localhost:8000/api/users/register",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({
          name: name,
          email: email,
          password: password
        })
      }
    );

    const data = await response.json();

    console.log("Server response:", data);

    if (response.ok) {
      alert("Registration successful");

      // الانتقال لصفحة Login
      window.location.href = "../front-swimmingzone/index.html";
    } else {
      alert(data.data);
    }

  } catch (error) {
    console.error("Error:", error);
    alert("Can't connect to the server");
  }
});