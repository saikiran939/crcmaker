import { bind } from 'decko';
import React from 'react';
import { findDOMNode } from 'react-dom';

import CardTypes from '../constants/CardTypes';
import Dialog from './Dialog';

/**
 * The form for creating a new card, or editing an existing one.
 */
class NewCardForm extends React.Component {
  componentDidMount () {
    this.elName             = findDOMNode(this.refs.name);
    this.elSuper            = findDOMNode(this.refs.superclasses);
    this.elSub              = findDOMNode(this.refs.subclasses);
    this.elTypeNormal       = findDOMNode(this.refs.type_normal);
    this.elTypeAbstract     = findDOMNode(this.refs.type_abstract);
    this.elTypeInterface    = findDOMNode(this.refs.type_interface);
    this.elResponsibilities = findDOMNode(this.refs.responsibilities);
    this.elCollaborators    = findDOMNode(this.refs.collaborators);
  }

  @bind
  add () {
    var type = CardTypes.NORMAL;
    if (this.elTypeAbstract.checked) {
      type = CardTypes.ABSTRACT;
    } else if (this.elTypeInterface.checked) {
      type = CardTypes.INTERFACE;
    }

    this.props.onAdd({
      name             : this.elName.value,
      superclasses     : this.elSuper.value,
      subclasses       : this.elSub.value,
      type             : type,
      responsibilities : this.elResponsibilities.value.split('\n'),
      collaborators    : this.elCollaborators.value.split('\n')
    });
  }

  @bind
  cancel () {
    if (window.confirm('Are you sure you want to close the editor? You will lose any progress.')) {
      this.props.onCancel();
    }
  }

  render () {
    const data = this.props.data;

    return (
      <Dialog title='New card' onClose={this.cancel}>
        <label>Class name:</label>
        <input ref='name' type='text' defaultValue={data ? data.name : ''} />

        <label>Superclasses:</label>
        <input ref='superclasses' type='text' defaultValue={data ? data.super : ''} />

        <label>Subclasses:</label>
        <input ref='subclasses' type='text' defaultValue={data ? data.sub : ''} />

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
          <button onClick={this.add}>Save card</button>
          <button onClick={this.cancel}>Cancel</button>
        </div>
      </Dialog>
    );
  }
}

export default NewCardForm;
