import React, { useState,useRef,useEffect } from 'react';
import {useInterval} from '../../../utils/hooks-utils.js'
import PropTypes from 'prop-types';

// 引入连接函数
import {connect} from 'react-redux'
// 引入action函数
import {updatePlayResultList,updatePlayLevelArr,updatePlayTime} from './PlayRedux'

import './Play.less'
import clickSrc from './audio/click.mp3'
import alphabetSrc from './audio/alphabet.mp3'

function Play (props){
  // constants
  const SUDOKU_MAP = [1,2,3,4,5,6,7,8,9]
  const MAX_MATCH = 5
  // state
  const [playLevel] = useState(props.playLevelArr[1])
  const [aural,setAural] = useState({
    type:'aural',
    arr:[],
    matchTime:0,
    isMatching:false,
    matchCorrect:0,
    matchMistake:0,
    isBtnDown:false,
  })
  const [visual,setVisual] = useState({
    type:'visual',
    arr:[],
    matchTime:0,
    isMatching:false,
    matchCorrect:0,
    matchMistake:0,
    isBtnDown:false,
  })
  // interval state
  const [delay,setDelay] = useState(1000)
  // DOM
  const visualBtn = useRef(null)
  const auralBtn = useRef(null)
  const sudokuList = useRef(null)
  const visualClick = useRef(null)
  const auralClick = useRef(null)
  const alphabetAudio = useRef(null)

  // btn 点击事件
  const handleTouch = (playState,setPlayState,e) =>{
    let event = e || window.event
    let {isMatching,isBtnDown,matchCorrect,matchMistake} = playState
    if(!isBtnDown){
      event.target.parentNode.classList.add('active')
      isBtnDown = true

      if(playState.type === 'visual'){
        visualClick.current.play()
      }else{
        auralClick.current.play()
      }

      if(isMatching){ // 成功匹配
        matchCorrect++
      }else{ // 匹配失败
        matchMistake++
      }
      setPlayState({...playState,isMatching,isBtnDown,matchCorrect,matchMistake})
    }else{
      // active之后不可以再次点击，点击无法触发效果
      return
    }
  }
 
  // side effects 
  // 逻辑聚合
  // 对 useInterval 的控制
  useEffect(() => {
    // 准备时间 1000ms
    setTimeout(() => {
      setDelay(3000)
    },1000) 
  },[])
  // 3000ms
  let randomInterval = useInterval(() => {
    // 判断是否需要继续游戏
     if( visual.matchTime>MAX_MATCH-1 && aural.matchTime>MAX_MATCH-1){
      // 游戏结束，清除定时器
      clearInterval(randomInterval)

      // 调用游戏结算函数
      const playResult = {
        visualMatchCorrect:visual.matchCorrect,
        visualMatchMistake:visual.matchMistake,
        visualMatchMiss:MAX_MATCH-visual.matchCorrect,
        auralMatchCorrect:aural.matchCorrect,
        auralMatchMistake:aural.matchMistake,
        auralMatchMiss:MAX_MATCH-aural.matchCorrect,
      }
      // 获取之前的playResultList
      const {playResultList,playTime} = props
      const prevPlayLevel = playLevel
      playSettlement(playResultList,playResult,prevPlayLevel,playTime)
      
      // 跳转到result界面
      props.history.push('/result')
    }else{
      // 继续游戏
      randomActive()
    }
  },delay)

  //提取逻辑函数
  // 色块随机变换逻辑
  const randomActive = () => {

    const auralIndex = randomLogic(aural,setAural)
    const visualIndex = randomLogic(visual,setVisual)
    
    // 清除按钮的状态
    visualBtn.current.classList.remove('active')
    auralBtn.current.classList.remove('active')

    // aural 的变化逻辑
    alphabetAudio.current.currentTime = auralIndex
    alphabetAudio.current.play()
    setTimeout(() => {
      alphabetAudio.current.pause()
    },800)

    // visual 的变化逻辑
    sudokuList.current.children[visualIndex].classList.add('active')
    setTimeout(() => {
      sudokuList.current.children[visualIndex].classList.remove('active')
    },1000)
  } 

  const randomLogic = (playState,setPlayState) => {
    // const copyState = {...playState}
    let {arr,matchTime,isMatching,isBtnDown} = playState
    // 生成随机索引
    let _randomIndex = Math.round(Math.random()*8)
    if(_randomIndex===4){
      _randomIndex = 8
    }
    // 控制队列的状态
    if(arr.length===playLevel){
      // randomEqual
      const _randomEqual = Math.round(Math.random()*2) // {0,1,2}
      if(_randomEqual===1){
        _randomIndex = arr[0]
      }
      // match
      if(_randomIndex === arr[0]){ // 当没有match的时候，还是可能会出现0和8的
        if(matchTime<MAX_MATCH){
          console.log(`${playState.type}MatchTime:${matchTime}`)
          matchTime++
          isMatching = true
        }else{
          // match已经等于5，需要使得randomIndex不等于第一个,同时还要属于[0,8]
          if(_randomIndex<3){ // {0，1，2}
            _randomIndex++
          }else if(_randomIndex>5){ // {6，7，8}
            _randomIndex--
          }else {  // 3 || 5
            _randomIndex +=2
          }
        }
      }else if(_randomIndex !== arr[0]){ //不匹配
        isMatching = false
      }
      // 不论是否匹配第一个都会被删除
      arr.shift()
    }
    // 进入队列
    arr =  [...arr,_randomIndex]
    // console.log(arr)
    isBtnDown = false
    setPlayState({...playState,arr,matchTime,isMatching,isBtnDown})

    return _randomIndex
  }

  // 游戏结算逻辑
  const playSettlement = (playResultList,playResult,prevPlayLevel,playTime) => {
    let nowPlayLevel = prevPlayLevel
    const newList = generateNewList(playResultList,playResult)
    // 根据newList 计算出正确的次数
    const totalCorrect =   newList.reduce((acc,playResult) => {
      return acc + playResult.visualMatchCorrect + playResult.auralMatchCorrect
    },0)
    // 根据newList 计算出错误的次数
    const totalMistake =   newList.reduce((acc,playResult) => {
      return (
        acc + 
        playResult.visualMatchMistake + 
        playResult.visualMatchMiss + 
        playResult.auralMatchMistake +
        playResult.auralMatchMiss
      )
    },0)
    console.log(totalCorrect)
    console.log(totalMistake)
    // 计算平均正确率
    const correctRate = totalCorrect/(newList.length*MAX_MATCH*2+totalMistake)
    console.log(correctRate)
    if(correctRate>0.8){
      nowPlayLevel++
    }
    // 分发更新 playLevel 的action
    props.updatePlayLevelArr([prevPlayLevel,nowPlayLevel])
    // 分发更新 playResultList 的action
    props.updatePlayResultList(newList)
    // 分发增加 playTime 的action
    props.updatePlayTime(playTime+1)

    // 定义一个函数，专门用于产生newList
    function generateNewList(playResultList,playResult){
      if(playResultList.length<MAX_MATCH){
        return [...playResultList,playResult]
      }else{
        return [...playResultList.shift(),playResult]
      }
    }
    
  } 

  return (
    <section className='n-back_play_container'>
      <audio src={clickSrc} ref={visualClick} preload='auto' ></audio>
      <audio src={clickSrc} ref={auralClick} preload='auto' ></audio>
      <audio src={alphabetSrc} ref={alphabetAudio} preload='auto' ></audio>
      <ul 
        className="n-back_sudoku_list"
        ref={sudokuList}
      >
        {
          SUDOKU_MAP.map((index) => {
            return  <li 
                      className={`sudoku_item ${index===5?'':'touch_item'}`} 
                      key={index} 
                    >
                    </li> 
          })
        }
      </ul>
      <div className="n-back_console_btns">
        <div className="visual_btn" ref={visualBtn}>
          <i className='iconfont icon-eye' onTouchStart={(e) => {handleTouch(visual,setVisual,e)}} ></i>
        </div>
        <div className="aural_btn" ref={auralBtn}>
          <i className='iconfont icon-ear' onTouchStart={(e) => {handleTouch(aural,setAural,e)}}></i>
        </div>
      </div>
    </section>
  );
}

Play.propTypes = {
  // state
  playResultList: PropTypes.array.isRequired,
  playLevelArr: PropTypes.array.isRequired,
  playTime: PropTypes.number.isRequired,
  // action
  updatePlayResultList: PropTypes.func.isRequired,
  updatePlayTime: PropTypes.func.isRequired,
  updatePlayLevelArr: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    playResultList: state.playInfo.playResultList,
    playLevelArr: state.playInfo.playLevelArr,
    playTime:state.playInfo.playTime
  }), //自动结构变成play的属性
  {
    updatePlayResultList,
    updatePlayTime,
    updatePlayLevelArr,
  }  //自动结构变成play的方法
)(Play)