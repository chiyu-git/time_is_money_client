import React, { useRef , useEffect} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'

import {updatePlayLevelArr,updatePlayResultList,updatePlayTime} from '../Play/PlayRedux'

import './Start.less'

function Start (props){
  const playBtn = useRef(null)

  const handleTouch = (ev) =>{
    playBtn.current.classList.add('active')
  } 

    // 读取并设置本地游戏数据，用于显示，playLevel 和 playTime
    useEffect(() => {
      // 读取到的是字符串null？
      if(localStorage.getItem('playLevelArr')!=='null'){
        const playResultList = JSON.parse(localStorage.getItem('playResultList'))
        const playLevel = JSON.parse(localStorage.getItem('playLevelArr'))
        const playTime = JSON.parse(localStorage.getItem('playTime'))
        props.updatePlayResultList(playResultList)
        props.updatePlayLevelArr(playLevel)
        props.updatePlayTime(playTime)
      }
    },[])

  return (
    <section className='n-back_start_container'>
      <div className='n-back_play_info_container'>
        <div className="play_info">
          <span className='play_level'>N={props.playLevelArr[1]}</span>
          <span className='play_times'>{`${props.playTime}/20`}</span>
        </div>
      </div>
      <div className='n-back_play_btn' onTouchStart={handleTouch} ref={playBtn}>
        <Link to='/play'><i className='iconfont icon-play'></i></Link>
      </div>
    </section>
  )

}

Start.propTypes = {
  // state
  playTime:PropTypes.number.isRequired,
  playLevelArr:PropTypes.array.isRequired,
  // action
  updatePlayLevelArr:PropTypes.func.isRequired,
  updatePlayResultList:PropTypes.func.isRequired,
  updatePlayTime:PropTypes.func.isRequired,
};

export default connect(
  (state)=>({
    playTime:state.playInfo.playTime,
    playLevelArr:state.playInfo.playLevelArr,
  }),
  {
    updatePlayLevelArr,
    updatePlayResultList,
    updatePlayTime,
  }
)(Start)