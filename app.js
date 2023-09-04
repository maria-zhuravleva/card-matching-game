/*-------------------------- Constants -------------------------*/

/*--------------------- Variables (state) ---------------------*/
let isBoardLocked = false
let cardFlipped = false
let isGameOver = false
let firstFlippedCard, secondFlippedCard
let timeLeft = 100
let matchedCards = []


/*----------------- Cached Element References ----------------*/
const cards = document.querySelectorAll(".card")
// console.log(cards)

const resetBtn = document.querySelector('#reset')
// console.log(resetBtn)

let countdownEl = document.getElementById('countdown') 
/*--------------------- Event Listeners ----------------------*/
cards.forEach(card => card.addEventListener("click", flipCards)) 
resetBtn.addEventListener('click', init)





/*------------------------- Functions -------------------------*/
shuffleCards()

function init() {
    console.log('clicked')
    unflipCards()
    render()
    // firstFlippedCard = 0
    // secondFlippedCard = 0
    // isBoardLocked = false
    // cardFlipped = false
}


function render() {
    showMessage('Click on the card to start!')
}

function flipCards() {
    // console.log('clicked')
    // console.log(this)
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


function checkForMatch() {
    if (firstFlippedCard.id === secondFlippedCard.id) {
        showMessage("There's a match!")
        matchedCards.push(firstFlippedCard)
        matchedCards.push(secondFlippedCard)
        // console.log(matchedCards)
        firstFlippedCard.removeEventListener('click', flipCards)
        secondFlippedCard.removeEventListener('click', flipCards)

        checkWin()

    } else {
        // return
        unflipCards()
    }
}

function checkWin() {
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

function init() {
    gameOver = false
    isBoardLocked = false
}


function showMessage(message) {
    const messageEl = document.getElementById('message')
    messageEl.textContent = message

    setTimeout(function() {
        messageEl.textContent = ''
    }, 3000)
}

let timer = setInterval(function() {
    countdownEl.textContent = timeLeft + 'seconds remaining'
    timeLeft -= 1
    if (timeLeft < 0) {
        countdownEl.textContent = 'Finished!'
        clearInterval(timer)
        }
}, 3000)