import React, { Component } from 'react';
import Screener from './containers/screener/screener';
import styles from './App.module.css';

class App extends Component {
    render() {
        return (
            <div className={styles.holder}>
                <Screener />
            </div>
        );
    }
}

export default App;
