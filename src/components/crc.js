import React from 'react';

import Card from './card';
import NewCardForm from './newcardform';


/**
 * The "entry point" of the app.
 * This class maintains the main state, including the cards themselves.
 */
class CRC extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            // A card object that's being edited
            editCard       : null,

            // An array of cards
            cards          : localStorage.cards ? JSON.parse(localStorage.cards) : [],

            // Whether or not the card creation/editor form is visible
            newFormVisible : false,

            // Whether or not the header UI is visible
            headerVisible  : true
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

    toggleHeader () {
        this.setState({
            headerVisible: !this.state.headerVisible
        });
    }

    addCard (data) {
        let cardsData = this.state.cards;

        if (data.index !== null) {
            // Replace existing card (used for editing)
            cardsData[data.index] = data;
        } else {
            // Add to array in state (new card)
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

        // Set an index so it's replaced upon saving
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
        let context = this;

        return (
            <div className='wrapper'>

                { this.state.headerVisible &&
                    <header className='header'>
                        <span id='forkongithub'><a href='https://github.com/arkon/crcmaker'>Fork me on GitHub</a></span>

                        <h1 className='header__title'>CRC Card Maker</h1>

                        <p className='header__info'>Tip: The header/buttons are hidden when printing!</p>

                        <div className='header__actions'>
                            <button onClick={this.toggleNewCardForm.bind(this)}>New card</button>
                            <button onClick={this.removeAllCards.bind(this)}>Remove all</button>
                        </div>

                        { this.state.newFormVisible &&
                            <NewCardForm onAdd={this.addCard.bind(this)} onCancel={this.cancelAddCard.bind(this)}
                                data={this.state.editCard} />
                        }
                    </header>
                }

                <button onClick={this.toggleHeader.bind(this)}>Show/hide header</button>

                { this.state.cards.map((editCard, i) =>
                    <div key={i} className='card-wrapper'>
                        <Card data={editCard} />

                        <button onClick={context.editCard.bind(context, i)}>Edit card #{i + 1}</button>
                        <button onClick={context.removeCard.bind(context, i)} title={`Remove card #${i + 1}`}>✕</button>

                        { i !== 0 &&
                            <button onClick={context.moveCardUp.bind(context, i)} title='Move card up'>↑</button>
                        }

                        { i !== this.state.cards.length - 1 &&
                            <button onClick={context.moveCardDown.bind(context, i)}  title='Move card down'>↓</button>
                        }
                    </div>
                ) }
            </div>
        );
    }
}

export default CRC;
