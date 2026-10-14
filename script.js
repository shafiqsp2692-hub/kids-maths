let currentCategory = 'addition'; 
let currentMode = '+';
let currentAnswer = '';
let score = 0;
let isAnsweringLocked = false;
let maleVoice = null;

let selectedNumItem = null;
let matchedPairsCount = 0;
let totalMatchPairs = 5;

// Worksheet Circle Game Variables
let totalWorksheetCorrect = 0;

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

/* NAVIGATION LOGIC */
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
  } else if (['addition', 'subtraction', 'kidsfun', 'mul', 'div'].includes(currentCategory)) {
    document.getElementById("mathsMenu").classList.remove("hidden");
  } else {
    document.getElementById("categoryMenu").classList.remove("hidden");
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

/* QUESTION GENERATION */
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
  document.getElementById("optionsContainer").classList.remove("hidden");

  document.getElementById("equationRow").classList.remove("hidden");
  document.getElementById("visualSplitContainer").classList.add("hidden");
  document.getElementById("subtractionVisualBox").classList.add("hidden");
  document.getElementById("countItemsContainer").classList.add("hidden");
  document.getElementById("customDisplay").classList.add("hidden");

  const visualItems = ['🚗', '👟', '🌂', '🍎', '🧁', '🎈', '🦆', '🍬'];

  // ENGLISH CATEGORY
  if (currentCategory === 'english') {
    if (currentMode === 'abcchart') {
      setupABCChart();
    } else if (currentMode === 'skygrassroot') {
      setupSkyGrassRootChart();
    } else if (currentMode === 'combined_grammar') {
      setupCombinedGrammarBoard();
    } else if (currentMode === 'worksheet_circle') {
      setupWorksheetCircle();
    }
    return;
  }

  // ADDITION CATEGORY
  if (currentCategory === 'addition') {
    if (currentMode === 'count') {
      document.getElementById("equationRow").classList.add("hidden");
      document.getElementById("countItemsContainer").classList.remove("hidden");
      let count = Math.floor(Math.random() * 10) + 1;
      currentAnswer = count;
      let icon = visualItems[Math.floor(Math.random() * visualItems.length)];
      let displayHTML = '';
      for (let i = 0; i < count; i++) displayHTML += icon + ' ';
      document.getElementById("countItemsContainer").innerHTML = displayHTML;
      setupNumberOptions();
      speakText("Count the items");
      return;
    } 
    else if (currentMode === '+') {
      document.getElementById("visualSplitContainer").classList.remove("hidden");
      let num1 = Math.floor(Math.random() * 5) + 1;
      let num2 = Math.floor(Math.random() * 5) + 1;
      currentAnswer = num1 + num2;
      document.getElementById("num1Text").innerText = num1;
      document.getElementById("opSymbol").innerText = "+";
      document.getElementById("num2Text").innerText = num2;
      let icon = visualItems[Math.floor(Math.random() * visualItems.length)];
      for (let i = 0; i < num1; i++) document.getElementById("leftVisualBox").innerHTML += icon;
      for (let i = 0; i < num2; i++) document.getElementById("rightVisualBox").innerHTML += icon;
      setupNumberOptions();
      speakText(`${num1} plus ${num2}`);
      return;
    }
    else if (currentMode === '2digit') {
      let num1 = Math.floor(Math.random() * 40) + 10;
      let num2 = Math.floor(Math.random() * 40) + 10;
      currentAnswer = num1 + num2;
      document.getElementById("num1Text").innerText = num1;
      document.getElementById("opSymbol").innerText = "+";
      document.getElementById("num2Text").innerText = num2;
      setupNumberOptions();
      speakText(`${num1} plus ${num2}`);
      return;
    }
    else if (currentMode === 'easy') {
      let num1 = Math.floor(Math.random() * 10) + 1;
      let num2 = Math.floor(Math.random() * 10) + 1;
      currentAnswer = num1 + num2;
      document.getElementById("num1Text").innerText = num1;
      document.getElementById("opSymbol").innerText = "+";
      document.getElementById("num2Text").innerText = num2;
      setupNumberOptions();
      speakText(`${num1} plus ${num2}`);
      return;
    }
  }

  // SUBTRACTION CATEGORY
  if (currentCategory === 'subtraction') {
    let num1 = Math.floor(Math.random() * 8) + 2;
    let num2 = Math.floor(Math.random() * (num1 - 1)) + 1;
    currentAnswer = num1 - num2;
    document.getElementById("num1Text").innerText = num1;
    document.getElementById("opSymbol").innerText = "-";
    document.getElementById("num2Text").innerText = num2;

    if (currentMode === 'visual') {
      document.getElementById("subtractionVisualBox").classList.remove("hidden");
      let icon = visualItems[Math.floor(Math.random() * visualItems.length)];
      let subHTML = '';
      for (let i = 0; i < num1; i++) {
        if (i >= (num1 - num2)) {
          subHTML += `<span class="item-wrapper crossed-item">${icon}</span>`;
        } else {
          subHTML += `<span class="item-wrapper">${icon}</span>`;
        }
      }
      document.getElementById("subtractionVisualBox").innerHTML = subHTML;
    }

    setupNumberOptions();
    speakText(`${num1} minus ${num2}`);
    return;
  }

  if (currentCategory === 'mul') {
    let num1 = Math.floor(Math.random() * 8) + 1;
    let num2 = Math.floor(Math.random() * 5) + 1;
    currentAnswer = num1 * num2;
    document.getElementById("num1Text").innerText = num1;
    document.getElementById("opSymbol").innerText = "×";
    document.getElementById("num2Text").innerText = num2;
    setupNumberOptions();
    speakText(`${num1} multiplied by ${num2}`);
    return;
  }

  if (currentCategory === 'div') {
    let num2 = Math.floor(Math.random() * 5) + 1;
    currentAnswer = Math.floor(Math.random() * 5) + 1;
    let num1 = currentAnswer * num2;
    document.getElementById("num1Text").innerText = num1;
    document.getElementById("opSymbol").innerText = "÷";
    document.getElementById("num2Text").innerText = num2;
    setupNumberOptions();
    speakText(`${num1} divided by ${num2}`);
    return;
  }

  // KIDS FUN CATEGORY
  if (currentCategory === 'kidsfun') {
    let mode = currentMode;

    if (mode === 'mixfun') {
      const funModes = ['match', 'missing', 'clock', 'shapes'];
      mode = funModes[Math.floor(Math.random() * funModes.length)];
    }

    if (mode === 'match') {
      setupMatchGame();
      return;
    }

    if (mode === 'missing') {
      document.getElementById("equationRow").classList.add("hidden");
      document.getElementById("customDisplay").classList.remove("hidden");

      let start = Math.floor(Math.random() * 27) + 1;
      let seq = [start, start + 1, start + 2, start + 3];
      
      let missingIdx = Math.floor(Math.random() * 4);
      currentAnswer = seq[missingIdx];

      let rowDiv = document.createElement("div");
      rowDiv.className = "missing-row-container";

      seq.forEach((val, index) => {
        if (index === missingIdx) {
          let box = document.createElement("div");
          box.className = "target-box";
          box.id = "targetBoxMissing";
          box.innerText = "?";
          rowDiv.appendChild(box);
        } else {
          let numSpan = document.createElement("span");
          numSpan.className = "missing-num-pill";
          numSpan.innerText = val;
          rowDiv.appendChild(numSpan);
        }
      });

      document.getElementById("customDisplay").appendChild(rowDiv);
      setupNumberOptions();
      speakText("Find the missing number");
    }
    else if (mode === 'clock') {
      document.getElementById("equationRow").classList.add("hidden");
      document.getElementById("customDisplay").classList.remove("hidden");

      let hour = Math.floor(Math.random() * 12) + 1;
      let minutesList = [0, 15, 30, 45];
      let minute = minutesList[Math.floor(Math.random() * minutesList.length)];
      
      let formattedMin = minute === 0 ? "00" : minute.toString();
      currentAnswer = `${hour}:${formattedMin}`;

      let canvas = document.createElement("canvas");
      canvas.width = 170;
      canvas.height = 170;
      canvas.className = "clock-canvas";
      drawClock(canvas, hour, minute);

      document.getElementById("customDisplay").appendChild(canvas);

      let timeOptions = [currentAnswer];
      while(timeOptions.length < 4) {
        let h = Math.floor(Math.random() * 12) + 1;
        let m = minutesList[Math.floor(Math.random() * minutesList.length)];
        let fMin = m === 0 ? "00" : m.toString();
        let opt = `${h}:${fMin}`;
        if(!timeOptions.includes(opt)) timeOptions.push(opt);
      }
      timeOptions.sort(() => Math.random() - 0.5);
      renderOptions(timeOptions);
      speakText("What time is it?");
    }
    else if (mode === 'shapes') {
      document.getElementById("equationRow").classList.add("hidden");
      document.getElementById("customDisplay").classList.remove("hidden");

      const shapes = [
        { name: 'Circle', icon: '🔴' },
        { name: 'Square', icon: '⬛' },
        { name: 'Triangle', icon: '🔺' },
        { name: 'Star', icon: '⭐' },
        { name: 'Heart', icon: '❤️' }
      ];

      let selected = shapes[Math.floor(Math.random() * shapes.length)];
      currentAnswer = selected.name;

      let div = document.createElement("div");
      div.style.fontSize = "90px";
      div.innerText = selected.icon;
      document.getElementById("customDisplay").appendChild(div);

      let shapeOptions = [currentAnswer];
      while(shapeOptions.length < 4) {
        let s = shapes[Math.floor(Math.random() * shapes.length)].name;
        if(!shapeOptions.includes(s)) shapeOptions.push(s);
      }
      shapeOptions.sort(() => Math.random() - 0.5);
      renderOptions(shapeOptions);
      speakText("Name this shape");
    }
  }
}

