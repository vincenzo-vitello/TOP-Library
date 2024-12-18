const body = document.querySelector("body");
const filtersIcon = document.getElementById("filters");
const setColorScheme = () => {
  if (body.getAttribute("data-theme") === "dark") {
    filtersIcon.setAttribute("src", "./assets/filters-dark.svg");
  }
};
document.addEventListener("DOMContentLoaded", () => {
  setColorScheme();
});
