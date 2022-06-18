import React, { Component } from 'react';
import axios from 'axios';
import Card from './card';
import './deck.css';

class Deck extends Component {
    constructor(props) {
        super(props);
        this.state = { deck_id: null, deck: [] };
        this.getCard = this.getCard.bind(this);
    }
    async componentDidMount() {
        let res = await axios.get('https://www.deckofcardsapi.com/api/deck/new/shuffle');
        this.setState({ deck_id: res.data.deck_id });
    }
    async getCard() {
        try {
            let res = await axios.get(`https://www.deckofcardsapi.com/api/deck/${this.state.deck_id}/draw`);
            if (!res.data.success)
                throw new Error("No cards remaining!");
            let card = res.data.cards[0];
            this.setState(st => ({ deck: [...st.deck, { id: card.code, image: card.image, name: `${card.value} OF ${card.suit}` }] }));
        } catch (err) {
            alert(err);
        }
    }
    render() {
        const cards = this.state.deck.map(card => (<Card key={card.id} image={card.image} name={card.name} />))
        return (
            <div className='deck'>
                <h1 className='Deck-title'>♦️ Card Dealer ♦️</h1>
                <h2 className='Deck-title subtitle'>♦️ A React Demo to learn LifeCycle Methods ♦️</h2>
                <button className='Deck-button' onClick={this.getCard}>Get Card !</button>
                <div className='deck-cards'>{cards}</div>
            </div>
        )
    }
}

export default Deck;