const observer = new IntersectionObserver((inputs) => {
  inputs.forEach((input) => {
    if (input.isIntersecting) {
      setTimeout(() => {
        input.target.classList.remove("opacityZero");
      }, 50);
    } else {
      setTimeout(() => {
        input.target.classList.add("opacityZero");
      }, 50);
    }
  });
});

const gameBoxContainer = document.querySelectorAll(".gameBoxContainer");
gameBoxContainer.forEach((e) => observer.observe(e));

document.getElementsByTagName("body")[0].addEventListener("resize", () => {
  setNewHeight();
  makeBackgroundAnimationProper();
});
// Another functions
const MARGIN = 15;
const windowHeight =
  document.querySelector("body").clientHeight +
  document.getElementById("footBar").clientHeight -
  MARGIN +
  "px";
function setNewHeight() {
  windowHeight =
    document.querySelector("body").clientHeight +
    document.getElementById("footBar").clientHeight -
    MARGIN +
    "px";
}
function getRandomNumbersForPosition() {
  let num = Math.floor(Math.random() * 100 + 1) - 5;
  return num;
}
function getScale() {
  let num = Math.random() / 2;
  if (num < 0.1) {
    num += 0.5;
  }
  return num;
}
function makeBackgroundAnimationProper() {
  const items = document.querySelectorAll(".backgroundAnimation");
  document
    .querySelector(".backgroundContainer")
    .style.setProperty("--window-height", windowHeight);
  items.forEach((item) => {
    item.style.top = getRandomNumbersForPosition() + "%";
    item.style.left = getRandomNumbersForPosition() + "%";
    item.style.scale = getScale();
    item.style.rotate = Math.random() * 359 + "deg";
  });
  setInterval(() => {
    items.forEach((item) => {
      item.style.top = getRandomNumbersForPosition() + "%";
      item.style.left = getRandomNumbersForPosition() + "%";
      item.style.scale = getScale();
    });
  }, 10000);
}
function animateTextBox() {
  const gameBoxTitleLetters = document.querySelectorAll(".gameBoxTitleLetter");
  gameBoxTitleLetters.forEach((ltr, index) => {
    setTimeout(() => {
      ltr.style.rotate = "360deg";
      ltr.style.fontSize = "38px";
      ltr.style.color = "aqua";
      setTimeout(() => {
        ltr.style.color = "white";
      }, index * 100);
      setTimeout(() => {
        ltr.style.rotate = "";
        ltr.style.fontSize = "32px";
        ltr.style.color = "aqua";
        setTimeout(() => {
          ltr.style.color = "white";
        }, (gameBoxTitleLetters.length - index) * 50);
      }, (gameBoxTitleLetters.length - index) * 200);
    }, index * 100);
  });
}
document.addEventListener("DOMContentLoaded", () => {
  const gameBoxTitleLetters = document.querySelectorAll(".gameBoxTitleLetter");
  // Animation for the "Play some games!" title
  // For first time seeing
  animateTextBox();
  gameBoxTitleLetters.forEach((ltr) => {
    ltr.onmouseover = function () {
      ltr.style.rotate = "360deg";
      setTimeout(() => {
        ltr.style.rotate = "";
      }, 500);
    };
  });
  //
  mouseMovement(document.querySelectorAll(".gameBoxContainer"));
  // backgroundAnimation
  makeBackgroundAnimationProper();
});
