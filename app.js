let drawnNumbersList = [];
let limitNumber = 10;
let secretNumber = generateRandomNumber();
let attempts = 1;

function showText(tag, text) {
    let field = document.querySelector(tag);  
    field.innerHTML = text;
    responsiveVoice.speak(text, "Brazilian Portuguese Female", {rate: 1.2});
}

function showInitialMessage() {
    showText("h1", "Secret Number Game");
    showText("p", "Enter a number between 0 and 10");
}
showInitialMessage();

function generateRandomNumber() {
    let choosedNumber = parseInt(Math.random() * limitNumber + 1);
    let quantityElementsList = drawnNumbersList.length;

    if (quantityElementsList == limitNumber) {
        drawnNumbersList = [];
    }

    if (drawnNumbersList.includes(choosedNumber)) {
        return generateRandomNumber();
    } else {
        drawnNumbersList.push(choosedNumber);
        return choosedNumber;
    }
}


function verifyShoot() {
    let shoot = document.querySelector("input").value;
    
    if (shoot == secretNumber) {
        showText("h1", "Got it!");
        let attemptsWord = attempts > 1 ? "Attempts" : "Attempt";
        let attemptsMessage = "You have shooted the right number with" + attempts + attemptsWord;
        showText("p", attemptsMessage);
        document.getElementById("reiniciar").removeAttribute('disabled');
    } else {
        if (shoot > secretNumber) {
            showText("h1", "Try again!");
            showText("p", "The secret number is smaller!");
        } else {
            showText("h1", "Try again!");
            showText("p", "The secret number is greater!");
        }
        attempts++;
        clearField();
    }
}

function clearField() {
    shoot = document.querySelector("input");
    shoot.value = "";
}

function resetGame() {
    secretNumber = generateRandomNumber();
    clearField();
    attempts = 1;
    showInitialMessage();
    document.getElementById("reiniciar").setAttribute("disabled", true);
}