/* ABC CHART LOGIC */
function setupABCChart() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("abcChartBoard").classList.remove("hidden");

  const container = document.getElementById("abcGridContainer");
  container.innerHTML = "";

  alphabetData.forEach(item => {
    let card = document.createElement("div");
    card.className = "abc-card-item";
    card.innerHTML = `
      <div class="abc-card-letters">${item.letter}</div>
      <div class="abc-card-icon">${item.icon}</div>
      <div class="abc-card-word">${item.word}</div>
    `;
    card.onclick = () => {
      let letterOnly = item.letter.charAt(0);
      speakText(`${letterOnly} for ${item.word}`);
    };
    container.appendChild(card);
  });

  speakText("ABC Chart");
}

/* SKY, GRASS & ROOT LETTERS LOGIC */
function setupSkyGrassRootChart() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("skyGrassRootBoard").classList.remove("hidden");

  const skyGrid = document.getElementById("skyLettersGrid");
  const grassGrid = document.getElementById("grassLettersGrid");
  const rootGrid = document.getElementById("rootLettersGrid");

  skyGrid.innerHTML = "";
  grassGrid.innerHTML = "";
  rootGrid.innerHTML = "";

  skyGrassRootData.sky.forEach(letter => {
    let bubble = document.createElement("div");
    bubble.className = "sgr-bubble";
    bubble.innerText = letter;
    bubble.onclick = () => speakText(`${letter}, Sky Letter`);
    skyGrid.appendChild(bubble);
  });

  skyGrassRootData.grass.forEach(letter => {
    let bubble = document.createElement("div");
    bubble.className = "sgr-bubble";
    bubble.innerText = letter;
    bubble.onclick = () => speakText(`${letter}, Grass Letter`);
    grassGrid.appendChild(bubble);
  });

  skyGrassRootData.root.forEach(letter => {
    let bubble = document.createElement("div");
    bubble.className = "sgr-bubble";
    bubble.innerText = letter;
    bubble.onclick = () => speakText(`${letter}, Root Letter`);
    rootGrid.appendChild(bubble);
  });

  speakText("Sky, Grass, and Root Letters");
}

