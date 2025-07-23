document.getElementById("nameLink").addEventListener("click", function (event) {
  event.preventDefault(); // Prevents unwanted page jumps
  this.classList.add("animated");

  // Remove animation class after animation ends so it can be retriggered
  setTimeout(() => {
    this.classList.remove("animated");
  }, 600);
});

const checkboxBtn = document.querySelector("#dark-mode");

const stored = localStorage.getItem("darkMode");

if (stored === "enabled" || stored === null) {
  document.body.classList.add("dark-mode");
  checkboxBtn.checked = true;
}

checkboxBtn.addEventListener("change", () => {
  if(checkboxBtn.checked){
    document.body.classList.add("dark-mode")
    localStorage.setItem("darkMode", "enabled")
  }else{
    document.body.classList.remove("dark-mode")
    localStorage.setItem("darkMode", "disabled")
  }
})