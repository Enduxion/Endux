// Check for intersection here
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target;
      setTimeout(() => {
        if (
          target.classList.contains("popBox") ||
          target.classList.contains("barContainer")
        ) {
          target.classList.remove("slideLeft100");
        } else if (target.id == "myPhoto") {
          target.classList.remove("slideLeft50");
        } else {
          target.classList.remove("hidden");
        }
      }, 50);
    } else {
      const target = entry.target;
      setTimeout(() => {
        if (
          target.classList.contains("popBox") ||
          target.classList.contains("barContainer")
        ) {
          target.classList.add("slideLeft100");
        } else if (target.id == "myPhoto") {
          target.classList.add("slideLeft50");
        } else {
          target.classList.add("hidden");
        }
      }, 50);
    }
  });
});
// All declaration for checking
const barContainer = document.querySelectorAll(".barContainer");
const bar = document.querySelectorAll(".bar");
const popBox = document.querySelectorAll(".popBox");
const myPhoto = document.querySelector("#myPhoto");
// Check from here
barContainer.forEach((e) => observer.observe(e));
bar.forEach((e) => observer.observe(e));
popBox.forEach((e) => observer.observe(e));
observer.observe(myPhoto);
// For bars
const programmingBarContainer = document.querySelector(
  "#programmingBarContainer"
);
const programmingBars = programmingBarContainer.querySelectorAll(".bar");
const personalityBarContainer = document.querySelector(
  "#personalityBarContainer"
);
const personalityBars = personalityBarContainer.querySelectorAll(".bar");
const softSkillBarContainer = document.querySelector("#softSkillBarContainer");
const softSkillBars = softSkillBarContainer.querySelectorAll(".bar");
const barContainers = document.querySelectorAll(".barContainer");
const programmingPopUp = document.getElementById("programmingPopUp");
const personalityPopUp = document.getElementById("personalityPopUp");
const softSkillPopUp = document.getElementById("softSkillPopUp");
const programmingContent = document.getElementById("programmingContent");
const personalityContent = document.getElementById("personalityContent");
const softSkillContent = document.getElementById("softSkillContent");

// Set the width of the bars based on their data
const setBarWidths = (bars, values) => {
  bars.forEach((bar, index) => {
    const width = values[index] + "%";
    bar.style.setProperty("--bar-width", width);
  });
};

setBarWidths(programmingBars, [90, 75, 60, 55, 60, 80, 30]);
setBarWidths(personalityBars, [83, 94, 67, 88, 94]);
setBarWidths(softSkillBars, [93, 84, 47, 39, 73, 94, 58, 79, 52, 66]);

// Show the appropriate popup when a bar is clicked
barContainers.forEach((barContainer, index) => {
  const popUp = [programmingPopUp, personalityPopUp, softSkillPopUp][index];
  const crossImage = popUp.querySelector(".crossImage");

  barContainer.addEventListener("click", () => {
    popUp.style.display = "flex";
    popUp.classList.remove("hidden");
    setTimeout(() => {
      crossImage.classList.remove("slideFromUp");
    }, 300);
  });
});

// Hide the popup when the user clicks the close button
const hidePopUp = (popUp, content) => {
  const crossImage = popUp.querySelector(".crossImage");

  content.classList.add("slideLeft50");
  popUp.classList.add("hidden");
  crossImage.classList.add("slideFromUp");
  setTimeout(() => {
    popUp.style.display = "none";
    content.classList.remove("slideLeft50");
  }, 400);
};
document.querySelectorAll(".crossImage").forEach((e) => {
  e.addEventListener("click", () => {
    hidePopUp(programmingPopUp, programmingContent);
    hidePopUp(personalityPopUp, personalityContent);
    hidePopUp(softSkillPopUp, softSkillContent);
  });
});
document.addEventListener("scroll", () => {
  document.querySelector("#imageContainer").style.transform =
    "translateY(" + window.pageYOffset / 25 + "%)";
});

{
  mouseCustomClass(document.getElementById("myPhoto"), "growGreyScale");
  mouseMovement(document.querySelectorAll(".barContainer"));
  mouseMovementSingle(document.getElementById("contactHere"));
  mouseMovement(document.querySelectorAll(".crossImage"));
  mouseMovement(document.querySelectorAll(".popUpBoxContainer"));
}
