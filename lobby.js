
let toggleButtons = document.querySelectorAll(".btn");
toggleButtons.forEach((button) => {
  let previousColor = button.style.background; // Store the previous background color
  button.addEventListener("click", () => {
    let controlElement = document.getElementById("control");
    if (controlElement.style.display === "none") {
      controlElement.style.display = "block";
      controlElement.classList.add("control-transition"); // Add the transition class
    } else {
      controlElement.classList.remove("control-transition"); // Remove the transition class
      controlElement.style.display = "none";
    }

    setTimeout(() => {
      controlElement.style.display = "none"; // Reset the display property
      controlElement.classList.remove("control-transition"); // Remove the transition class
    }, 3000); // Revert back after 3 seconds (adjust the time as needed)
  });
});
