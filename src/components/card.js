import React from 'react';

class Card extends React.Component {
    render () {
        var type = '';

        if (this.props.data.abstract) {
            type = 'Abstract';
        }

        if (this.props.data.interface) {
            type = 'Interface';
        }

        return (
            <div className="card">
                <header className='card-header'>
                    <span className='card-type'>{type}</span>
                    <span className='card-superclass'>{this.props.data.super}</span>
                    <div className='card-class'>{this.props.data.name}</div>
                    <span className='card-subclass'>{this.props.data.sub}</span>
                </header>
                <section className='card-contents'>
                    <section className='card-responsibilities'>
                        <ul>
                            {this.props.data.responsibilities.map(item => {
                                <li>{item}</li>
                            })}
                        </ul>
                    </section>
                    <section className='card-collaborators'>
                        <ul>
                            {this.props.data.collaborators.map(item => {
                                <li>{item}</li>
                            })}
                        </ul>
                    </section>
                </section>
            </div>
        );
    }
}

export default Card;
