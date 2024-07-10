let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");
let turnIndicator = document.querySelector("#turn");

let turnO = true; //playerO
let count = 0; //To Track Draw

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

const resetGame = () => {
  turnO = true;
  count = 0;
  turnIndicator.innerText = "Current Turn: Player X";
  enableBoxes();
  msgContainer.classList.add("hide");
};

const enableBoxes = () => {
  boxes.forEach(box => {
    box.disabled = false;
    box.innerText = "";
    box.classList.remove("winning-box");
  });
};

const disableBoxes = () => {
  boxes.forEach(box => box.disabled = true);
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const gameDraw = () => {
  msg.innerText = "Game was a Draw.";
  msgContainer.classList.remove("hide");
  disableBoxes();
};

const checkWinner = () => {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;
    if (boxes[a].innerText && boxes[a].innerText === boxes[b].innerText && boxes[a].innerText === boxes[c].innerText) {
      boxes[a].classList.add("winning-box");
      boxes[b].classList.add("winning-box");
      boxes[c].classList.add("winning-box");
      showWinner(boxes[a].innerText);
      return true;
    }
  }
  return false;
};

boxes.forEach((box, index) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      turnIndicator.innerText = "Current Turn: Player X";
    } else {
      box.innerText = "X";
      turnIndicator.innerText = "Current Turn: Player O";
    }
    turnO = !turnO;
    box.disabled = true;
    count++;

    if (checkWinner()) {
      return;
    }

    if (count === 9) {
      gameDraw();
    }
  });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
