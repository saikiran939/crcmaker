import React from 'react';

import Card from './card';
import NewCardForm from './newcardform';

class CRC extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            cards: localStorage.cards ? JSON.parse(localStorage.cards) : [],
            newFormVisible: false,
            uiVisible: true,
        };
    }

    componentDidMount () {
        // Toggle print view on `T` key press
        document.body.addEventListener('keydown', (evt) => {
            if (evt.keyCode === 84) {
                this.togglePrint();
            }
        });
    }

    componentDidUpdate (prevProps, prevState) {
        // Sync cards in state object with localStorage
        localStorage.cards = JSON.stringify(this.state.cards);
    }

    addCard (data) {
        // Parse data from form
        var newCard = {
            name             : data.name,
            super            : data.super,
            sub              : data.sub,
            abstract         : data.type == 2,
            interface        : data.type == 3,
            responsibilities : data.responsibilities.split('\n'),
            collaborators    : data.collaborators.split('\n')
        };

        // Add to array in state
        var cardsData = this.state.cards;
        cardsData.push(newCard);

        this.setState({
            cards: cardsData
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
        if (confirm('Remove all cards?')) {
            this.setState({
                cards: []
            });
        }
    }

    togglePrint () {
        this.setState({
            uiVisible: !this.state.uiVisible
        });
    }

    render () {
        return (
            <div id='content'>
                { this.state.uiVisible ?
                    <div>
                        <h1 className='title edit'>CRC Card Generator</h1>

                        <div id='actions'>
                            <button onClick={this.toggleNewCardForm.bind(this)}>New card</button>
                            <button onClick={this.removeAllCards.bind(this)}>Remove all</button>
                            <button onClick={this.togglePrint.bind(this)}>Toggle print view [T key]</button>

                            { this.state.newFormVisible ? <NewCardForm onAdd={this.addCard.bind(this)} /> : null }
                        </div>
                    </div>
                    : null }

                { this.state.cards.map((cardData, i) =>
                    <Card key={i} data={cardData} />
                ) }
            </div>
        );
    }
}

export default CRC;
