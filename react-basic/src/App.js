import React from 'react';
import { Route } from 'react-router-dom';
import Header from './containers/Header';
import Main from './containers/Main';
import { injectGlobal } from './style';
import { connect } from 'react-redux';

class App extends React.Component {
    render() {
        return (
            <div className='wrapper'>
                <Route path={process.env.PUBLIC_URL + '/'} exact component={Header} />
                <Route component={Main} />  
            </div>
        );
    };
}

export default connect(
    state => ({}),
    dispatch => ({})
)(App);


