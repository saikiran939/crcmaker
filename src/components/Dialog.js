import autobind from 'autobind-decorator';
import React from 'react';
import { findDOMNode } from 'react-dom';

/**
 * A modal dialog window.
 */
@autobind
class Dialog extends React.Component {
  componentDidMount () {
    this.elDialog = findDOMNode(this.refs.dialog);

    document.body.addEventListener('keydown', this.onEsc);
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

  onOverlayClick (e) {
    // Close (i.e. cancel) the dialog if the outer overlay is clicked
    if (!this.elDialog.contains(e.target)) {
      this.props.onClose();
    }
  }

  render () {
    return (
      <div className='dialog' onClick={this.onOverlayClick}>
        <div ref='dialog' className='dialog__window'>
          <h2 className='dialog__title'>{this.props.title}</h2>

          {this.props.children}
        </div>
      </div>
    );
  }
}

export default Dialog;
