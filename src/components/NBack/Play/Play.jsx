import React, { useState,useRef,useEffect } from 'react';
import PropTypes from 'prop-types';

// 引入连接函数
import {connect} from 'react-redux'
// 引入action函数
import {updatePlayResultList,updatePlayLevel,increasePlayTime} from './PlayRedux'

import './Play.less'

function Play (props){
  // constant
  const SUDOKU_MAP = [1,2,3,4,5,6,7,8,9]
  // state
  const [playLevel] = useState(props.playLevel)
  const [sudokuArr,setSudokuArr] = useState([])
  const [matchTime,setMatchTime] = useState(0)
  const [isMatching,setIsMatching] = useState(false)
  const [visualMatchCorrect,setVisualMatchCorrect] = useState(0)
  const [visualMatchMistake,setVisualMatchMistake] = useState(0)
  const [isVisualBtnDown,setIsVisualBtnDown] = useState(0)
  // DOM
  const visualBtn = useRef()
  const auralBtn = useRef()
  const sudokuList = useRef()

  // visualBtn 点击事件
  const visualBtnTouch = () =>{
    // relativeState : isVisualBtnDown,isMatching,visualMatchCorrect,visualMatchMistake
    if(!isVisualBtnDown){
      visualBtn.current.classList.add('active')
      setIsVisualBtnDown(true)

      if(isMatching){ // 成功匹配
        setVisualMatchCorrect(visualMatchCorrect+1)
      }else{ // 匹配失败
        setVisualMatchMistake(visualMatchMistake+1)
      }
    }else{
      // active之后不可以再次点击，点击无法触发效果
      return
    }
  }
 
  // side effects
  // 逻辑聚合
  useEffect(() => {
    // 准备时间 1000ms
    setTimeout(() => {
      randomActive()
      // 3000ms
      let randomInterval = setInterval(() => {
        
        // 判断是否需要继续游戏
        if(matchTime>4){
          // 游戏结束，清除定时器
          clearInterval(randomInterval)

          console.log(visualMatchCorrect,visualMatchMistake);

          // 调用游戏结算函数
          const playResult = {visualMatchCorrect,visualMatchMistake}
          const {playResultList} = props
          playSettlement(playResultList,playResult,playLevel)
          
          // 跳转到result界面
          props.history.push('/result')
        }else{
          // 继续游戏
          randomActive()
        }
      },3000)
    },1000)
  },[]) 

  //提取逻辑函数
  // 色块随机变换逻辑
   const randomActive = () => {
    // playLevel,sudokuArr,matchTime

    // 生成随机索引
    let _randomIndex = Math.round(Math.random()*7)
    if(_randomIndex===4){
      _randomIndex = 8
    }

    // 控制队列的状态
    if(sudokuArr.length===playLevel){

      // randomEqual
      const _randomEqual = Math.round(Math.random()*2) // {0,1,2}
      if(_randomEqual===1){
        _randomIndex = sudokuArr[0]
      }

      // match
      if(_randomIndex === sudokuArr[0]){ // 当没有match的时候，还是可能会出现0和8的
        if(matchTime<5){
          setMatchTime(matchTime+1)
          setIsMatching(true)
          console.log('matchTime:'+matchTime)
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
      }else if(_randomIndex !== sudokuArr[0]){ //不匹配
        setIsMatching(false)
      }

      // 不论如何第一个都会被剔除,仅使用shift方法不可以更新，因为是state
      sudokuArr.shift()
      // 这样是否ok呢？state 是常量，使用了 shift() 方法
      setSudokuArr(sudokuArr)
    }

    // 进入队列
    setSudokuArr([...sudokuArr,_randomIndex])
    setIsVisualBtnDown(false)

    // 清除按钮的状态
    visualBtn.current.classList.remove('active')

    // 改变方格当前状态
    sudokuList.current.children[_randomIndex].classList.add('active')
    // 延时清除方格状态
    setTimeout(() => {
      sudokuList.current.children[_randomIndex].classList.remove('active')
    },1000)
  }

  // 游戏结算逻辑
  const playSettlement = (playResultList,playResult,playLevel) => {
    // 定义一个函数，专门用于产生newList
    function generateNewList(playResultList,playResult){
      if(playResultList.length<5){
        return [...playResultList,playResult]
      }else{
        return [...playResultList.shift(),playResult]
      }
    }

    const newList = generateNewList(playResultList,playResult)
    // 根据newList 计算出正确的次数
    const totalCorrect =   newList.reduce((acc,playResult) => {
      return acc + playResult.visualMatchCorrect
    },0)
    // 根据newList 计算出错误的次数
    const totalMistake =   newList.reduce((acc,playResult) => {
      return acc + playResult.visualMatchMistake + (5-playResult.visualMatchCorrect)
    },0)
    // 计算平均正确率
    const correctRate = totalCorrect/(newList.length*5+totalMistake)

    if(correctRate>0.8){
      playLevel++
      // 分发更新 playLevel 的action
      props.updatePlayLevel(playLevel)
    }

    // 分发更新 playResultList 的action
    props.updatePlayResultList(newList)
    // 分发增加 playTime 的action
    props.increasePlayTime()
  } 



  return (
    <section className='n-back_play_container'>
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
          <i className='iconfont icon-eye' onTouchStart={visualBtnTouch} ></i>
        </div>
        <div className="aural_btn" ref={auralBtn}>
          <i className='iconfont icon-ear'></i>
        </div>
      </div>
    </section>
  );
}

Play.propTypes = {
  // state
  playResultList: PropTypes.array.isRequired,
  playLevel: PropTypes.number.isRequired,
  // action
  updatePlayResultList: PropTypes.func.isRequired,
  increasePlayTime: PropTypes.func.isRequired,
  updatePlayLevel: PropTypes.func.isRequired,
};

export default connect(
  state => ({
    playResultList: state.playInfo.playResultList,
    playLevel: state.playInfo.playLevel,
  }), //自动结构变成play的属性
  {
    updatePlayResultList,
    increasePlayTime,
    updatePlayLevel,
  }  //自动结构变成play的方法
)(Play)
