const boxces = document.querySelectorAll(".box");
const button = document.getElementById("btn");
const timerButton = document.getElementById("timerButton");
let isPress = true; // true for human (X), false for computer (O)

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

function resultButton(pos1) {
  button.innerText = `Winner is " ${pos1} "`;
  button.style.backgroundColor = "green";
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

    if (pos1 != "" && pos2 != "" && pos3 != "") {
      if (pos1 === pos2 && pos2 === pos3) {
        resultButton(pos1);
        disableAllBox();
        setTimeout(() => {
          location.reload();
        }, 4000);
        return true; // A winner was found
      }
    }
  }
  return false; // No winner found
};

const computerMove = () => {
  // Get all empty boxes
  const emptyBoxes = [...boxces].filter(box => box.innerText === "");
  if (emptyBoxes.length > 0) {
    // Choose a random empty box for the computer's move
    const randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    randomBox.innerText = "O";
    randomBox.style.pointerEvents = "none"; // Disable the box after click
    return checkWinner(); // Check if the computer has won
  }
  return false;
};

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
