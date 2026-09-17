let currentOp = '+';
let currentAnswer = 0;
let score = 0;

function playGame() {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("menuPage").classList.remove("hidden");
}

function goHome() {
  document.getElementById("menuPage").classList.add("hidden");
  document.getElementById("homePage").classList.remove("hidden");
}

function goMenu() {
  document.getElementById("quizPage").classList.add("hidden");
  document.getElementById("menuPage").classList.remove("hidden");
}

function startQuiz(operation) {
  currentOp = operation;
  score = 0;
  document.getElementById("scoreDisplay").innerText = "Score: " + score;
  document.getElementById("menuPage").classList.add("hidden");
  document.getElementById("quizPage").classList.remove("hidden");
  generateQuestion();
}

function generateQuestion() {
  let num1 = Math.floor(Math.random() * 10) + 1;
  let num2 = Math.floor(Math.random() * 10) + 1;

  if (currentOp === '-') {
    if (num1 < num2) [num1, num2] = [num2, num1];
    currentAnswer = num1 - num2;
  } else if (currentOp === '*') {
    currentAnswer = num1 * num2;
  } else if (currentOp === '/') {
    currentAnswer = num1;
    num1 = num1 * num2;
  } else {
    currentAnswer = num1 + num2;
  }

  let symbol = currentOp === '*' ? '×' : currentOp === '/' ? '÷' : currentOp;
  document.getElementById("questionText").innerText = `${num1} ${symbol} ${num2} = ?`;

  generateOptions();
}

function generateOptions() {
  let options = [currentAnswer];

  while (options.length < 4) {
    let wrong = currentAnswer + (Math.floor(Math.random() * 7) - 3);
    if (wrong >= 0 && !options.includes(wrong)) {
      options.push(wrong);
    }
  }

  options.sort(() => Math.random() - 0.5);

  let container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  options.forEach(opt => {
    let btn = document.createElement("button");
    btn.className = "option-btn";
    btn.innerText = opt;
    btn.onclick = () => checkAnswer(opt);
    container.appendChild(btn);
  });
}

function checkAnswer(selected) {
  if (selected === currentAnswer) {
    score += 10;
    document.getElementById("scoreDisplay").innerText = "Score: " + score;
  }
  generateQuestion();
}
