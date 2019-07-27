class Timer {
	constructor (id) {
		this.element = document.getElementById(id);
	}
	startTimer() {
		this.timeStart = new Date().getTime();
	}
	currentTime (time) {
		this.time = time || new Date().getTime() - this.timeStart;
		let minutes = Math.floor((this.time) / 1000 / 60);
		let seconds = Math.floor((this.time) / 1000 % 60);
		minutes = (minutes < 10) ? '0' + minutes : '' + minutes;
		seconds = (seconds < 10) ? '0' + seconds : '' + seconds;
		return `${minutes}:${seconds}`;
	}
	stopTimer(timerId) {
		this.timeEnd = new Date().getTime();
		this.time = this.timeEnd - this.timeStart;
		clearInterval(timerId);
	}
	showTimer() {
		this.element.style.display = 'block';
	}
	hideTimer() {
		this.element.style.display = 'none';
	}
}

const wrapper = document.getElementById('wrapper');
const timer = new Timer('timer');
const discription = document.getElementById('discription');
const congratulation = document.getElementById('congr');
const cardSkirt = document.getElementsByClassName('skirt-cards')[0];
const gameDifficulty = document.getElementsByClassName('game-difficulty')[0];
const newGameButton = document.getElementById('new-game');

let rowNum = 2;
let colNum = 3;
let cardArr = [];
let cardStack = [];
let cardSkirtFile = 'card3.png';

cardSkirt.addEventListener('click', changeCardSkirt, false);
gameDifficulty.addEventListener('click', changeDifficulty, false);
newGameButton.addEventListener('click', gameStart, false);

function gameStart() {
	discription.style.display = 'none';
	congratulation.style.display = 'none';
	wrapper.style.display = 'block';
	checkScreen(rowNum, colNum);
	cardArr = new Array(rowNum * colNum).fill(0).map(function(element, index) {
		return Math.ceil((index + 1) / 2);
	});
	cardArr.shuffle();
	cardStack = [];

	while (wrapper.firstChild) {
		wrapper.removeChild(wrapper.firstChild);
	}

	cardGenerator();

	timer.startTimer();
	timer.showTimer();
	timer.timerId = setInterval(function(){
		timer.element.innerHTML = `Time: ${timer.currentTime()}`;
	}, 100);
}

function gameOver() {
	timer.stopTimer(timer.timerId);
	timer.hideTimer();
	wrapper.style.display = 'none';
	congratulation.style.display = 'block';
	document.getElementById('total-time').innerHTML = `Your time is ${timer.currentTime(timer.time)}`;
}

function changeCardSkirt(event){
	if (!! event.target.src) {cardSkirtFile = event.target.src.split('/').slice(-1).join('');}
	else if (!event.target.src && !event.target.firstChild.src) return;
	else if (!event.target.src) {
		cardSkirtFile = event.target.firstChild.src.split('/').slice(-1).join('');
	}
	
	if (document.getElementsByClassName('card').length !== 0) {
		let cards = document.getElementsByClassName('card');
		[].forEach.call(cards, (card) => card.lastChild.style.backgroundImage = `url('img/back-pic/${cardSkirtFile}')`);
	}
}

function changeDifficulty(event) {
	let diffArr = event.target.innerHTML.match(/\d+/g);
	if (!diffArr) return;
	checkScreen(diffArr[0], diffArr[1]);
	gameStart();
}

function checkScreen(...args) {
	if (document.body.offsetHeight > document.body.offsetWidth) {
		rowNum = Math.max(args[0], args[1]);
		colNum = Math.min(args[0], args[1]);
	}
	else {
		rowNum = Math.min(args[0], args[1]);
		colNum = Math.max(args[0], args[1]);
	}
}

Array.prototype.shuffle = function(){
	for (let i = 0; i < this.length; i++) {
		let j = Math.floor(Math.random() * this.length);
		let x = this[i];
		this[i] = this[j];
		this[j] = x;
	}
};

Array.prototype.isNoCard = function() {
	 return !this.filter(x => x).length;
};

HTMLElement.prototype.idToNum = function () { 
	let reg = /\d+/;
	return +this.id.match(reg);
}

HTMLElement.prototype.cardHide = function() {
	this.classList.toggle('hide');
}

HTMLElement.prototype.cardCheck = function (event) {
	if (cardStack.length < 2) {
		if (this === cardStack[0]) return;
		this.cardRotate();
		cardStack.push(this);
	}
	if (cardStack.length == 2) {
		if (cardArr[cardStack[0].idToNum()] === cardArr[cardStack[1].idToNum()]) {
			[].map.call(cardStack, (element) => {
				element.removeEventListener('click', element.cardCheck, false);
				element.firstChild.cardHide();
				setTimeout(() => element.style.display = 'none', 1000);
			});
			cardArr[cardStack[0].idToNum()] = cardArr[cardStack[1].idToNum()] = 0;	
			cardStack.length = 0;
			if (cardArr.isNoCard()) setTimeout(gameOver, 800);		
		}
		else {
			[].map.call(cardStack, (element) => {setTimeout(element.cardRotate.bind(element), 800)});	
			cardStack.length = 0;		
		}
	}
}

HTMLElement.prototype.cardRotate = function() {
	if (this.classList.contains('rotate'))
		this.classList.remove('rotate');
	else this.classList.toggle('rotate');
};

HTMLElement.prototype.showContent = function() {
	this.classList.toggle('show');
}

const div = document.createElement('div');
div.appendChild(div.cloneNode(false));
div.appendChild(div.cloneNode(false));

function cardGenerator() {
	let cardHeight = Math.floor((wrapper.offsetHeight - (rowNum - 1) * 10) / rowNum);
	let cardWidth = cardHeight * 63/88; 
	
	div.style.width = `${cardWidth}px`;
	div.style.height = `${cardHeight}px`;
	wrapper.style.minWidth = `${cardWidth * colNum + 10 * (colNum - 1)}px`;
	for (let i = 0; i < rowNum; i++) {		
		for (let j = 0; j < colNum; j++) {	
			let card = wrapper.appendChild(div.cloneNode(true));
	
			card.style.top = `${i*(cardHeight + 10)}px`;		
			card.style.left = `${j*(cardWidth + 10)}px`;
	
			card.addEventListener('click', card.cardCheck, false);
	
			card.className = 'card';
			card.id = `card_${colNum*i+j}`;
			card.firstChild.className = 'front'; 
			card.lastChild.className = 'back';
			
			card.lastChild.style.backgroundImage = `url('img/back-pic/${cardSkirtFile}')`;
			card.lastChild.style.backgroundSize = `${cardWidth-4}px`;
	
			card.firstChild.style.background = `url("img/front-pic/pic${cardArr[colNum*i+j]}.png")`;		
			card.firstChild.style.backgroundSize = 'contain';
			card.firstChild.style.backgroundRepeat = 'no-repeat';
			card.firstChild.style.backgroundPosition = '50% 50%';
			card.firstChild.style.backgroundColor = '#eee';
		}
	}
}
