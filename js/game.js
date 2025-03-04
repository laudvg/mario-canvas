const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  playerKeys: {
    TOP_KEY: 38,
    SPACE: 32
  },
  score: 0,

  init: function() {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  },

  start: function() {
    this.reset()
    this.interval = setInterval(() => {
      this.framesCounter++;

      this.clear();
      this.drawAll();
      this.moveAll();

      this.clearObstacles()
      if(this.framesCounter % 70 === 0) this.generateObstacles();
      if(this.framesCounter % 100 === 0) this.score++;
      if(this.isCollision()) this.gameOver();
      if(this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000/this.fps)
  },

  reset: function() {
    this.background = new Background(this.ctx, this.width, this.height);
    this.player = new Player(this.ctx, 50, 150, 'img/player.png', this.width,this.height, this.playerKeys);
    this.obstacles = [];
    ScoreBoard.init(this.ctx, this.score);
  },

  clear: function() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function() {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.obstacles.forEach(obstacle => obstacle.draw());
    ScoreBoard.draw(this.score)
  },

  moveAll: function() {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(obstacle => obstacle.move());
  },

  generateObstacles: function() {
    this.obstacles.push(new Obstacle(this.ctx, 15, 45, this.width, this.height))
  },

  gameOver: function() {
    clearInterval(this.interval);
  },

  isCollision: function() {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY ))
  },

  clearObstacles: function() {
    this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= 0));
  }
}