import React from 'react';

import Card from './card';
import NewCardForm from './newcardform';


class CRC extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            editCard       : null,
            cards          : localStorage.cards ? JSON.parse(localStorage.cards) : [],
            newFormVisible : false,
            uiVisible      : true,
        };
    }

    componentDidUpdate (prevProps, prevState) {
        if (this.state.cards.length > 0) {
            // Sync cards in state object with localStorage
            localStorage.cards = JSON.stringify(this.state.cards);
        } else {
            // Clear localStorage if there's no cards
            localStorage.clear();
        }
    }

    toggleNewCardForm () {
        this.setState({
            newFormVisible: !this.state.newFormVisible
        });
    }

    togglePrint () {
        this.setState({
            uiVisible: !this.state.uiVisible
        });
    }

    addCard (data) {
        let cardsData = this.state.cards;

        if (data.index !== null) {
            // Replace existing card
            cardsData[data.index] = data;
        } else {
            // Add to array in state
            cardsData.push(data);
        }

        this.setState({
            editCard       : null,
            cards          : cardsData,
            newFormVisible : false
        });
    }

    editCard (index) {
        let cardsData = this.state.cards;

        // Set index so it's replaced
        let card = cardsData[index];
        card.index = index;

        this.setState({
            editCard       : card,
            newFormVisible : !this.state.newFormVisible
        });
    }

    cancelAddCard () {
        this.setState({
            editCard       : null,
            newFormVisible : false
        });
    }

    removeCard (index) {
        if (confirm(`Remove card #${index + 1}?`)) {
            let cardsData = this.state.cards;
            cardsData.splice(index, 1);

            this.setState({
                cards: cardsData
            });
        }
    }

    removeAllCards () {
        if (confirm('Remove all cards?')) {
            this.setState({
                cards: []
            });
        }
    }

    moveCardUp (index) {
        let cardsData = this.state.cards;

        let thisCard = cardsData[index];

        cardsData[index] = cardsData[index - 1]
        cardsData[index - 1] = thisCard;

        this.setState({
            cards: cardsData
        });
    }

    moveCardDown (index) {
        let cardsData = this.state.cards;

        let thisCard = cardsData[index];

        cardsData[index] = cardsData[index + 1]
        cardsData[index + 1] = thisCard;

        this.setState({
            cards: cardsData
        });
    }

    render () {
        let scope = this;

        return (
            <div className='wrapper'>

                { this.state.uiVisible &&
                    <header className='header'>
                        <span id='forkongithub'><a href='https://github.com/arkon/crcmaker'>Fork me on GitHub</a></span>

                        <h1 className='header__title'>CRC Card Maker</h1>

                        <p className='header__info'>Tip: The header/buttons are hidden when printing!</p>

                        <div className='header__actions'>
                            <button onClick={this.toggleNewCardForm.bind(this)}>New card</button>
                            <button onClick={this.removeAllCards.bind(this)}>Remove all</button>

                            { this.state.newFormVisible &&
                                <NewCardForm onAdd={this.addCard.bind(this)} onCancel={this.cancelAddCard.bind(this)}
                                    data={this.state.editCard} />
                            }
                        </div>
                    </header>
                }

                <button onClick={this.togglePrint.bind(this)}>Show/hide header</button>

                { this.state.cards.map((editCard, i) =>
                    <div key={i} className='card-wrapper'>
                        <Card data={editCard} />

                        <button onClick={scope.editCard.bind(scope, i)}>Edit card #{i + 1}</button>
                        <button onClick={scope.removeCard.bind(scope, i)} title={`Remove card #${i + 1}`}>✕</button>

                        { i !== 0 &&
                            <button onClick={scope.moveCardUp.bind(scope, i)} title='Move card up'>↑</button>
                        }

                        { i !== this.state.cards.length - 1 &&
                            <button onClick={scope.moveCardDown.bind(scope, i)}  title='Move card down'>↓</button>
                        }
                    </div>
                ) }
            </div>
        );
    }
}

export default CRC;
