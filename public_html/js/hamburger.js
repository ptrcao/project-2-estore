const hamburger = document.getElementById("hamburgerButton");
const hamburgerCloseBtn = document.getElementById("hamburgerCloseButton");
const hamburgerNav = document.getElementById("hamburgerNav");

hamburger.addEventListener("click", () => {
  hamburgerNav.style.visibility = "visible";
});

hamburgerCloseBtn.addEventListener("click", () => {
  hamburgerNav.style.visibility = "hidden";
});
