import React from 'react';

import Console from './console';

class Car extends React.Component {
    render () {
        return (
            <div>
                <p>Hello world</p>
                <Console />
            </div>
        );
    }
}

export default Car;
