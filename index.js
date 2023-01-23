const tictactoe = (() => {
  const pVsP = document.querySelector("#pvsp");
  const gameControls = document.querySelector(".gamecontrols");
  const topLeft = document.querySelector("#topleft");
  const middleLeft = document.querySelector("#middleleft");
  const bottomLeft = document.querySelector("#bottomleft");
  const topCenter = document.querySelector("#topcenter");
  const middleCenter = document.querySelector("#middlecenter");
  const bottomCenter = document.querySelector("#bottomcenter");
  const topRight = document.querySelector("#topright");
  const middleRight = document.querySelector("#middleright");
  const bottomRight = document.querySelector("#bottomright");
  const formInquiry = document.querySelector("#forms");
  const gameDisplay = document.querySelector("#gamedisplay");
  const playerWarnOne = document.querySelector("#playerwarn1");
  const playerWarnTwo = document.querySelector("#playerwarn2");
  const playerOneInput = document.querySelector("#player1");
  const playerTwoInput = document.querySelector("#player2");
  const anounceWin = document.querySelector("#anouncer");
  const winnerDiv = document.querySelector("#winner");
  const reloadBtn = document.querySelector("#repeat");
  let isGameOn = true;
  let oneP;
  let twoP;
  const formBtn = document.querySelector("#formbtn");
  let count = 0;
  const gameBoard = [
    topLeft,
    middleLeft,
    bottomLeft,
    topCenter,
    middleCenter,
    bottomCenter,
    topRight,
    middleRight,
    bottomRight,
  ];

  const visibility = (item, type) => {
    if (type === "appear") {
      item.classList.remove("disappear");
    } else if (type === "disappear") {
      item.classList.add("disappear");
    }
  };

  const player = (n = "player1", s = "X") => {
    return { n, s };
  };

  const gameFlow = (p1, p2, c = count) => {
    switch (c) {
      case 0:
        count += 1;
        return p1;
        break;
      case 1:
        count += 1;
        return p2;
        break;
      case 2:
        count += 1;
        return p1;
        break;
      case 3:
        count += 1;
        return p2;
        break;
      case 4:
        count += 1;
        return p1;
        break;
      case 5:
        count += 1;
        return p2;
        break;
      case 6:
        count += 1;
        return p1;
        break;
      case 7:
        count += 1;
        return p2;
        break;
      case 8:
        count += 1;
        return p1;
        break;
      default:
        return "ERROR!";
    }
  };

  const whoWon = (tl, tc, tr, ml, mc, mr, bl, bc, br, s) => {
    if (
      (tl === s && tc === s && tr === s) ||
      (ml === s && mc === s && mr === s) ||
      (bl === s && bc === s && br === s) ||
      (tl === s && ml === s && bl === s) ||
      (tc === s && mc === s && bc === s) ||
      (tr === s && mr === s && br === s) ||
      (tl === s && mc === s && br === s) ||
      (tr === s && mc === s && bl === s)
    ) {
      return true;
    } else {
      return false;
    }
  };

  const winner = () => {
    const leftTop = topLeft.textContent;
    const rightTop = topRight.textContent;
    const centerTop = topCenter.textContent;
    const leftMiddle = middleLeft.textContent;
    const rightMiddle = middleRight.textContent;
    const centerMiddle = middleCenter.textContent;
    const leftBottom = bottomLeft.textContent;
    const rightBottom = bottomRight.textContent;
    const centerBottom = bottomCenter.textContent;

    const resultX = whoWon(
      leftTop,
      centerTop,
      rightTop,
      leftMiddle,
      centerMiddle,
      rightMiddle,
      leftBottom,
      centerBottom,
      rightBottom,
      "X"
    );

    const resultO = whoWon(
      leftTop,
      centerTop,
      rightTop,
      leftMiddle,
      centerMiddle,
      rightMiddle,
      leftBottom,
      centerBottom,
      rightBottom,
      "O"
    );

    if (resultX === true) {
      isGameOn = false;
      visibility(gameDisplay, "disappear");
      visibility(winnerDiv, "appear");
      anounceWin.innerHTML = `<u> ${oneP.n}</u> For The Win!!!`;
    } else if (resultO === true) {
      isGameOn = false;
      visibility(gameDisplay, "disappear");
      anounceWin.innerHTML = `<u>${twoP.n}</u> For The Win!!!`;

      visibility(winnerDiv, "appear");
      visibility(gameDisplay, "disappear");
    } else if (count === 9) {
      visibility(gameDisplay, "disappear");
      anounceWin.innerHTML = "<u>Draw</u>";
      visibility(winnerDiv, "appear");
    }
  };

  const contentTest = (ele) => {
    if (ele === "pc") {
      playerTwoInput.value = "Skynet PC";
    }
    let nameOne = playerOneInput.value;
    let nameTwo = playerTwoInput.value;
    const regex = /[\w][\w][\w]+/;
    if (regex.test(nameOne) === false && regex.test(nameTwo) === false) {
      visibility(playerWarnOne, "appear");
      visibility(playerWarnTwo, "appear");
      return false;
    } else if (regex.test(nameOne) === false) {
      visibility(playerWarnOne, "appear");
      visibility(playerWarnTwo, "disappear");
      return false;
    } else if (regex.test(nameTwo) === false) {
      visibility(playerWarnTwo, "appear");
      visibility(playerWarnOne, "disappear");
      return false;
    }
    oneP = player(nameOne, "X");
    twoP = player(nameTwo, "O");
    visibility(playerWarnOne, "disappear");
    visibility(playerWarnTwo, "disappear");
    return true;
  };

  const toForm = () => {
    visibility(playerWarnOne, "disappear");
    visibility(playerWarnTwo, "disappear");
    visibility(formInquiry, "appear");
    visibility(gameControls, "disappear");
  };

  //public//////////////////////////////////////////////////////////////////

  const startGameMode = () => {
    visibility(formInquiry, "disappear");
    visibility(gameDisplay, "disappear");
    visibility(winnerDiv, "disappear");
    reloadBtn.addEventListener("click", function () {
      location.reload();
    });

    pVsP.addEventListener("click", function () {
      formBtn.addEventListener("click", function () {
        if (contentTest() === true) {
          visibility(gameDisplay, "appear");
          visibility(formInquiry, "disappear");
        }
      });
      toForm();

      gameBoard.forEach((ele) => {
        ele.addEventListener("click", function (e) {
          if (ele.textContent === "" && isGameOn === true) {
            ele.textContent = `${gameFlow(oneP.s, twoP.s)}`;
          }
          if (count > 4) {
            winner();
          }

          e.stopImmediatePropagation();
        });
      });
    });
  };
  return { startGameMode };
})();

tictactoe.startGameMode();
