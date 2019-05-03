import React from 'react';

import './Explain.less'

const Explain = () => {
  return (
    <div className='n-back_explain_container'>
      <div className='explain_label'>说明：</div>
      <div className="explain">
        <i className='iconfont icon-eye'></i>
        <i className='iconfont icon-ear'></i>
        <span className='explain_text'>正确匹配的数目</span>
      </div>
      <div className="explain">
        <i className='iconfont icon-eye'>
          <i className='iconfont icon-minus eye'></i>
        </i>
        <i className='iconfont icon-ear'>
          <i className='iconfont icon-minus ear'></i>
        </i>
        <span className='explain_text'>
          <span className='miss'>错过</span>匹配的数目
        </span>
      </div>
      <div className="explain">
        <i className='iconfont icon-eye'>
          <i className='iconfont icon-plus eye'></i>
        </i>
        <i className='iconfont icon-ear'>
          <i className='iconfont icon-plus ear'></i>
        </i>
        <span className='explain_text'>
          <span className='mistake'>错误</span>匹配的数目
        </span>
      </div>
      
      
      
      
    </div>
  );
};

export default Explain;