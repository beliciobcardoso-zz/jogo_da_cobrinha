let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let direction = "right";
let box = 16;
let game;
let snake = [];
snake[0] = {
    x: 20 * box,
    y: 20 * box
};

let apple = {
    x: Math.floor(Math.random() * 39 + 1) * box,
    y: Math.floor(Math.random() * 39 + 1) * box
};

function background() {
    context.fillStyle = "#c3c4ff";
    context.fillRect(0, 0, 40 * box, 40 * box);
};

function createSnake() {
    for (let index = 0; index < snake.length; index++) {
        context.fillStyle = "black";
        context.fillRect(snake[index].x, snake[index].y, box, box);
    }
};

function createApple() {
    context.fillStyle = "red";
    context.fillRect(apple.x, apple.y, box, box);
};

function moveSnake() {
    if (snake[0].x > 39 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 * box && direction == "left") snake[0].x = 39 * box;
    if (snake[0].y > 39 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 * box && direction == "up") snake[0].y = 39 * box;

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "down") snakeY += box;
    if (direction == "up") snakeY -= box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    if (snakeX != apple.x || snakeY != apple.y) {
        snake.pop();
    }

    else {
        apple.x = Math.floor(Math.random() * 39 + 1) * box;
        apple.y = Math.floor(Math.random() * 39 + 1) * box;
    }

};

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") direction = "left";
    if (event.keyCode == 38 && direction != "down") direction = "up";
    if (event.keyCode == 39 && direction != "left") direction = "right";
    if (event.keyCode == 40 && direction != "up") direction = "down";
};

function keyboard(move) {
    if (move == 37 && direction != "right") direction = "left";
    if (move == 38 && direction != "down") direction = "up";
    if (move == 39 && direction != "left") direction = "right";
    if (move == 40 && direction != "up") direction = "down";
}

function modal_gameStart() {
    document.querySelector('.modal_gameStart').classList.toggle('active');
};

function modal_Gameover() {
    location.reload(true);
};

function gameover() {
    for (let index = 1; index < snake.length; index++) {
        if (snake[0].x == snake[index].x && snake[0].y == snake[index].y) {
            clearInterval(game);
            document.querySelector('.modal_Gameover').classList.toggle('active');
        }
    }
};

function initGame() {

    background();
    createSnake();
    createApple();
    moveSnake();
    gameover();

    document.getElementById("points").innerHTML = "Pontos: " + (snake.length - 1);
};

function startGame() {
    game = setInterval(initGame, 300);
    modal_gameStart();
};
