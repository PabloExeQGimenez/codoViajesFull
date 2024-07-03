document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");
  const loginError = document.getElementById("login-error");

  loginForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const email = document.getElementById("email").value;
      const contrasena = document.getElementById("password").value;

      fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email, contrasena })
      })
      .then((response) => {
          if (!response.ok) {
              return response.json().then(data => { 
                  throw new Error(data.message || 'Error al iniciar sesión');
              });
          }
          return response.json();
      })
      .then((data) => {
          console.log("Login exitoso:", data);
          localStorage.setItem("token", data.token);
          window.location.href = "admin.html";
      })
      .catch((error) => {
          console.error("Error al iniciar sesión:", error);
          loginError.textContent = error.message;
          loginError.style.display = "block";
      });
  });
});
