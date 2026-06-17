const emojiDetails = [
  { description: "Smiling face with sunglasses", emoji: "😎" },
  { description: "Thumbs up", emoji: "👍" },
  { description: "Heart eyes", emoji: "😍" },
  { description: "Crying face", emoji: "😢" },
  { description: "Party popper", emoji: "🎉" },
  // Add more emoji descriptions here
];

let currentEmojiIndex = 0;
let score = 0;
let time = 30;
//

//
const guessInput = document.getElementById("guess-input");
const resultElement = document.getElementById("result");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");

function displayEmoji() {
  const descriptionElement = document.getElementById("description");
  descriptionElement.textContent = emojiDetails[currentEmojiIndex].emoji;
  startTimer();
}

function checkGuess() {
  const guess = guessInput.value.trim().toLowerCase();
  const correctEmoji = emojiDetails[currentEmojiIndex].description
    .trim()
    .toLowerCase();
  if (guess === correctEmoji) {
    resultElement.textContent = "Correct!";
    score++;
  } else {
    resultElement.textContent = "Wrong!";
  }
  scoreElement.textContent = `Score: ${score}`;
  guessInput.value = "";
  guessInput.focus();
  time = 30;
  nextEmoji();
}

function nextEmoji() {
  currentEmojiIndex++;

  if (currentEmojiIndex === emojiDetails.length) {
    currentEmojiIndex = 0;
    score = 0;
  }

  displayEmoji();
}

document.getElementById("guess-input").addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkGuess();
  }
});

document.addEventListener("DOMContentLoaded", () => {
  displayEmoji();
});

function startTimer() {
  timerElement.textContent = time;
  const timer = setInterval(() => {
    time--;
    timerElement.textContent = time;
    if (time <= 0) {
      clearInterval(timer);
      checkGuess();
    }
  }, 1000);
}
