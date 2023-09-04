/*-------------------------- Constants -------------------------*/
const cardImgs = [
    "../assets/img/clouds.jpg", 
    "../assets/img/summer.jpg",
    "../assets/img/winter.jpg",
    "../assets/img/clouds.jpg",
    "../assets/img/tree.jpg",
    "../assets/img/summer.jpg",
    "../assets/img/winter.jpg",
    "../assets/img/tree.jpg"
]


/*--------------------- Variables (state) ---------------------*/
// let cards = []
let cardsFlipped = []
let gameOver, isBoardLocked, pairsMatched = 0 
// let movesTotal = 0
// let boardCards = [
//     {
//         position: "c0",
//         painting: shuffleCards(cardImgs),
//         flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
//         matched: false
//     },
//     {
//         position: "c1",
//         painting: shuffleCards(cardImgs),
//         flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
//         matched: false
//     },
//     {
//         position: "c2",
//         painting: shuffleCards(cardImgs),
//         flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
//         matched: false
//     },
//     {
//         position: "c3",
//         painting: shuffleCards(cardImgs),
//         flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
//         matched: false
//     },
//     {
//         position: "c4",
//         painting: shuffleCards(cardImgs),
//         flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
//         matched: false
//     },
//     {
//         position: "c5",
//         painting: shuffleCards(cardImgs),
//         flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
//         matched: false
//     },
//     {
//         position: "c6",
//         painting: shuffleCards(cardImgs),
//         flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
//         matched: false
//     }
// ]


/*----------------- Cached Element References ----------------*/
// const cardOneEl = document.querySelector("#c0") 
// const cardTwoEl = document.querySelector("#c1")
// const cardThreeEl = document.querySelector("#c2")
// const cardFourEl = document.querySelector("#c3")
// const cardFiveEl = document.querySelector("#c4")
// const cardSixEl = document.querySelector("#c5")
// const cardSevenEl = document.querySelector("#c6")
// const cardEightEl = document.querySelector("#c7")
// console.log(cardEightEl)
const cards = document.querySelectorAll(".card")
console.log(cards)
const resetBtn = document.querySelector('button')

/*--------------------- Event Listeners ----------------------*/
resetBtn.addEventListener('click', init)

cards.forEach(function(card, idx) {
    const cardImg = card.querySelector("img")
    const imgName = cardImgs[idx]
    cardImg.setAttribute("src", imgName)
    // console.log(cardImg)
    card.addEventListener("click", function flipCards(evt) {
        const cardIdx = parseInt(evt.target.id.replace('c', ''))
        //console.log(cardIdx)
        // if the board is locked, don't do anything
        if (isBoardLocked) return
        // if the same card was clicked, return
        if (cardsFlipped.length === 1 && cardsFlipped[0] === cardIdx) return
        // toggle css class after the card was clicked
        card.setAttribute("class", ".flipped")
        // add flipped cards to the array
        cardsFlipped.push(card)
        // when two cards were clicked, check for a match
        if (cardsFlipped.length === 2) {
            checkForMatch()
        }
    })
})

/*------------------------- Functions -------------------------*/
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


function checkForMatch() {
    // check if there's two cards in the array, return if no
    if (cardsFlipped.length !== 2) return

    // assign flipped cards from the array to variables
    const cardOne = cardsFlipped[0]
    const cardTwo = cardsFlipped[1]

    // get the source attribute from two flipped cards
    const cardOneAttribute = cardOne.getAttribute('src')
    const cardTwoAttribute = cardTwo.getAttribute('src')

    if (cardOneAttribute === cardTwoAttribute) {
        // there's a match
        pairsMatched += 1
        console.log(pairsMatched)
        // wait for a second while checking if cards are matched
        setTimeout(function() {
            showMessage("It's a match!")

            cardsFlipped.length = 0         
        }, 1000)

        if (pairsMatched === 4) {
            // console.log("Congratulations! You won the game!")

            showMessage("Congratulations! You won the game!")
            }
    }
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

function shuffleCards() {
    cards.forEach(function(card) {
        let randomNum = Math.floor(Math.random() * 8)
        card.style.order = randomNum 
    })
}
shuffleCards()

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

// function shuffleNodes(arr) {
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

cards.forEach(function(card, idx) {
    const cardImg = card.querySelectorAll("img")
    const imgName = cardImgs[idx]
    cardImg.forEach(function(node) {
        node.setAttribute("src", imgName)     
    })
    console.log(cardImg)
    // console.log(cardImg)
    card.addEventListener("click", function flipCards(evt) {
        const cardIdx = parseInt(evt.target.id.replace('c', ''))
        //console.log(cardIdx)
        // if the board is locked, don't do anything
        if (isBoardLocked) return
        // if the same card was clicked, return
        if (cardsFlipped.length === 1 && cardsFlipped[0] === cardIdx) return
        // toggle css class after the card was clicked
        card.setAttribute("class", ".flipped")
        // add flipped cards to the array
        cardsFlipped.push(card)
        // when two cards were clicked, check for a match
        if (cardsFlipped.length === 2) {
            checkForMatch()
        }
    })
})