let input_pwd;
const password = String.fromCharCode(49, 50, 51);
let querryString = window.location.search
let urlParams = new URLSearchParams(querryString)
input_pwd= (urlParams.get('input-pwd'))
console.log(input_pwd);

console.log(typeof input_pwd);

console.log(typeof password);
if (input_pwd === password) {
  console.log(password);
  }
    else{
    window.location="index.html";
    alert('Enter Correct Password')
  }


  let input_name;
  
let form1 = document.getElementById("create-form");
form1.addEventListener("submit", (e) => {
  e.preventDefault();
  input_name = String(e.target.name.value);
  console.log(input_name);
  let roomId = String(Math.floor(Math.random() * 10000));
  console.log(input_name)
  window.location = `room.html?room=${roomId}&input-name=${input_name}`;

});
let form2 = document.getElementById("join-form");
form2.addEventListener("submit", (e) => {
  e.preventDefault();
  input_name = String(e.target.yourname.value);
  console.log(input_name);
  let roomId = e.target.invite_link.value;
  window.location = `room.html?room=${roomId}&input-name=${input_name}`;
});













