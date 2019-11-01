class Player {
  constructor(ctx, width, height, image, gameHeight, keys) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.posX = 50;
    this.posY = gameHeight * 0.98 - this.height ;
    this.posY0 = gameHeight * 0.98 - this.height ;
    this.vy = 1;
    this.gravity = 0.4;

    this.frames = 3;
    this.framesIndex = 0;

    this.keys = keys;
    this.setListeners()
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image, 
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.posX, 
      this.posY, 
      this.width, 
      this.height
      )

      this.animate(framesCounter)
  }

  move() {
    if(this.posY <= this.posY0) {
      this.posY += this.vy;
      this.vy += this.gravity;
    } else {
      this.vy = 1;
      this.posY = this.posY0;
    }
  }

  animate(framesCounter) {
    if(framesCounter % 10 === 0) {
      this.framesIndex++;

      if(this.framesIndex > 2) this.framesIndex = 0;
    }
  }

  setListeners() {
    document.addEventListener('keydown', (e) => {
      switch(e.keyCode) {
        case this.keys.TOP_KEY:
          if(this.posY >= this.posY0) {
            this.posY -= this.vy;
            this.vy -= 10;
          }
          break;
      }
    })
  }
}