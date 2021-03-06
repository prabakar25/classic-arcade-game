var score = 0;
var lives = 3;

// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //reset position of enemy to move across again
    if (this.x > 550) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 1000);
    }

    this.checkCollision(); // Check for collision
};

Enemy.prototype.checkCollision = function () {
    if (player.x < this.x + 60 && player.x + 37 > this.x &&
        player.y < this.y + 25 && 30 + player.y > this.y) {
        player.x = 200;
        player.y = 380;
        this.reset();// reset the game when player collides with enemy
    }
};

Enemy.prototype.reset = function() {
    if(lives > 1) {
        lives--; //reduce the life by one 
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + lives;
    }
    else {
        lives = 3; // reset the life to initial value
        score = 0; // reset score to initial value
        document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + score;
        document.getElementsByClassName('lives')[0].innerHTML = 'Lives: ' + lives;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
    // Prevent player from moving beyond canvas wall boundaries
    if (this.x > 400) {
        this.x = 400;
    }
    
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas
    if (this.y < 0) {
        this.x = 200;
        this.y = 380;
        this.score();
    }

};

// to update the score when player reached water
Player.prototype.score = function () {
    score += 1;
    document.getElementsByClassName('score')[0].innerHTML = 'Score: ' + score;
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(movement) {
    switch (movement) {
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

// Position "y" where the enemies will are created
var enemyPosition = [60, 140, 220];
var player = new Player(200, 380, 50);
var enemy;

enemyPosition.forEach(function(position) {
        var num = 100;
        enemy = new Enemy(0, position, num + Math.floor(Math.random() * num));
        allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
