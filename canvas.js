let canvas = document.querySelector("#canvas");
let ctx = canvas.getContext("2d");

// SECTION - Create snake World
var rows = 20;
var colls = 20;
var cellWidth = canvas.width / colls;
var cellHeight = canvas.height / rows;
let snake = [{ x: rows/2, y: colls/2 }]; //NOTE - Startpos-snake
let food = { x: 5, y: 5 }; //NOTE - Pos-Food
let direction = "LEFT";
let foodCollected = false;

setInterval(gameLoop, 500);
document.addEventListener("keydown", keyDown);

draw();
placeFood();



//SECTION DRAW - Spielfeld, Snake, Food
function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "white";

    // SECTION - JSON snake
    snake.forEach((part) => add(part.x, part.y));
    ctx.fillStyle = "lightgreen";
    add(food.x, food.y);
    requestAnimationFrame(draw);
}



//LINK - add
function add(x, y) {
    ctx.fillRect(x * cellWidth, y * cellHeight, cellWidth - 1, cellHeight - 1);
}



//SECTION - Snake + 1
function shiftSnake() {
    for(let i = snake.length -1; i > 0; i--) {
        const part = snake[i];
        const lastPart = snake[i - 1];
        part.x = lastPart.x;
        part.y = lastPart.y;

    }
}

//NOTE - alle ZeitIntervalX x und y vom snake berechnen
function gameLoop() {
    shiftSnake();
    if (foodCollected) {
        snake = [{
            x: snake[0].x,
            y: snake[0].y
        }, ...snake];
        foodCollected = false;

    }
    if (direction == "LEFT") {
        snake[0].x--;
    }
    if (direction == "RIGHT") {
        snake[0].x++;
    }
    if (direction == "UP") {
        snake[0].y++;
    }
    if (direction == "DOWN") {
        snake[0].y--;
    }
    //NOTE - New pos of food if snake = food
    if (snake[0].x == food.x && snake[0].y == food.y) {
        foodCollected = true;
        placeFood();

    }
}

//SECTION - keyEvent
function keyDown(e) {
    if (e.keyCode == 37) {
        direction = "LEFT";
    }
    if (e.keyCode == 39) {
        direction = "RIGHT";
    }
    if (e.keyCode == 38) {
        direction = "DOWN";
    }
    if (e.keyCode == 40) {
        direction = "UP";
    }
}

// SECTION FoodPos randomizer
function placeFood() {
    let randomX = Math.floor(Math.random() * colls);
    let randomY = Math.floor(Math.random() * rows);
    food = { x: randomX, y: randomY };
}

