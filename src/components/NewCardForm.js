import React from 'react';
import ReactDOM from 'react-dom';

import CardTypes from '../constants/CardTypes';
import Dialog from './Dialog';

/**
 * The form for creating a new card, or editing an existing one.
 */
class NewCardForm extends React.Component {
    constructor (props) {
        super(props);

        // Card data is passed in if a card is being edited
        var data = this.props.data;

        this.state = {
            index            : data ? data.index : null,
            name             : data ? data.name : '',
            super            : data ? data.super : '',
            sub              : data ? data.sub : '',
            type             : data ? data.type : CardTypes.NORMAL,
            responsibilities : data ? data.responsibilities : '',
            collaborators    : data ? data.collaborators : ''
        };
    }

    componentDidMount () {
        this.elForm = ReactDOM.findDOMNode(this.refs.form);
    }

    handleName (e) {
        this.setState({
            name: e.target.value
        });
    }

    handleSuper (e) {
        this.setState({
            super: e.target.value
        });
    }

    handleSub (e) {
        this.setState({
            sub: e.target.value
        });
    }

    handleType (e) {
        this.setState({
            type: e.target.value
        });
    }

    handleResponsibilities (e) {
        this.setState({
            responsibilities: e.target.value
        });
    }

    handleCollaborators (e) {
        this.setState({
            collaborators: e.target.value
        });
    }

    handleAdd () {
        this.props.onAdd(this.state);
    }

    handleCancel () {
        this.props.onCancel();
    }

    render () {
        return (
            <Dialog title='New card' onClose={this.props.onCancel}>
                <label>Class name:</label>
                <input type='text' value={this.state.name} onChange={this.handleName.bind(this)} />

                <label>Superclasses:</label>
                <input type='text' value={this.state.super} onChange={this.handleSuper.bind(this)} />

                <label>Subclasses:</label>
                <input type='text' value={this.state.sub} onChange={this.handleSub.bind(this)} />

                <label>Type:</label>
                <label className='new-card__type'>
                    <input type='radio' name='type'
                        checked={this.state.type == CardTypes.NORMAL}
                        value={CardTypes.NORMAL}
                        onChange={this.handleType.bind(this)} />
                    <span>Normal</span>
                </label>
                <label className='new-card__type'>
                    <input type='radio' name='type'
                        checked={this.state.type == CardTypes.ABSTRACT}
                        value={CardTypes.ABSTRACT}
                        onChange={this.handleType.bind(this)} />
                    <span>Abstract</span>
                </label>
                <label className='new-card__type'>
                    <input type='radio' name='type'
                        checked={this.state.type == CardTypes.INTERFACE}
                        value={CardTypes.INTERFACE}
                        onChange={this.handleType.bind(this)} />
                    <span>Interface</span>
                </label>

                <label>Responsibilities (1 per line):</label>
                <textarea value={this.state.responsibilities} onChange={this.handleResponsibilities.bind(this)} />

                <label>Collaborators (1 per line):</label>
                <textarea value={this.state.collaborators} onChange={this.handleCollaborators.bind(this)} />

                <div className='new-card__actions'>
                    <button onClick={this.handleAdd.bind(this)}>Save card</button>
                    <button onClick={this.handleCancel.bind(this)}>Cancel</button>
                </div>
            </Dialog>
        );
    }
}

export default NewCardForm;
