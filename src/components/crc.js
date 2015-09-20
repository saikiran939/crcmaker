import React from 'react';

import Actions from './actions';
import Card from './card';

class CRC extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            cards: localStorage.state ? JSON.parse(localStorage.state) : []
        };
    }

    componentDidUpdate (prevProps, prevState) {
        localStorage.state = JSON.stringify(this.state);
    }

    render () {
        return (
            <div>
                <Actions />

                {this.state.cards.map (card => {
                    <Card data={card} />
                })}
            </div>
        );
    }
}

export default CRC;
