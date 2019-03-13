import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import './Header.less'

class Header extends PureComponent {
  render() {
    return (
      <header className='n-back_header'>
        DUAL N-BACK N={this.props.playLevel}
      </header>
    );
  }
}

Header.propTypes = {
  playLevel:PropTypes.number.isRequired
};

export default connect(
  (state)=>({
    playLevel:state.playInfo.playLevel,
  }),
  {}
)(Header)