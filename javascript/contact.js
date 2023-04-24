const canvas = document.getElementById("canvas1");
const context = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
context.fillStyle = "rgba(10, 25, 47, 1)";
context.fillRect(0, 0, canvas.width, canvas.height);
const MAX_PARTICLE = 50;
let currentParticleCount = 0;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
window.addEventListener("resize", resizeCanvas2);
function vector2(x, y) {
  this.x = x;
  this.y = y;
}
const fireWorks = [];
let hue = 0;
// varibales and functions
function init() {
  fireWorks.splice(0, fireWorks.length);
  hue = 0;
}

function spawnParticle() {
  if (currentParticleCount <= MAX_PARTICLE) {
    let position = new vector2(0, 0);
    position.x = Math.random() * canvas.width;
    position.y = canvas.height;
    fireWorks.push(
      new GravityParticle(
        position,
        15,
        false,
        true,
        -(Math.random() * 15 + 9),
        PARTICLE_TYPES.CIRCLE,
        "particle",
        "hsl(" + hue + ", 60%, 50%)"
      )
    );
    currentParticleCount++;
  }
}

function updateFireWorks() {
  for (let i = 0; i < fireWorks.length; i++) {
    fireWorks[i].update();
    if (
      fireWorks[i].isDeprecated ||
      fireWorks[i].position.x < 0 ||
      fireWorks[i].position.x > canvas.width ||
      fireWorks[i].position.y < 0 ||
      fireWorks[i].position.y > canvas.height
    ) {
      fireWorks.splice(i, 1);
      i--;
      currentParticleCount--;
    }
  }
}

function renderFireWorks() {
  for (let i = 0; i < fireWorks.length; i++) {
    fireWorks[i].render(context, true, "nothing", false);
  }
}
function animate() {
  hue++;
  if (hue >= 360) hue = 0;
  spawnParticle();
  updateFireWorks();
  context.clearRect(0, 0, canvas.width, canvas.height);
  renderFireWorks();
  requestAnimationFrame(animate);
}

init();
animate();
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// UI
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const submitButton = document.getElementById("submit");
submitButton.addEventListener("click", () => {
  submitButton.style.boxShadow = "inset 2px 2px 2px black";
  document.getElementById("popBoxSubmit").classList.remove("opaceBox");
  validateTheForm();
  setTimeout(() => {
    submitButton.style.boxShadow = "2px 2px 2px black";
  }, 200);
});
// Mouse
{
  mouseMovement(document.querySelectorAll(".inputText"));
  mouseMovement(document.querySelectorAll(".linksContainer"));
  mouseMovement(document.querySelectorAll(".endPage"));
  mouseMovementSingle(document.querySelector(".okButton"));
  mouseMovementSingle(document.querySelector("#submit"));
}
// Validation
function validateTheForm() {
  let submitted = true;
  if (!validateName(document.getElementById("firstName").value)) {
    document.getElementById("firstName").style.borderBottom =
      "2px solid rgba(255, 0, 0, 0.8)";
    submitted = false;
  } else {
    document.getElementById("firstName").style.borderBottom = "none";
  }
  if (!validateName(document.getElementById("lastName").value)) {
    document.getElementById("lastName").style.borderBottom =
      "2px solid rgba(255, 0, 0, 0.8)";
    submitted = false;
  } else {
    document.getElementById("lastName").style.borderBottom = "none";
  }
  if (!validateEmail(document.getElementById("email").value)) {
    document.getElementById("email").style.borderBottom =
      "2px solid rgba(255, 0, 0, 0.8)";
    submitted = false;
  } else {
    document.getElementById("email").style.borderBottom = "none";
  }
  if (!validatePhone(document.getElementById("telNum").value)) {
    document.getElementById("telNum").style.borderBottom =
      "2px solid rgba(255, 0, 0, 0.8)";
    submitted = false;
  } else {
    document.getElementById("telNum").style.borderBottom = "none";
  }
  if (document.getElementById("reason").value === "0") {
    document.getElementById("reason").style.borderBottom =
      "2px solid rgba(255, 0, 0, 0.8)";
    submitted = false;
  } else {
    document.getElementById("reason").style.borderBottom = "none";
  }
  if (submitted) {
    sendEmail();
  }
}

function clearForm() {
  document.getElementById("firstName").value = "";
  document.getElementById("lastName").value = "";
  document.getElementById("email").value = "";
  document.getElementById("telNum").value = "";
  document.getElementById("reason").value = "0";
  document.getElementById("reasonBox").value = "";
}

function displaySent() {
  document.getElementById("popBoxSubmit").style.display = "flex";
}
function displayNotSent() {
  document.getElementById("popBoxCouldnt").style.display = "flex";
}

