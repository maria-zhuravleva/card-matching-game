/*-------------------- Constants ------------------------------*/
const soundWin = new Audio('./audio/win.wav')

/*--------------------- Variables (state) ---------------------*/
let isBoardLocked = false
let cardFlipped = false
let isGameOver = false
let firstFlippedCard, secondFlippedCard
let matchedCards = []
let timerStarted = false
let timeLeft = 10
let movesTotal = 0
let timer 

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
    timerStarted = false
    firstFlippedCard = null
    secondFlippedCard = null
    matchedCards = []
    
    timeLeft = 10
    
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
    timer = setInterval(function() {
        timeLeft -= 1
        if (timeLeft > 1) {
            countdownEl.textContent = 'Time left: ' + timeLeft + ' seconds'           
        }
        if (timeLeft <= 0) {
            showWinLoseMessage('Almost there! Try again!')
            countdownEl.textContent = 'Time is up!'
            isBoardLocked = true
            isGameOver = true
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
        isGameOver = true
        showWinLoseMessage("You've unlocked the card-matching master achievement!")
        soundWin.volume = .05
        soundWin.play()
        startPetals()
        // confetti.start(4000)

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

function startPetals() {
    const canvas = document.querySelector('canvas')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d')
    
    const TOTAL = 100
    const petalArray = []
    
    const petalImg = new Image()
    petalImg.src = 'https://djjjk9bjm164h.cloudfront.net/petal.png'
    petalImg.addEventListener('load', () => {
        for (let i = 0; i < TOTAL; i++) {
        petalArray.push(new Petal())
        }
        render()

        setTimeout(stopPetals, 7000)
    })
    
    function render() {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        petalArray.forEach(petal => petal.animate())
        window.requestAnimationFrame(render)
    }
    
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
    })
    
    let mouseX = 0
    function touchHandler(e) {
        mouseX = (e.clientX || e.touches[0].clientX) / window.innerWidth
    }
    window.addEventListener('mousemove', touchHandler)
    window.addEventListener('touchmove', touchHandler)
    
    class Petal {
        constructor() {
        this.x = Math.random() * canvas.width
        this.y = (Math.random() * canvas.height * 2) - canvas.height
        this.w = 25 + Math.random() * 15
        this.h = 20 + Math.random() * 10
        this.opacity = this.w / 40
        this.flip = Math.random()
    
        this.xSpeed = 1.5 + Math.random() * 2
        this.ySpeed = 1 + Math.random() * 1
        this.flipSpeed = Math.random() * 0.03
        }
    
        draw() {
        if (this.y > canvas.height || this.x > canvas.width) {
            this.x = -petalImg.width
            this.y = (Math.random() * canvas.height * 2) - canvas.height
            this.xSpeed = 1.5 + Math.random() * 2
            this.ySpeed = 1 + Math.random() * 1
            this.flip = Math.random()
        }
        ctx.globalAlpha = this.opacity
        ctx.drawImage(
            petalImg, 
            this.x, 
            this.y, 
            this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3)), 
            this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5))
        )
        }
    
        animate() {
        this.x += this.xSpeed + mouseX * 5
        this.y += this.ySpeed + mouseX * 2
        this.flip += this.flipSpeed
        this.draw()
        }
    }
    function stopPetals() {
        const canvas = document.querySelector('canvas');
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
    
        window.removeEventListener('mousemove', touchHandler);
        window.removeEventListener('touchmove', touchHandler);
        
        petalArray.length = 0;
    }
}