let operation = "+";
let correctAnswer = 0;
let score = 0;
let questionNumber = 0;
const totalQuestions = 10;
let answered = false;

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function startQuiz(op) {
  operation = op;
  score = 0;
  questionNumber = 0;
  answered = false;

  document.querySelector(".menu").style.display = "none";
  document.getElementById("quiz").classList.remove("hidden");

  document.getElementById("score").textContent = score;

  nextQuestion();
}

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

  if (operation === "+") {
    correctAnswer = a + b;
  }

  if (operation === "-") {
    if (a < b) {
      [a, b] = [b, a];
    }
    correctAnswer = a - b;
  }

  if (operation === "*") {
    correctAnswer = a * b;
  }

  if (operation === "/") {
    b = randomNumber(10);
    a = randomNumber(10) * b;
    correctAnswer = a / b;
  }

  let symbol = operation === "*" ? "×" : operation;
  let questionText = `${a} ${symbol} ${b} = ?`;

  document.getElementById("question").textContent = questionText;

  createAnswers();

  document.getElementById("questionNumber").textContent =
    `Question ${questionNumber}/${totalQuestions}`;
}

function createAnswers() {
  let answers = [correctAnswer];

  while (answers.length < 4) {
    let wrongAnswer =
      correctAnswer + Math.floor(Math.random() * 11) - 5;

    if (
      wrongAnswer >= 0 &&
      !answers.includes(wrongAnswer)
    ) {
      answers.push(wrongAnswer);
    }
  }

  answers.sort(() => Math.random() - 0.5);

  const container = document.getElementById("answers");
  container.innerHTML = "";

  answers.forEach(answer => {
    const button = document.createElement("button");

    button.textContent = answer;

    button.onclick = () => checkAnswer(answer, button);

    container.appendChild(button);
  });
}

function checkAnswer(answer, selectedButton) {
  if (answered) return;

  answered = true;

  const result = document.getElementById("result");

  if (answer === correctAnswer) {
    score++;
    result.textContent = "🎉 Correct! ⭐";
    selectedButton.style.background = "#b7f7c1";
  } else {
    result.textContent = `❌ Wrong! Correct answer: ${correctAnswer}`;
    selectedButton.style.background = "#ffc4c4";
  }

  document.getElementById("score").textContent = score;

  document.querySelectorAll("#answers button").forEach(button => {
    button.disabled = true;

    if (Number(button.textContent) === correctAnswer) {
      button.style.background = "#b7f7c1";
    }
  });
}

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

  document.querySelector(".next").textContent = "🔄 Try Again";
  document.querySelector(".next").onclick = () => {
    startQuiz(operation);
  };
}
