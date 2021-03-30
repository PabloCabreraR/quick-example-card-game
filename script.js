// CLASES

class Player {
    constructor(name){
      this.name = name
      this.hand = []
      this.cardsValue = 0
    }
  }
  class Game {
    constructor(){
      this.players = []
      this.winner = {}
    }

    addPlayers(){
      for(let argument of arguments){
        this.players.push(argument)
      }
    }

    dealCards(){
      this.players.forEach((player)=>{
        player.hand.push(Math.floor(Math.random() * 10) + 1)
        player.hand.push(Math.floor(Math.random() * 10) + 1)
      })
    }

    getValueOfCards(){
      this.players.forEach((player)=>{
        player.cardsValue = player.hand[0] + player.hand[1]
      })
    }

    getWinner(){
      this.players.reduce((acc, player)=>{
        if(player.cardsValue > acc){
          acc = player.cardsValue
          this.winner = player
        }
        return acc
      }, 0)
    }
  }


  // DOM MANIPULATION
let game

const beginGameButton = document.querySelector('#begin-game')
const dealCardsButton = document.querySelector('#deal-cards')
const checkWinnerButton = document.querySelector('#show-winner')
const newGameButton = document.querySelector('#new-game')
const p = document.querySelector('#winner')
const contentInsideInputDiv = document.querySelectorAll('#inputs-div div')

const createPlayer = () => {
    const player1name = document.querySelector('#player1').value
    const player2name = document.querySelector('#player2').value

    const player1 = new Player(player1name)
    const player2 = new Player(player2name)
    
    createGame(player1, player2)
}

const createGame = (player1, player2) => {
    game = new Game()
    game.addPlayers(player1, player2)
}

const changeInputsForNames = () => {
    contentInsideInputDiv[0].innerHTML = `<p>${game.players[0].name}</p>`
    contentInsideInputDiv[1].innerHTML = `<p>${game.players[1].name}</p>`
}

const hideBeginGameButton = () => {
    beginGameButton.classList.add('display-none')
}

const showDealCardsButton = () => {
    dealCardsButton.classList.remove('display-none')
}

const showCardsOnScreen = () => {
    const p1 = document.createElement('p')
    const p2 = document.createElement('p')

    p1.innerHTML = `${game.players[0].hand[0]} --- ${game.players[0].hand[1]}`
    p2.innerHTML = `${game.players[1].hand[0]} --- ${game.players[1].hand[1]}`

    contentInsideInputDiv[0].appendChild(p1)
    contentInsideInputDiv[1].appendChild(p2)
}

const hideDealCardsButton = () => {
    dealCardsButton.classList.add('display-none')
}

const showCheckWinnerButton = () => {
    checkWinnerButton.classList.remove('display-none')
}

const showWinner = () => {
    game.getWinner()
    p.innerHTML = `Felicidades ${game.winner.name}!!! Has ganado con ${game.winner.cardsValue} puntos!!`
    checkWinnerButton.classList.add('display-none')
}

beginGameButton.addEventListener('click', ()=>{
    createPlayer()
    changeInputsForNames()
    hideBeginGameButton()
    showDealCardsButton()
})

dealCardsButton.addEventListener('click', ()=> {
    game.dealCards()
    game.getValueOfCards()
    showCardsOnScreen()
    hideDealCardsButton()
    showCheckWinnerButton()
    showWinner()
})

newGameButton.addEventListener('click', ()=>{
    location.reload()
})

// location.reload() Recarga la pagina