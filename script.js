const boxces = document.querySelectorAll(".box");
const button = document.getElementById("btn");
const Point = document.getElementById("point");
let isPress = true; // true for human (X), false for computer (0)
let point = 0;

const winPattern = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function resultButton(message, color) {
  button.innerText = message;
  button.style.backgroundColor = color;
}

function playAgain() {
  boxces.forEach((box) => {
    box.innerText = "";
    box.style.pointerEvents = "auto";
  });
  isPress = true;
  resultButton("Play Again", "#1b263b");
}

function updateUserPoint(winner) {
  if (winner === "X") {
    point = point + 10;
    Point.innerText = point;
  } else {
    point = point - 10;
    Point.innerText = point;
  }
}

function drawSituation() {
  let emptyBoxes = [...boxces].filter((box) => box.innerText === "");
  if (emptyBoxes.length === 0) {
    return true;
  }
  return false;
}

const disableAllBox = () => {
  boxces.forEach((boxx) => {
    boxx.style.pointerEvents = "none";
  });
};

const checkWinner = () => {
  for (let pattern of winPattern) {
    let pos1 = boxces[pattern[0]].innerText;
    let pos2 = boxces[pattern[1]].innerText;
    let pos3 = boxces[pattern[2]].innerText;

    if (pos1 !== "" && pos2 !== "" && pos3 !== "") {
      if (pos1 === pos2 && pos2 === pos3) {
        resultButton(`Winner is " ${pos1} "`, "green");
        updateUserPoint(pos1);
        disableAllBox();
        setTimeout(() => {
          playAgain();
        }, 2500);
        return true; // A winner was found
      }
    }
  }
  if (drawSituation()) {
    resultButton(`Game Draw`, "#1b263b");
    setTimeout(() => {
      playAgain();
    }, 2500);
  }
  return false; // No winner found
};

function findingEmptyBox() {
  const emptyBoxes = [...boxces].filter((box) => box.innerText === "");
  const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
  return [emptyBoxes, randomBox];
}

const computerMove = () => {
  // Get all empty boxes and a random empty box
  const [emptyBoxes, randomBox] = findingEmptyBox();
  if (emptyBoxes.length > 0) {
    makingGameDecisionAI(randomBox, emptyBoxes);
    return checkWinner(); // Check if the AI has won after its move
  }
  return false;
};

const patternForAI = [
  [0, 1, 2],
  [2, 1, 0],
  [3, 4, 5],
  [5, 4, 3],
  [6, 7, 8],
  [8, 7, 6],
  [0, 3, 6],
  [6, 3, 0],
  [1, 4, 7],
  [7, 4, 1],
  [2, 5, 8],
  [8, 5, 2],
  [0, 4, 8],
  [8, 4, 0],
  [2, 4, 6],
  [6, 4, 2],
];

function makingGameDecisionAI(randomBox, emptyBoxes) {
  // Check if AI can win or block player from winning
  for (let pattern of patternForAI) {
    let value1 = boxces[pattern[0]];
    let value2 = boxces[pattern[1]];
    let value3 = pattern[2];

    if (value1.innerText !== "" && value2.innerText !== "") {
      if (value1.innerText === value2.innerText) {
        // AI completes the line if possible
        if (boxces[value3].innerText === "") {
          boxces[value3].innerText = "O";
          boxces[value3].style.pointerEvents = "none";
          return; // Exit once AI makes its move
        }
      }
    }
  }

  // If no winning move, pick a random box
  if (emptyBoxes.length > 0) {
    randomBox.innerText = "O";
    randomBox.style.pointerEvents = "none";
  }
}

boxces.forEach((box) => {
  box.addEventListener("click", () => {
    if (isPress) {
      box.innerText = "X";
      isPress = false;
      box.style.pointerEvents = "none"; // Disable the box after click
      if (!checkWinner()) {
        // After human move, let the computer play
        setTimeout(() => {
          if (!computerMove()) {
            isPress = true; // Enable human to play after the computer's move
          }
        }, 1000); // Delay for computer's move
      }
    }
  });
});
