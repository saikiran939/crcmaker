import React, { Component } from 'react';
import { findDOMNode } from 'react-dom';

import Dialog from './Dialog';
/**
 * A modal dialog window for import
 */
export default class ImportCards extends Component {
  constructor (props) {
    super(props);
    this.save = this.save.bind(this);
    this.onEsc = this.onEsc.bind(this);
    this.close = this.close.bind(this);
  }

  componentDidMount () {
    this.elCardsJSON = findDOMNode(this.refs.importCardsJSON)
    document.body.addEventListener('keydown', this.onEsc);
  }

  save(){
    const json = this.elCardsJSON.value;
    this.props.onSave(json)
  }

  close(){
    this.props.onClose();
  }

  componentWillUnmount () {
    document.body.removeEventListener('keydown', this.onEsc);
  }

  onEsc (e) {
    e = e || window.event;
    if (e.keyCode == 27) {
      this.props.onClose();
    }
  }

  render () {
    return (
      <Dialog title='Import JSON' onClose={this.close}>
        <textarea id='text-import' className='syntax' ref='importCardsJSON'/>

        <button className='save' onClick={this.save}>Save</button>
        <button onClick={this.close}>Close</button>
      </Dialog>
    );
  }
}
