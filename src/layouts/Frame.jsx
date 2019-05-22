import React,{}from 'react';
// import PropTypes from 'prop-types';
import { Switch, Route,Redirect,HashRouter} from 'react-router-dom'

import './Frame.less'

import Header from './Header'
import Start from '../components/NBack/Start/Start';
import Play from '../components/NBack/Play/Play'
import Result from '../components/NBack/Result/Result'

function Frame (){


  return (
    <div className='frame_container'>
      <Header></Header>
      <HashRouter>
        <Switch>
          <Route exact path='/start' component={Start}/>
          <Route path='/play' component={Play} />
          <Route path='/result' component={Result} />
          <Redirect path="/" to={{pathname: '/start'}} />
        </Switch>
      </HashRouter>
    </div>
  );
}

Frame.propTypes = {

};

export default Frame