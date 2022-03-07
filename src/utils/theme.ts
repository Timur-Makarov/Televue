export const setTheme = (dark: boolean) => {
  if (dark) {
    window.document.body.classList.add("dark");
  } else {
    window.document.body.classList.remove("dark");
  }
};
