const log = console.log;
const warn = console.warn;
// warn('Hello');

const symbols = ['skocko', 'tref', 'pik', 'srce', 'karo', 'zvezda'];
const NUM_OF_ELEM_IN_COMB = 4;
const MAX_NUM_OF_ATTEMPTS = 6;

let combination = [];
let attemptNow = [];
let attemptCount = 0;
let numOfNewAttempts = 0;
let startTime = 0;

// function init() {

//     let symbolsDiv = document.getElementById('symbolsTo');

//     let symbolsImg = document.createElement('img');
//     symbolsImg.setAttribute('src', 'img/skocko.png'); //hardcode
//     symbolsDiv.appendChild(symbolsImg);
// };

function init() {

    let symbolsDiv = document.getElementById('symbolsTo');

    // for (let i = 0; i < symbols.length; i++) {
    //     // log(symbols[i]);
    //     let symbolsImg = document.createElement('img');
    //     symbolsImg.setAttribute('src', 'img/' + symbols[i] + '.png');
    //     symbolsImg.setAttribute('onclick', 'chooseSymbol('' + symbols[i] + '')'); // **prva mogucnost
    //     symbolsDiv.appendChild(symbolsImg);
    // };
    // ili:
    for (symbol of symbols) {
        // log(symbol);
        let symbolsImg = document.createElement('img');
        symbolsImg.setAttribute('src', 'img/' + symbol + '.png');
        // symbolsImg.setAttribute('onclick', 'chooseSymbol('' + symbol + '')'); // **druga mogucnost
        symbolsDiv.appendChild(symbolsImg);
    };
};

function newGame() {
    startTime = Date.now();
    numOfNewAttempts = 0;
    // log(startTime);
    // Prvi nacin:
    let symbolsDiv = document.getElementById('symbolsTo');
    let imgs = symbolsDiv.getElementsByTagName('img');
    for (let img of imgs) {
        img.setAttribute('class', 'clickable');
        let symbol = img.getAttribute('src').substring(4); // **treca mogucnost
        symbol = symbol.substring(0, symbol.length - 4); // **treca mogucnost
        img.setAttribute('onclick', 'chooseSymbol("' + symbol + '")'); // **treca mogucnost

        // ili:
        // img.className = 'clickable';
        // ili:
        // img.classList.add('clickable');

        // ili pristupiti css-u:
        // img.style.cursor = 'pointer';
    };

    // Drugi nacin:
    // let symbolsDiv = document.getElementById('symbolsTo');
    // let imgs = symbolsDiv.children;
    // log(imgs);

    for (let i = 0; i < NUM_OF_ELEM_IN_COMB; i++) {
        let oneSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        combination[i] = oneSymbol;
    };
    warn(combination);
    let attemptsDiv = document.getElementById('attempts');
    attemptsDiv.innerHTML = '';

    newAttempt();
};

function newAttempt() {

    attemptCount = 0;
    numOfNewAttempts++

    if (numOfNewAttempts == MAX_NUM_OF_ATTEMPTS + 1) {
        endGame();
        return;
    };

    let attemptsDiv = document.getElementById('attempts');
    attemptsDiv.appendChild(document.createElement('br'));

    for (let i = 0; i < NUM_OF_ELEM_IN_COMB; i++) {
        let attemptImg = document.createElement('img');
        attemptImg.setAttribute('id', 'field' + numOfNewAttempts + i);
        attemptsDiv.appendChild(attemptImg);
    };
};

function chooseSymbol(symbol) {

    attemptNow[attemptCount] = symbol;
    let targetField = document.getElementById('field' + numOfNewAttempts + attemptCount);
    attemptCount++;

    targetField.setAttribute('src', 'img/' + symbol + '.png');

    if (attemptCount == NUM_OF_ELEM_IN_COMB) {
        if (checkCombination()) {
            endGame();
        } else {
            newAttempt();
        }
    };
};

function checkCombination() {
    // warn(combination);
    // log(attemptNow);

    let red = 0;
    let yellow = 0;
    let notCorrect = [];

    for (let i = 0; i < NUM_OF_ELEM_IN_COMB; i++) {

        if (combination[i] == attemptNow[i]) {
            red++;
            attemptNow[i] = '';
        } else {
            notCorrect.push(combination[i]);
        }
    };

    for (let symb of notCorrect) {
        let ind = attemptNow.indexOf(symb);
        if (ind != -1) {
            yellow++
            attemptNow[ind] = '';
        }
    };

    let returnValue = (red == NUM_OF_ELEM_IN_COMB);

    let attemptsDiv = document.getElementById('attempts');

    for (let i = 0; i < NUM_OF_ELEM_IN_COMB; i++) {

        let btn = document.createElement('button');

        // Duza metoda:
        // if (red > 0) {
        //     red--;
        //     btn.setAttribute('class', 'indicator rightPlace');
        // } else if (yellow > 0) {
        //     yellow--;
        //     btn.setAttribute('class', 'indicator wrongPlace');
        // } else {
        //     btn.setAttribute('class', 'indicator');
        // };

        // Kraca metoda:
        let btnClass = 'indicator';

        if (red > 0) {
            red--;
            btnClass += ' rightPlace';
        } else if (yellow > 0) {
            yellow--;
            btnClass += ' wrongPlace';
        } else {
            btnClass;
        };

        btn.setAttribute('class', btnClass);

        attemptsDiv.appendChild(btn);
    };

    // log('Red = ' + red + ' Yellow = ' + yellow);

    return returnValue;

    // if (returnValue) {
    //     return true;
    // } else {
    //     return false;
    // };
};

function endGame() {
    // alert('Kraj Igre');
    let endTime = Date.now();
    log(startTime, endTime);
    let time = endTime - startTime;
    time = Math.floor(time / 100);
    data = ' ' + numOfNewAttempts + '#' + time;

    prev = localStorage.getItem('pokusaji');

    log(prev);

    if (prev == null) {
        prev = '';
    } else {
        prev += ';';
    };

    prev += data;

    localStorage.setItem('pokusaji', prev);

    log(prev);

    // localStorage.clear();
};

function historyGames() {
    window.open('history.html');
};