/* COMBINED GRAMMAR BOARD */
function setupCombinedGrammarBoard() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("combinedGrammarBoard").classList.remove("hidden");
  speakText("Grammar Basics: Vowels, Consonants, and A or An");
}

/* WORKSHEET CIRCLE GAME LOGIC (Random Letters Every Time) */
function setupWorksheetCircle() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("worksheetBoard").classList.remove("hidden");

  const container = document.getElementById("worksheetRowsContainer");
  container.innerHTML = "";

  totalWorksheetCorrect = 0;

  // Har baar random letters shuffle hoke aayenge
  let shuffledPairs = [...allWorksheetPairs].sort(() => Math.random() - 0.5);
  let currentBatch = shuffledPairs.slice(0, 4);

  currentBatch.forEach(pair => {
    let row = document.createElement("div");
    row.className = "worksheet-row";

    let targetBox = document.createElement("div");
    targetBox.className = "target-letter-box";
    targetBox.innerText = pair.capital;
    row.appendChild(targetBox);

    let optGrid = document.createElement("div");
    optGrid.className = "worksheet-options-grid";

    let shuffledOpts = [...pair.options].sort(() => Math.random() - 0.5);

    shuffledOpts.forEach(letter => {
      let item = document.createElement("div");
      item.className = "ws-item";
      item.innerText = letter;

      item.onclick = () => {
        if (item.classList.contains("correct-circled") || item.classList.contains("wrong-circled")) return;

        if (letter === pair.correct) {
          playCorrectSound();
          item.classList.add("correct-circled");
          speakText(`Correct, ${letter} for ${pair.capital}`);
          score += 10;
          document.getElementById("scoreDisplay").innerText = "⭐ Score: " + score;
          confetti({ particleCount: 30, spread: 50, origin: { y: 0.6 } });

          totalWorksheetCorrect++;

          if (totalWorksheetCorrect === 4) {
            let banner = document.getElementById("popupBanner");
            document.getElementById("popupText").innerText = `Great Job! Next Level!`;
            banner.classList.add("show");

            setTimeout(() => {
              banner.classList.remove("show");
              setupWorksheetCircle(); // Agla naya random set load hoga
            }, 1200);
          }

        } else {
          playWrongSound();
          item.classList.add("wrong-circled");
          speakText("Try again");
        }
      };

      optGrid.appendChild(item);
    });

    row.appendChild(optGrid);
    container.appendChild(row);
  });

  speakText("Circle the small letter of capital letter");
}

