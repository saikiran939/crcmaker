import React from 'react';

class Actions extends React.Component {
    togglePrint () {
        alert('toggleprint');
    }

    render () {
        return (
            <div id='actions'>
                <button onClick={this.togglePrint}>Toggle print mode</button>
                <button className='edit'>Remove all</button>
                <button className='edit'>New card</button>
            </div>
        );
    }
}

export default Actions;
