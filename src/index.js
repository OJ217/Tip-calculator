import reactDom from "react-dom";
import App from "./components/App";

reactDom.render(<App />, document.getElementById("root"));

let buttons = document.querySelectorAll(".tipButton");
let tipInput = document.querySelector(".custom-tip");

tipInput.addEventListener("focus", () => {
  buttons.forEach((button) => {
    button.classList.remove("active");
  });
});

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    buttons.forEach((otherButton) => {
      otherButton.classList.remove("active");
    });
    button.classList.add("active");
  });
});
