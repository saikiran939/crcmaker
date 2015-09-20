import React from 'react';

import NewCardForm from './newcardform';


class Actions extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            newFormVisible: false
        };
    }

    togglePrint () {
        alert('toggleprint');
    }

    removeAll () {
        alert('removeall');
    }

    newCard () {
        this.setState({
            newFormVisible: !this.state.newFormVisible
        });
    }

    render () {
        return (
            <div id='actions'>
                <button onClick={this.togglePrint.bind(this)}>Toggle print mode</button>
                <button onClick={this.removeAll.bind(this)}>Remove all</button>
                <button onClick={this.newCard.bind(this)}>New card</button>

                { this.state.newFormVisible ? <NewCardForm /> : null }
            </div>
        );
    }
}

export default Actions;
