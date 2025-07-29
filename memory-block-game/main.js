let controlButton = document.querySelector(".control-buttons span");
controlButton.addEventListener("click", () => {
  let yourName = prompt("what's your name");
  let namespan = document.querySelector(".name span");
  if (yourName && yourName.trim() != "") {
    namespan.textContent = yourName;
  } else {
    namespan.textContent = "unkown";
  }
  document.querySelector(".control-buttons").remove();
  startTime();
});
let time = 0;
let timeInterval;
let duration = 1000;
let maxTries = 10;
let maxTime = 60;
let blockContainer = document.querySelector(".memory-game-blocks");
let blocks = Array.from(blockContainer.children);
let orderRange = [...Array(blocks.length).keys()];
console.log(orderRange);
shuffle(orderRange);
blocks.forEach((block, index) => {
  block.style.order = orderRange[index];
});
blocks.forEach((block) => {
  block.addEventListener("click", function () {
    flipBlock(block);
  });
});
//suffle
function shuffle(Array) {
  let current = Array.length,
    temp,
    random;
  while (current > 0) {
    random = Math.floor(Math.random() * current);
    current--;
    temp = Array[current];
    Array[current] = Array[random];
    Array[random] = temp;
  }
  return Array;
}
//flip function
function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");
  let allFlippedBlocks = blocks.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );
  if (allFlippedBlocks.length === 2) {
    stopclick();
    matchedBlock(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}
//stop clicking
function stopclick() {
  blockContainer.classList.add("no-click");
  setTimeout(() => {
    blockContainer.classList.remove("no-click");
  }, duration);
}
// check matched
function matchedBlock(firstBlock, secondBlock) {
  let tries = document.querySelector(".tries span");
  if (firstBlock.dataset.name === secondBlock.dataset.name) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");
    firstBlock.classList.add("has-match");
    secondBlock.classList.add("has-match");
    document.getElementById("success").play();
  } else {
    tries.innerHTML = parseInt(tries.innerHTML) + 1;
    setTimeout(() => {
      firstBlock.classList.add("wrong");
      secondBlock.classList.add("wrong");
    }, 800);
    if (tries.innerHTML > maxTries) {
      stopTime();
      document.getElementById(
        "game-over-text"
      ).textContent = `Game Over! You reached the ${maxTries} wrong tries.`;
      document.getElementById("game-over").classList.add("active");
    }
    setTimeout(() => {
      firstBlock.classList.remove("is-flipped", "wrong");
      secondBlock.classList.remove("is-flipped", "wrong");
    }, duration);
    document.getElementById("fail").play();
  }
  if (blocks.every((block) => block.classList.contains("has-match"))) {
    stopTime();
    document.getElementById("final-time").textContent = `${time}`;
    document.getElementById("congrats").classList.add("active");
    let duration = 3000;
    let end = Date.now() + duration;
    function frame() {
      confetti({
        particleCount: 150, // عدد الأوراق
        spread: 100, // زاوية الانتشار
        origin: { y: 0.6 }, // من أي مكان تبدأ
      });
    }
    if (Date.now() > end) {
      requestAnimationFrame(frame);
    }
    frame();
  }
}
//start time
function startTime() {
  timeInterval = setInterval(() => {
    time++;
    document.getElementById("time").textContent = time;
    if (maxTime === time) {
      stopTime();
      document.getElementById(
        "game-over-text"
      ).textContent = `Game Over! You reached the ${maxTime} seconds max time.`;
      document.getElementById("game-over").classList.add("active");
    }
  }, 1000);
}
//stop time
function stopTime() {
  clearInterval(timeInterval);
}
//rest timer
function resetTime() {
  stopTime();
  time = 0;
  document.getElementById("time").textContent = time;
}
//rest game
function restartGame() {
  resetTime();
  document.querySelector(".tries span").textContent = 0;
  blocks.forEach((block) => {
    block.classList.remove("is-flipped", "has-match");
  });
  shuffle(orderRange);
  blocks.forEach((block, index) => {
    block.style.order = orderRange[index];
  });
  document.getElementById("congrats").classList.remove("active");
  document.getElementById("game-over").classList.remove("active");
  startTime();
}
document.querySelectorAll(".reset-button").forEach((btn) => {
  btn.addEventListener("click", restartGame);
});
