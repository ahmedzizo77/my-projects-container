"use strict";
//set elements

let startQuiz = document.getElementById("start-quiz");
let countSpan = document.querySelector(".question-count span");
let categorySpan = document.querySelector(".category span");
let quizArea = document.querySelector(".quiz-area");
let bulletSpan = document.querySelector(".bullets .spans");
let answerArea = document.querySelector(".answers-area");
let submitButton = document.querySelector(".submit");
let resultContainer = document.querySelector(".results");

//set option
let qObject = [];
let currentIndex = 0;
let rightAnswers = 0;
let bulletSpans;
let counter;

startQuiz.addEventListener("click", () => {
  quizArea.innerHTML = "";
  answerArea.innerHTML = "";
  bulletSpan.innerHTML = "";
  currentIndex = 0;
  rightAnswers = 0;
  const selectedQuiz = document.getElementById("quiz-type").value;
  const category = {
    "html_questions.json": "HTML",
    "css_questions.json": "CSS",
    "js_questions.json": "JS",
  };
  categorySpan.innerHTML = category[selectedQuiz] || "unknown";
  getQuestions(selectedQuiz);
  // shuffleQuestion(selectedQuiz);
});
// create get question function
/*
create xml http request on readystate ok
the parse the json object and add it in the question object variable
--trigger the add function
-- trigger create bullets function
--submit button on click
    ==trigger the check function,increment the current index
    clear the quiz ,answer area 
    add another question
*/
function getQuestions(file) {
  let myRequest = new XMLHttpRequest();
  myRequest.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      qObject = JSON.parse(this.responseText);

      let uniqueQuestions = Array.from(
        new Set(qObject.map((q) => JSON.stringify(q)))
      ).map((q) => JSON.parse(q));

      qObject = shuffleQuestion(uniqueQuestions);
      //add question after download data is successful
      addQuestion(qObject);
      createBullets(qObject.length);

      countDown(15);
      //click on submit button
      submitButton.addEventListener("click", () => {
        if (currentIndex < qObject.length) {
          let rightAnswer = qObject[currentIndex].right_answer;
          checkAnswer(rightAnswer);
          currentIndex++;
          //remove the pervious question
          if (currentIndex < qObject.length) {
            quizArea.innerHTML = "";
            answerArea.innerHTML = "";
            addQuestion(qObject);
            handleBullets();
            countDown(15);
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
  myRequest.open("GET", file, true);
  myRequest.send();
}

//function add questions
/*
create h2 then add the question 
create div with class answer add the radio input 
and the label contains the answer 
append all to answer area div
*/
function addQuestion(object) {
  let questionTitle = document.createElement("h2");
  questionTitle.textContent = object[currentIndex].title;
  quizArea.appendChild(questionTitle);
  //create loop to make answer div contains the radio input and label[answer]

  for (let i = 1; i <= 4; i++) {
    let mainDiv = document.createElement("div");
    mainDiv.className = "answer";

    //create radio input
    let radioInput = document.createElement("input");
    radioInput.type = "radio";
    radioInput.id = `answer_${i}`;
    radioInput.name = "question";
    radioInput.dataset.answer = object[currentIndex][`answer_${i}`];

    // create label
    let theLabel = document.createElement("label");

    // click on answer not only the label
    theLabel.htmlFor = `answer_${i}`;
    theLabel.textContent = object[currentIndex][`answer_${i}`];

    //append the radio and the answer in the label to main div
    mainDiv.append(radioInput, theLabel);
    answerArea.appendChild(mainDiv);
  }
}

// function check answer
/*
get all the answers in variable by the name question
loop on all answers if the checked answer=right answer 
increment the  rightAnswers variable 
 */
function checkAnswer(rightAns) {
  let answers = document.getElementsByName("question"); //
  for (let i = 0; i < answers.length; i++) {
    if (answers[i].checked) {
      if (answers[i].dataset.answer === rightAns) {
        rightAnswers++;
      }
      break;
    }
  }
}

//function create bullets
/*
//write the number of the questions
create number of span= to the number of questions
add class on at the first span
*/

function createBullets(count) {
  countSpan.innerHTML = count;
  for (let i = 0; i < count; i++) {
    let bullet = document.createElement("span");
    if (i === 0) {
      bullet.className = "on";
    }
    bulletSpan.appendChild(bullet);
  }
}

//function handle bullets
/* 
loop on all bullets if it's index=current add class on
else add class finished on it
*/

function handleBullets() {
  let allBullets = document.querySelectorAll(".bullets .spans span");
  allBullets.forEach((span, index) => {
    span.classList.remove("on");
    if (currentIndex === index) {
      span.classList.add("on");
    } else if (currentIndex > index) {
      span.classList.add("finished");
    }
  });
}

//function show result
function showResult(total) {
  let result;
  resultContainer.classList.add("show");
  if (currentIndex === total) {
    quizArea.remove();
    answerArea.remove();
    bulletSpan.innerHTML = "";
    submitButton.remove();
    if (rightAnswers < total / 2 && rightAnswers < total) {
      result = `<span class="good">
        you answered ${rightAnswers} from ${total}
      </span>`;
    } else if (rightAnswers === total) {
      result = `<span class="perfect">
        perfect you answered all questions
      </span>`;
    } else {
      result = `<span class="bad">bad</span>`;
    }
  }
  resultContainer.innerHTML = result;
}

//shuffle questions
function shuffleQuestion(array) {
  let shuffle = [...array];
  for (let i = shuffle.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffle[i], shuffle[randomIndex]] = [shuffle[randomIndex], shuffle[i]];
  }
  return shuffle;
}
// count down function
function countDown(duration) {
  clearInterval(counter);
  counter = setInterval(() => {
    let minutes = Math.floor(duration / 60);
    let seconds = parseInt(duration % 60);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    seconds = seconds < 10 ? `0${seconds}` : seconds;

    document.querySelector(".count-down").textContent = `${minutes}:${seconds}`;

    if (--duration < 0) {
      clearInterval(counter);
      submitButton.click();
    }
  }, 1000);
}
