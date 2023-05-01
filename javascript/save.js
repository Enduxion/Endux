document.addEventListener("DOMContentLoaded", () => {
  let hash = window.location.hash;
  let codeDownloadTitle = document.getElementById("codeDownloadTitle");
  let projectDownloadTitle = document.getElementById("projectDownloadTitle");
  let aLinkCD = document.getElementById("codeDownload");
  let aLinkPD = document.getElementById("projectDownload");
  hash = hash.toUpperCase();
  if (hash === "#SNAKE") {
    codeDownloadTitle.innerText = "Code for the snake game";
    projectDownloadTitle.innerText = "Snake Game";
    aLinkPD.href = "../downloads/snakeGame.zip";
    aLinkCD.href = "../downloads/SnakeCode.zip";
  } else if (hash === "#SHOOTER") {
    codeDownloadTitle.innerText = "Code for the shooter game";
    projectDownloadTitle.innerText = "Shooter Game";
    aLinkPD.href = "../downloads/space.zip";
    aLinkCD.href = "../downloads/SpaceCode.zip";
  } else if (hash === "#SORT") {
    codeDownloadTitle.innerText = "Code for the visual sorting algorithm";
    projectDownloadTitle.innerText = "Sorting Algorithm";
    aLinkPD.href = "../downloads/sort.zip";
    aLinkCD.href = "../downloads/SortCode.zip";
  } else if (hash === "#SGT") {
    codeDownloadTitle.innerText = "Code for the SGT game";
    projectDownloadTitle.innerText = "SGT game";
    aLinkPD.href = "../downloads/SGT.zip";
    aLinkCD.href = "../downloads/SGTCode.zip";
  } else if (hash === "#AD4") {
    codeDownloadTitle.innerText = "Code for the Admin 4 project";
    projectDownloadTitle.innerText = "Admin 4";
    aLinkPD.href = "../downloads/Admin4.zip";
    aLinkCD.href = "../downloads/Admin4Code.zip";
  } else if (hash === "#PROJMOT") {
    codeDownloadTitle.innerText = "Code for the projectile motion project";
    projectDownloadTitle.innerText = "Projectile Motion";
    aLinkPD.href = "../downloads/ProjMot.zip";
    aLinkCD.href = "../downloads/ProjMotCode.zip";
  } else if (hash === "#CHESS") {
    codeDownloadTitle.innerText = "Code for the chess game";
    projectDownloadTitle.innerText = "Chess Game";
    aLinkPD.href = "../downloads/chessGame.zip";
    aLinkCD.href = "../downloads/chessCode.zip";
  } else {
    codeDownloadTitle.innerText = "Code for the nothing";
    projectDownloadTitle.innerText = "Nothing here";
  }
});
