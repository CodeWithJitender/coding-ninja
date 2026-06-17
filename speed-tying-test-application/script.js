//Complete the given scaffold to implement all the functionalities mentioned in the problem Statement.
const sentences = `The quick brown fox jumps over the lazy dog.
  Sphinx of black quartz, judge my vow.
  Pack my box with five dozen liquor jugs.
  How vexingly quick daft zebras jump!`;

const startButton = document.getElementById("start-btn");
const sentenceField = document.getElementById("sentence");
const inputField = document.getElementById("input");
const timerField = document.getElementById("timer");
const speedField = document.getElementById("speed");
const accuracyField = document.getElementById("accuracy");
const resultField = document.getElementById("result");
let time = 30;
// 2. Attach the click event
startButton.addEventListener("click", startTest);

function startTest() {
  sentenceField.textContent = sentences;
  inputField.disabled = false;
  inputField.focus();
  timerStart();
}

function timerStart() {
  timerField.textContent = 30;
  const timeInterval = setInterval(() => {
    time--;
    timerField.textContent = time;
    if (time <= 0) {
      clearInterval(timeInterval);
      endTest();
    }
  }, 1000);
}

function endTest() {
  inputField.disabled = true;
  const typedText = inputField.value.trim().toLowerCase();
  const targetText = sentences.trim().toLowerCase();
  const wpm = Math.round(typedText.length / 5 / 0.5);
  // Calculate Accuracy
  let correctChars = 0;
  for (let i = 0; i < typedText.length; i++) {
    if (typedText[i] === targetText[i]) {
      correctChars++;
    }
  }
  const accuracy = Math.round((correctChars / targetText.length) * 100);
  // Display the final stats on the screen
  resultField.style.display = "block";
  resultField.innerHTML = `
        <strong>Test Complete!</strong><br>
        Speed: <strong>${wpm} WPM</strong><br>
        Accuracy: <strong>${accuracy}%</strong><br>
        Time: <strong>30 seconds</strong>
            <button onclick="resetTest()">Play Again</button>
    `;
}
function resetTest() {
  // Hide the results window
  resultField.style.display = "none";

  // Clear the old typing
  inputField.value = "";
  time = 30;

  // Start the timer and test over again
  startTest();
}
