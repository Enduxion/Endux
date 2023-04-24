/* Okay, so this is a easily forgottable code so I am going to explain it
There is a class in js called IntersectionObserver
It's contructor takes element of the document and works on the specific element we provided
Now in this code we have made an observer which is observing on whether out element has intersected
our window view (isIntersecting) if no, we add a class called opacityZero which makes the element invisible
and adds a translation to it --> it goes to far left, if yes, then we remove the class hence revealing our element
and because we have transition effect on it, it gives an effect of sliding

New thing: IntersectionObserver Class
*/

const makeBox = document.getElementById("makeASquare");

const observer = new IntersectionObserver((inputs) => {
  inputs.forEach((input) => {
    if (input.isIntersecting) {
      setTimeout(() => {
        if (
          input.target == makeBox.children[1] ||
          input.target == makeBox.children[3]
        ) {
          input.target.style.transitionDelay = "0.2s";
          setTimeout(() => {
            input.target.style.transitionDelay = "";
          }, 300);
        }
        input.target.classList.remove("opacityZero");
      }, 50);
    } else {
      setTimeout(() => {
        input.target.classList.add("opacityZero");
      }, 50);
    }
  });
});
const popBoxItems = document.querySelectorAll(".popBox");
const endBoxItems = document.querySelectorAll(".endBoxes");
popBoxItems.forEach((e) => observer.observe(e));
endBoxItems.forEach((e) => observer.observe(e));

function getRandomNumbersForPosition() {
  let num = Math.floor(Math.random() * 100 + 1) - 5;
  return num;
}
function run() {
  setTimeout(()=>{
    window.scrollBy({
      top: -10000,
      behavior: 'smooth'
    });
  }, 200);
  const items = document.querySelectorAll(".boxesAnimated");
  items.forEach((item) => {
    item.style.top = getRandomNumbersForPosition() + "%";
    item.style.left = getRandomNumbersForPosition() + "%";
    item.style.scale = Math.random() / 2;
    item.style.rotate = Math.random() * 359 + "deg";
  });
  setInterval(() => {
    items.forEach((item) => {
      item.style.top = getRandomNumbersForPosition() + "%";
      item.style.left = getRandomNumbersForPosition() + "%";
      item.style.scale = Math.random() / 2;
    });
  }, 10000);

  // For first text animation
  const textHeader = document.querySelectorAll(".letterHeader");
  setTimeout(() => {
    for (let i = 0; i < textHeader.length; i++) {
      setTimeout(() => {
        textHeader[i].classList.remove("opaceBox");
      }, 150 * i);
    }
  }, 1000);
  // For Text
  let animationWorking = new Array(textHeader.length).fill(false);
  for (let i = 0; i < textHeader.length; i++) {
    textHeader[i].onmouseover = function () {
      if (!animationWorking[i]) {
        textHeader[i].style.animation = "fontEx 0.5s linear";
        setTimeout(() => {
          textHeader[i].style.color = "";
          textHeader[i].style.animation = "";
          animationWorking[i] = false;
        }, 500);
      }
    };
  }
}
{
  const textHeaderCursor = document.querySelectorAll(".letterHeader");
  const popBoxCursor = document.querySelectorAll(".popBox");
  const endBoxCursor = document.querySelectorAll(".endBoxes");
  mouseMovement(textHeaderCursor);
  mouseMovement(popBoxCursor);
  mouseMovement(endBoxCursor);
}
document.addEventListener("scroll", () => {
  document.querySelector(".textHeader").style.top =
    window.pageYOffset / 10 + "%";
  document.querySelector(".textHeader").style.opacity =
    1 - window.pageYOffset / 500;
  if (document.querySelector(".textHeader").style.opacity < 0) {
    document.querySelector(".textHeader").style.display = "none";
  } else {
    document.querySelector(".textHeader").style.display = "block";
  }
});

// loading canvas
const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const MAX_WIDTH = canvas.width / 1.25 - 5;
let currentWidth = 0;
let loadClose = false;
var loadBox, loadInnerBox;

window.onresize = () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
};

function vector2(x, y) {
  this.x = x;
  this.y = y;
}
class Box {
  constructor(size, position) {
    this.size = size;
    this.position = position;
  }
  update(size, position) {
    this.size.x = size.x;
    this.size.y = size.y;
    this.position.x = position.x;
    this.position.y = position.y;
  }
  render(ctx, hollow, color, color2) {
    // outerbox
    if (hollow) {
      ctx.save();
      ctx.fillStyle = color2;
      ctx.shadowColor = color2;
      ctx.shadowBlur = 20;
      ctx.fillRect(
        this.position.x + 1,
        this.position.y + 1,
        this.size.x - 2,
        this.size.y - 2
      );
      ctx.restore();
    } else {
      ctx.save();
      ctx.fillStyle = color;
      ctx.shadowColor = color2;
      if (color == "grade") {
        var gradient = ctx.createLinearGradient(
          this.position.x,
          this.position.y,
          this.position.x + this.size.x,
          this.position.y + this.size.y
        ); // (x0, y0, x1, y1)
        gradient.addColorStop(0, "#0a192f");
        gradient.addColorStop(1, "#0a384f");
        ctx.fillStyle = gradient;
      }
      ctx.shadowBlur = 9;
      ctx.fillRect(this.position.x, this.position.y, this.size.x, this.size.y);
      ctx.restore();
    }
  }
}
function showLoadingBar() {
  document.getElementsByTagName("html")[0].style.overflow = "hidden";
  loadBox = new Box(
    new vector2(canvas.width / 1.25, 20),
    new vector2(canvas.width / 2 - canvas.width / 2.5, canvas.height / 1.5)
  );
  loadInnerBox = new Box(
    new vector2(0, 15),
    new vector2(
      canvas.width / 2 - canvas.width / 2.5 + 2.5,
      canvas.height / 1.5 + 2.5
    )
  );
  window.scrollBy({
    top: 1000,
    behavior: 'smooth'
  });
  animate();
  
}
function update() {
  if (MAX_WIDTH >= currentWidth) {
    currentWidth += MAX_WIDTH / (1087.8 / 16);
  } else {
    loadClose = true;
  }
  loadInnerBox.update(
    new vector2(currentWidth, loadInnerBox.size.y),
    new vector2(loadInnerBox.position.x, loadInnerBox.position.y)
  );
}
function animate() {
  update();
  context.clearRect(0, 0, canvas.width, canvas.height);
  // render
  loadBox.render(context, false, "white", "#0a192f");
  loadInnerBox.render(context, false, "grade", "grade");
  context.font = "46px KoHo";
  context.fillStyle = "white";
  context.fillText(
    "Loading...",
    canvas.width / 2 - canvas.width / 16,
    canvas.height / 1.75
  );
  if (!loadClose) {
    requestAnimationFrame(animate);
  } else {
    document.getElementsByTagName("html")[0].style.overflow = "visible";
    canvas.style.display = "none";
    run();
  }
}

showLoadingBar();
