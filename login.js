
// ---------------------js for verification------------

let input_pwd;
let verify = document.getElementById("verification");



verify.addEventListener("submit", async (e) => {
  e.preventDefault();
  input_pwd = String(e.target.password.value);
  window.location = `/Main/index.html?input-pwd=${input_pwd}`;

});