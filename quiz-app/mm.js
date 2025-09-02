"use strict";
//set elements

const startQuiz = document.getElementById("start-quiz");
const countSpan = document.querySelector(".question-count span");
const categorySpan = document.querySelector(".category span");
const quizArea = document.querySelector(".quiz-area");
const bulletSpan = document.querySelector(".bullets .spans");
const answerArea = document.querySelector(".answers-area");
const submitButton = document.querySelector(".submit");
const resultContainer = document.querySelector(".results");

//set option
let qObject = [];
let currentIndex = 0;
let rightAnswers = 0;
let bulletSpans;
let counter;
let result;
// start quiz button
startQuiz.addEventListener("click", () => {
  quizArea.innerHTML = "";
  answerArea.innerHTML = "";
  bulletSpan.innerHTML = "";
  rightAnswers = 0;
  currentIndex = 0;

  getQuestion();
});

//function get the questions

function getQuestion() {
  let request = new XMLHttpRequest();
  // arrow function doesn't support this keyword
  request.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      qObject = JSON.parse(this.responseText);

      addQuestion(qObject);
      createBullets(qObject.length);
      submitButton.addEventListener("click", function () {
        if (currentIndex < qObject.length) {
          let rightAnswer = qObject[currentIndex].right_answer;
          checkAnswer(rightAnswer);
          currentIndex++;
          if (currentIndex < qObject.length) {
            quizArea.innerHTML = "";
            answerArea.innerHTML = "";
            addQuestion(qObject);
            handleBullets();
          }
        } else {
          quizArea.innerHTML = "";
          answerArea.innerHTML = "";
          showResult(qObject.length);
          submitButton.disabled = true;
        }
      });
    }
  };
  request.open("get", "html_questions.JSON", true);
  request.send();
}

//add

function addQuestion(object) {
  let questionTitle = document.createElement("h2");
  questionTitle.textContent = object[currentIndex].title;
  quizArea.appendChild(questionTitle);

  //create answers
  for (let i = 1; i <= 4; i++) {
    const answerDiv = document.createElement("div");
    answerDiv.className = "answer";

    //create radio input
    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = `answer_${i}`;
    radioInput.name = "answerName";
    radioInput.dataset.answer = qObject[currentIndex][`answer_${i}`];
    //create label
    const theLabel = document.createElement("label");
    theLabel.htmlFor = `answer_${i}`;
    theLabel.textContent = qObject[currentIndex][`answer_${i}`];
    answerDiv.append(radioInput, theLabel);
    answerArea.appendChild(answerDiv);
  }
}
//check answer
function checkAnswer(theRightAnswer) {
  const answers = document.getElementsByName("answerName");
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked && answers[i].dataset.answer === theRightAnswer) {
      rightAnswers++;
      break;
    }
  }
}
//create bullets
function createBullets(count) {
  countSpan.innerHTML = count;
  for (let i = 0; i < count; i++) {
    let span = document.createElement("span");
    bulletSpan.appendChild(span);
  }
}
// handle bullets
function handleBullets() {
  let bullets = document.querySelectorAll(".bullets .spans span");
  bullets.forEach((element, index) => {
    element.classList.remove("on");
    if (index === currentIndex) {
      element.classList.add("on");
    } else if (currentIndex > index) {
      element.classList.add("finished");
    }
  });
}
//show
function showResult(count) {
  resultContainer.classList.add("show");
  if (count === currentIndex) {
    quizArea.remove();
    answerArea.remove();
    submitButton.remove();
    bulletSpan.innerHTML = "";
    if (rightAnswers === count) {
      result = `<span class="perfect"> you answered all questions</span>`;
    } else if (rightAnswers >= count / 2 && rightAnswers < count) {
      result = `<span class="good"> you answered ${rightAnswers} from ${count} </span>`;
    } else {
      result = `<span class="bad"> try to study again </span>`;
    }
  }
  resultContainer.innerHTML = result;
}
