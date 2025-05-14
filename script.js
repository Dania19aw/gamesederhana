 const canvas = document.getElementById("gameCanvas");
    const ctx = canvas.getContext("2d");

    let catcher = { x: 160, y: 370, width: 80, height: 20 };
    let ball = {  x: 150, y: 0, radius: 10, dy: 4 };
    let score = 0;
    let gameInterval;

    canvas.addEventListener("mousemove", function (e) {
        const rect = canvas.getBoundingClientRect();
        catcher.x = e.clientX - rect.left - catcher.width / 2;
    });

    function drawCatcher() {
        ctx.fillStyle = "#ff66a3";
        ctx.fillRect(catcher.x, catcher.y, catcher.width, catcher.height);
    }

    function drawBall() {
        ctx.beginPath();
        ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2);
        ctx.fillStyle = "#66ccff";
        ctx.fill();
        ctx.closePath();
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCatcher();
        drawBall();

        ball.y += ball.dy;

        // Cek tangkapan
        if (
            ball.y + ball.radius >= catcher.y &&
            ball.x > catcher.x &&
            ball.x < catcher.x + catcher.width
        ) {
            score++;
            ball.y = 0;
            ball.x = Math.random() * 380;
            document.getElementById("scoreDisplay").textContent = "Skor: " + score;
        }

        // Cek bola jatuh ke bawah
        if (ball.y > canvas.height) {
            clearInterval(gameInterval);
            alert("Game Over! Skormu: " + score);
            ball.y = 0;
            score = 0;
            document.getElementById("scoreDisplay").textContent = "Skor: 0";
        }
    }

    function startGame() {
        clearInterval(gameInterval); // reset jika sebelumnya main
        score = 0;
        ball.y = 0;
        document.getElementById("scoreDisplay").textContent = "Skor: 0";
        gameInterval = setInterval(draw, 20);
    }
