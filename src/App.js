import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LoginScreen from './screens/loginScreen';
import Screener from './containers/screener/screener';
import styles from './App.module.css';

const userDetails = localStorage.getItem('userInfo');

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={styles.holder}>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/screener" component={Screener} />
                    <Route exact path="/">
                        <Redirect to={userDetails ? '/screener' : '/login'} />
                    </Route>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
