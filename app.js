/*-------------------------- Constants -------------------------*/

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
cards.forEach(card => card.addEventListener("click", flipCards)) 

resetBtn.addEventListener('click', init)





/*------------------------- Functions -------------------------*/
// shuffleCards()

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

    shuffleCards()
    startTimer()
    render()
}


function render() {
    showMessage('Click on the card to start!')
}


function startTimer() {
    let timer = setInterval(function() {
        countdownEl.textContent = 'Time left: ' + timeLeft
        timeLeft -= 1
        // console.log(timeLeft)
        if (isGameOver) {
            countdownEl.textContent = `Your time is ${timeLeft} seconds`
            clearInterval(timer)
        }
        if (timeLeft < 0) {
            countdownEl.textContent = 'Time is up!'
            isBoardLocked = true
            clearInterval(timer)
            }
    }, 1000)
}

function flipCards() {
    // console.log('clicked')
    // console.log(this)
    startTimer() 
    countMoves()

    if (isBoardLocked) return
    
    if (this === firstFlippedCard) return
    
    this.classList.add('flipped')
    
    if (!cardFlipped) {
        cardFlipped = true
        firstFlippedCard = this

    } else {
        cardFlipped = false
        secondFlippedCard = this
        
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
        firstFlippedCard.removeEventListener('click', flipCards)
        secondFlippedCard.removeEventListener('click', flipCards)

        checkForWin()

    } else {
        // return
        unflipCards()
    }
}

function checkForWin() {
    if (matchedCards.length === 8) {
        isGameOver = true
        showMessage('Congratulation! You won!')
        confetti.start(5000)

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

function showMessage(message) {
    const messageEl = document.getElementById('message')
    messageEl.textContent = message

    setTimeout(function() {
        messageEl.textContent = ''
    }, 3000)
}

