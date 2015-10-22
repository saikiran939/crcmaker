import React from 'react';

import CardTypes from '../constants/cardtypes';


class NewCardForm extends React.Component {
    constructor (props) {
        super(props);

        if (this.props.data) {
            this.state = {
                index            : this.props.data.index,
                name             : this.props.data.name,
                super            : this.props.data.super,
                sub              : this.props.data.sub,
                type             : this.props.data.type,
                responsibilities : this.props.data.responsibilities,
                collaborators    : this.props.data.collaborators
            };
        } else {
            this.state = {
                index            : null,
                name             : '',
                super            : '',
                sub              : '',
                type             : CardTypes.NORMAL,
                responsibilities : '',
                collaborators    : ''
            };
        }

    }

    handleName (evt) {
        this.setState({
            name: evt.target.value
        });
    }

    handleSuper (evt) {
        this.setState({
            super: evt.target.value
        });
    }

    handleSub (evt) {
        this.setState({
            sub: evt.target.value
        });
    }

    handleType (evt) {
        this.setState({
            type: evt.target.value
        });
    }

    handleResponsibilities (evt) {
        this.setState({
            responsibilities: evt.target.value
        });
    }

    handleCollaborators (evt) {
        this.setState({
            collaborators: evt.target.value
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
            <div className='new-card'>
                <div className='new-card__form wrapper'>
                    <h2>New card</h2>

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
                        Normal
                    </label>
                    <label className='new-card__type'>
                        <input type='radio' name='type'
                            checked={this.state.type == CardTypes.ABSTRACT}
                            value={CardTypes.ABSTRACT}
                            onChange={this.handleType.bind(this)} />
                        Abstract
                    </label>
                    <label className='new-card__type'>
                        <input type='radio' name='type'
                            checked={this.state.type == CardTypes.INTERFACE}
                            value={CardTypes.INTERFACE}
                            onChange={this.handleType.bind(this)} />
                        Interface
                    </label>

                    <label>Responsibilities (1 per line):</label>
                    <textarea value={this.state.responsibilities} onChange={this.handleResponsibilities.bind(this)} />

                    <label>Collaborators (1 per line):</label>
                    <textarea value={this.state.collaborators} onChange={this.handleCollaborators.bind(this)} />

                    <button onClick={this.handleAdd.bind(this)}>Add card</button>
                    <button onClick={this.handleCancel.bind(this)}>Cancel</button>
                </div>
            </div>
        );
    }
}

export default NewCardForm;
