import React, { useRef }from 'react';
import './Help.less'

export default function Help(props) {
  const helpContainer = useRef(null)

  const hide = function(){
    props.setShow(false)
  }

  return (
    <section className='n-back_help_container ' ref={helpContainer}>
      <div className="help_masking" onTouchStart={hide}></div>
      <div className="help_info_container">
        <div className="help_header">
          <span className="help_title">{props.title}</span>
          <i className='iconfont icon-close' onTouchStart={hide}></i>
        </div>
        <div className="help_info">
          {props.info}
        </div>
      </div>
    </section>
  );
}