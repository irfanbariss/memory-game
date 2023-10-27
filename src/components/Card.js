import './Card.css'

export default function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled && !flipped) {
      handleChoice(card)
    }
  }
  const cardClasses = [
    'card',
    flipped ? 'flipped' : '',
    card.matched ? 'matched' : '',
  ].join(' ')

  return (
    <div className={cardClasses}>
      <div>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          onClick={handleClick}
          src="/img/cover.png"
          alt="card back"
        />
      </div>
    </div>
  )
}
