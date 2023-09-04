/*-------------------------- Constants -------------------------*/

/*--------------------- Variables (state) ---------------------*/
let gameOver = false
let isBoardLocked = false
let cardFlipped = false
let firstFlippedCard, secondFlippedCard
let pairsMatched = 0 


/*----------------- Cached Element References ----------------*/
const cards = document.querySelectorAll(".card")
// console.log(cards)

// const resetBtn = document.querySelector('button')

/*--------------------- Event Listeners ----------------------*/
cards.forEach(card => card.addEventListener("click", flipCards)) 
// resetBtn.addEventListener('click', init)



/*------------------------- Functions -------------------------*/
shuffleCards()

function flipCards() {
    if (isBoardLocked) return
    
    if (this === firstFlippedCard) return
    
    this.classList.add('flipped')
    
    if (!cardFlipped) {
        cardFlipped = true
        secondFlippedCard = this
        checkForMatch() 
    }
}


function checkForMatch() {
    if (firstFlippedCard.id === secondFlippedCard.id) {
        console.log("There's a match!")
        firstFlippedCard.removeEventListener('click', flipCards)
        secondFlippedCardFlippedCard.removeEventListener('click', flipCards)
    } else {
        unflipCards()
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
    // cardsFlipped.length = 0
    // shuffleCards(cardImgs)
    // console.log(shuffleCards(cardImgs))
    //console.log(cardImgs)
    // shuffleNodes(cards)
    // console.log(shuffleNodes(cards))
}


function showMessage(message) {
    const messageEl = document.getElementById('message')
    messageEl.textContent = message

    setTimeout(function() {
        messageEl.textContent = ''
    }, 2000)
}

// function shuffleCards(arr) {
//     const shuffledCards = []
//     arr.forEach(function(card, idx) {
//         const randomIdx = Math.floor(Math.random() * (idx +1))
//         shuffledCards.splice(randomIdx, 0, card)
//     })
//     return shuffledCards
// }
// console.log(shuffleCards(cardImgs))
// console.log(shuffleCards(cardImgs))
// console.log(shuffleCards(cardImgs))


// function shuffleCards(arr){
//     let leng = arr.length
//     for (let i = leng - 1; i > 0; i --) {
//         let j = Math.floor(Math.random() * i)
//         let temp = arr[i]
//         arr[i] = arr[j]
//         arr[j] = temp
//     }
//     console.log(arr)
//     return arr
// }



    
    // function(card, idx) {
    // const cardImg = card.querySelectorAll("img")
    // const imgName = cardImgs[idx]
    // cardImg.forEach(function(node) {
    //     node.setAttribute("src", imgName)     
    // })
    // console.log(cardImg)
    // // console.log(cardImg)
    // card.addEventListener("click", 

// function flipCards(evt) {
//     const cardIdx = parseInt(evt.target.id.replace('c', ''))
//     //console.log(cardIdx)
//     // if the board is locked, don't do anything
//     if (isBoardLocked) return
//     // if the same card was clicked, return
//     if (cardsFlipped.length === 1 && cardsFlipped[0] === cardIdx) return
//     // toggle css class after the card was clicked
//     card.setAttribute("class", ".flipped")
//     // add flipped cards to the array
//     cardsFlipped.push(card)
//     // when two cards were clicked, check for a match
//     if (cardsFlipped.length === 2) {
//         checkForMatch()
//     }
// })
