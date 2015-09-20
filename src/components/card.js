import React from 'react';

class Card extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        var data = this.props.data;

        var type = '';

        if (data.abstract) {
            type = 'Abstract';
        }

        if (data.interface) {
            type = 'Interface';
        }

        return (
            <div className="card">
                <header className='card-header'>
                    <span className='card-type'>{type}</span>
                    <span className='card-superclass'>{data.super}</span>
                    <div className='card-class'>{data.name}</div>
                    <span className='card-subclass'>{data.sub}</span>
                </header>
                <section className='card-contents'>
                    <section className='card-responsibilities'>
                        <ul>
                            { data.responsibilities.map((item, i) => {
                                <li key={i}>{item}</li>
                            }) }
                        </ul>
                    </section>
                    <section className='card-collaborators'>
                        <ul>
                            { data.collaborators.map((item, i) => {
                                <li key={i}>{item}</li>
                            }) }
                        </ul>
                    </section>
                </section>
            </div>
        );
    }
}

export default Card;