/* MATCH NUMBERS WITH WORDS LOGIC */
function setupMatchGame() {
  document.getElementById("standardChalkboard").classList.add("hidden");
  document.getElementById("optionsContainer").classList.add("hidden");
  document.getElementById("matchBoard").classList.remove("hidden");

  const numCol = document.getElementById("numColumn");
  const wordCol = document.getElementById("wordColumn");
  const svg = document.getElementById("matchSvg");

  numCol.innerHTML = "";
  wordCol.innerHTML = "";
  svg.innerHTML = "";

  selectedNumItem = null;
  matchedPairsCount = 0;

  let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  numbers.sort(() => Math.random() - 0.5);
  let selectedNums = numbers.slice(0, 5);

  let words = selectedNums.map(n => ({ num: n, word: numberWordsMap[n] }));
  let shuffledWords = [...words].sort(() => Math.random() - 0.5);

  selectedNums.forEach(num => {
    let div = document.createElement("div");
    div.className = "match-item";
    div.dataset.value = num;
    div.innerText = num;
    div.innerHTML += '<div class="dot left"></div>';
    div.onclick = () => selectNumItem(div);
    numCol.appendChild(div);
  });

  shuffledWords.forEach(item => {
    let div = document.createElement("div");
    div.className = "match-item";
    div.dataset.value = item.num;
    div.innerText = item.word;
    div.innerHTML += '<div class="dot right"></div>';
    div.onclick = () => selectWordItem(div);
    wordCol.appendChild(div);
  });

  speakText("Match numbers with words");
}

function selectNumItem(el) {
  if (el.classList.contains("matched")) return;
  initAudio();

  document.querySelectorAll("#numColumn .match-item").forEach(i => i.classList.remove("selected"));
  el.classList.add("selected");
  selectedNumItem = el;
  speakText(el.dataset.value);
}

