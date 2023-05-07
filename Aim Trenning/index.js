const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list'); 
const timeElement = document.querySelector('#time');
const board = document.querySelector('#board');

const colors = ['#e74c3c', '#cf8f', '#c71585', '#d8bfd8', '#00bfff', '#afeeee', '#48bcf7', '#f0ffff', '#008080', '#00ff00', '#df4c11', '#ffdb9e', '#ffa500', '#35e201', '#ff6347', '#ffa500', '#c0c0c0', '#f08080', '#b0c4de', '#44ccc5', '#e67e22', '#00FF7F', '#2ecc71'];

let time = 0;
let gamePoints = 0;

startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
    if (event.target.classList.contains('time-btn')) {
        time = parseInt(event.target.getAttribute('data-time'));
        screens[1].classList.add('up');
        startGame();
    };
});

board.addEventListener('click', (event) => {
    if (event.target.classList.contains('circle')) {
        gamePoints++;
        event.target.remove();
        createRandomCircle();
    };
});

function setTime (value) {
    timeElement.innerHTML = `00:${value}`;
};

function startGame () {
    setInterval(decreaseTime, 1000);
    createRandomCircle();
    setTime(time);
};

function decreaseTime () {
    if (time === 0) {
        finishGame();
    } else {
        let current = time--;
        if (current < 10) {
            current = `0${current}`;
        };
        setTime(current);
    };
};

function finishGame () {
    timeElement.parentElement.classList.add('hide');
    board.innerHTML = `<h1>счет: <span class="game--over">${gamePoints}</span></h1>`
};

function getColor () {
    return colors[Math.floor(Math.random() * colors.length)];
}

function createRandomCircle () {
    const circle = document.createElement('div');
    const size = getRandomNumber(10, 50);
    const {width, height} = board.getBoundingClientRect();
    const color = getColor();
    circle.style.backgroundColor = color;
    const x = getRandomNumber(0 , width - size);
    const y = getRandomNumber(0 , height - size);;

    circle.style.width = `${size}px`;
    circle.style.height = `${size}px`;
    circle.style.left = `${x}px`;
    circle.style.top = `${y}px`;
    circle.classList.add('circle');

    board.append(circle);
};

function getRandomNumber (min, max) {
    return Math.round(Math.random() * (max - min) + min);
};