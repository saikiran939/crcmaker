import React from 'react';

class Button extends React.Component {
    render () {
        return (
            <div className="button">
                <div className="button__btn"></div>
                <p>{this.props.label}</p>
            </div>
        );
    }
}

export default Button;
