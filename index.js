const MIN = 1;
const MAX = 99;
const MAX_ATTEMPTS = 5;

let randomNumber = Math.floor(Math.random() * MAX) + MIN;
let attempts = 0;
let redModal = document.querySelector('#redModalBg');
let greenModal = document.querySelector('#greenModalBg');
let redMessage = document.querySelector('#redMessage');
let greenMessage = document.querySelector('#greenMessage');
let userInput = document.querySelector('#input');
let numbersDiv = document.querySelector('#numbersDiv');
let circleLines = numbersDiv.querySelectorAll('.circleLine');

document.querySelector('#go').addEventListener('click', checkField);
document.querySelector('#reset').addEventListener('click', resetGame);

function resetGame() {
    let attemptsMade = attempts==MAX_ATTEMPTS ? attempts : attempts+1;
    let circleLine;
    randomNumber = Math.floor(Math.random() * MAX) + MIN;
    attempts = 0;
    for(i=0; i<attemptsMade; i++) {
        circleLine = circleLines[i].querySelectorAll('div');
        removeClasses(circleLine);
    }
    circleLine = circleLines[0].querySelectorAll('div');
    enableLine(circleLine);
    userInput.value = '';
}

function removeClasses(line) {
    let pointer = line[0];
    let circle1 = line[1];
    let circle2 = line[2];
    let arrow = line[3];
    pointer.classList.remove('pointer');
    circle1.classList.remove('greenCircle', 'redCircle', 'initialCircle');
    circle2.classList.remove('greenCircle', 'redCircle', 'initialCircle');
    arrow.classList.remove('arrowUp', 'arrowDown');
    circle1.innerText = '';
    circle2.innerText = '';
}

function checkField() {
    if(userInput.value.trim() == '') printMessage('Error: please enter a number', false);
    else {
        if(attempts == MAX_ATTEMPTS) printMessage('Error: no attempts left!', false);
        else {
            if(userInput.value.trim() < 1 || userInput.value.trim() > 99) printMessage('Error: number must be between 1 and 99', false);
            else {
                let currentLine = circleLines[attempts].querySelectorAll('div');
                insertNumber(currentLine);
                if(attempts < MAX_ATTEMPTS) {
                    let nextLine = circleLines[attempts].querySelectorAll('div');
                    enableLine(nextLine);
                }
            }
        }
    }
}

function printMessage(messageText, color) {
    if(color) {
        greenMessage.innerText = messageText;
        setTimeout(function() {
            greenModal.style.display = 'block';
        },500);
    }
    else {
        redMessage.innerText = messageText;
        redModal.style.display = 'block';
    }
}

document.querySelector('#closeRed').addEventListener('click', function() {
    redModal.style.display = 'none';
})

document.querySelector('#closeGreen').addEventListener('click', function() {
    greenModal.style.display = 'none';
})

function insertNumber(numberLine) {
    let numberString = userInput.value.trim();
    let chosenNumber = parseInt(numberString);
    let pointer = numberLine[0];
    let firstCircle = numberLine[1];
    let secondCircle = numberLine[2];
    let arrow = numberLine[3];
    if(numberString.length == 1) {
        firstCircle.innerText = '0';
        secondCircle.innerText = numberString[0];
    }
    else {
        firstCircle.innerText = numberString[0];
        secondCircle.innerText = numberString[1];
    }
    if(chosenNumber == randomNumber) rightNumber(pointer, firstCircle, secondCircle);
    else wrongNumber(pointer, firstCircle, secondCircle, arrow, chosenNumber);
    userInput.value = '';
}

function rightNumber(pointer, firstCircle, secondCircle) {
    pointer.classList.remove('pointer');
    firstCircle.classList.add('greenCircle');
    secondCircle.classList.add('greenCircle');
    printMessage('Congratulations, you won!', true);
    attempts = MAX_ATTEMPTS;
}

function wrongNumber(pointer, firstCircle, secondCircle, arrow, chosenNumber) {
    pointer.classList.remove('pointer');
    firstCircle.classList.add('redCircle');
    secondCircle.classList.add('redCircle');
    if(chosenNumber < randomNumber) arrow.classList.add('arrowUp');
    else arrow.classList.add('arrowDown');
    attempts++;
    if(attempts == MAX_ATTEMPTS) printMessage('You lost, the number was: ' + randomNumber, false);
}

function enableLine(line) {
    let pointer = line[0];
    let circle1 = line[1];
    let circle2 = line[2];
    pointer.classList.add('pointer');
    circle1.classList.add('initialCircle');
    circle2.classList.add('initialCircle');
}