function validatePassword() {
    var passwordInput = document.getElementById("password").value;
    var passwordInput2 = document.getElementById("password2").value;
    document.getElementById("passwordError").innerHTML ="";
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

$("#singup").on('submit',(evt)=>{
    evt.preventDefault()
    validatePassword()
    document.getElementById("singup").reset()
})