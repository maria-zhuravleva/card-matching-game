/*-------------------- Constants ------------------------------*/
const soundWin = new Audio('./audio/win.wav')

/*--------------------- Variables (state) ---------------------*/
let isBoardLocked = false
let cardFlipped = false
let isGameOver = false
let firstFlippedCard, secondFlippedCard
let matchedCards = []
let timerStarted = false
let timeLeft = 30
let movesTotal = 0

/*----------------- Cached Element References ----------------*/
const cards = document.querySelectorAll(".card")

const resetBtn = document.getElementById('reset')

let countdownEl = document.getElementById('count-down') 

let totalMovesEl = document.getElementById('total-moves')

/*--------------------- Event Listeners ----------------------*/
resetBtn.addEventListener('click', init)

document.addEventListener('DOMContentLoaded', function() {
    init()
})

/*------------------------- Functions -------------------------*/

function init() {
    isBoardLocked = false
    cardFlipped = false
    isGameOver = false
    firstFlippedCard = null
    secondFlippedCard = null
    matchedCards = []
    timeLeft = 30
    
    movesTotal = 0
    
    totalMovesEl.textContent = 'Total Moves: 0'
    
    cards.forEach(card => card.classList.remove('flipped'))
    render()
    cards.forEach(card => card.addEventListener("click", handleCardClick))
    shuffleCards()
}


function render() {
    showMessage('Click on the card to start!')
}

function startTimer() {
    let timer = setInterval(function() {
        timeLeft -= 1
        if (timeLeft > 1) {
            countdownEl.textContent = 'Time left: ' + timeLeft + ' seconds'           
        }
        if (timeLeft <= 0) {
            showWinLoseMessage('Almost there! Try again!')
            countdownEl.textContent = 'Time is up!'
            isBoardLocked = true
            clearInterval(timer)
        } else if (timeLeft === 1) {
            countdownEl.textContent = `Time Left: ${timeLeft} second`
        }

        if (isGameOver) {
            countdownEl.textContent = `Time Left: ${timeLeft} seconds`
            clearInterval(timer)
        }
    }, 1000)
}


function handleCardClick(evt) {
    
    if (!timerStarted) {
        startTimer()
        timerStarted = true
    }
    
    countMoves()

    if (isBoardLocked) return

    const clickedCard = evt.target.closest('.card')

    if(!clickedCard) return

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
        firstFlippedCard.removeEventListener('click', handleCardClick)
        secondFlippedCard.removeEventListener('click', handleCardClick)

        checkForWin()

    } else {
        unflipCards()
    }
}


function checkForWin() {
    const difficultyLevel = localStorage.getItem('difficultyLevel')
    let matchedCardsTotal
    if (difficultyLevel === 'novice') {
        matchedCardsTotal = 8
    } else if (difficultyLevel === 'proficient') {
        matchedCardsTotal = 10
    } else if (difficultyLevel === 'maestro') {
        matchedCardsTotal = 12
    } else {
        matchedCardsTotal = 8
    }
    if (matchedCards.length === matchedCardsTotal) {
        showWinLoseMessage("You've unlocked the card-matching master achievement!")

        soundWin.volume = .05
        soundWin.play()
        confetti.start(4000)
        isGameOver = true

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
        let randomNum = Math.floor(Math.random() * 12)
        card.style.order = randomNum 
    })
}

function showMessage(message) {
    const messageEl = document.getElementById('message')
    messageEl.textContent = message

    setTimeout(function() {
        messageEl.textContent = ''
    }, 4000)
}

function showWinLoseMessage (message) {
    const messageEl = document.getElementById('message')
    messageEl.textContent = message
}
