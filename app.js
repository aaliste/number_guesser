// Game values

let min = 1,
    max = 10,
    winningNum = getRandomNum(min, max),
    guessesLeft = 3;

// UI elements
const game = document.querySelector(".game"),
    minNum = document.querySelector(".min-num"),
    maxNum = document.querySelector(".max-num"),
    guessBtn = document.querySelector("#guess-btn"),
    guessInput = document.querySelector("#guess-input"),
    message = document.querySelector(".message");

// assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

// Play again listener

game.addEventListener("mousedown", function(e){
    if(e.target.className === "play-again") {
        window.location.reload();
    }
});

// Listener for guess
guessBtn.addEventListener("click", function(){
    let guess = parseInt(guessInput.value);
    
    if(isNaN(guess) || guess < min || guess > max){
        setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }

    // Check if won
        if(guess === winningNum){
            gameOver(true, `${winningNum} is correct!`)
    } else {
        guessesLeft -= 1;
        if(guessesLeft === 0){
            gameOver(false, `Game over, you lost. The correct number was ${winningNum}`);
        } else {
            guessInput.style.borderColor = "red";
            guessInput.value = "";
            setMessage(`${guess} is not correct, ${guessesLeft} guesses left`, "orange")
        }
    }
});

function gameOver(won, msg){
    let color; 
    won === true ? color = "green" : color = "red";


    guessInput.disabled = true;
    guessInput.style.borderColor = color;
    message.style.color = color;
    setMessage(msg);

    guessBtn.value = "Play again";
    guessBtn.className += "play-again";
}

// Get winning number
function getRandomNum(min, max){
    return Math.floor(Math.random()*(max-min+1)+min);
}

//Set message

function setMessage(msg, color){
    message.style.color = color;
    message.textContent = msg;
}