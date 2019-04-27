import React,{useRef,useEffect,useState} from 'react';
import PropTypes from 'prop-types';
// 引入连接函数
import {connect} from 'react-redux'

import Start from '../Start/Start'
import Help from '../Help/Help'

import './Result.less'
import dingSrc from './audio/ding.mp3'

function Result (props) {
  const levelDom = useRef(null)
  const dingAudio = useRef(null)
  const [show,setShow] = useState(false)

  const {playResultList} = props
  const result = playResultList[playResultList.length-1]
  const [prevLevel,nowLevel] = props.playLevelArr
  console.log(props.playLevelArr)

  const showHelp = function(){
    setShow(true)
  }

  useEffect(() => {
    if(prevLevel !== nowLevel){
      setTimeout(() => {
        dingAudio.current.play()
        levelDom.current.innerHTML = `N=${nowLevel}`
      },200)
    }

    function animeEnd(){
      levelDom.current.parentNode.style.opacity='0'
    }
    function transEnd(){
      levelDom.current.parentNode.style.display='none'
    }
    levelDom.current.addEventListener('animationend',animeEnd) 
    levelDom.current.parentNode.addEventListener('transitionend',transEnd) 
    return () => {
      levelDom.current.removeEventListener('animationend',animeEnd)
      levelDom.current.parentNode.removeEventListener('transitionend',transEnd)
    }
  })
  return (
    <section className='n-back_result_container'>
      <div className="result_masking">
        <div className='level' ref={levelDom} >N={prevLevel}</div>
        <audio src={dingSrc} ref = {dingAudio} preload='auto'></audio>
      </div>
      
      <div className="result_detail">
        <span className="result_explanation"><i className='iconfont icon-query' onTouchStart={showHelp}></i></span>
        <span className="result_share"><i className='iconfont icon-share'></i></span>
        {/* <ul className="result_list">
          <li className="result_item result_correct">
            <i className='iconfont icon-eye'></i>
            <span>{result.visualMatchCorrect}</span>
          </li>
          <li className="result_item result_correct">
            <i className='iconfont icon-ear'></i>
            <span>{result.auralMatchCorrect}</span>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-eye'></i>
            <span>{result.visualMatchMiss}</span>
            <i className='iconfont icon-minus eye'></i>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-ear'></i>
            <span>{result.auralMatchMiss}</span>
            <i className='iconfont icon-minus ear'></i>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-eye'></i>
            <span>{result.visualMatchMistake}</span>
            <i className='iconfont icon-plus eye'></i>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-ear'></i>
            <span>{result.auralMatchMistake}</span>
            <i className='iconfont icon-plus ear'></i>
          </li>
        </ul>  */}
      </div>
      <div className="play_again_container">
        <Start history={props.history}></Start>
      </div>
      {show?<Help setShow={setShow} ></Help>:null}
    </section>
  );
}

Result.propTypes = {
  playResultList: PropTypes.array.isRequired,
  playLevelArr:PropTypes.array.isRequired,
};


export default connect(
  state => ({
    playResultList: state.playInfo.playResultList,
    playLevelArr:state.playInfo.playLevelArr,
  }), //自动解构变成play的属性
  {}  //自动结构变成play的方法
)(Result)