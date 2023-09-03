/*-------------------------- Constants -------------------------*/
const cardImgs = [
    "assets/paintings/clouds.jpg", 
    "assets/paintings/clouds.jpg", 
    "assets/paintings/summer.jpg",
    "assets/paintings/summer.jpg",
    "assets/paintings/tree.jpg",
    "assets/paintings/tree.jpg",
    "assets/paintings/winter.jpg",
    "assets/paintings/winter.jpg"
]

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
let movesTotal = 0
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


/*------------------------- Functions -------------------------*/

function shuffleCards(arr) {
    const shuffledCards = []
    arr.forEach(function(card, idx) {
        const randomIdx = Math.floor(Math.random() * (idx +1))
        shuffledCards.splice(randomIdx, 0, card)
    })
    return shuffledCards[0]
}

// console.log(shuffleCards(cardImgs))



// 1) Define the required variables used to track the state of the game
// //Create an array that keeps track of the flipped cards
// //Create an array that keeps track of matching pairs
// Create a variable that counts total moves and increment it by 1 every time the player moves


// 2) Store cached element references
// HTML elements that represent the cards


// 3) Initialize a game by calling a function to render the game


// 4) Define the required constants
// Create an array of cards
// Create an array of winning combinations


// 5) Add event listeners to cards


// 6) Create a function to handle a player clicking a card 


// 7) Create a function to update the state of the board


// 8) Create a function to switch the turn of the player


// 9) Create a function to check if there’s a tie


// 10) Create a function to check if there’s a winner


// 11) Create a function to reset the game

