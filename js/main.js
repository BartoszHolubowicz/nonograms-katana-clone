var gameCanvas;
var fontRoboto;
var scalingVector, tempOffsetVector, offsetVector;
var drag = {
  x1: 0, y1: 0, x2: 0, y2: 0
}

// utility functions
function updateScalingVector(val = {x: 0, y: 0}) {
  const {scale} = gameCanvas.options;
  gameCanvas.options.pos = {
    x: scalingVector.x + val.x - gameCanvas.width / 2,
    y: scalingVector.y + val.y - gameCanvas.height / 2
  };
}

// p5 functions
function preload() {
  gameCanvas = new Canvas(8, 8, darkTheme);
  scalingVector = createVector(windowWidth / 2, windowHeight / 2);
  tempOffsetVector = createVector(0, 0);
  offsetVector = createVector(0, 0);
  tempScalingVector = scalingVector.copy();
  updateScalingVector();
  
  gameCanvas.canvasPreload();
}
function setup() {
  createCanvas(windowWidth, windowHeight);
  
  gameCanvas.canvasSetup();
}
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateScalingVector(p5.Vector.add(tempOffsetVector, offsetVector));
}
function mouseWheel(evt) {
  if (evt.delta > 0) {
    gameCanvas.options.scale *= 0.9;
  }
  else {
    gameCanvas.options.scale *= 1.1;
  }
  updateScalingVector(p5.Vector.add(tempOffsetVector, offsetVector));
}
function touchStarted() {
  drag = { ...drag, x1: mouseX, y1: mouseY, x2: mouseX, y2: mouseY };
  return false;
}
function touchMoved() {
  tempOffsetVector.set(mouseX - drag.x1, mouseY - drag.y1);
  updateScalingVector(p5.Vector.add(tempOffsetVector, offsetVector));
  return false;
}
function touchEnded(evt) {
  if (tempOffsetVector.mag() <= 3 && gameCanvas.mouseInsideBoard)
    gameCanvas.placeMark(mouseX, mouseY, evt.button ? evt.button + 1 : 1);
  offsetVector.add(tempOffsetVector);
  tempOffsetVector.set(0, 0);
  updateScalingVector(offsetVector);
  return false;
}
function draw() {
  gameCanvas.drawFrame();
}