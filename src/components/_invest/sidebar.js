import React, { Component } from 'react';
import styles from './invest.module.css';

class Sidebar extends Component {
    state = {
        modalActive: false
    };

    render() {
        let showSideMenu;
        let modalActive;

        if (!this.state.modalActive) {
            modalActive = [styles.modal, styles.modalClose].join(' ');
            showSideMenu = [styles.sideMenu, styles.sideMenuClose].join(' ');
        }

        if (this.props.showMenu) {
            showSideMenu = [styles.sideMenu, styles.sideMenuOpen].join(' ');
            modalActive = [styles.modal, styles.modalOpen].join(' ');
        }

        return (
            <div>
                <div className={modalActive} onClick={this.props.clicked}></div>
                <div className={showSideMenu}>
                    <div className={styles.sidebar}>Sidebar</div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
