document.addEventListener("mousemove", (event) => {
  document.getElementById("cursor").style.left = event.clientX + "px";
  document.getElementById("cursor").style.top = event.clientY + "px";
});
document.onmousedown = () => {
  document.getElementById("cursor").classList.add("growCursor");
};
document.onmouseup = () => {
  document.getElementById("cursor").classList.remove("growCursor");
};

function mouseMovement(element) {
  element.forEach((e) => {
    e.addEventListener("mouseover", () => {
      document.getElementById("cursor").classList.add("growCursor");
    });
    e.addEventListener("mouseleave", () => {
      document.getElementById("cursor").classList.remove("growCursor");
    });
  });
}
function mouseMovementSingle(element) {
  element.addEventListener("mouseover", () => {
    document.getElementById("cursor").classList.add("growCursor");
  });
  element.addEventListener("mouseleave", () => {
    document.getElementById("cursor").classList.remove("growCursor");
  });
}
function mouseCustomClass(element, cClass) {
  element.addEventListener("mouseover", () => {
    document.getElementById("cursor").classList.add(cClass);
  });
  element.addEventListener("mouseleave", () => {
    document.getElementById("cursor").classList.remove(cClass);
  });
}