function sendEmail() {
  let subjectYours =
    document.getElementById("reason").options[
      document.getElementById("reason").selectedIndex
    ].text;
  let emailYours = document.getElementById("email").value;
  let nameYours =
    document.getElementById("firstName").value +
    " " +
    document.getElementById("lastName").value;
  let bodyYours =
    "This email was sent by " +
    document.getElementById("firstName").value +
    " " +
    document.getElementById("lastName").value +
    " who's number is " +
    document.getElementById("telNum").value +
    " and message is: \n" +
    document.getElementById("reasonBox").value;

  const serviceId = "service_ebif0p7";
  const templateId = "template_x5zw56p";
  var params = {
    name: nameYours,
    subject: subjectYours,
    email: emailYours,
    message: bodyYours,
  };
  emailjs
    .send(serviceId, templateId, params)
    .then(function () {
      clearForm();
      displaySent();
    })
    .catch(displayNotSent);
}

document.getElementById("okBtn").addEventListener("click", () => {
  document.getElementById("okBtn").style.boxShadow = "inset 2px 2px 2px black";
  document.getElementById("popBoxSubmit").classList.add("opaceBox");
  setTimeout(() => {
    document.getElementById("okBtn").style.boxShadow = "2px 2px 2px black";
    document.getElementById("popBoxSubmit").style.display = "none";
  }, 200);
});

document.getElementById("okBtn2").addEventListener("click", () => {
  document.getElementById("okBtn2").style.boxShadow = "inset 2px 2px 2px black";
  document.getElementById("popBoxCouldnt").classList.add("opaceBox");
  setTimeout(() => {
    document.getElementById("okBtn2").style.boxShadow = "2px 2px 2px black";
    document.getElementById("popBoxCouldnt").style.display = "none";
  }, 200);
});

function validateEmail(email) {
  email = email.trim();
  const pattern = /^[A-Za-z0-9_.]+@[A-Za-z0-9-.]+\.[A-Za-z]{2,3}$/;
  if (!pattern.test(email)) return false;
  if (email.indexOf("@") > 66 || email.indexOf("@") < 4) return false;
  for (let i = 0; i < email.length; i++) {
    if (
      (email[i] == "." && email[i + 1] == ".") ||
      (email[i] == "_" && email[i + 1] == "_")
    ) {
      return false;
    }
  }
  return true;
}
// Only Nepali Number for simplicity
function validatePhone(phoneNumber) {
  phoneNumber = phoneNumber.trim();
  const pattern = /^\+?[0-9]{10}$/;
  if (!pattern.test(phoneNumber)) return false;
  let numberCodes = [
    "980",
    "981",
    "982",
    "984",
    "985",
    "986",
    "974",
    "975",
    "961",
    "962",
    "988",
    "972",
    "963",
  ];
  if (phoneNumber.slice(0, 1) === "+") {
    for (let i = 0; i < numberCodes.length; i++) {
      if (numberCodes[i] == phoneNumber.slice(1, 4)) {
        return true;
      }
    }
  } else {
    for (let i = 0; i < numberCodes.length; i++) {
      if (numberCodes[i] == phoneNumber.slice(0, 3)) {
        return true;
      }
    }
  }
  return false;
}

function validateName(name) {
  const pattern = /^[A-Za-z]+$/;
  if (!pattern.test(name.trim())) return false;
  if (
    name.trim().indexOf(" ") != -1 ||
    name.trim().length < 2 ||
    name.trim().length > 50
  ) {
    return false;
  }
  return true;
}

// Bottom Particle
const canvas2 = document.getElementById("canvas2");
const context2 = canvas2.getContext("2d");
canvas2.width = window.innerWidth;
canvas2.height = 60;
const bottomParticle = [];

class Boxes {
  constructor() {
    this.size = Math.floor(Math.random() * 6) + 10;
    this.position = new vector2(
      Math.random() * canvas2.width,
      canvas2.height / (Math.random() * 1.5) + 1 - 5
    );
  }
  render(ctx) {
    ctx.save();
    ctx.fillStyle = "hsl(" + hue + ", 60%, 50%)";
    ctx.shadowColor = "hsl(" + hue + ", 60%, 50%)";
    ctx.shadowBlur = 20;
    ctx.beginPath();
    ctx.arc(
      this.position.x + Math.random() * 2 - 4,
      this.position.y + Math.random() * 2 - 4,
      this.size,
      0,
      2 * Math.PI
    );
    ctx.fill();
    ctx.restore();
  }
}

function spawnBottomParticle() {
  bottomParticle.splice(1, bottomParticle.length);
  for (let i = 0; i < 300; i++) {
    bottomParticle.push(new Boxes());
  }
}

function resizeCanvas2() {
  canvas2.width = window.innerWidth;
  canvas2.height = 60;
  spawnBottomParticle();
}
function animateCanvas2() {
  context2.clearRect(0, 0, canvas2.width, canvas.height);
  bottomParticle.forEach((e) => {
    e.render(context2);
  });
  setTimeout(() => {
    requestAnimationFrame(animateCanvas2);
  }, 100);
}
spawnBottomParticle();
animateCanvas2();
