/*-------------------------- Constants -------------------------*/
// const difficulties = {}

/*--------------------- Variables (state) ---------------------*/
let isBoardLocked = false
let cardFlipped = false
let isGameOver = false
let firstFlippedCard, secondFlippedCard
let matchedCards = []
let timeLeft = 20
let movesTotal = 0


/*----------------- Cached Element References ----------------*/
const cards = document.querySelectorAll(".card")
// console.log(cards)

const resetBtn = document.getElementById('reset')
// console.log(resetBtn)

let countdownEl = document.getElementById('count-down') 
// console.log(countdownEl)

let totalMovesEl = document.getElementById('total-moves')
// console.log(totalMovesEl)
/*--------------------- Event Listeners ----------------------*/
resetBtn.addEventListener('click', init)

// document.addEventListener('DOMContentLoaded', function() {
//     init()
// })



/*------------------------- Functions -------------------------*/
init()

function init() {
    // console.log('function called')
    isBoardLocked = false
    cardFlipped = false
    isGameOver = false
    firstFlippedCard = null
    secondFlippedCard = null
    matchedCards = []
    timeLeft = 20
    
    movesTotal = 0
    
    totalMovesEl.textContent = 'Total Moves: 0'
    
    cards.forEach(card => card.classList.remove('flipped'))
    
    render()
    cards.forEach(card => card.addEventListener("click", handleCardClick)) 
    shuffleCards()
    startTimer()
}


function render() {
    showMessage('Click on the card to start!')
}


function startTimer() {
    let timer = setInterval(function() {
        countdownEl.textContent = 'Time left: ' + timeLeft + ' seconds'
        timeLeft -= 1
        // console.log(timeLeft)
        if (timeLeft < 0) {
            countdownEl.textContent = 'Time is up!'
            isBoardLocked = true
            clearInterval(timer)
        }
        if (isGameOver) {
            countdownEl.textContent = `Time Left: ${timeLeft} seconds`
            clearInterval(timer)
        }
    }, 1000)
}

function handleCardClick(evt) {
    countMoves()

    if (isBoardLocked) return

    const clickedCard = evt.target.closest('.card')
    // console.log(clickedCard)

    if(!clickedCard) return

    const imgFront = clickedCard.querySelector('.front')
    // console.log(imgFront)

    if (clickedCard === firstFlippedCard) return
    clickedCard.classList.add('flipped')

    if (!cardFlipped) {
        cardFlipped = true
        firstFlippedCard = clickedCard
    } else {
        cardFlipped = false
        secondFlippedCard = clickedCard

        checkForMatch()
    }
}

function countMoves() {
    if (!isBoardLocked) {
        movesTotal += 1
        totalMovesEl.textContent = 'Total Moves: ' + movesTotal
    } else {
        return
    }
    
}

function checkForMatch() {
    if (firstFlippedCard.id === secondFlippedCard.id) {
        showMessage("There's a match!")
        matchedCards.push(firstFlippedCard)
        matchedCards.push(secondFlippedCard)
        // console.log(matchedCards)
        firstFlippedCard.removeEventListener('click', handleCardClick)
        secondFlippedCard.removeEventListener('click', handleCardClick)

        checkForWin()

    } else {
        unflipCards()
    }
}

function checkForWin() {
    if (matchedCards.length === 8) {
        isGameOver = true
        showMessage('Congratulation! You won!')
        confetti.start(3000)

    } else {
        return
    }
}

function unflipCards() {
    isBoardLocked = true
    setTimeout(function() {
        firstFlippedCard.classList.remove('flipped')
        secondFlippedCard.classList.remove('flipped')

        isBoardLocked = false
    }, 1000)
}

function shuffleCards() {
    cards.forEach(function(card) {
        let randomNum = Math.floor(Math.random() * 8)
        card.style.order = randomNum 
    })
}

// function showMessage(message) {
//     const messageEl = document.getElementById('message')
//     const paragraph = document.createElement('p')
//     paragraph.textContent = message
//     messageEl.appendChild(paragraph)

//     setTimeout(function() {
//         paragraph.textContent = ''
//     }, 3000)
// }

function showMessage(message) {
    const messageEl = document.getElementById('message')
    messageEl.textContent = message

    setTimeout(function() {
        messageEl.textContent = ''
    }, 4000)
}