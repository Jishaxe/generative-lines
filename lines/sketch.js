let currentPos = {x: 0, y: 0}

let maxIterations = 50
let iterations = maxIterations

let width = 500
let height = 500

let padding = 10

let thiccBoye = false

let recording = true

let c
function setup() {
  // put setup code here
  c = createCanvas(width, height)
  capture = createCapture(VIDEO);
  capture.size(width, height);
  capture.hide();
  setupGif()

  setupGif();
  background("#1e1e1e")
  stroke("#dddddd")

  fill(255)
  text('JSHXE', width - 45, height - 10)
}

function mousePressed() {
  recording = false
  gif.render();
}

function setupGif() {
  gif = new GIF({
    workers: 4,
    quality: 80
  });

  gif.on('finished', function(blob) {
    window.open(URL.createObjectURL(blob));
    setupGif();
  });
}

function draw() {
  // put drawing code here
  if (!recording) return
  
  if (iterations > 0) {
    strokeWeight(1)
    stroke(255, 255, 255, 255 * (iterations/maxIterations))
    iterations--

    if (thiccBoye) {
      strokeWeight(3)
    }

    let xdif = random(-50, 60)
    let ydif = random(-50, 60)

    let nextPos = {x: currentPos.x + xdif, y: currentPos.y + ydif}

    if (nextPos.x > width - padding || nextPos.x < 0 + padding || nextPos.y > height - padding || nextPos.y < 0 + padding) return

    line(currentPos.x, currentPos.y, nextPos.x, nextPos.y)
    ellipse(nextPos.x, nextPos.y, 2, 2)

    thiccBoye = false

    if (random(10) > 9) thiccBoye = true
    if (random(50) > 40) {
      line(currentPos.x, currentPos.y, currentPos.x + ydif, currentPos.y + -xdif)
      ellipse(currentPos.x + ydif, currentPos.y + -xdif, 5, 5)
    }

    currentPos = nextPos
  } else {
    iterations = maxIterations
    currentPos = {x: 0, y: 0}
  }

  if (recording && frameCount % 10 == 0) {
    gif.addFrame(c.elt, {delay: 1, copy: true});
  }
}