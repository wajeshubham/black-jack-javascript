const server = "http://127.0.0.1:5500";

let blackJackGame = {
  you: { score: 0, div: ".your-box", span: "#your-blackjack-result" },
  bot: { score: 0, div: ".bot-box", span: "#bot-blackjack-result" },
  wins: 0,
  losses: 0,
  draws: 0,
  isStand: false,
  turnsOver: false,
};

const yourStuff = blackJackGame["you"];
const botStuff = blackJackGame["bot"];

// asign image addresses for cards
const card = [
  "static/images/2.png",
  "static/images/3.png",
  "static/images/4.png",
  "static/images/5.png",
  "static/images/6.png",
  "static/images/7.png",
  "static/images/8.png",
  "static/images/9.png",
  "static/images/10.png",
  "static/images/A.png",
  "static/images/J.png",
  "static/images/Q.png",
  "static/images/K.png",
];

document.querySelector("#hit-btn").addEventListener("click", blackJackHit);
document.querySelector("#stand-btn").addEventListener("click", blackJackStand);
document.querySelector("#deal-btn").addEventListener("click", blackJackDeal);

// function when we hit Hit button
function blackJackHit() {
  if (blackJackGame["isStand"] === false) {
    showCards(yourStuff);
    scoreCard(yourStuff);
    burst(yourStuff);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function blackJackStand() {
  blackJackGame["isStand"] = true;
  while (botStuff["score"] < 16 && blackJackGame["isStand"] === true) {
    showCards(botStuff);
    scoreCard(botStuff);
    burst(botStuff);
    await sleep(1000);
  }

  blackJackGame["turnsOver"] = true;
  showResult(gameResult()); //pass gameResult function as a winner to showResult function
}

// logic to add cards on surface
function showCards(player) {
  if (player["score"] <= 21) {
    const cardIndex = Math.floor(Math.random() * 13);
    let image = document.createElement("img");
    image.setAttribute("src", card[cardIndex]);
    image.setAttribute("id", "card-img");
    console.log(image.src);
    document.querySelector(player["div"]).appendChild(image);
    updateScore(image, player);
  }
}

//function to increase the score
function updateScore(img, player) {
  // Note: Port number of your local host may be different

  if (img.src === `${server}/static/images/2.png`) {
    player["score"] += 2;
  } else if (img.src === `${server}/static/images/3.png`) {
    player["score"] += 3;
  } else if (img.src === `${server}/static/images/4.png`) {
    player["score"] += 4;
  } else if (img.src === `${server}/static/images/5.png`) {
    player["score"] += 5;
  } else if (img.src === `${server}/static/images/6.png`) {
    player["score"] += 6;
  } else if (img.src === `${server}/static/images/7.png`) {
    player["score"] += 7;
  } else if (img.src === `${server}/static/images/8.png`) {
    player["score"] += 8;
  } else if (img.src === `${server}/static/images/9.png`) {
    player["score"] += 9;
  } else if (img.src === `${server}/static/images/10.png`) {
    player["score"] += 10;
  } else if (img.src === `${server}/static/images/J.png`) {
    player["score"] += 10;
  } else if (img.src === `${server}/static/images/Q.png`) {
    player["score"] += 10;
  } else if (img.src === `${server}/static/images/K.png`) {
    player["score"] += 10;
  } else if (img.src === `${server}/static/images/A.png`) {
    player["score"] += 1;
  }
}

// function to reset the score and round
function blackJackDeal() {
  if (blackJackGame["turnsOver"] === true) {
    let resultMsg = document.querySelector("#black-jack-result");
    resultMsg.textContent = "Let's play!";
    resultMsg.style.color = "black";

    blackJackGame["isStand"] = false;
    let yourImages = document
      .querySelector(".your-box")
      .querySelectorAll("img");
    let botImages = document.querySelector(".bot-box").querySelectorAll("img");
    for (let i = 0; i < yourImages.length; i++) {
      yourImages[i].remove();
      yourStuff["score"] = 0;
      const playerScr = document.querySelector(yourStuff["span"]);
      playerScr.innerHTML = 0;
      playerScr.style.color = "white";
    }
    for (let i = 0; i < botImages.length; i++) {
      botImages[i].remove();
      botStuff["score"] = 0;
      const playerScr = document.querySelector(botStuff["span"]);
      playerScr.innerHTML = 0;
      playerScr.style.color = "white";
    }
    blackJackGame["turnsOver"] = false;
  }
}

// display the score
function scoreCard(player) {
  const playerScr = document.querySelector(player["span"]);
  playerScr.innerHTML = player["score"];
}

// show bust text
function burst(player) {
  let playerScr = document.querySelector(player["span"]);
  if (player["score"] > 21) {
    playerScr.innerHTML = "BUST!";
    playerScr.style.color = "red";
  } else {
    playerScr.innerHTML = player["score"];
  }
}

function gameResult() {
  let winner;
  // logic to declare winner
  if (yourStuff["score"] <= 21) {
    if (yourStuff["score"] > botStuff["score"] || botStuff["score"] > 21) {
      winner = yourStuff;
    } else if (
      botStuff["score"] <= 21 &&
      yourStuff["score"] < botStuff["score"]
    ) {
      winner = botStuff;
    } else if (botStuff["score"] === yourStuff["score"]) {
      winner = "no-one";
    }
  } else if (yourStuff["score"] > 21 && botStuff["score"] <= 21) {
    winner = botStuff;
  } else if (yourStuff["score"] > 21 && botStuff["score"] > 21) {
    winner = "no-one";
  }

  return winner;
}

// create different function to display the result
function showResult(winner) {
  let message, messageColor;

  if (blackJackGame["turnsOver"] === true) {
    if (winner === yourStuff) {
      message = "You Won!";
      blackJackGame["wins"]++;
      messageColor = "black";
    } else if (winner === botStuff) {
      message = "You Lost!";
      blackJackGame["losses"]++;
      messageColor = "black";
    } else {
      message = "You Drew!";
      blackJackGame["draws"]++;
      messageColor = "black";
    }
    let resultMsg = document.querySelector("#black-jack-result");
    resultMsg.textContent = message;
    resultMsg.style.color = messageColor;

    let wins = document.querySelector("#wins");
    let losses = document.querySelector("#losses");
    let draws = document.querySelector("#draws");

    wins.textContent = blackJackGame["wins"];
    losses.textContent = blackJackGame["losses"];
    draws.textContent = blackJackGame["draws"];
  }
}
