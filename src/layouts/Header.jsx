import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import './Header.less'

function Header (props){
  return (
    <header className='n-back_header'>
      DUAL N-BACK N={props.playLevel}
    </header>
  );
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