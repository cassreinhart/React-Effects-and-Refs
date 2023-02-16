import React, {useState, useRef, useEffect} from 'react'
import axios from 'axios'
import Card from './Card'

const baseURL = 'https://deckofcardsapi.com/api';

const CardWrapper = () => {
    
    const [drawnCards, setDrawnCards] = useState([]);
    const [deckID, setDeckID] = useState(null);
    const [currentCard, setCurrentCard] = useState(0);

    const newCard = () => {
        setCurrentCard(currentCard + 1);
    }

    //request a deck id
    useEffect(() => {
        async function shuffleDeck() {
            const res = await axios.get(`${baseURL}/deck/new/shuffle/`)
            setDeckID(res.data.deck_id)
            console.log(deckID)
        }
        shuffleDeck();
    }, []) //only shuffles on initial render

    //request a new card from the deck
    useEffect(() => {
        async function drawCard() {
            const res = await axios.get(`${baseURL}/deck/${deckID}/draw/`);
            const newCard = res.data.cards[0]
            setDrawnCards([...drawnCards, newCard])
            if(res.data.remaining === 0) {
                alert("Error: no cards remaining!")
            }
            console.log(newCard)
            console.log(res)
        }
        drawCard();
    }, [currentCard]) //run when the url is set
    

  return (
    <div className='CardWrapper'>
         <button onClick={newCard}>GIMME A CARD!</button>
        {drawnCards.map(({image, code}) => {
            return <Card image={image} key={code}/>
        })}
    </div>
  )
}

export default CardWrapper