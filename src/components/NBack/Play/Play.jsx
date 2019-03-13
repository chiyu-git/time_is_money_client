import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

// 引入连接函数
import {connect} from 'react-redux'
// 引入action函数
import {updatePlayResultList,updatePlayLevel,increasePlayTime} from './PlayRedux'

import './Play.less'

class Play extends PureComponent {

  sudokuMap = [1,2,3,4,5,6,7,8,9]

  state = {
    playLevel: this.props.playLevel, // 记录级别
    sudokuArr:[], // 用于记录index的队列
    matchTime: 0, //记录match的次数
    isMatching: false, // 标志是否可以匹配
    visualMatchCorrect: 0 , // 记录视觉匹配成功的次数
    visualMatchMistake: 0 , // 记录视觉匹配错误的次数
    isVisualBtnDown:false, // 标志visualBtn的状态
  }
  // 事件
  visualBtnTouch = () =>{
    let {isVisualBtnDown,isMatching,visualMatchCorrect,visualMatchMistake} = this.state
    if(!isVisualBtnDown){
      this.visualBtn.classList.add('active')
      this.setState({isVisualBtnDown:true})

      if(isMatching){ // 成功匹配
        this.setState({visualMatchCorrect:visualMatchCorrect+1})
      }else{ // 匹配失败
        this.setState({visualMatchMistake:visualMatchMistake+1})
      }
      

    }else{
      // active之后不可以再次点击，点击无法触发效果
      return
    }
  }

  /* 抽象函数 */
  // 色块随机变换逻辑
  randomActive = () => {
    
    let {playLevel,sudokuArr,matchTime} = this.state

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
          this.setState({matchTime:++matchTime,isMatching:true})
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
        this.setState({isMatching:false})
      }

      // 不论如何第一个都会被剔除,仅使用shift方法不可以更新，因为是state
      sudokuArr.shift()
      this.setState({sudokuArr:sudokuArr})
    }

    // 获取最新的状态
    sudokuArr = this.state.sudokuArr
    // 进入队列
    this.setState({
      sudokuArr:[...sudokuArr,_randomIndex],
      isVisualBtnDown:false,
    })
    // 清除按钮的状态
    this.visualBtn.classList.remove('active')

    // 改变当前状态
    this.sudokuList.children[_randomIndex].classList.add('active')
    // 延时清除状态
    setTimeout(() => {
      this.sudokuList.children[_randomIndex].classList.remove('active')
    },1000)
  }

  // 游戏结算逻辑
  playSettlement = (playResultList,playResult,playLevel) => {
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
      this.props.updatePlayLevel(playLevel)
    }

    // 分发更新 playResultList 的action
    this.props.updatePlayResultList(newList)
    // 分发增加 playTime 的action
    this.props.increasePlayTime()
  }


  componentDidMount(){
    
    // 准备时间 1000ms
    setTimeout(() => {
      this.randomActive()
      // 3000ms
      let randomInterval = setInterval(() => {
        // 获取最新的state才行
        const {matchTime,visualMatchCorrect,visualMatchMistake} = this.state
        // 判断是否需要继续游戏
        if(matchTime>4){
          // 游戏结束，清除定时器
          clearInterval(randomInterval)

          console.log(visualMatchCorrect,visualMatchMistake);

          // 调用游戏结算函数
          const playResult = {visualMatchCorrect,visualMatchMistake}
          const {playResultList} = this.props
          this.playSettlement(playResultList,playResult,this.state.playLevel)
          
          // 跳转到result界面
          this.props.history.push('/result')
        }else{
          // 继续游戏
          this.randomActive()
        }
      },3000)
    },1000)

  }

  render() {
    const {sudokuMap} = this
 
    return (
      <section className='n-back_play_container'>
        <ul 
          className="n-back_sudoku_list"
          ref={sudokuList => this.sudokuList = sudokuList}
        >
          {
            sudokuMap.map((index) => {
              return  <li 
                        className={`sudoku_item ${index===5?'':'touch_item'}`} 
                        key={index} 
                      >
                      </li> 
            })
          }
        </ul>
        <div className="n-back_console_btns">
          <div className="visual_btn" ref={visualBtn=>this.visualBtn = visualBtn}>
            <i className='iconfont icon-eye' onTouchStart={this.visualBtnTouch}></i>
          </div>
          <div className="aural_btn" ref={auralBtn=>this.auralBtn = auralBtn}>
            <i className='iconfont icon-ear'></i>
          </div>
        </div>
      </section>
    );
  }
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
