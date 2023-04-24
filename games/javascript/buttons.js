var isMainMenu = true;
var openedHStick = false;
var mediaQ = window.matchMedia("screen and (max-width: 1295px)");

const mainMenu = document.getElementById("mainMenuContainer");
const buttonMenu = document.getElementById("buttonMenuContainer");
const endMenu = document.getElementById("endMenu");
const hButtonMenu = document.getElementById("hButtonMenuContainer");
const hStickMenu = document.getElementById("hStickMenu");

const mainMenuButtons = mainMenu.querySelectorAll(".mainMenuButton");
const buttonMenuButtons = buttonMenu.querySelectorAll(".buttonMenuButton");
const endMenuButtons = endMenu.querySelectorAll(".endMenuButton");
const hButtonMenuButtons = hButtonMenu.querySelectorAll(".hButtonMenuButton");
const hStick = hStickMenu.querySelectorAll(".hStick");
// For Exiting to games.html
function quitGame() {
  open("../../html/games.html", "_self");
}
// For restarting Game
function restartGame() {
  isPaused = true;
  init();
  setTimeout(() => {
    pauseGameToggleTo(false);
  }, 200);
}
// For pausing Game
function pauseGameToggleTo(value) {
  isPaused = value;
  if (value) {
    document.getElementById("pauseGame").innerText = "Play";
  } else {
    document.getElementById("pauseGame").innerText = "Pause";
  }
  requestAnimationFrame(animate);
}
function pauseGame() {
  if (!isPaused) {
    pauseGameToggleTo(true);
  } else {
    pauseGameToggleTo(false);
  }
}
function promptMenu() {
  document.getElementById("scoreBox").innerText = score;
  init();
  endMenu.classList.add("showMenu");
}
function hideMenu() {
  endMenu.classList.remove("showMenu");
}
// HamburgerStart
function openHamburger() {
  hStickMenu.classList.remove("hidden");
}
// For starting Game
function startGame() {
  // Hide main menu
  mainMenu.classList.add("hideMainMenu");
  setTimeout(() => {
    mainMenu.style.display = "none";
  }, 400);

  // Display Canvas
  canvas.style.display = "inline";
  setCanvas(980, 560);

  // Show buttons
  if (mediaQ.matches) {
    openHamburger();
  } else {
    buttonMenu.style.display = "flex";
  }
  init();
  requestAnimationFrame(animate);
  // Check For Hamburger
}
// On MainMenu
let srtgme = false;
mainMenuButtons.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.id == "startGame" && !srtgme) {
      srtgme = true;
      startGame(false);
      isMainMenu = false;
      weird = false;
    } else if (e.id == "startGame2" && !srtgme) {
      srtgme = true;
      weird = true;
      startGame();
      isMainMenu = false;
    } else {
      quitGame();
    }
  });
});
// On not-hamburger Screen
buttonMenuButtons.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.id == "restartGame") {
      restartGame();
    } else if (e.id == "pauseGame") {
      pauseGame();
    } else {
      quitGame();
    }
  });
});
endMenuButtons.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.id == "endMenuRestartGame") {
      restartGame();
      hideMenu();
    } else {
      quitGame();
    }
  });
});
// On hamburger Screen
window.addEventListener("resize", () => {
  if (!isMainMenu) {
    if (mediaQ.matches) {
      buttonMenu.style.display = "none";
      hStickMenu.classList.remove("hidden");
    } else {
      buttonMenu.style.display = "flex";
      hStickMenu.classList.add("hidden");
      hButtonMenu.classList.add("hidden");
    }
  }
});
// onclick hamburger
function animateSticks(doAdd) {
  if (doAdd) {
    hStick.forEach((e) => {
      if (e.id == "firstHStick") {
        e.classList.add("goLeft");
      } else if (e.id == "secondHStick") {
        e.classList.add("rotate");
      } else {
        e.classList.add("goRight");
      }
    });
  } else {
    hStick.forEach((e) => {
      if (e.id == "firstHStick") {
        e.classList.remove("goLeft");
      } else if (e.id == "secondHStick") {
        e.classList.remove("rotate");
      } else {
        e.classList.remove("goRight");
      }
    });
  }
}
function showHButtons(doAdd) {
  if (doAdd) {
    hButtonMenu.classList.remove("hidden");
  } else {
    hButtonMenu.classList.add("hidden");
  }
}
hStickMenu.addEventListener("click", () => {
  toggled = !openedHStick;
  animateSticks(toggled);
  pauseGameToggleTo(toggled);
  showHButtons(toggled);
  openedHStick = toggled;
});
// for buttons inside toggled Hamburger Menu
hButtonMenuButtons.forEach((e) => {
  e.addEventListener("click", () => {
    if (e.id == "hRestartGame") {
      showHButtons(false);
      pauseGameToggleTo(false);
      animateSticks(false);
      openedHStick = false;
      restartGame();
    } else if (e.id == "hResumeGame") {
      animateSticks(false);
      showHButtons(false);
      pauseGameToggleTo(false);
      openedHStick = false;
    } else {
      quitGame();
    }
  });
});

{
  mouseMovement(document.querySelectorAll(".buttonActions"));
  mouseMovement(document.querySelectorAll(".endMenuButton"));
}
