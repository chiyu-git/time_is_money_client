import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {NavLink} from 'react-router-dom'


import './Start.less'


class Start extends PureComponent {

  handleTouch = (ev) =>{
    this.playBtn.classList.add('active')
  } 

  render() {
    return (
      <section className='n-back_start_container'>
        <div className='n-back_train_info_container'>
          <div className="train_info">
            <span className='train_level'>N={this.props.playLevel}</span>
            <span className='train_times'>{`${this.props.playTime}/20`}</span>
          </div>
        </div>
        <div className='n-back_play_btn' onTouchStart={this.handleTouch} ref={(playBtn)=>{this.playBtn=playBtn}}>
          <NavLink to='/play'><i className='iconfont icon-play'></i></NavLink>
          {/* <i className='iconfont icon-play' onTouchStart={this.handleTouch}></i> */}
        </div>
      </section>
    )
  }
}

Start.propTypes = {
  playTime:PropTypes.number.isRequired,
  playLevel:PropTypes.number.isRequired,
};

export default connect(
  (state)=>({
    playTime:state.playInfo.playTime,
    playLevel:state.playInfo.playLevel,
  }),
  {}
)(Start)