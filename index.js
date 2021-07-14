
var c = document.getElementById("dashboard");
var ctx = c.getContext("2d");
var snake_pos = [{ x: 100, y: 100 }, { x: 105, y: 100 }, { x: 110, y: 100 }, { x: 115, y: 100 }]; // cordinates
var dx = 5; // moving_cordinate x
var dy = 0 // moving_cordinate y
var foodX;
var foodY;
var v;
var score = 0;

function draw(snake_pos) {

    for (let i = 0; i < snake_pos.length; i++) 
    {
        ctx.fillStyle = "black";
        ctx.fillRect(snake_pos[i].x, snake_pos[i].y, 5, 5);
       
    }
}

function move(snake_pos, dy, dx) {

    let head = { x: snake_pos[0].x - dx, y: snake_pos[0].y - dy };  // create head
    snake_pos.unshift(head);
    snake_pos.pop();
}

function clearCanvas() {
    let len = snake_pos.length - 1;
    ctx.clearRect(snake_pos[len].x, snake_pos[len].y, 5, 5); //change some

}

function direction() // key function //  controls
{
    document.addEventListener("keydown", function (event) {
        let key = event.key;

        if (key == "ArrowUp" && dy >= 0) {
           
            dx = 0;
            dy = 5;

        }

        if (key == "ArrowLeft" && dx >= 0) {
            dx = 5;
            dy = 0;
        }


        if (key == "ArrowRight" && dx <= 0) {
            
            dx = -5;
            dy = 0;
        }


        if (key == "ArrowDown" && dy <= 0) {
           
            dx = 0;
            dy = -5;
        }
        if (key == " " ) {

            clearInterval(v);
        }
        if (key == "Enter") {
          
            v = setInterval(main, 100);
        }
    });

}

function food() {

    foodX = Math.round((Math.random() * (100 - 0) + 0) / 10) * 10; //Generate random location X // study this //
    foodY = Math.round((Math.random() * (100 - 0) + 0) / 10) * 10; //Generate random location Y
    food_loc_check(foodX, foodY);
    ctx.clearRect(foodX, foodY, 5, 5);
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(foodX, foodY, 5, 5); // you can change food size // the food is size is 5X5

}

function food_loc_check() // for check the food shoud not be in same location as snake 
{

    for (var i = 0; i < snake_pos.length; i++) {
        if (snake_pos[i].x == foodX && snake_pos[i].y == foodY) {
            food();
        }

    }

}

function eat() {

    let snake_cord_x = snake_pos[0].x;
    let snake_cord_y = snake_pos[0].y;

    if ((snake_cord_x == foodX) && (snake_cord_y == foodY)) // check trhe food cordinates
    {
        //  console.log("eat");
        score = score + 10;
        document.getElementsByClassName("score")[0].innerHTML = `Score :${score}`;
        let body_inc = { x: snake_pos[0].x, y: snake_pos[0].y }; //Create New Element // 
        snake_pos.push(body_inc); // push Elments
        food();


    }
}

function gameover() {
    for (var i = 3; i < snake_pos.length; i++)       //(snake_pos[0].x>300-5)||snake_pos[0].y>145)
    {
        if ((snake_pos[0].x == snake_pos[i].x) && (snake_pos[0].y == snake_pos[i].y)) {
            document.getElementsByClassName("Gameover")[0].innerHTML = "Game Over" + " " +"Press F5 TO Play Agian";
            console.log("GameOver");
            clearInterval(v);

        }

        if ((snake_pos[0].x < 0) || (snake_pos[0].y < 0) || (snake_pos[0].x > 300 - 5) || (snake_pos[0].y > 145)) {
            document.getElementsByClassName("Gameover")[0].innerHTML ="Game Over" + "<br>" +"Press F5 TO Play Agian";
            clearInterval(v);
        }

    }
}



function main() {
    clearCanvas(); // clear canvas
    move(snake_pos, dy, dx); // move snake
    draw(snake_pos); // draw snake
    gameover(); //Game Over function to check 
    eat(); // eat function
  
    
}

v = setInterval(main, 100);
direction();

food();



