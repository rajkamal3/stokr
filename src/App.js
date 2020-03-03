import React, { Component } from 'react';
import Screener from './components/_invest/screener';
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