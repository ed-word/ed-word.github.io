const can = document.getElementsByClassName("can");
const canvas = can[0];
                                        
const context = canvas.getContext('2d');
let windowWidth = canvas.width = window.innerWidth;
let windowHeight = canvas.height = window.innerHeight;
canvas.id = 'canvas';


function getScaledNumber(rawSize, width, height) {
    var baseWidth = 1366;
    var baseHeight = 678;
    var heightRatio = rawSize / baseHeight;
    var widthRatio = rawSize / baseWidth;

    if (width)
      var scaledSize = canvas.width * widthRatio;
    else if (height)
      var scaledSize = canvas.height * heightRatio;

    return scaledSize; 
}


function loadText() {
  context.fillStyle = 'white';

  var fontSize = getScaledNumber(100, true, false);
  context.font = (fontSize|0) + 'px Bangers';
  var textWidth = getScaledNumber(320, true, false);
  var textHeight = getScaledNumber(170, false, true);
  context.fillText("Edward Gonsalves",textWidth,textHeight);

  var fontSize = getScaledNumber(40, true, false);
  context.font = (fontSize|0) + 'px Bangers';
  var textWidth = getScaledNumber(750, true, false);
  var textHeight = getScaledNumber(205, false, true);
  context.fillText("Curious Programmer",textWidth,textHeight);  
}

window.onload = function() {
  loadText();
};


window.onresize = () => {
            windowWidth = canvas.width = window.innerWidth;
            windowHeight = canvas.height = window.innerHeight;
        };


const numberParticlesStart = 1000;
const particleSpeed = 0.9;
const velocity = 0.5;
const circleWidth = 100;

var particles = [];

const getRandomFloat = (min, max) => (Math.random() * (max - min) + min ); 

function Particle (x, y) 
{
  this.x = x;
  this.y = y;

  this.vel = 
  {
    x : getRandomFloat(0, 20)/100,
    y : getRandomFloat(0, 20)/100,
    min : getRandomFloat(2, 10),
    max : getRandomFloat(10, 100)/10
  }
  this.color = 'rgba(0, 200, 255, 0.05)';    //Color
}


Particle.prototype.render = function()
{
  context.beginPath();
  context.fillStyle = this.color;
  context.arc(this.x, this.y, 1, 0, Math.PI * 2);
  context.fill();
};

Particle.prototype.update = function()
{
    const forceDirection = {
        x: getRandomFloat(-1, 1),
        y: getRandomFloat(-1, 1),
    };

  if (Math.abs(this.vel.x + forceDirection.x) < this.vel.max) 
    this.vel.x += forceDirection.x;
  if (Math.abs(this.vel.y + forceDirection.y) < this.vel.max)
    this.vel.y += forceDirection.y;
  
  this.x += this.vel.x * particleSpeed;
  this.y += this.vel.y * particleSpeed;

  if (Math.abs(this.vel.x) > this.vel.min)
    this.vel.x *= velocity;
  if (Math.abs(this.vel.y) > this.vel.min)
    this.vel.y *= velocity;

   this.testBorder();
};

Particle.prototype.testBorder = function()
{
  if (this.x > windowWidth) 
    this.setPosition(this.x, 'x');
  
  else if (this.x < 0) 
    this.setPosition(windowWidth, 'x');
  
  if (this.y > windowHeight)
    this.setPosition(this.y, 'y');
 
  else if (this.y < 0)
    this.setPosition(windowHeight, 'y');
};

Particle.prototype.setPosition = function(pos, coor) 
{
  if (coor === 'x')
    this.x = pos;
  else if (coor === 'y')
    this.y = pos;
};




function loop() 
{
  var i;
  const length = particles.length;
  for (i = 0; i < length; i++)
  {
    particles[i].update();
    particles[i].render();
  }
  requestAnimationFrame(loop);
}

function init() 
{
  let i;
  for (i = 0; i < numberParticlesStart; i++)
  {
    const angle = Math.random() * 360;
      particles.push(new Particle(
      windowWidth * 0.5 + (Math.cos(angle) * circleWidth),
      windowHeight * 0.5 - (Math.sin(angle) * circleWidth),));
  }
}
init();


window.addEventListener('click', () => {
  particles = [];
  context.clearRect(0,0, windowWidth, windowHeight);  

  loadText();

  init();
});

loop();