function selectWordItem(el) {
  if (el.classList.contains("matched") || !selectedNumItem) return;
  initAudio();

  let numVal = selectedNumItem.dataset.value;
  let wordVal = el.dataset.value;

  if (numVal === wordVal) {
    playCorrectSound();
    selectedNumItem.classList.remove("selected");
    selectedNumItem.classList.add("matched");
    el.classList.add("matched");

    drawMatchLine(selectedNumItem, el);
    speakText(el.innerText);

    selectedNumItem = null;
    matchedPairsCount++;

    if (matchedPairsCount === totalMatchPairs) {
      score += 20;
      document.getElementById("scoreDisplay").innerText = "⭐ Score: " + score;

      let banner = document.getElementById("popupBanner");
      document.getElementById("popupText").innerText = `Awesome!`;
      banner.classList.add("show");
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });

      setTimeout(() => {
        banner.classList.remove("show");
        generateQuestion();
      }, 1500);
    }
  } else {
    playWrongSound();
    speakText("Try again!");
    selectedNumItem.classList.remove("selected");
    selectedNumItem = null;
  }
}

function drawMatchLine(el1, el2) {
  const svg = document.getElementById("matchSvg");
  const containerRect = document.querySelector(".match-container").getBoundingClientRect();

  const dot1 = el1.querySelector(".dot");
  const dot2 = el2.querySelector(".dot");

  const rect1 = dot1.getBoundingClientRect();
  const rect2 = dot2.getBoundingClientRect();

  const x1 = rect1.left + rect1.width / 2 - containerRect.left;
  const y1 = rect1.top + rect1.height / 2 - containerRect.top;
  const x2 = rect2.left + rect2.width / 2 - containerRect.left;
  const y2 = rect2.top + rect2.height / 2 - containerRect.top;

  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", x1);
  line.setAttribute("y1", y1);
  line.setAttribute("x2", x2);
  line.setAttribute("y2", y2);
  line.setAttribute("stroke", "#00b894");
  line.setAttribute("stroke-width", "4");
  line.setAttribute("stroke-linecap", "round");

  svg.appendChild(line);
}

function drawClock(canvas, hour, minute) {
  let ctx = canvas.getContext("2d");
  let radius = canvas.width / 2;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  ctx.translate(radius, radius);
  radius = radius * 0.88;

  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2 * Math.PI);
  ctx.fillStyle = '#ffffff';
  ctx.fill();

  ctx.font = "bold 14px 'Comic Sans MS', sans-serif";
  ctx.textBaseline = "middle";
  ctx.textAlign = "center";
  ctx.fillStyle = "#2d3436";

  for (let num = 1; num <= 12; num++) {
    let ang = num * Math.PI / 6;
    ctx.rotate(ang);
    ctx.translate(0, -radius * 0.78);
    ctx.rotate(-ang);
    ctx.fillText(num.toString(), 0, 0);
    ctx.rotate(ang);
    ctx.translate(0, radius * 0.78);
    ctx.rotate(-ang);
  }

  ctx.beginPath();
  ctx.arc(0, 0, 6, 0, 2 * Math.PI);
  ctx.fillStyle = '#2c3e50';
  ctx.fill();

  let hourPos = (hour % 12) * Math.PI / 6 + (minute * Math.PI / (6 * 60));
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#ee5253";
  ctx.moveTo(0, 0);
  ctx.rotate(hourPos);
  ctx.lineTo(0, -radius * 0.48);
  ctx.stroke();
  ctx.rotate(-hourPos);

  let minPos = (minute * Math.PI / 30);
  ctx.beginPath();
  ctx.lineWidth = 3.5;
  ctx.lineCap = "round";
  ctx.strokeStyle = "#0984e3";
  ctx.moveTo(0, 0);
  ctx.rotate(minPos);
  ctx.lineTo(0, -radius * 0.70);
  ctx.stroke();
  ctx.rotate(-minPos);

  ctx.restore();
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
  renderOptions(options);
}

function renderOptions(opts) {
  let container = document.getElementById("optionsContainer");
  container.innerHTML = "";

  opts.forEach(opt => {
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
    
    let targetBox = document.getElementById("targetBox");
    if (targetBox) targetBox.innerText = currentAnswer;
    let targetBoxMissing = document.getElementById("targetBoxMissing");
    if (targetBoxMissing) targetBoxMissing.innerText = currentAnswer;

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
    buttonEl.style.background = "#d63031";
  }
}
