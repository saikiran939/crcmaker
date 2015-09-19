import React from 'react';

import Button from './button';
import Console from './console';

class Car extends React.Component {
    render () {
        return (
            <div>
                <Console />

                <Button />
                <Button />
            </div>
        );
    }
}

export default Car;
