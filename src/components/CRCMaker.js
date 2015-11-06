import React from 'react';

import Card from './Card';
import Dialog from './Dialog';
import NewCardForm from './NewCardForm';


/**
 * The "entry point" of the app.
 * This class maintains the main state, including the cards themselves.
 */
class CRCMaker extends React.Component {
    constructor (props) {
        super(props);

        // Parse URL for encoded data
        let shareParamRegex = new RegExp('[\\?&]share=([^&#]*)'),
            shareParamRes   = shareParamRegex.exec(location.search);

        // An array of cards from the URL or localStorage, if available
        let cardsData = shareParamRes ?
            JSON.parse(atob(decodeURIComponent(shareParamRes[1].replace(/\+/g, ' ')))) :
            localStorage.cards ?
                JSON.parse(localStorage.cards) :
                [];

        // Initial state
        this.state = {
            // A card object that's being edited
            editCard       : null,

            // Load cards from either localStorage or URL param (defaults to empty array)
            cards          : cardsData,

            // Whether or not the card creation/editor form is visible
            newFormVisible : false,

            // Whether or not the header UI is visible
            headerVisible  : true,

            // The generated URL for sharing
            shareLink      : '',

            // Whether or not to show the textbox with the share link
            shareVisible   : false
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

    generateShareLink () {
        let cleanUrl = [location.protocol, '//', location.host, location.pathname].join(''),
            encoded  = this.state.cards.length > 0 ? btoa(JSON.stringify(this.state.cards)) : null;

        this.setState({
            shareLink    : encoded ? `${cleanUrl}?share=${encoded}` : cleanUrl,
            shareVisible : true
        });
    }

    onShareLinkClick (e) {
        // Selects all text in input box
        e.target.select();
    }

    onShareClose () {
        this.setState({
            shareVisible: false
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

                            <button onClick={this.generateShareLink.bind(this)}>Share link</button>
                            { this.state.shareVisible &&
                                <Dialog title='Share' onClose={this.onShareClose.bind(this)}>
                                    <input className='share__url' type='text' value={this.state.shareLink}
                                        onClick={this.onShareLinkClick.bind(this)} readOnly />

                                    <button onClick={this.onShareClose.bind(this)}>Close</button>
                                </Dialog>
                            }
                        </div>

                        { this.state.newFormVisible &&
                            <NewCardForm onAdd={this.addCard.bind(this)} onCancel={this.cancelAddCard.bind(this)}
                                data={this.state.editCard} />
                        }
                    </header>
                }

                <button className='btn-small' onClick={this.toggleHeader.bind(this)}>Show/hide header</button>

                <main className='cards'>
                    { this.state.cards.map((editCard, i) =>
                        <div key={i} className='card-wrapper'>
                            <Card data={editCard} />

                            <button className='btn-small'
                                onClick={context.editCard.bind(context, i)}>Edit card #{i + 1}</button>
                            <button className='btn-small'
                                onClick={context.removeCard.bind(context, i)} title={`Remove card #${i + 1}`}>✕</button>

                            { i !== 0 &&
                                <button className='btn-small'
                                    onClick={context.moveCardUp.bind(context, i)} title='Move card up'>↑</button>
                            }

                            { i !== this.state.cards.length - 1 &&
                                <button className='btn-small'
                                    onClick={context.moveCardDown.bind(context, i)} title='Move card down'>↓</button>
                            }
                        </div>
                    ) }
                </main>
            </div>
        );
    }
}

export default CRCMaker;
