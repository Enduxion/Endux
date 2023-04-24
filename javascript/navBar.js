const logoImage = document.getElementById("logoImage");
logoImage.onmouseover = function () {
  logoImage.style.transform = "rotateY(180deg)";
  logoImage.style.transition = "1s";
  setTimeout(function () {
    logoImage.style.transform = "";
  }, 1000);
};

let navBarId = document.getElementById("navBar");
let scrolledY = false;
document.onscroll = () => {
  if (window.scrollY > 0 && !scrolledY) {
    scrolledY = true;
    navBarId.id = "navBarAfterMoved";
    document.getElementById("logoImage").src = "../image/logo2.png";
  } else if (window.scrollY == 0 && scrolledY) {
    scrolledY = false;
    navBarId.id = "navBar";
    document.getElementById("logoImage").src = "../image/logo.png";
  }
};

window.onload = function () {
  let navBarElements = document
    .getElementById("navBarLinks")
    .getElementsByTagName("a");
  for (let i = 1; i <= navBarElements.length; i++) {
    setTimeout(() => {
      navBarElements[i - 1].classList.remove("comeSwap");
    }, (i + 1) * 100);
  }
  const aLinks = document.querySelector("#navBarLinks").querySelectorAll("a");
  mouseMovementSingle(document.getElementById("logoLink"));
  mouseMovement(aLinks);
};
