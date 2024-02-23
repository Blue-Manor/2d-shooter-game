var player = document.querySelector("#player");
var y = window.innerHeight / 2;
var x = window.innerWidth / 2;
var speed = 8;
var up = false;
var down = false;
var left = false;
var right = false;
var bulletspawn;
var mousedown = false;
var score = 0; // Initialize score variable
var makeitHard = 3

// Create a score display element
var scoreDisplay = document.createElement("div");
scoreDisplay.className = "score-display";
scoreDisplay.style.position = "absolute";
scoreDisplay.style.top = "10px"; // Adjust top position
scoreDisplay.style.left = "10px"; // Adjust left position
scoreDisplay.textContent = "Score: " + score;
document.body.appendChild(scoreDisplay); // Append score display element to the document

function update() {
    player.style.position = "absolute"; // Set position to absolute
    player.style.top = y + "px"; // Set the top position
    player.style.left = x + "px"; // Set the top position
    scoreDisplay.textContent = "Score: " + score;
    
    // Check for player movement and boundaries
    if (up && y > 0) {
        y -= speed;
    }
    if (down && y < window.innerHeight - player.offsetHeight) {
        y += speed;
    }
    if (left && x > 0) {
        x -= speed;
    }
    if (right && x < window.innerWidth - player.offsetWidth) {
        x += speed;
    }
    if(mousedown){
        bulletspawn = setInterval(fireCannon, 200);
        speed = 3
        mousedown = false;
    }
    // Check for collision with enemies
    var enemies = document.querySelectorAll(".enemy");
    enemies.forEach(function(enemy) {
        if (isColliding(player, enemy)) {
            alert("Game Over! Your score: " + score);
            score = 0; // Reset score
            scoreDisplay.textContent = "Score: " + score; // Update score display
            // Remove all enemies
            enemies.forEach(function(enemy) {
                enemy.remove();
            });
            up = false;
            down = false;
            left = false;
            right = false;
            mousedown = false
            clearInterval(bulletspawn)
            // Reset player position
            x = window.innerWidth / 2;
            y = window.innerHeight / 2;
            makeitHard=3
        }
    });
}

// Function to check collision between two elements
function isColliding(element1, element2) {
    var rect1 = element1.getBoundingClientRect();
    var rect2 = element2.getBoundingClientRect();
    return !(
        rect1.top > rect2.bottom ||
        rect1.bottom < rect2.top ||
        rect1.left > rect2.right ||
        rect1.right < rect2.left
    );
}

// Function to handle keydown events
window.addEventListener("keydown", function(e) {
    if (e.code == "ArrowUp") {
        up = true;
    }
    if (e.code == "ArrowDown") {
        down = true;
    }
    if (e.code == "ArrowLeft") {
        left = true;
    }
    if (e.code == "ArrowRight") {
        right = true;
    }
    if (e.code == "KeyW") {
        up = true;
    }
    if (e.code == "KeyS") {
        down = true;
    }
    if (e.code == "KeyA") {
        left = true;
    }
    if (e.code == "KeyD") {
        right = true;
    }
});

// Function to handle keyup events
window.addEventListener("keyup", function(e) {
    if (e.code == "ArrowUp") {
        up = false;
    }
    if (e.code == "ArrowDown") {
        down = false;
    }
    if (e.code == "ArrowLeft") {
        left = false;
    }
    if (e.code == "ArrowRight") {
        right = false;
    }
    if (e.code == "KeyW") {
        up = false;
    }
    if (e.code == "KeyS") {
        down = false;
    }
    if (e.code == "KeyA") {
        left = false;
    }
    if (e.code == "KeyD") {
        right = false;
    }
});

// Call the update function repeatedly
setInterval(update, 10);

