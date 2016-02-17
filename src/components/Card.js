import React from 'react';

import CardTypes from '../constants/CardTypes';

/**
 * Renders a single card with the passed in data.
 */
const Card = (props) => {
    var data = props.data;

    var type = '';
    if (data.type == CardTypes.ABSTRACT) {
        type = 'Abstract';
    } else if (data.type == CardTypes.INTERFACE) {
        type = 'Interface';
    }

    return (
        <div className='card'>
            <header className='card__header'>
                <span className='card__header__type'>{type}</span>
                <span className='card__header__superclass'>{data.super}</span>
                <span className='card__header__class'>{data.name}</span>
                <span className='card__header__subclass'>{data.sub}</span>
            </header>

            <section className='card__contents'>
                <section className='card__contents__responsibilities'>
                    <ul>
                        { data.responsibilities && data.responsibilities.map((item, i) => {
                            if (item) {
                                return <li key={i}>{item}</li>;
                            }
                        }) }
                    </ul>
                </section>

                <section className='card__contents__collaborators'>
                    <ul>
                        { data.collaborators && data.collaborators.map((item, i) => {
                            if (item) {
                                return <li key={i}>{item}</li>;
                            }
                        }) }
                    </ul>
                </section>
            </section>
        </div>
    );
};

export default Card;
