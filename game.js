const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 400;

const player = {
    x: 50,
    y: canvas.height - 70,
    width: 50,
    height: 50,
    color: 'blue',
    dy: 0,
    gravity: 1,
    jump: -15,
    grounded: true
};

const obstacles = [];
const obstacleWidth = 50;
const obstacleHeight = 50;
const obstacleSpeed = 5;
let frameCount = 0;

function drawPlayer() {
    ctx.fillStyle = player.color;
    ctx.fillRect(player.x, player.y, player.width, player.height);
}

function createObstacle() {
    const obstacle = {
        x: canvas.width,
        y: canvas.height - obstacleHeight,
        width: obstacleWidth,
        height: obstacleHeight,
        color: 'red'
    };
    obstacles.push(obstacle);
}

function drawObstacles() {
    ctx.fillStyle = 'red';
    obstacles.forEach(obstacle => {
        ctx.fillRect(obstacle.x, obstacle.y, obstacle.width, obstacle.height);
        obstacle.x -= obstacleSpeed;
    });
    obstacles = obstacles.filter(obstacle => obstacle.x + obstacle.width > 0);
}

function checkCollision() {
    for (let obstacle of obstacles) {
        if (player.x < obstacle.x + obstacle.width &&
            player.x + player.width > obstacle.x &&
            player.y < obstacle.y + obstacle.height &&
            player.y + player.height > obstacle.y) {
            return true;
        }
    }
    return false;
}

function updatePlayer() {
    if (!player.grounded) {
        player.dy += player.gravity;
        player.y += player.dy;

        if (player.y + player.height > canvas.height) {
            player.y = canvas.height - player.height;
            player.dy = 0;
            player.grounded = true;
        }
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawPlayer();
    drawObstacles();
    updatePlayer();

    if (checkCollision()) {
        alert("Game Over!");
        document.location.reload();
    }

    frameCount++;
    if (frameCount % 120 === 0) {
        createObstacle();
    }

    requestAnimationFrame(gameLoop);
}

window.addEventListener('keydown', e => {
    if (e.code === 'Space' && player.grounded) {
        player.dy = player.jump;
        player.grounded = false;
    }
});

gameLoop();