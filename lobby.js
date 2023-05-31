
let toggleButtons = document.querySelectorAll(".btn");
toggleButtons.forEach((button) => {
  let previousColor = button.style.background; // Store the previous background color
  button.addEventListener("click", () => {
    if (document.getElementById("control").style.display === 'none') {
        document.getElementById("control").style.display= 'flex';
        document.getElementById("control").style.justifyContent = 'center';
        document.getElementById("control").style.alignItems = 'center';
       
    } else {
        document.getElementById("control").style.display= 'none';
    }

    setTimeout(() => {
        document.getElementById("control").style.display= 'none';; // Reset the background color
      }, 30000); // Revert back after 3 seconds (adjust the time as needed)
    
  });

});
