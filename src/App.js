import React, { Component } from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import LoginScreen from './screens/loginScreen';
import Screener from './containers/screener/screener';
import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <BrowserRouter>
                <div className={styles.holder}>
                    <Route exact path="/">
                        {true ? <Redirect to="/login" /> : ''}
                    </Route>
                    <Route path="/login" component={LoginScreen} />
                    <Route path="/screener" component={Screener} />
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
