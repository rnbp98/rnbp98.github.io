$("#login_button").on("click", (evn) => {
  evn.preventDefault();
  //TODO: REMOVE THIS FOR API CALL
  console.log($("#email").val(), $("#password").val());
  if (
    $("#email").val() == "test@epn.edu.ec" &&
    $("#password").val() == "usuarioPrueba"
  ){
    localStorage.setItem("API_KEY", "bhjgacsvbcsa8732fd834^&");
    window.location.href = "/";
    return;
  }
  $("#loginError").html("Credenciales Invalidas");
  $("#loginError").removeAttr("hidden");
});
