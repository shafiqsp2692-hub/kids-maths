let currentCategory = 'addition'; 
let currentMode = '+';
let currentAnswer = '';
let score = 0;
let isAnsweringLocked = false;
let maleVoice = null;

let selectedNumItem = null;
let matchedPairsCount = 0;
let totalMatchPairs = 5;

let totalWorksheetCorrect = 0;

// SGR Spelling Game variables
let sgrCurrentWordObj = null;
let sgrCorrectClicksNeeded = 0;
let sgrCurrentScoreCount = 0;

const numberWordsMap = {
  1: "One", 2: "Two", 3: "Three", 4: "Four", 5: "Five",
  6: "Six", 7: "Seven", 8: "Eight", 9: "Nine", 10: "Ten"
};

const alphabetData = [
  { letter: "Aa", word: "Apple", icon: "🍎" },
  { letter: "Bb", word: "Ball", icon: "⚽" },
  { letter: "Cc", word: "Cat", icon: "🐱" },
  { letter: "Dd", word: "Dog", icon: "🐶" },
  { letter: "Ee", word: "Eram fatima", icon: "🙍‍♀️" },
  { letter: "Ff", word: "Frog", icon: "🐸" },
  { letter: "Gg", word: "Giraffe", icon: "🦒" },
  { letter: "Hh", word: "Hassaan raza", icon: "🙎🏻‍♂️" },
  { letter: "Ii", word: "Ice cream", icon: "🍦" },
  { letter: "Jj", word: "Juice", icon: "🧃" },
  { letter: "Kk", word: "Kite", icon: "🪁" },
  { letter: "Ll", word: "Lion", icon: "🦁" },
  { letter: "Mm", word: "Monkey", icon: "🐒" },
  { letter: "Nn", word: "Nest", icon: "🪺" },
  { letter: "Oo", word: "Owl", icon: "🦉" },
  { letter: "Pp", word: "Parrot", icon: "🦜" },
  { letter: "Qq", word: "Queen", icon: "👸" },
  { letter: "Rr", word: "Rainbow", icon: "🌈" },
  { letter: "Ss", word: "Sun", icon: "☀️" },
  { letter: "Tt", word: "Turtle", icon: "🐢" },
  { letter: "Uu", word: "Umbrella", icon: "☂️" },
  { letter: "Vv", word: "Vase", icon: "🏺" },
  { letter: "Ww", word: "Watermelon", icon: "🍉" },
  { letter: "Xx", word: "Xylophone", icon: "🎼" },
  { letter: "Yy", word: "Yacht", icon: "⛵" },
  { letter: "Zz", word: "Zebra", icon: "🦓" }
];

const skyGrassRootData = {
  sky: ['b', 'd', 'f', 'h', 'k', 'l', 't'],
  grass: ['a', 'c', 'e', 'i', 'm', 'n', 'o', 'r', 's', 'u', 'v', 'w', 'x', 'z'],
  root: ['g', 'j', 'p', 'q', 'y']
};

const allWorksheetPairs = [
  { capital: "A", correct: "a", options: ["c", "o", "a", "e"] },
  { capital: "B", correct: "b", options: ["q", "b", "d", "p"] },
  { capital: "C", correct: "c", options: ["e", "c", "o", "a"] },
  { capital: "D", correct: "d", options: ["b", "p", "d", "g"] },
  { capital: "E", correct: "e", options: ["c", "e", "f", "a"] },
  { capital: "F", correct: "f", options: ["t", "f", "l", "h"] },
  { capital: "G", correct: "g", options: ["q", "y", "g", "j"] },
  { capital: "H", correct: "h", options: ["n", "h", "k", "b"] },
  { capital: "I", correct: "i", options: ["l", "i", "t", "j"] },
  { capital: "J", correct: "j", options: ["i", "j", "g", "y"] },
  { capital: "K", correct: "k", options: ["h", "k", "l", "t"] },
  { capital: "L", correct: "l", options: ["i", "t", "l", "k"] },
  { capital: "M", correct: "m", options: ["n", "w", "m", "u"] },
  { capital: "N", correct: "n", options: ["m", "n", "u", "h"] },
  { capital: "O", correct: "o", options: ["c", "a", "o", "e"] },
  { capital: "P", correct: "p", options: ["q", "p", "b", "d"] },
  { capital: "Q", correct: "q", options: ["p", "q", "g", "d"] },
  { capital: "R", correct: "r", options: ["n", "m", "r", "h"] },
  { capital: "S", correct: "s", options: ["c", "s", "z", "x"] },
  { capital: "T", correct: "t", options: ["f", "l", "t", "i"] },
  { capital: "U", correct: "u", options: ["n", "u", "v", "w"] },
  { capital: "V", correct: "v", options: ["u", "v", "w", "y"] },
  { capital: "W", correct: "w", options: ["m", "v", "w", "u"] },
  { capital: "X", correct: "x", options: ["v", "s", "x", "z"] },
  { capital: "Y", correct: "y", options: ["g", "j", "y", "q"] },
  { capital: "Z", correct: "z", options: ["s", "x", "z", "n"] }
];

