import React from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';

import './Header.less'

function Header (props){
  return (
    <header className='n-back_header'>
      DUAL N-BACK N={props.playLevelArr[1]}
    </header>
  );
}

Header.propTypes = {
  playLevelArr:PropTypes.array.isRequired
};

export default connect(
  (state)=>({
    playLevelArr:state.playInfo.playLevelArr,
  }),
  {}
)(Header)