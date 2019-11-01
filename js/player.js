class Player {
  constructor(ctx, width, height, image, gameHeight) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.posX = 50;
    this.posY = gameHeight * 0.98 - this.height ;

    this.frames = 3;
    this.framesIndex = 0;
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

  animate(framesCounter) {
    if(framesCounter % 10 === 0) {
      this.framesIndex++;

      if(this.framesIndex > 2) this.framesIndex = 0;
    }
  }
}