const clouds = document.querySelector(".clouds");
const skyWidth = document.querySelector(".sky");
const musicBtn = document.getElementById("musicBtn");
let cloudsArr = [];
let audio = new Audio("8bit.mp3");
let musicIsPlaying = false;

class Cloud {
  constructor(image) {
    (this.image = image),
      (this.locationX = this.setLocationX(80, 140)),
      (this.locationY = this.setLocationY(0, 80)),
      (this.velocity = this.velocityFun(1, 3)),
      (this.scale = this.scaleFun(2, 4)),
      (this.imageSrc = `./images/cloud-${this.setImgSrc(1, 6)}.png`);
  }
  getRndomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  setLocationX(min, max) {
    return (this.image.style.left = this.getRndomInteger(min, max));
  }
  setLocationY(min, max) {
    return (this.image.style.top = this.getRndomInteger(min, max));
  }
  velocityFun(min, max) {
    return this.getRndomInteger(min, max);
  }
  scaleFun(min, max) {
    return (this.image.style.transform = `scale(${this.getRndomInteger(
      min,
      max
    )})`);
  }
  setImgSrc(min, max) {
    return this.getRndomInteger(min, max);
  }
}

function createClouds() {
  for (let i = 0; i < 20; i += 1) {
    const cloudImage = document.createElement("img");
    cloudImage.classList.add("cloud");
    const cloud = new Cloud(cloudImage);
    cloudImage.src = cloud.imageSrc;
    cloudsArr.push(cloud);
    clouds.append(cloudImage);
  }
  draw();
}

function update() {
  const cloudsRect = clouds.getBoundingClientRect();
  cloudsArr.forEach((cloud) => {
    const cloudRect = cloud.image.getBoundingClientRect();
    if (cloudRect.left + cloudRect.width <= cloudsRect.left) {
      cloud.locationX = cloud.setLocationX(100, 140);
      cloud.locationY = cloud.setLocationY(0, 80);
      cloud.scale = cloud.scaleFun(2, 4);
      cloud.velocity = cloud.velocityFun(1, 3);
    } else {
      cloud.locationX -= cloud.velocity;
    }
  });
  draw();
}

function draw() {
  cloudsArr.forEach((cloud) => {
    cloud.image.style.left = cloud.locationX + "%";
    cloud.image.style.top = cloud.locationY + "%";
    cloud.image.style.opacity = cloud.locationY + 50 + "%";
  });
}

musicBtn.addEventListener("click", () => {
  if (!musicIsPlaying) {
    audio.volume = 0.01;
    audio.play();
    musicBtn.innerText = "PAUSE MUSIC";
    musicIsPlaying = true;
  } else {
    audio.pause();
    musicBtn.innerText = "PLAY MUSIC";
    musicIsPlaying = false;
  }
});

createClouds();
setInterval(update, 800);
