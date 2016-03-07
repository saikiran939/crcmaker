import autobind from 'autobind-decorator';
import React from 'react';
import Clipboard from 'clipboard';

import Card from './Card';
import Dialog from './Dialog';
import NewCardForm from './NewCardForm';

/**
 * The "entry point" of the app.
 * This class maintains the main state, including the cards themselves.
 */
@autobind
class CRCMaker extends React.Component {
  constructor (props) {
    super(props);

    // Parse URL for encoded data
    const shareParamRes = new RegExp('[\\?&]share=([^&#]*)').exec(location.search);

    // An array of cards from the URL or localStorage, if available
    const cardsData = shareParamRes ?
      JSON.parse(atob(decodeURIComponent(shareParamRes[1].replace(/\+/g, ' ')))) :
      localStorage.cards ?
        JSON.parse(localStorage.cards) :
        [];

    // Initial state
    this.state = {
      // Card object + index that's being edited
      editCard      : null,
      editIndex     : null,

      // Load cards from either localStorage or URL param (defaults to empty array)
      cards         : cardsData,

      // Whether or not the card creation/editor form is visible
      formVisible   : false,

      // Whether or not the header UI is visible
      headerVisible : true,

      // The generated URL for sharing
      shareLink     : '',

      // Whether or not to show the textbox with the share link
      shareVisible  : false,

      // Export JSON dialog
      exportVisible : false
    };
  }

  componentDidMount () {
    const clipboard = new Clipboard('.copy');

    // TODO: show messages in UI
    clipboard.on('success', function(e) {
      console.info('Action:', e.action);
      console.info('Text:', e.text);
      console.info('Trigger:', e.trigger);
    });

    clipboard.on('error', function(e) {
      console.error('Action:', e.action);
      console.error('Trigger:', e.trigger);
    });
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
      formVisible: !this.state.formVisible
    });
  }

  toggleHeader () {
    this.setState({
      headerVisible: !this.state.headerVisible
    });
  }

  addCard (data) {
    var cardsData = this.state.cards;

    if (this.state.editIndex !== null) {
      // Replace existing card (used for editing)
      cardsData[this.state.editIndex] = data;
    } else {
      // Add to array in state (new card)
      cardsData.push(data);
    }

    this.setState({
      editCard    : null,
      editIndex   : null,
      cards       : cardsData,
      formVisible : false
    });
  }

  editCard (index) {
    this.setState({
      editCard    : this.state.cards[index],
      editIndex   : index,
      formVisible : true
    });
  }

  cancelAddCard () {
    this.setState({
      editCard    : null,
      editIndex   : null,
      formVisible : false
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

  removeAllCards () {
    if (confirm('Remove all cards?')) {
      this.setState({
        cards: []
      });
    }
  }

  moveCardUp (index) {
    var cardsData = this.state.cards;

    var thisCard = cardsData[index];

    cardsData[index] = cardsData[index - 1]
    cardsData[index - 1] = thisCard;

    this.setState({
      cards: cardsData
    });
  }

  moveCardDown (index) {
    var cardsData = this.state.cards;

    var thisCard = cardsData[index];

    cardsData[index] = cardsData[index + 1]
    cardsData[index + 1] = thisCard;

    this.setState({
      cards: cardsData
    });
  }

  generateShareLink () {
    var cleanUrl = `${location.protocol}//${location.host}${location.pathname}`,
      encoded  = this.state.cards.length > 0 ? btoa(JSON.stringify(this.state.cards)) : null;

    this.setState({
      shareLink    : encoded ? `${cleanUrl}?share=${encoded}` : cleanUrl,
      shareVisible : true
    });
  }

  onDialogTextClick (e) {
    // Selects all text in input box
    e.target.select();
  }

  onShareClose () {
    this.setState({
      shareVisible: false
    });
  }

  toggleExport () {
    this.setState({
      exportVisible: !this.state.exportVisible
    });
  }

  render () {
    return (
      <div>
        { this.state.headerVisible &&
          <header className='header'>
            <h1 className='header__title'>CRC Card Maker</h1>

            <p className='header__info'>Tip: The header/buttons are hidden when printing!</p>

            <div className='header__actions'>
              <button onClick={this.toggleNewCardForm}>New card</button>
              <button onClick={this.removeAllCards}>Remove all</button>

              <button onClick={this.generateShareLink}>Share link</button>
              { this.state.shareVisible &&
                <Dialog title='Share' onClose={this.onShareClose}>
                  <input id='text-share' className='dialog__text' type='text' value={this.state.shareLink}
                    onClick={this.onDialogTextClick} readOnly />

                  <button className='copy' data-clipboard-target='#text-share'>Copy</button>
                  <button onClick={this.onShareClose}>Close</button>
                </Dialog>
              }

              <button onClick={this.toggleExport}>Export</button>
              { this.state.exportVisible &&
                <Dialog title='Export JSON' onClose={this.toggleExport}>
                  <textarea id='text-export' className='dialog__text' value={JSON.stringify(this.state.cards)}
                    onClick={this.onDialogTextClick} readOnly />

                  <button className='copy' data-clipboard-target='#text-export'>Copy</button>
                  <button onClick={this.toggleExport}>Close</button>
                </Dialog>
              }

              <button onClick={() => { window.print(); }}>Print</button>
            </div>

            { this.state.formVisible &&
              <NewCardForm onAdd={this.addCard} onCancel={this.cancelAddCard}
                data={this.state.editCard} />
            }
          </header>
        }

        <button className='btn--small' onClick={this.toggleHeader}>Show/hide header</button>

        <main className='cards'>
          { this.state.cards.length < 1 &&
            <div className='cards__empty'>
              <p>You don't have any cards yet.</p>
              <button onClick={this.toggleNewCardForm}>New card</button>
            </div>
          }

          { this.state.cards.map((card, i) =>
            <div key={i} className='card__wrapper'>
              <Card data={card} />

              <button className='btn--small'
                onClick={this.editCard.bind(this, i)}>Edit card #{i + 1}</button>
              <button className='btn--small'
                onClick={this.removeCard.bind(this, i)} title={`Remove card #${i + 1}`}>✕</button>

              { i !== 0 &&
                <button className='btn--small'
                  onClick={this.moveCardUp.bind(this, i)} title='Move card up'>↑</button>
              }

              { i !== this.state.cards.length - 1 &&
                <button className='btn--small'
                  onClick={this.moveCardDown.bind(this, i)} title='Move card down'>↓</button>
              }
            </div>
          ) }
        </main>
      </div>
    );
  }
}

export default CRCMaker;
