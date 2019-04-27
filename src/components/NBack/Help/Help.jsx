import React, { useRef }from 'react';
import './Help.less'

export default function Help(props) {
  const helpContainer = useRef(null)

  const hide = function(){
    props.setShow(false)
    console.log('hide')
  }

  return (
    <section className='n-back_help_container ' ref={helpContainer}>
      <div className="help_masking" onTouchStart={hide}></div>
      <div className="help_info_container">
        <div className="help_header">
          <span className="help_title">HELP</span>
          <i className='iconfont icon-close' onTouchStart={hide}></i>
        </div>
        <div className="help_info">
          <p>游戏规则：<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;以声音为例，假设N=3，则玩家需要记忆最后出现的3个声音。<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;假如最后的3个声音分别是：[A,B,C],如果第4个声音是A，则是匹配的，应按下耳朵的按钮<br/>
          &nbsp;&nbsp;&nbsp;&nbsp;对于阶级为N的难度，则需要记忆N个声音，判断第N+1个与第一个是否匹配
          </p>
        </div>
      </div>
    </section>
  );
}