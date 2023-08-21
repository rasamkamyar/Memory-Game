// dom nodes
// clone HTMLcolection into pure array
let boxes = [...document.getElementsByClassName("card")];
let h1 = document.querySelector("h1");
let h2 = document.querySelector("h2");
let section = document.querySelector("section");
let openCards = [];
let matchedCount = 0;
let falseCount = 35;

let time = 120;
let countDown = setInterval(function () {
  if (time <= 0) {
    clearInterval(countDown);
  }
  document.getElementById("timer").innerHTML = time--;
}, 1000);

// functions
function showCard() {
  this.classList.add("show");
  openCards.push(this);

  if (openCards.length === 2) {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      matchCards();
    } else {
      openCards[0].classList.add("unmatched");
      openCards[1].classList.add("unmatched");
      freezeAll();

      // back openCards to previous state
      setTimeout(unmatchecards, 500);
    }
  }
}

function matchCards() {
  matchedCount++;
  openCards[0].classList.add("matched");
  openCards[1].classList.add("matched");
  openCards.length = 0;
  matchedCount++;
  if (matchedCount === 16) {
    section.classList.add("noneDisplay");
    h1.classList.add("winResultShow");
  }
}

function unmatchecards() {
  openCards[0].classList.remove("unmatched", "show");
  openCards[1].classList.remove("unmatched", "show");
  openCards.length = 0;
  looseGame();
  unFreezeAll();
}

function looseGame() {
  for (let i = 0; i < falseCount; i++) {
    --falseCount;
    if (falseCount === 1) {
      section.classList.add("noneDisplay");
      h2.classList.add("gameOverResult");
    }
  }
}

function freezeAll() {
  for (const box of boxes) {
    box.classList.add("freeze");
  }
}
function unFreezeAll() {
  for (const box of boxes) {
    box.classList.remove("freeze");
  }
}

function showAllCards() {
  for (const box of boxes) {
    box.classList.add("show");
  }
}

function hideAllCards() {
  for (const box of boxes) {
    box.classList.remove("show");
  }
}

function startGame() {
  h1.classList.add("winResult");
  h2.classList.add("gameOver");
  let shuffledCards = shuffle(boxes);
  section.innerHTML = "";
  for (const card of shuffledCards) {
    section.innerHTML += card.outerHTML;
  }
  boxes = document.querySelectorAll(".card");
  for (const box of boxes) {
    box.addEventListener("click", showCard);
  }
  showAllCards();
  setTimeout(hideAllCards, 3000);
}

function shuffle(array) {
  for (let index = 0; index < array.length; index++) {
    let randomIndex = Math.floor(Math.random() * array.length);
    const temp = array[index];
    array[index] = array[randomIndex];
    array[randomIndex] = temp;
  }

  return array;
}

// events
for (const box of boxes) {
  box.addEventListener("click", showCard);
}
window.addEventListener("load", startGame);

// entekhabe doroste adad baraye halghe baraaye mizane khata (falsecount)
// estefade dorost az timer b hengame shoru va etmame game
// function gozashtan bar ruye timer
