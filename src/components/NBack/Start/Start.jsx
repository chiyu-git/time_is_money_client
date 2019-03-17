import React, { useRef } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'


import './Start.less'

function Start (props){
  const playBtn = useRef(null)

  const handleTouch = (ev) =>{
    playBtn.current.classList.add('active')
  } 

  return (
    <section className='n-back_start_container'>
      <div className='n-back_play_info_container'>
        <div className="play_info">
          <span className='play_level'>N={props.playLevelArr[1]}</span>
          <span className='play_times'>{`${props.playTime}/20`}</span>
        </div>
      </div>
      <div className='n-back_play_btn' onTouchStart={handleTouch} ref={playBtn}>
        <NavLink to='/play'><i className='iconfont icon-play'></i></NavLink>
      </div>
    </section>
  )

}

Start.propTypes = {
  playTime:PropTypes.number.isRequired,
  playLevelArr:PropTypes.array.isRequired,
};

export default connect(
  (state)=>({
    playTime:state.playInfo.playTime,
    playLevelArr:state.playInfo.playLevelArr,
  }),
  {}
)(Start)