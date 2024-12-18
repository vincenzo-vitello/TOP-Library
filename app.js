const body = document.querySelector("body");
const filtersIcon = document.getElementById("filters");
const themeToggler = document.getElementById("theme_toggler");

const setColorScheme = () => {
  const currentTheme = body.getAttribute("data-theme");
  if (currentTheme === "dark") {
    body.setAttribute("data-theme", "light");

    filtersIcon.setAttribute("src", "./assets/filters-light.svg");
    themeToggler.setAttribute("src", "./assets/light-mode.svg");
  } else {
    body.setAttribute("data-theme", "dark");
    filtersIcon.setAttribute("src", "./assets/filters-dark.svg");
    themeToggler.setAttribute("src", "./assets/dark-mode.svg");
  }
};
themeToggler.onclick = () => setColorScheme();
