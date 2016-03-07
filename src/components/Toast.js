import autobind from 'autobind-decorator';
import React from 'react';

@autobind
class Toast extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      visible: props.visible
    };

    // TODO: Handle timeout
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.visible !== this.props.visible) {
      // TODO: Handle visibility change
    }
  }

  render () {
    return this.state.visible ?
      <div className='toast'>{this.props.children}</div> :
      null;
  }
}

export default Toast;
