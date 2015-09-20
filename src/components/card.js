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
                <header className='card__header'>
                    <span className='card__header__type'>{type}</span>
                    <span className='card__header__superclass'>{data.super}</span>
                    <div className='card__header__class'>{data.name}</div>
                    <span className='card__header__subclass'>{data.sub}</span>
                </header>
                <section className='card__contents'>
                    <section className='card__contents__responsibilities'>
                        <ul>
                            { data.responsibilities.map((item, i) =>
                                <li key={i}>{item}</li>
                            ) }
                        </ul>
                    </section>
                    <section className='card__contents__collaborators'>
                        <ul>
                            { data.collaborators.map((item, i) =>
                                <li key={i}>{item}</li>
                            ) }
                        </ul>
                    </section>
                </section>
            </div>
        );
    }
}

export default Card;
