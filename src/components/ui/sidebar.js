import React, { Component } from 'react';
import styles from './ui.module.css';
import Toggle from 'react-toggle';
import './../../assets/libraries/toggleStyles.css';
import googleLogo from './../../assets/images/g.png';
import bingLogo from './../../assets/images/b.png';

class Sidebar extends Component {
    render() {
        let showSideMenu;
        let modalActive;

        if (!this.props.showModal) {
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
                    <div className={styles.sidebar}>
                        <div
                            className="searchEngine"
                            style={{
                                display: 'flex',
                                justifyContent: 'space-between'
                            }}
                        >
                            <span>Search engine</span>
                            <Toggle
                                defaultChecked={this.props.searchEngine}
                                icons={{
                                    checked: <img src={googleLogo} width="11px" alt="Google" />,
                                    unchecked: <img src={bingLogo} width="11px" alt="Bing" />
                                }}
                                onChange={this.props.changed}
                            />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
