//get slider items
let sliderImages = Array.from(
  document.querySelectorAll(".slider-container img")
);
let slideCount = sliderImages.length;
//set slide number
let currentSlide = 1;
let slideNumberElement = document.getElementById("slide-number");
let nextButton = document.getElementById("next");
let prevButton = document.getElementById("prev");

function nextSlider() {
  if (currentSlide < slideCount) {
    currentSlide++;
  } else {
    currentSlide = 1;
  }
  checker();
}
function prevSlider() {
  if (currentSlide > 1) {
    currentSlide--;
  } else {
    currentSlide = slideCount;
  }
  checker();
}
nextButton.addEventListener("click", nextSlider);
prevButton.addEventListener("click", prevSlider);
let paginatonElement = document.createElement("ul");
paginatonElement.setAttribute("id", "pagination-ul");

for (let i = 1; i <= slideCount; i++) {
  let paginatonItems = document.createElement("li");

  paginatonItems.setAttribute("data-index", i);

  paginatonItems.appendChild(document.createTextNode(i));

  paginatonElement.appendChild(paginatonItems);
}
document.getElementById("indicators").appendChild(paginatonElement);

// Get The New Created UL
let paginationCreatedUl = document.getElementById("pagination-ul");

// Get Pagination Items | Array.form [ES6 Feature]
let paginationsBullets = Array.from(
  document.querySelectorAll("#pagination-ul li")
);
// for (let i = 0; i < paginationsBullets.length; i++) {
//   paginationsBullets[i].onclick = function () {
//     currentSlide = parseInt(this.getAttribute("data-index"));
//     checker();
//   };
// }

function checker() {
  //set slide number
  slideNumberElement.textContent = `slide# ${currentSlide} of ${slideCount}`;
  //remove all active classes
  removeAllActive();
  //set active class on current slide
  sliderImages[currentSlide - 1].classList.add("active");
  //set active class on bullet items
  paginationCreatedUl.children[currentSlide - 1].classList.add("active");
  // if (currentSlide === 1) {
  //   prevButton.classList.add("disabled");
  // } else {
  //   prevButton.classList.remove("disabled");
  // }
  // if (currentSlide === slideCount) {
  //   nextButton.classList.add("disabled");
  // } else {
  //   nextButton.classList.remove("disabled");
  // }
}
//triger checker function
checker();
function removeAllActive() {
  sliderImages.forEach(function (img) {
    img.classList.remove("active");
  });
  paginationsBullets.forEach(function (bullet) {
    bullet.classList.remove("active");
  });
}
paginationsBullets.forEach((bullet) => {
  bullet.addEventListener("click", function () {
    currentSlide = Number(this.getAttribute("data-index"));
    checker();
  });
});
