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
            cards: cardsData,
            newFormVisible: false
        });
    }

    removeCard (index) {
        if (confirm(`Remove card #${index + 1}?`)) {
            var cardsData = this.state.cards;
            cardsData.splice(index, 1);

            this.setState({
                cards: cardsData
            });
        }
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
        var scope = this;

        return (
            <div className='wrapper'>
                { this.state.uiVisible ?
                    <header className='header'>
                        <h1 className='header__title'>CRC Card Maker</h1>

                        <div className='header__actions'>
                            <button onClick={this.toggleNewCardForm.bind(this)}>New card</button>
                            <button onClick={this.removeAllCards.bind(this)}>Remove all</button>

                            { this.state.newFormVisible ? <NewCardForm onAdd={this.addCard.bind(this)} /> : null }
                        </div>
                    </header>
                : null }

                <button onClick={this.togglePrint.bind(this)}>Show/hide header</button>

                { this.state.cards.map((cardData, i) =>
                    <div className='card-wrapper'>
                        <Card key={i} data={cardData} />
                        <button key={i} onClick={scope.removeCard.bind(scope, i)}>Remove card #{i + 1}</button>
                    </div>
                ) }
            </div>
        );
    }
}

export default CRC;