// Function to spawn enemies
function spawnEnemy() {
    var enemy = document.createElement("div");
    enemy.className = "enemy";
    enemy.style.position = "absolute";
    enemy.style.width = "60px";
    enemy.style.height = "60px";
    enemy.style.backgroundColor = "green";
    enemy.style.border = "20px double";
    enemy.style.boxShadow = "1px 1px 7px";
    enemy.style.zIndex = "1";

    // Set initial position randomly
    var side = Math.floor(Math.random() * 4); // 0: top, 1: right, 2: bottom, 3: left
    var position;

    switch (side) {
        case 0: // top
            position = Math.floor(Math.random() * window.innerWidth) + "px";
            enemy.style.top = "0px";
            enemy.style.left = position;
            break;
        case 1: // right
            position = Math.floor(Math.random() * window.innerHeight) + "px";
            enemy.style.top = position;
            enemy.style.right = "0px";
            break;
        case 2: // bottom
            position = Math.floor(Math.random() * window.innerWidth) + "px";
            enemy.style.bottom = "0px";
            enemy.style.left = position;
            break;
        case 3: // left
            position = Math.floor(Math.random() * window.innerHeight) + "px";
            enemy.style.top = position;
            enemy.style.left = "0px";
            break;
    }

    document.body.appendChild(enemy);

    // Move the enemy towards the player continuously
    setInterval(function() {
        var playerRect = player.getBoundingClientRect();
        var enemyRect = enemy.getBoundingClientRect();

        var playerX = playerRect.left + playerRect.width / 2;
        var playerY = playerRect.top + playerRect.height / 2;

        var enemyX = enemyRect.left + enemyRect.width / 2;
        var enemyY = enemyRect.top + enemyRect.height / 2;

        var dx = playerX - enemyX;
        var dy = playerY - enemyY;

        var distance = Math.sqrt(dx * dx + dy * dy);

        var speed = makeitHard; // Adjust speed as needed
        var vx = (speed / distance) * dx;
        var vy = (speed / distance) * dy;

        enemy.style.left = (enemyRect.left + vx) + "px";
        enemy.style.top = (enemyRect.top + vy) + "px";
    }, 1000 / 60); // Update every frame (60 frames per second)
    score++; // Increment score
}
// Add event listener for mouse movement to rotate the cannon
window.addEventListener("mousemove", function(e) {
    // Calculate the angle between the player and the mouse cursor
    var dx = e.clientX - (x + player.offsetWidth / 2);
    var dy = e.clientY - (y + player.offsetHeight / 2);
    cannonAngle = Math.atan2(dy, dx); // Calculate angle in radians
    player.style.transform = "rotate(" + cannonAngle + "rad)"; // Rotate player element
});

// Add event listener for mouse click to fire projectiles
window.addEventListener("mousedown", function(e) {
    // Check if the left mouse button is clicked
    mousedown = true;
});
window.addEventListener("mouseup", function(e) {
    // Check if the left mouse button is clicked
    mousedown = false;
    clearInterval(bulletspawn)
    speed = 8
});

// Function to handle firing
function fireCannon() {
    // Create projectile element
    makeitHard+=0.005
    var projectile = document.createElement("div");
    projectile.className = "projectile";
    projectile.style.position = "absolute";
    projectile.style.width = "10px";
    projectile.style.height = "10px";
    projectile.style.backgroundColor = "blue";
    projectile.style.borderRadius = "50%";
    projectile.style.zIndex = "2";

    // Set initial position to match player position
    var projectileX = x + player.offsetWidth / 2 - 5; // Adjust for projectile size
    var projectileY = y + player.offsetHeight / 2 - 5; // Adjust for projectile size
    projectile.style.left = projectileX + "px";
    projectile.style.top = projectileY + "px";

    // Add projectile to document
    document.body.appendChild(projectile);

    // Move projectile towards cannon direction
    var projectileSpeed = 5; // Adjust projectile speed as needed
    var projectileAngle = cannonAngle; // Get cannon angle
    var projectileInterval = setInterval(function() {
        if (projectile) {
            // Calculate projectile movement
            var dx = Math.cos(projectileAngle) * projectileSpeed;
            var dy = Math.sin(projectileAngle) * projectileSpeed;

            // Update projectile position
            projectileX += dx;
            projectileY += dy;
            projectile.style.left = projectileX + "px";
            projectile.style.top = projectileY + "px";

            // Check collision with enemies
            var enemies = document.querySelectorAll(".enemy");
            enemies.forEach(function(enemy) {
                if (isColliding(projectile, enemy)) {
                    enemy.remove(); // Remove enemy
                    projectile.remove(); // Remove projectile
                    score += 1; // Increase score
                    scoreDisplay.textContent = "Score: " + score; // Update score display
                }
            });

            // Remove projectile when it goes off-screen
            if (
                projectileX < 0 ||
                projectileX > window.innerWidth ||
                projectileY < 0 ||
                projectileY > window.innerHeight
            ) {
                projectile.remove();
                clearInterval(projectileInterval);
            }
        }
    }, 0); // Update every frame (60 frames per second)
}

// Spawn enemies periodically
setInterval(spawnEnemy, 500); // Adjust the interval as needed
