import { useEffect, useState } from 'react'
import './App.css'
import Card from './components/Card'

const cardImages = [
  { src: '/img/aatrox.jpg', matched: false },
  { src: '/img/draven.jpg', matched: false },
  { src: '/img/pantheon.jpg', matched: false },
  { src: '/img/jax.jpg', matched: false },
  { src: '/img/katarina.jpg', matched: false },
  { src: '/img/kayle.jpg', matched: false },
]

function App() {
  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)

  //shuffling
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5) // we have 12 cards now
      .map((card) => ({ ...card, id: Math.random() })) // random id to each card
    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards)
    setTurns(0) // when starting a new game, turns will reset to 0
  }
  console.log(turns)
  // handling the choice
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card) // if a card is selected update choice two. if it's not, update choice one
  }

  // compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  // reset choices & increase turn

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  }

  // automatically start a new game

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Hero Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <p>Turns: {turns}</p>
      <div className="card-grid">
        {cards.map((card) => (
          <Card
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
    </div>
  )
}

export default App
