import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './index.less';

import NBack from './layouts/NBack'
import store from './redux/store'

ReactDOM.render(
(
<Provider store={store}>
    <NBack/>
</Provider>
), 
document.getElementById('root'));

