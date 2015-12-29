import autobind from 'autobind-decorator';
import React from 'react';
import ReactDOM from 'react-dom';

/**
 * A modal dialog window.
 */
@autobind
class Dialog extends React.Component {
    constructor (props) {
        super(props);
    }

    componentDidMount () {
        this.elDialog = ReactDOM.findDOMNode(this.refs.dialog);
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
                <div className='dialog__window' ref='dialog'>
                    <h2 className='dialog__title'>{this.props.title}</h2>

                    {this.props.children}
                </div>
            </div>
        );
    }
}

export default Dialog;
