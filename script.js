const form = document.getElementById("contactForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("pass").value;

  try {
    const response = await fetch("http://localhost:8000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    console.log(data);

    if (response.ok) {
      alert("LOGIN SUCCESS");

      window.location.href = "/frontend/front-swimmingzone/index.html";
    } else {
      alert(JSON.stringify(data));
    }
  } catch (error) {
    console.error("ERROR =", error);
    alert("Can't connect to the server");
  }
});
