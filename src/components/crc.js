import React from 'react';

import Card from './card';
import NewCardForm from './newcardform';

class CRC extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            cards: localStorage.cards ? JSON.parse(localStorage.cards) : [],
            newFormVisible: false
        };
    }

    componentDidUpdate (prevProps, prevState) {
        localStorage.cards = JSON.stringify(this.state.cards);
    }

    addCard (data) {
        var cardData = {
            name             : data.name,
            super            : data.super,
            sub              : data.sub,
            abstract         : data.type == 2,
            interface        : data.type == 3,
            responsibilities : data.responsibilities.split('\n'),
            collaborators    : data.collaborators.split('\n')
        };

        var cards = this.state.cards;
        cards.push(cardData);

        this.setState({
            cards: cards
        });
    }

    removeCard (id) {

    }

    toggleNewCardForm () {
        this.setState({
            newFormVisible: !this.state.newFormVisible
        });
    }

    removeAllCards () {
        this.setState({
            cards: []
        });
    }

    togglePrint () {
        alert('toggleprint');
    }

    render () {
        return (
            <div id='content'>
                <h1 className='title edit'>CRC Card Generator</h1>

                <div id='actions'>
                    <button onClick={this.toggleNewCardForm.bind(this)}>New card</button>
                    <button onClick={this.removeAllCards.bind(this)}>Remove all</button>
                    <button onClick={this.togglePrint.bind(this)}>Toggle print view</button>

                    { this.state.newFormVisible ? <NewCardForm onAdd={this.addCard} /> : null }
                </div>

                { this.state.cards.map(card => {
                    <Card data={card} />
                }) }
            </div>
        );
    }
}

export default CRC;