const sgrWordList = [
  { word: "CAT", letters: [{ char: "c", type: "grass" }, { char: "a", type: "grass" }, { char: "t", type: "sky" }] },
  { word: "BALL", letters: [{ char: "b", type: "sky" }, { char: "a", type: "grass" }, { char: "l", type: "sky" }, { char: "l", type: "sky" }] },
  { word: "DOG", letters: [{ char: "d", type: "sky" }, { char: "o", type: "grass" }, { char: "g", type: "root" }] },
  { word: "FROG", letters: [{ char: "f", type: "sky" }, { char: "r", type: "grass" }, { char: "o", type: "grass" }, { char: "g", type: "root" }] },
  { word: "JUMP", letters: [{ char: "j", type: "root" }, { char: "u", type: "grass" }, { char: "m", type: "grass" }, { char: "p", type: "root" }] }
];

let audioCtx = null;

function initAudio() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  loadMaleVoice();
}

function loadMaleVoice() {
  if ('speechSynthesis' in window) {
    let voices = window.speechSynthesis.getVoices();
    maleVoice = voices.find(v => v.lang.includes('en') && (v.name.includes('Male') || v.name.includes('David') || v.name.includes('Mark') || v.name.includes('George')));
    if (!maleVoice && voices.length > 0) {
      maleVoice = voices.find(v => v.lang.includes('en'));
    }
  }
}

if ('speechSynthesis' in window) {
  window.speechSynthesis.onvoiceschanged = loadMaleVoice;
}

function playAudioTone(freq, type, duration) {
  try {
    initAudio();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.type = type;
    osc.frequency.setValueAtTime(freq, audioCtx.currentTime);
    gain.gain.setValueAtTime(0.2, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  } catch (e) {
    console.log("Audio Error: ", e);
  }
}

function playCorrectSound() {
  playAudioTone(523.25, 'sine', 0.12);
  setTimeout(() => playAudioTone(659.25, 'sine', 0.12), 100);
  setTimeout(() => playAudioTone(783.99, 'sine', 0.25), 200);
}

function playWrongSound() {
  playAudioTone(200, 'sawtooth', 0.2);
  setTimeout(() => playAudioTone(150, 'sawtooth', 0.3), 150);
}

function speakText(text) {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = 0.85;
    utterance.pitch = 1.0;
    if (!maleVoice) loadMaleVoice();
    if (maleVoice) utterance.voice = maleVoice;
    window.speechSynthesis.speak(utterance);
  }
}

function goToCategoryMenu() {
  initAudio();
  hideAllScreens();
  document.getElementById("categoryMenu").classList.remove("hidden");
  speakText("Choose Maths or English");
}

function goHome() {
  initAudio();
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  hideAllScreens();
  document.getElementById("homePage").classList.remove("hidden");
}

function openMathsMenu() {
  initAudio();
  hideAllScreens();
  document.getElementById("mathsMenu").classList.remove("hidden");
  speakText("Select Maths Game");
}

function openEnglishMenu() {
  initAudio();
  hideAllScreens();
  document.getElementById("englishMenu").classList.remove("hidden");
  speakText("Select English Game");
}

function openSubMenu(cat) {
  initAudio();
  currentCategory = cat;
  hideAllScreens();
  if (cat === 'addition') {
    document.getElementById("additionMenu").classList.remove("hidden");
    speakText("Select Addition Mode");
  } else if (cat === 'subtraction') {
    document.getElementById("subtractionMenu").classList.remove("hidden");
    speakText("Select Subtraction Mode");
  } else if (cat === 'kidsfun') {
    document.getElementById("kidsFunMenu").classList.remove("hidden");
    speakText("Select Fun Mode");
  }
}

function goCategoryMenu() {
  initAudio();
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  hideAllScreens();
  document.getElementById("categoryMenu").classList.remove("hidden");
}

function backFromQuiz() {
  initAudio();
  if ('speechSynthesis' in window) window.speechSynthesis.cancel();
  hideAllScreens();
  if (currentCategory === 'english') {
    document.getElementById("englishMenu").classList.remove("hidden");
  } else {
    document.getElementById("mathsMenu").classList.remove("hidden");
  }
}

function hideAllScreens() {
  document.getElementById("homePage").classList.add("hidden");
  document.getElementById("categoryMenu").classList.add("hidden");
  document.getElementById("mathsMenu").classList.add("hidden");
  document.getElementById("englishMenu").classList.add("hidden");
  document.getElementById("additionMenu").classList.add("hidden");
  document.getElementById("subtractionMenu").classList.add("hidden");
  document.getElementById("kidsFunMenu").classList.add("hidden");
  document.getElementById("quizPage").classList.add("hidden");
}

