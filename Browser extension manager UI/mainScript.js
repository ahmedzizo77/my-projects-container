const container = document.getElementById("extension-container");
const allButton = document.getElementById("btn-all");
const activeButton = document.getElementById("btn-active");
const inActiveButton = document.getElementById("btn-inactive");
const changeTheme = document.getElementById("change-theme");
const themeIcon = document.querySelector(".change-theme img");
changeTheme.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  if (document.body.classList.contains("dark-mode")) {
    themeIcon.src = "assets/images/icon-sun.svg";
    themeIcon.alt = "Light Mode";
  } else {
    themeIcon.src = "assets/images/icon-moon.svg";
    themeIcon.alt = "Dark Mode";
  }
});

const buttons = document.querySelectorAll(".button-stats");
buttons.forEach((btn) => {
  btn.addEventListener("click", () => {
    buttons.forEach((b) => {
      b.classList.remove("active");
    });
    btn.classList.add("active");
  });
});
//fetch the json object
fetch("data.json")
  .then((res) => res.json())
  .then((data) => {
    renderCards(data);
  })
  .catch((error) => {
    console.error("Error loading JSON object:", error);
  });
//create the elements in the dom according to the json object
function renderCards(data) {
  container.innerHTML = "";
  data.forEach((element, index) => {
    //card
    const card = document.createElement("div");
    card.className = "extension-card";

    //built  card header
    const cardHeader = document.createElement("div");
    cardHeader.className = "card-header";
    const logoImg = document.createElement("img");
    logoImg.src = element.logo;
    //append logo icon to card header
    cardHeader.appendChild(logoImg);
    const info = document.createElement("div");
    info.className = "info";
    const h3 = document.createElement("h3");
    h3.textContent = element.name;
    const p = document.createElement("P");
    p.textContent = element.description;
    //append p,h3 to info div
    info.append(h3, p);
    //append info div to card header
    cardHeader.appendChild(info);

    // create card footer
    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");
    const removeButton = document.createElement("button");
    removeButton.className = "remove-button";
    removeButton.id = `remove-btn-${index}`;
    removeButton.textContent = "remove";
    removeButton.addEventListener("click", () => {
      const allRemoveButtons = document.querySelectorAll(".remove-button");
      allRemoveButtons.forEach((btn) => {
        btn.classList.remove("active");
      });

      removeButton.classList.add("active");
      // const card = removeButton.closest(".extension-card");
      // card.remove();
    });
    //append remove button to cardFooter
    cardFooter.appendChild(removeButton);
    const label = document.createElement("label");
    label.className = "switch";
    const input = document.createElement("input");
    input.type = "checkbox";
    const span = document.createElement("span");
    span.className = "slider";
    //append input and span to label
    label.append(input, span);
    //append label to card footer
    cardFooter.appendChild(label);

    //append card header,card footer to card
    card.append(cardHeader, cardFooter);
    container.appendChild(card);
  });
}

activeButton.addEventListener("click", () => filterExtension("active"));
inActiveButton.addEventListener("click", () => filterExtension("inactive"));
allButton.addEventListener("click", () => filterExtension("all"));
//create filter fucntion by the mode
function filterExtension(mode) {
  const cards = document.querySelectorAll(".extension-card");
  cards.forEach((e) => {
    const checkbox = e.querySelector("input[type='checkbox']");
    let show = false;
    if (mode === "active") {
      show = checkbox.checked;
    } else if (mode === "inactive") {
      show = !checkbox.checked;
    } else if (mode === "all") {
      show = true;
    }
    e.style.display = show ? "block" : "none";
  });
}
