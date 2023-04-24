const logoSocial = document.querySelectorAll(".socialMediaLogo");
let isAnimationHappening = [false, false, false];
for (let i = 0; i < logoSocial.length; i++) {
  logoSocial[i].onmouseover = function () {
    if (!isAnimationHappening[i]) {
      logoSocial[i].style.animation = "bounce 0.5s linear";
      isAnimationHappening[i] = true;
      setTimeout(() => {
        logoSocial[i].style.color = "";
        logoSocial[i].style.animation = "";
        isAnimationHappening[i] = false;
      }, 500);
    }
  };
}
const titleFootbar = document.querySelectorAll(".title-bottom-letter");
let isAnimationHappening2 = [false, false, false, false, false];
for (let i = 0; i < titleFootbar.length; i++) {
  titleFootbar[i].onmouseover = function () {
    if (!isAnimationHappening2[i]) {
      titleFootbar[i].style.animation = "bounce 0.4s linear";
      isAnimationHappening2[i] = true;
      setTimeout(() => {
        titleFootbar[i].style.animation = "";
        isAnimationHappening2[i] = false;
      }, 400);
    }
  };
}
// When you see footbar, you pull it out
const observer2 = new IntersectionObserver((inputs) => {
  inputs.forEach((input) => {
    if (input.isIntersecting) {
      setTimeout(() => {
        input.target.classList.remove("slide");
      }, 50);
    } else {
      setTimeout(() => {
        input.target.classList.add("slide");
      }, 50);
    }
  });
});
const footerBar = document.querySelector("#footBar");
observer2.observe(footerBar);

{
  mouseMovement(document.querySelectorAll(".socialMediaLogo"));
}
