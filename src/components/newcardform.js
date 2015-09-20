import React from 'react';

class NewCardForm extends React.Component {
    togglePrint () {
        alert('toggleprint');
    }

    removeAll () {
        alert('removeall');
    }

    newCard () {
        alert('newcard');
    }

    render () {
        return (
            <div id='new-card'>
                <h2 className='title'>New card</h2>

                <label>Class name:</label>
                <input type='text' />

                <label>Superclasses:</label>
                <input type='text' />

                <label>Subclasses:</label>
                <input type='text' />

                <label>Type:</label>
                <label className='new-type'><input type='radio' name='type' checked />Normal</label>
                <label className='new-type'><input type='radio' name='type' />Abstract</label>
                <label className='new-type'><input type='radio' name='type' />Interface</label>

                <label>Responsibilities (1 per line):</label>
                <textarea></textarea>

                <label>Collaborators (1 per line):</label>
                <textarea></textarea>

                <button>Add card</button>
            </div>
        );
    }
}

export default NewCardForm;
