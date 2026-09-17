/* =========================
   PLAY BUTTON
   ========================= */

function playGame() {

  document
    .getElementById("homePage")
    .classList.add("hidden");

  document
    .getElementById("menuPage")
    .classList.remove("hidden");

}


/* =========================
   HOME BUTTON
   ========================= */

function goHome() {

  document
    .getElementById("menuPage")
    .classList.add("hidden");

  document
    .getElementById("homePage")
    .classList.remove("hidden");

}


/* =========================
   MATH GAME
   ========================= */

function startQuiz(operation) {

  alert("Game selected!");

}
