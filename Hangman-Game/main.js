const letters = "abcdefghijklmnopqrstwxyz0123456789!@#$%^&*()_-+=<>.,/?";
let lettersArray = Array.from(letters);
let lettersContainer = document.querySelector(".letters");

lettersArray.forEach((letter) => {
  let span = document.createElement("span");
  let theletter = document.createTextNode(letter);
  span.appendChild(theletter);
  span.className = "letter-box";
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  programming: [
    "php",
    "javascript",
    "go",
    "scala",
    "fortran",
    "r",
    "mysql",
    "python",
  ],
  movies: [
    "Prestige",
    "Inception",
    "Parasite",
    "Interstellar",
    "Whiplash",
    "Memento",
    "Coco",
    "Up",
  ],
  people: [
    "Albert Einstein",
    "Hitchcock",
    "Alexander",
    "Cleopatra",
    "Mahatma Ghandi",
  ],
  countries: ["Syria", "Palestine", "Yemen", "Egypt", "Bahrain", "Qatar"],
};
let allKeys = Object.keys(words);
let randomNumber = Math.floor(Math.random() * allKeys.length);
let randomName = allKeys[randomNumber];
let randomPropertyValue = words[randomName];
let randomValueNumber = Math.floor(Math.random() * randomPropertyValue.length);
let randomWord = randomPropertyValue[randomValueNumber];
console.log(randomName);
document.querySelector(".game-info .catagory span").innerHTML = randomName;
let lettersGuess = document.querySelector(".letters-guess");
let wordArray = Array.from(randomWord);
wordArray.forEach((letter) => {
  let emptySpan = document.createElement("span");
  if (letter === " ") {
    emptySpan.className = "has-space";
  }
  lettersGuess.appendChild(emptySpan);
});
let guessSpan = document.querySelectorAll(".letters-guess span");
let chosenWord = Array.from(randomWord.toLowerCase());

let worngTries = 0;
let draw = document.querySelector(".hangman-draw");
let correctGuess = 0;
document.addEventListener("click", (e) => {
  if (e.target.className === "letter-box") {
    let status = false;
    e.target.classList.add("clicked");
    let clickedLetter = e.target.innerHTML.toLowerCase();
    //loop on the chosen word
    chosenWord.forEach((wordLetter, wordIndex) => {
      //comparsion between two letters
      if (clickedLetter == wordLetter) {
        status = true;
        document.getElementById("success").play();
        guessSpan.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = wordLetter;
            correctGuess++;
          }
        });
      }
    });
    if (!status) {
      worngTries++;
      draw.classList.add(`wrong-${worngTries}`);
      document.getElementById("fail").play();
      if (worngTries === 8) {
        setTimeout(() => {
          endgame(false);
        }, 1000);
        lettersContainer.classList.add("finished");
      }
    } else {
      if (correctGuess === chosenWord.filter((l) => l !== " ").length) {
        endgame(true); // فاز
        lettersContainer.classList.add("finished");
      }
    }
  }
});

//endgame
function endgame(isWinner) {
  let div = document.createElement("div");
  let text;
  if (isWinner) {
    text = document.createTextNode(`congrates`);
  } else {
    text = document.createTextNode(`game-over the word is ${randomWord} `);
  }
  let resetButton = document.createElement("button");
  resetButton.textContent = "play again";

  div.append(text, resetButton);
  resetButton.addEventListener("click", function () {
    location.reload();
  });
  div.className = "popup";
  document.body.appendChild(div);
}
