const generateButton = document.getElementById("generate-btn");
const colorsContainer = document.querySelector(".colors-container");
const boxCountInput = document.getElementById("box-count");

generateButton.addEventListener("click", generateColors);

function generateColors() {
  let count = parseInt(boxCountInput.value) || 0;
  colorsContainer.innerHTML = "";
  let colors = [];
  for (let i = 0; i < count; i++) {
    colors.push(generateRandomColor());
  }
  generateColorsBox(colors);
}
function generateRandomColor() {
  const letters = "0123456789abcdef";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

colorsContainer.addEventListener("click", function (element) {
  if (element.target.classList.contains("copy-btn")) {
    const colorHexValue = element.target.previousSibling.textContent;
    navigator.clipboard.writeText(colorHexValue);
  } else if (element.target.classList.contains("color")) {
    const colorHexValue =
      element.target.nextSibling.querySelector(".hex-value").textContent;
    navigator.clipboard.writeText(colorHexValue);
  }
});
function generateColorsBox(array) {
  array.forEach((hexColor) => {
    const mainDiv = document.createElement("div");
    mainDiv.className = "color-box";
    const colorDiv = document.createElement("div");
    colorDiv.className = "color";
    colorDiv.style.backgroundColor = hexColor;
    const infoDiv = document.createElement("div");
    infoDiv.className = "color-info";
    const span = document.createElement("span");
    span.className = "hex-value";
    span.textContent = hexColor;
    const icon = document.createElement("i");
    icon.classList.add("fa-solid", "fa-copy", "copy-btn");
    infoDiv.append(span, icon);
    mainDiv.append(colorDiv, infoDiv);
    colorsContainer.appendChild(mainDiv);
  });
}
