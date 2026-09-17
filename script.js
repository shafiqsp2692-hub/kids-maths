let operation = "+";
let correctAnswer = 0;
let score = 0;

function randomNumber(max) {
  return Math.floor(Math.random() * max) + 1;
}

function startQuiz(op) {
  operation = op;
  score = 0;

  document.querySelector(".menu").style.display = "none";
  document.getElementById("quiz").classList.remove("hidden");

  document.getElementById("score").textContent = score;

  nextQuestion();
}

function nextQuestion() {
  document.getElementById("result").textContent = "";

  let a = randomNumber(10);
  let b = randomNumber(10);

  if (operation === "+") {
    correctAnswer = a + b;
  }

  if (operation === "-") {
    if (a < b) [a, b] = [b, a];
    correctAnswer = a - b;
  }

  if (operation === "*") {
    correctAnswer = a * b;
  }

  if (operation === "/") {
    correctAnswer = a;
    b = randomNumber(10);
    a = correctAnswer * b;
  }

  let symbol = operation === "*" ? "×" : operation;

  document.getElementById("question").textContent =
    `${a} ${symbol} ${b} = ?`;

  createAnswers();
}

function createAnswers() {
  let answers = [correctAnswer];

  while (answers.length < 4) {
    let wrong = correctAnswer + Math.floor(Math.random() * 11) - 5;

    if (wrong >= 0 && !answers.includes(wrong)) {
      answers.push(wrong);
    }
  }

  answers.sort(() => Math.random() - 0.5);

  const container = document.getElementById("answers");
  container.innerHTML = "";

  answers.forEach(answer => {
    const button = document.createElement("button");

    button.textContent = answer;

    button.onclick = () => checkAnswer(answer);

    container.appendChild(button);
  });
}

function checkAnswer(answer) {
  const result = document.getElementById("result");

  if (answer === correctAnswer) {
    score++;
    result.textContent = "🎉 Correct! ⭐";
  } else {
    result.textContent = `❌ Wrong! Answer: ${correctAnswer}`;
  }

  document.getElementById("score").textContent = score;

  document.querySelectorAll("#answers button").forEach(button => {
    button.disabled = true;
  });
}
