import React, { useRef , useEffect , useState} from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom'
import Help from '../Help/Help'
import Rule from './Rule/Rule'

import {updatePlayLevelArr,updatePlayResultList,updatePlayTime} from '../Play/PlayRedux'

import './Start.less'

function Start (props){
  const playBtn = useRef(null)
  const [show,setShow] = useState(false)
  const handleTouch = (ev) =>{
    playBtn.current.classList.add('active')
    props.history.push('play')
  } 
  const showHelp = function(){
    setShow(true)
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
      <div className='play_info_container'>
        <span className="play_rule" onTouchStart={showHelp}>HELP</span>
        <div className="play_info">
          <span className='play_level'>N={props.playLevelArr[1]}</span>
          <span className='play_times'>{`${props.playTime}/20`}</span>
        </div>
      </div>
      <div className='play_btn' onTouchStart={handleTouch} ref={playBtn}>
        <Link to='/play'><i className='iconfont icon-play'></i></Link>
      </div>
      {show?<Help setShow={setShow} info={<Rule/>} title={'HELP'}></Help>:null}
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