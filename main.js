
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













