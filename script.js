document.getElementById("nameLink").addEventListener("click", function (event) {
  event.preventDefault(); // Prevents unwanted page jumps
  this.classList.add("animated");

  // Remove animation class after animation ends so it can be retriggered
  setTimeout(() => {
    this.classList.remove("animated");
  }, 600);
});
