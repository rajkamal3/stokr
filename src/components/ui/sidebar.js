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
                                onChange={() => {
                                    this.props.changed();
                                    this.props.saveSearchEngine();
                                }}
                            />
                        </div>
                        <div className={styles.sortContainer}>
                            <div className={styles.sortHead}>
                                <div>Sort By:</div>
                                <div className={[styles.sortSave, 'sortSave'].join(' ')} onClick={this.props.postData}>
                                    Save
                                </div>
                            </div>
                            <div className={[styles.sortGridContainer, 'sort'].join(' ')}>
                                <div
                                    onClick={this.props.sorted.bind(this, 'companyName', 'sortByName')}
                                    data-order="asc"
                                    className="sortByName"
                                >
                                    <span>Name</span>
                                    <span></span>
                                </div>
                                <div
                                    onClick={this.props.sorted.bind(this, 'marketCap', 'sortByMcap')}
                                    data-order="asc"
                                    className="sortByMcap"
                                >
                                    <span>M. Cap</span>
                                    <span></span>
                                </div>
                                <div
                                    onClick={this.props.sorted.bind(this, 'sharePrice', 'sortBySharePrice')}
                                    data-order="asc"
                                    className="sortBySharePrice"
                                >
                                    <span>Share Price</span>
                                    <span></span>
                                </div>
                                <div
                                    onClick={this.props.sorted.bind(this, 'change', 'sortByChange')}
                                    data-order="asc"
                                    className="sortByChange"
                                >
                                    <span>Change</span>
                                    <span></span>
                                </div>
                                <div
                                    onClick={this.props.sorted.bind(this, 'peRatio', 'sortByPeRatio')}
                                    data-order="asc"
                                    className="sortByPeRatio"
                                >
                                    <span>PE Ratio</span>
                                    <span></span>
                                </div>
                                <div
                                    onClick={this.props.sorted.bind(this, 'companySector', 'sortBySector')}
                                    data-order="asc"
                                    className="sortBySector"
                                >
                                    <span>Sector</span>
                                    <span></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
