import autobind from 'autobind-decorator';
import React from 'react';
import ReactDOM from 'react-dom';

import CardTypes from '../constants/CardTypes';
import Dialog from './Dialog';

/**
 * The form for creating a new card, or editing an existing one.
 */
@autobind
class NewCardForm extends React.Component {
    componentDidMount () {
        this.elName             = ReactDOM.findDOMNode(this.refs.name);
        this.elSuper            = ReactDOM.findDOMNode(this.refs.super);
        this.elSub              = ReactDOM.findDOMNode(this.refs.sub);
        this.elTypeNormal       = ReactDOM.findDOMNode(this.refs.type_normal);
        this.elTypeAbstract     = ReactDOM.findDOMNode(this.refs.type_abstract);
        this.elTypeInterface    = ReactDOM.findDOMNode(this.refs.type_interface);
        this.elResponsibilities = ReactDOM.findDOMNode(this.refs.responsibilities);
        this.elCollaborators    = ReactDOM.findDOMNode(this.refs.collaborators);
    }

    handleAdd () {
        var type = CardTypes.NORMAL;
        if (this.elTypeAbstract.checked) {
            type = CardTypes.ABSTRACT;
        } else if (this.elTypeInterface.checked) {
            type = CardTypes.INTERFACE;
        }

        this.props.onAdd({
            name             : this.elName.value,
            super            : this.elSuper.value,
            sub              : this.elSub.value,
            type             : type,
            responsibilities : this.elResponsibilities.value.split('\n'),
            collaborators    : this.elCollaborators.value.split('\n')
        });
    }

    handleCancel () {
        this.props.onCancel();
    }

    render () {
        const data = this.props.data;

        return (
            <Dialog title='New card' onClose={this.props.onCancel}>
                <label>Class name:</label>
                <input ref='name' type='text' defaultValue={data ? data.name : ''} />

                <label>Superclasses:</label>
                <input ref='super' type='text' defaultValue={data ? data.super : ''} />

                <label>Subclasses:</label>
                <input ref='sub' type='text' defaultValue={data ? data.sub : ''} />

                <label>Type:</label>
                <label className='new-card__type'>
                    <input ref='type_normal' type='radio' name='type'
                        defaultChecked={data ? data.type == CardTypes.NORMAL : true}
                        value={CardTypes.NORMAL} />
                    <span>Normal</span>
                </label>
                <label className='new-card__type'>
                    <input ref='type_abstract' type='radio' name='type'
                        defaultChecked={data ? data.type == CardTypes.ABSTRACT : false}
                        value={CardTypes.ABSTRACT} />
                    <span>Abstract</span>
                </label>
                <label className='new-card__type'>
                    <input ref='type_interface' type='radio' name='type'
                        defaultChecked={data ? data.type == CardTypes.INTERFACE : false}
                        value={CardTypes.INTERFACE} />
                    <span>Interface</span>
                </label>

                <label>Responsibilities (1 per line):</label>
                <textarea ref='responsibilities' defaultValue={data ? data.responsibilities : ''} />

                <label>Collaborators (1 per line):</label>
                <textarea ref='collaborators' defaultValue={data ? data.collaborators : ''} />

                <div className='new-card__actions'>
                    <button onClick={this.handleAdd}>Save card</button>
                    <button onClick={this.handleCancel}>Cancel</button>
                </div>
            </Dialog>
        );
    }
}

export default NewCardForm;
