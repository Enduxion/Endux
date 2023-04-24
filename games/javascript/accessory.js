const BOX_MARGIN = 2;
function vector2(x, y) {
  this.x = x;
  this.y = y;
}
function intersection(box1, box2) {
  return !(
    box2.position.x > box1.position.x + box1.size.x - BOX_MARGIN ||
    box2.position.x + box2.size.x - BOX_MARGIN < box1.position.x ||
    box2.position.y > box1.position.y + box1.size.y - BOX_MARGIN ||
    box2.position.y + box2.size.y - BOX_MARGIN < box1.position.y
  );
}
function scoreRender(ctx) {
  let stringScore = "Score: " + score;
  ctx.font = "30px KoHo";
  ctx.fillStyle = "white";
  ctx.fillText(stringScore, canvas.width - 140, 33);
}
