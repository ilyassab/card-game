//names - номер карты, counts - сколько раз использовалась
const cards = {
    ids: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    counts: [2, 2, 2, 2, 2, 2, 2, 2, 2]
};

const par = 9;
let score = 0;
let openPar = 0;
let counter = 0;
let firstId = 0;
let secondId = 0;
let delay = 0;

function App() {
    //заполнение массива cards
    for (let i = 0; i < 9; i++) {
        let m = -1;
        while (isCardHaveBeenAdded(m, i)) {
            m = Math.floor(Math.random() * 52);
        }
        cards.ids[i] = m;
    }

    //цикл, который располагает карты на стол
    for (let i = 1; i <= 18; i++) {
        let m = Math.floor(Math.random() * 9);
        while (cards.counts[m] === 0) {
            m = Math.floor(Math.random() * 9);
        }
        cards.counts[m]--;
        document.getElementById(i).style.backgroundImage = "url(pics/cards/" + cards.ids[m] + ".png)";
    }
    let timerInterval = setInterval(() => {
    	let time = Number(document.querySelector('.timer').innerHTML);
		document.querySelector('.timer').innerHTML = String(time - 1);
		if (time === 0) {
			clearInterval(timerInterval);
			document.querySelector('.timer').innerHTML = 'Start!';
			hide();
		}
	}, 1000);
}

//функция проверки наличия такой карты в массиве cards
function isCardHaveBeenAdded(cardId, cardsArrayLength) {
    if (cardId === -1) {
        return true;
    }
    for (let i = 0; i <= cardsArrayLength; i++) {
        if (cards.ids[i] === cardId) {
            return true;
        }
    }
    return false;
}

//через 5 секунд карты переворачиваются рубашкой вверх
function hide() {
    for (let i = 1; i <= 18; i++) {
        document.getElementById(`${i}`).classList.add("hidden");
        delay++;
    }
}

//функция, которая по каждому клику карты переворачивает ее
function cardClickHandler(id) {
    if (!delay || document.getElementById(id).style.backgroundImage === "none" || (id === firstId && counter === 1)) {
        return 0;
    }
    let bal = document.getElementById("score");
    if (counter === 0) {
        firstId = id;
    }
    if (counter === 1) {
        secondId = id;
    }
    counter++;
    if (counter <= 2) {
        let card = document.getElementById(id);
        card.classList.remove("hidden");
    } else {
        let firstCard = document.getElementById(firstId);
        let secondCard = document.getElementById(secondId);
        console.log(firstCard.style.backgroundImage + secondCard.style.backgroundImage);
        if (firstCard.style.backgroundImage === secondCard.style.backgroundImage && firstId !== secondId) {
            firstCard.style.backgroundImage = "none";
            secondCard.style.backgroundImage = "none";
            openPar++;
            score += 42 * (par - openPar);
            bal.innerHTML = score;
        } else if (firstCard.style.backgroundImage !== secondCard.style.backgroundImage && firstId !== secondId) {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
            score -= 42 * openPar;
            bal.innerHTML = score;
        }
        counter = 0;
        firstId = 0;
        secondId = 0;
    }
    if (openPar === 9) {
        window.location.href = 'finish.html' + '#' + score;
    }
}

App();