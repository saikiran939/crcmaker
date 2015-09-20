import React from 'react';

import Actions from './actions';
import Card from './card';

class CRC extends React.Component {
    componentDidMount () {
        // Fetch card data from localStorage and save in state
    }

    render () {
        return (
            <div>
                <Actions />

                // Map card data
                <Card />
            </div>
        );
    }
}

export default CRC;