function startQuiz(cat, mode) {
  initAudio();
  currentCategory = cat;
  currentMode = mode;
  score = 0;
  document.getElementById("scoreDisplay").innerText = "⭐ Score: " + score;
  hideAllScreens();
  document.getElementById("quizPage").classList.remove("hidden");
  generateQuestion();
}

function startDirectQuiz(cat) {
  initAudio();
  currentCategory = cat;
  currentMode = cat;
  score = 0;
  document.getElementById("scoreDisplay").innerText = "⭐ Score: " + score;
  hideAllScreens();
  document.getElementById("quizPage").classList.remove("hidden");
  generateQuestion();
}

function generateQuestion() {
  isAnsweringLocked = false;
  document.getElementById("targetBox").innerText = "?";
  document.getElementById("countItemsContainer").innerHTML = "";
  document.getElementById("leftVisualBox").innerHTML = "";
  document.getElementById("rightVisualBox").innerHTML = "";
  document.getElementById("subtractionVisualBox").innerHTML = "";
  document.getElementById("customDisplay").innerHTML = "";

  document.getElementById("standardChalkboard").classList.remove("hidden");
  document.getElementById("matchBoard").classList.add("hidden");
  document.getElementById("abcChartBoard").classList.add("hidden");
  document.getElementById("skyGrassRootBoard").classList.add("hidden");
  document.getElementById("combinedGrammarBoard").classList.add("hidden");
  document.getElementById("worksheetBoard").classList.add("hidden");
  document.getElementById("sgrSpellingBoard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.remove("hidden");

  document.getElementById("equationRow").classList.remove("hidden");
  document.getElementById("visualSplitContainer").classList.add("hidden");
  document.getElementById("subtractionVisualBox").classList.add("hidden");
  document.getElementById("countItemsContainer").classList.add("hidden");
  document.getElementById("customDisplay").classList.add("hidden");

  if (currentCategory === 'english') {
    if (currentMode === 'abcchart') setupABCChart();
    else if (currentMode === 'skygrassroot') setupSkyGrassRootChart();
    else if (currentMode === 'combined_grammar') setupCombinedGrammarBoard();
    else if (currentMode === 'worksheet_circle') setupWorksheetCircle();
    else if (currentMode === 'sgr_spelling_game') setupSGRSpellingGame();
    return;
  }

  if (currentCategory === 'addition') {
    let num1 = Math.floor(Math.random() * 5) + 1;
    let num2 = Math.floor(Math.random() * 5) + 1;
    currentAnswer = num1 + num2;
    document.getElementById("num1Text").innerText = num1;
    document.getElementById("opSymbol").innerText = "+";
    document.getElementById("num2Text").innerText = num2;
    setupNumberOptions();
    speakText(`${num1} plus ${num2}`);
  }
}

function setupABCChart() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("abcChartBoard").classList.remove("hidden");

  const container = document.getElementById("abcGridContainer");
  container.innerHTML = "";
  alphabetData.forEach(item => {
    let card = document.createElement("div");
    card.className = "abc-card-item";
    card.innerHTML = `<div class="abc-card-letters">${item.letter}</div><div class="abc-card-icon">${item.icon}</div><div class="abc-card-word">${item.word}</div>`;
    card.onclick = () => speakText(`${item.letter.charAt(0)} for ${item.word}`);
    container.appendChild(card);
  });
  speakText("ABC Chart");
}

function setupSkyGrassRootChart() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("skyGrassRootBoard").classList.remove("hidden");

  const skyGrid = document.getElementById("skyLettersGrid");
  const grassGrid = document.getElementById("grassLettersGrid");
  const rootGrid = document.getElementById("rootLettersGrid");
  skyGrid.innerHTML = ""; grassGrid.innerHTML = ""; rootGrid.innerHTML = "";

  skyGrassRootData.sky.forEach(letter => {
    let b = document.createElement("div"); b.className = "sgr-bubble"; b.innerText = letter;
    b.onclick = () => speakText(`${letter}, Sky Letter`); skyGrid.appendChild(b);
  });
  skyGrassRootData.grass.forEach(letter => {
    let b = document.createElement("div"); b.className = "sgr-bubble"; b.innerText = letter;
    b.onclick = () => speakText(`${letter}, Grass Letter`); grassGrid.appendChild(b);
  });
  skyGrassRootData.root.forEach(letter => {
    let b = document.createElement("div"); b.className = "sgr-bubble"; b.innerText = letter;
    b.onclick = () => speakText(`${letter}, Root Letter`); rootGrid.appendChild(b);
  });
  speakText("Sky, Grass, and Root Letters");
}

