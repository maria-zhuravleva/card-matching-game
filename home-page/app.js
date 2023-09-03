/*-------------------------- Constants -------------------------*/
const cardImgs = [
    "../assets/img/clouds.jpg", 
    "../assets/img/clouds.jpg",
    "../assets/img/summer.jpg",
    "../assets/img/summer.jpg",
    "../assets/img/tree.jpg",
    "../assets/img/tree.jpg",
    "../assets/img/winter.jpg",
    "../assets/img/winter.jpg"
]
// console.log(cardImgs)

//     {
//         Name: "L'Escargot",
//         Date: 1952,
//         URL: "assets/images/matisse paintings/L'Escargot.png"
//     },
//     {
//         Name: "L'Escargot",
//         Date: 1952,
//         URL: "assets/images/matisse paintings/L'Escargot.png"
//     },
//     {
//         Name: "La Chute d'Icare",
//         Date: 1943,
//         URL: "assets/images/matisse paintings/La Chute d'Icare, 1943.png"
//     },
//     {
//         Name: "La Chute d'Icare",
//         Date: 1943,
//         URL: "assets/images/matisse paintings/La Chute d'Icare, 1943.png"
//     },
//     {
//         Name: "Nu Bleu",
//         Date: 1952,
//         URL: "assets/images/matisse paintings/Nu Bleu, 1952.png"
//     },
//     {
//         Name: "Nu Bleu",
//         Date: 1952,
//         URL: "assets/images/matisse paintings/Nu Bleu, 1952.png"
//     },
//     {
//         Name: "Nuit De Noel",
//         Date: 1951,
//         URL: "assets/images/matisse paintings/Nuit De Noel, 1951.png"
//     },
//     {
//         Name: "Nuit De Noel",
//         Date: 1951,
//         URL: "assets/images/matisse paintings/Nuit De Noel, 1951.png"
//     }
// ]

// {
// {
//     Name: "Parakeet from Parakeet and the Mermaid",
//     Date: 1952,
//     URL: "assets/images/matisse paintings/Parakeet from Parakeet and the Mermaid, 1925.png"
// }
//     Name: "Grande Masque",
//     Date: 1948,
//     URL: "assets/images/matisse paintings/Grande Masque, 1948.png"
// },
// {
//     Name: "Grande Masque",
//     Date: 1948,
//     URL: "assets/images/matisse paintings/Grande Masque, 1948.png"
// },
//     Name: "L'Homme endormi",
//     Date: 1936,
//     URL: "assets/images/matisse paintings/L'Homme endormi, 1936.png"
// },
// {
//     Name: "Interior with Egyptian Curtain",
//     Date: 1948,
//     URL: "assets/images/matisse paintings/Interior with Egyptian Curtain, 1948.png"
// },
// {
//     Name: "A Nature Morte",
//     Date: 1933,
//     URL: "assets/images/matisse paintings/A Nature Morte, 1933.png"
// },
// {
//     Name: "Fleurs de Neige",
//     Date: 1954,
//     URL: "assets/images/matisse paintings/Fleurs de Neige, 1954.png"
// },
//     Name: "Nadia au menton pointu",
//     Date: 1948,
//     URL: "assets/images/matisse paintings/Nadia au menton pointu, 1948.png"
// },
// {
//     Name: "La Gerbe",
//     Date: 1954,
//     URL: "assets/images/matisse paintings/La Gerbe, 1954.png"
// },
    
// {
//     Name: "Patitcha Masque",
//     Date: 1947,
//     URL: "assets/images/matisse paintings/Patitcha. Masque, 1947.png"
// },

// {
//     Name: "Vegetaux",
//     Date: 1954,
//     URL: "assets/images/matisse paintings/Vegetaux, 1954.png"
// }
// const winningComboCards = []
                
/*--------------------- Variables (state) ---------------------*/
// let cards = []
let cardsFlipped = []
let pairsMatched = 0
// let movesTotal = 0
let gameOver = false
let isBoardLocked = false
let boardCards = [
    {
        position: "c0",
        painting: shuffleCards(cardImgs),
        flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
        matched: false
    },
    {
        position: "c1",
        painting: shuffleCards(cardImgs),
        flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
        matched: false
    },
    {
        position: "c2",
        painting: shuffleCards(cardImgs),
        flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
        matched: false
    },
    {
        position: "c3",
        painting: shuffleCards(cardImgs),
        flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
        matched: false
    },
    {
        position: "c4",
        painting: shuffleCards(cardImgs),
        flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
        matched: false
    },
    {
        position: "c5",
        painting: shuffleCards(cardImgs),
        flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
        matched: false
    },
    {
        position: "c6",
        painting: shuffleCards(cardImgs),
        flipped: cardsFlipped.includes(shuffleCards(cardImgs)),
        matched: false
    }
]
// console.log(boardCards)

/*----------------- Cached Element References ----------------*/
const cardOneEl = document.querySelector("#c0") 
const cardTwoEl = document.querySelector("#c1")
const cardThreeEl = document.querySelector("#c2")
const cardFourEl = document.querySelector("#c3")
const cardFiveEl = document.querySelector("#c4")
const cardSixEl = document.querySelector("#c5")
const cardSevenEl = document.querySelector("#c6")
const cardEightEl = document.querySelector("#c7")
// console.log(cardEightEl)
const cards = document.querySelectorAll(".card")
// console.log(cards)

/*--------------------- Event Listeners ----------------------*/
cards.forEach(function(card, idx) {
    const cardImg = card.querySelector("img")
    const imgName = cardImgs[idx]
    cardImg.setAttribute("src", imgName)
    // console.log(cardImg)
    card.addEventListener("click", function flipCards(evt) {
        const cardIdx = parseInt(evt.target.id.replace('c', ''))
        // console.log(cardIdx)
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

// cardOneEl.addEventListener('click', toggleCard)

// let isFrontVisible = true;
// function toggleCard() {
//     const cardFront = cardOneEl.querySelector('.card-front')
//     const cardBack = cardOneEl.querySelector('.card-back')

//     if (cardFront.style.display === 'none') {
//         // show the front of the card if it's hidden
//         cardFront.style.display = 'block'
//         cardBack.style.display = 'none'
//     } else {
//         // hide the front of the card if it's visible
//         cardFront.style.display = 'none'
//         cardBack.style.display = 'block'
    // }
    // if (isFrontVisible) {
    //     //if front of the card is visible, switch to the back of the card
    //     cardFront.style.backgroundImage = `url('${cardBack.src}')`
    //     isFrontVisible = false
    // } else {
    //     // if the back of the card is visible, switch to the front of the card
    //     cardFront.style.backgroundImage = `url('../assets/img/clouds.jpg')`
    //     isFrontVisible = true
    // }
// }

/*------------------------- Functions -------------------------*/
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
        // wait for a second while checking if cards are matched
        setTimeout(function() {
            cardOne.classList.remove('flipped')
            cardTwo.classList.remove('flipped')
            cardsFlipped.length = 0
        }, 1000)
    }
}

function shuffleCards(arr) {
    const shuffledCards = []
    arr.forEach(function(card, idx) {
        const randomIdx = Math.floor(Math.random() * (idx +1))
        shuffledCards.splice(randomIdx, 0, card)
    })
    return shuffledCards[0]
}
// console.log(shuffleCards(cardImgs))





// 3) Initialize a game by calling a function to render the game

// 7) Create a function to update the state of the board

// 8) Create a function to switch the turn of the player

// 9) Create a function to check if there’s a tie

// 10) Create a function to check if there’s a winner

// 11) Create a function to reset the game

