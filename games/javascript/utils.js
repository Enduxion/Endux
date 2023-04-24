document.getElementsByTagName("body")[0].addEventListener("resize", () => {
  setNewHeight();
  makeBackgroundAnimationProper();
});
const MARGIN = 15;
const windowHeight = document.querySelector("body").clientHeight + "px";
function setNewHeight() {
  windowHeight = document.querySelector("body").clientHeight + "px";
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
document.addEventListener("DOMContentLoaded", () => {
  makeBackgroundAnimationProper();
});
