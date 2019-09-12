//names - номер карты, counts - сколько раз использовалась
const cards = {
    ids: [-1, -1, -1, -1, -1, -1, -1, -1, -1],
    counts: [2, 2, 2, 2, 2, 2, 2, 2, 2]
};

const pair = 9;
let score = 0;
let openPair = 0;
let clickCounter = 0;
let firstId = 0;
let secondId = 0;
let isGameStarted = false;

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
    }
    isGameStarted = true;
}

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
        document.getElementById(`${i}`).style.backgroundImage = "url(pics/cards/" + cards.ids[m] + ".png)";
    }

    let timerInterval = setInterval(() => {
        let time = Number(document.querySelector('.timer').innerHTML);
        document.querySelector('.timer').innerHTML = String(time - 1);
        if (time === 0) {
            clearInterval(timerInterval);
            document.querySelector('.timer').innerHTML = 'Start!';
            document.querySelector('.timer').style.marginLeft = 335 + 'px';
            document.querySelector('.points').style.marginLeft = 415 + 'px';
            hide();
        }
    }, 1000);

}

App();

//функция, которая по каждому клику карты переворачивает ее
function cardClickHandler(id) {
    let realTimeScore = document.getElementById("score");
    let card = document.getElementById(id);

    if (!isGameStarted || card.style.backgroundImage === "none" || id === firstId || id === secondId) {
        return;
    }

    if (clickCounter === 0) {
        firstId = id;
    }

    if (clickCounter === 1) {
        secondId = id;
    }

    clickCounter++;

    card.classList.remove("hidden");

    if (clickCounter > 2) {
        let firstCard = document.getElementById(firstId);
        let secondCard = document.getElementById(secondId);
        if (firstCard.style.backgroundImage === secondCard.style.backgroundImage && firstId !== secondId) {
            firstCard.style.backgroundImage = "none";
            secondCard.style.backgroundImage = "none";
            firstCard.style.cursor = "auto";
            secondCard.style.cursor = "auto";
            openPair++;
            score += 42 * (pair - openPair);
        } else if (firstCard.style.backgroundImage !== secondCard.style.backgroundImage && firstId !== secondId) {
            firstCard.classList.add("hidden");
            secondCard.classList.add("hidden");
            score -= 42 * openPair;
        }
        realTimeScore.innerHTML = score;
        clickCounter = 1;
        firstId = id;
        secondId = 0;
    }

    if (openPair === 8) {
        window.location.href = 'finish.html' + '#' + score;
    }
}