import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'

import './index.less';

import Frame from './layouts/Frame'
import store from './redux/store'

ReactDOM.render(
(
<Provider store={store}>
    <Frame/>
</Provider>
), 
document.getElementById('root'));

