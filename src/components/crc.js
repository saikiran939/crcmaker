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
        // var cards = this.state.cards;
        // cards.push(data);

        // this.setState({
        //     cards: cards
        // });

        alert('add!');
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
            <div>
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
