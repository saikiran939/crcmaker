import React from 'react';

class Card extends React.Component {
    render () {
        return (
            <div className="card">
                <header className='card-header'>
                  <span className='card-type'>&nbsp;</span>
                  <span className='card-superclass'>&nbsp;</span>
                  <div className='card-class'>&nbsp;</div>
                  <span className='card-subclass'>&nbsp;</span>
                </header>
                <section className='card-contents'>
                  <section className='card-responsibilities'>
                    <ul></ul>
                  </section>
                  <section className='card-collaborators'>
                    <ul></ul>
                  </section>
                </section>
            </div>
        );
    }
}

export default Card;