function setupCombinedGrammarBoard() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("combinedGrammarBoard").classList.remove("hidden");
  speakText("Grammar Basics Box");
}

function setupWorksheetCircle() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("worksheetBoard").classList.remove("hidden");

  const container = document.getElementById("worksheetRowsContainer");
  container.innerHTML = "";
  totalWorksheetCorrect = 0;

  let shuffledPairs = [...allWorksheetPairs].sort(() => Math.random() - 0.5);
  let currentBatch = shuffledPairs.slice(0, 4);

  currentBatch.forEach(pair => {
    let row = document.createElement("div"); row.className = "worksheet-row";
    let targetBox = document.createElement("div"); targetBox.className = "target-letter-box"; targetBox.innerText = pair.capital;
    row.appendChild(targetBox);

    let optGrid = document.createElement("div"); optGrid.className = "worksheet-options-grid";
    let shuffledOpts = [...pair.options].sort(() => Math.random() - 0.5);

    shuffledOpts.forEach(letter => {
      let item = document.createElement("div"); item.className = "ws-item"; item.innerText = letter;
      item.onclick = () => {
        if (item.classList.contains("correct-circled") || item.classList.contains("wrong-circled")) return;
        if (letter === pair.correct) {
          playCorrectSound(); item.classList.add("correct-circled");
          score += 10; document.getElementById("scoreDisplay").innerText = "⭐ Score: " + score;
          confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });
          totalWorksheetCorrect++;
          if (totalWorksheetCorrect === 4) {
            let banner = document.getElementById("popupBanner");
            document.getElementById("popupText").innerText = `Great Job! Next Level!`;
            banner.classList.add("show");
            setTimeout(() => { banner.classList.remove("show"); setupWorksheetCircle(); }, 1200);
          }
        } else {
          playWrongSound(); item.classList.add("wrong-circled"); speakText("Try again");
        }
      };
      optGrid.appendChild(item);
    });
    row.appendChild(optGrid);
    container.appendChild(row);
  });
  speakText("Circle the small letter");
}

function setupSGRSpellingGame() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("sgrSpellingBoard").classList.remove("hidden");

  sgrCurrentWordObj = sgrWordList[Math.floor(Math.random() * sgrWordList.length)];
  sgrCorrectClicksNeeded = sgrCurrentWordObj.letters.length;
  sgrCurrentScoreCount = 0;

  document.getElementById("sgrWordTitleText").innerText = `Find spelling letters: ${sgrCurrentWordObj.word}`;

  const container = document.getElementById("sgrSpellingLettersContainer");
  container.innerHTML = "";

  sgrCurrentWordObj.letters.forEach(item => {
    let box = document.createElement("div");
    box.className = "sgr-spell-box";
    box.innerText = item.char;

    box.onclick = () => {
      if (box.classList.contains("green-marked") || box.classList.contains("red-marked")) return;

      playCorrectSound();
      box.classList.add("green-marked");
      sgrCurrentScoreCount++;
      speakText(`${item.char} is correct`);

      if (sgrCurrentScoreCount === sgrCorrectClicksNeeded) {
        let banner = document.getElementById("popupBanner");
        document.getElementById("popupText").innerText = `Great Job! Next Word!`;
        banner.classList.add("show");
        confetti({ particleCount: 40, spread: 60, origin: { y: 0.6 } });

        setTimeout(() => {
          banner.classList.remove("show");
          setupSGRSpellingGame();
        }, 1300);
      }
    };
    container.appendChild(box);
  });
  speakText(`Look at spelling ${sgrCurrentWordObj.word}`);
}

function setupNumberOptions() {
  let options = [Number(currentAnswer)];
  while (options.length < 4) {
    let wrong = Number(currentAnswer) + (Math.floor(Math.random() * 9) - 4);
    if (wrong >= 0 && wrong <= 80 && !options.includes(wrong)) {
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
    btn.onclick = () => checkAnswer(opt, btn);
    container.appendChild(btn);
  });
}

function checkAnswer(selected, buttonEl) {
  if (isAnsweringLocked) return;
  initAudio();

  if (selected == currentAnswer) {
    isAnsweringLocked = true;
    playCorrectSound();
    speakText("Great job! Correct!");
    score += 10;
    document.getElementById("scoreDisplay").innerText = "⭐ Score: " + score;
    document.getElementById("targetBox").innerText = currentAnswer;

    let banner = document.getElementById("popupBanner");
    document.getElementById("popupText").innerText = `Correct!`;
    banner.classList.add("show");
    confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });

    setTimeout(() => {
      banner.classList.remove("show");
      generateQuestion();
    }, 1200);
  } else {
    playWrongSound();
    speakText("Try again!");
    buttonEl.classList.add("red-marked");
  }
}
