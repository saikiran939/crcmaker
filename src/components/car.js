import React from 'react';

import Button from './button';
import Console from './console';

class Car extends React.Component {
    render () {
        return (
            <div>
                <Console />

                <div className="console__buttons">
                    <Button label="Test" />
                    <Button label="Test" />
                </div>
            </div>
        );
    }
}

export default Car;
