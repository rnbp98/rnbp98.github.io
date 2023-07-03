function logout() {
  localStorage.removeItem("API_KEY");
}

function checkAuth() {
  const API_KEY = localStorage.getItem("API_KEY");
  if (!API_KEY) {
    window.location.href = "/login.html";
  }
}

function validatePassword() {
  var passwordInput = document.getElementById("password").value;
  var passwordInput2 = document.getElementById("password2").value;
  if (passwordInput.length < 8) {
    document.getElementById("passwordError").textContent =
      "La contraseña debe tener al menos 8 caracteres";
    return false;
  }
  if (!/\d/.test(passwordInput)) {
    document.getElementById("passwordError").textContent =
      "La contraseña debe tener al menos un número";
    return false;
  }
  if (!/[A-Z]/.test(passwordInput)) {
    document.getElementById("passwordError").textContent =
      "La contraseña debe tener al menos una mayúscula";
    return false;
  }

  if (!/[!@#$%^&*]/.test(passwordInput)) {
    document.getElementById("passwordError").textContent =
      "La contraseña debe tener al menos un carácter especial (!@#$%^&*).";
    return false;
  }
  if (passwordInput !== passwordInput2) {
    document.getElementById("passwordError").textContent =
      "La contraseña debe coincidir.";
    return false;
  }
  return true;
}
