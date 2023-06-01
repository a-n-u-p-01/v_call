
// let toggleButtons = document.querySelectorAll(".btn");
// toggleButtons.forEach((button) => {
//   let previousColor = button.style.background; // Store the previous background color
//   button.addEventListener("click", () => {
//     if (document.getElementById("control").style.display === 'none') {
//         document.getElementById("control").style.display= 'flex';
//         document.getElementById("control").style.justifyContent = 'center';
//         document.getElementById("control").style.alignItems = 'center';
       
//     } else {
//         document.getElementById("control").style.display= 'none';
//     }

//     setTimeout(() => {
//         document.getElementById("control").style.display= 'none';; // Reset the background color
//       }, 30000); // Revert back after 3 seconds (adjust the time as needed)
    
//   });

// });

// ---------------------js for verification------------

let input;
let verify = document.getElementById("verification");
const password = String.fromCharCode(49, 50, 51);
verify.addEventListener("submit", async (e) => {
  e.preventDefault();
  input = String(e.target.password.value);
  
  if (input === password) {
  console.log(password);
  unlock();
 document.getElementById("enter").style.display= 'none';
 document.getElementById("control").style.display= 'flex';
 document.getElementById("control").style.justifyContent = 'center';
 document.getElementById("control").style.alignItems = 'center';
 

  }
  else{
    alert('Enter Correct Password')
  }
});
  // ---------------------------js for join and create room-----------------

let CreateRoom = document.querySelector("#in > div:first-child");
CreateRoom.addEventListener('click', async () =>{
  console.log("create room");
  document.getElementById("circle").style.display = 'none';
  document.getElementById("createForm").style.display = 'flex';
})
let JoinRoom = document.querySelector("#in > div:last-child");
JoinRoom.addEventListener('click', async () =>{
  console.log("Join room");
  document.getElementById("circle").style.display = 'none';
  document.getElementById("joinForm").style.display = 'flex';

})
// let unlock = ()=>{
//   document.querySelectorAll(".lock").forEach(function(element) {
//   element.addEventListener("submit", function() {
//     this.classList.toggle("unlocked");
//   });
// });
// };


let unlock =()=> {

document.querySelectorAll('.lock').forEach((lock) => {
  // Toggle the class name 'unlocked' on each lock
  lock.classList.toggle('unlocked');
});
}

