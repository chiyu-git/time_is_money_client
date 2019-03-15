import React from 'react';
import PropTypes from 'prop-types';
// 引入连接函数
import {connect} from 'react-redux'

import Start from '../Start/Start'

import './Result.less'

function Result (props) {

  const {playResult} = props
  const resultArr = playResult[playResult.length-1]

  return (
    <section className='n-back_result_container'>
      <div className="result_detail">
        <span className="result_explanation"><i className='iconfont icon-query'></i></span>
        <span className="result_share"><i className='iconfont icon-share'></i></span>
        <ul className="result_list">
          <li className="result_item result_correct">
            <i className='iconfont icon-eye'></i>
            <span>{resultArr.visualMatchCorrect}</span>
          </li>
          <li className="result_item result_correct">
            <i className='iconfont icon-ear'></i>
            <span>5</span>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-eye'></i>
            <span>{5-resultArr.visualMatchCorrect}</span>
            <i className='iconfont icon-minus eye'></i>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-ear'></i>
            <span>5</span>
            <i className='iconfont icon-minus ear'></i>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-eye'></i>
            <span>{resultArr.visualMatchMistake}</span>
            <i className='iconfont icon-plus eye'></i>
          </li>
          <li className="result_item result_mistake">
            <i className='iconfont icon-ear'></i>
            <span>5</span>
            <i className='iconfont icon-plus ear'></i>
          </li>
        </ul>
      </div>
      <div className="play_again_container">
        <Start></Start>
      </div>
    </section>
  );
}

Result.propTypes = {
  playResult: PropTypes.array.isRequired,
};


export default connect(
  state => ({playResult: state.playInfo.playResultList}), //自动解构变成play的属性
  {}  //自动结构变成play的方法
)(Result)