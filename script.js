let operation = "+";
let correctAnswer = 0;
let score = 0;
let questionNumber = 0;

const totalQuestions = 10;

let answered = false;


function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}


/* START QUIZ */

function startQuiz(op) {

  operation = op;

  score = 0;

  questionNumber = 0;

  answered = false;


  document.getElementById("home").style.display = "none";

  document.getElementById("quiz").classList.remove("hidden");


  document.getElementById("score").textContent = score;


  // Next button reset
  const nextButton = document.querySelector(".next");

  nextButton.textContent = "Next ➡️";

  nextButton.onclick = nextQuestion;


  nextQuestion();
}


/* NEXT QUESTION */

function nextQuestion() {

  if (questionNumber >= totalQuestions) {

    showFinalResult();

    return;
  }


  answered = false;

  questionNumber++;


  document.getElementById("result").textContent = "";


  let a = randomNumber(10);

  let b = randomNumber(10);


  /* ADDITION */

  if (operation === "+") {

    correctAnswer = a + b;

  }


  /* SUBTRACTION */

  if (operation === "-") {

    if (a < b) {

      [a, b] = [b, a];

    }

    correctAnswer = a - b;

  }


  /* MULTIPLICATION */

  if (operation === "*") {

    correctAnswer = a * b;

  }


  /* DIVISION */

  if (operation === "/") {

    b = randomNumber(10);

    a = randomNumber(10) * b;

    correctAnswer = a / b;

  }


  let symbol = operation === "*" ? "×" : operation;


  document.getElementById("question").textContent =
    `${a} ${symbol} ${b} = ?`;


  document.getElementById("questionNumber").textContent =
    `Question ${questionNumber}/${totalQuestions}`;


  createAnswers();
}


/* CREATE ANSWERS */

function createAnswers() {

  let answers = [correctAnswer];


  while (answers.length < 4) {

    let wrongAnswer =
      correctAnswer +
      Math.floor(Math.random() * 11) - 5;


    if (
      wrongAnswer >= 0 &&
      !answers.includes(wrongAnswer)
    ) {

      answers.push(wrongAnswer);

    }

  }


  answers.sort(() => Math.random() - 0.5);


  const container =
    document.getElementById("answers");


  container.innerHTML = "";


  answers.forEach(answer => {

    const button =
      document.createElement("button");


    button.textContent = answer;


    button.onclick = () =>
      checkAnswer(answer, button);


    container.appendChild(button);

  });
}


/* CHECK ANSWER */

function checkAnswer(answer, selectedButton) {

  if (answered) return;


  answered = true;


  const result =
    document.getElementById("result");


  if (answer === correctAnswer) {

    score++;

    result.textContent =
      "🎉 Correct! ⭐";

    selectedButton.style.background =
      "#b7f7c1";

  } else {

    result.textContent =
      `❌ Wrong! Correct answer: ${correctAnswer}`;

    selectedButton.style.background =
      "#ffc4c4";

  }


  document.getElementById("score").textContent =
    score;


  document
    .querySelectorAll("#answers button")
    .forEach(button => {

      button.disabled = true;


      if (
        Number(button.textContent) ===
        correctAnswer
      ) {

        button.style.background =
          "#b7f7c1";

      }

    });
}


/* FINAL RESULT */

function showFinalResult() {

  document.getElementById("question").textContent =
    "🏆 Quiz Complete!";


  document.getElementById("answers").innerHTML = "";


  let stars = "";


  if (score === 10) {

    stars = "⭐⭐⭐⭐⭐";

  } else if (score >= 7) {

    stars = "⭐⭐⭐⭐";

  } else if (score >= 5) {

    stars = "⭐⭐⭐";

  } else if (score >= 3) {

    stars = "⭐⭐";

  } else {

    stars = "⭐";

  }


  document.getElementById("result").innerHTML =
    `${stars}<br><br>Your Score: ${score}/${totalQuestions}`;


  const nextButton =
    document.querySelector(".next");


  nextButton.textContent =
    "🔄 Try Again";


  nextButton.onclick = () =>
    startQuiz(operation);

}


/* HOME BUTTON */

function goHome() {

  document.getElementById("quiz")
    .classList.add("hidden");


  document.getElementById("home")
    .style.display = "block";


  document.getElementById("result")
    .textContent = "";


  document.getElementById("question")
    .textContent = "Question";


  document.getElementById("answers")
    .innerHTML = "";


  document.getElementById("questionNumber")
    .textContent = "Question 1/10";


  document.getElementById("score")
    .textContent = "0";


  const nextButton =
    document.querySelector(".next");


  nextButton.textContent =
    "Next ➡️";


  nextButton.onclick =
    nextQuestion;

}
