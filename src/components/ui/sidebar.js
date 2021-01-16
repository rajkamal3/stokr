import React, { Component } from 'react';
import styles from './ui.module.css';
import Toggle from 'react-toggle';
import './../../assets/libraries/toggleStyles.css';
import googleLogo from './../../assets/images/g.png';
import bingLogo from './../../assets/images/b.png';
import { GoogleLogout } from 'react-google-login';
import { connect } from 'react-redux';

class Sidebar extends Component {
    logout() {
        localStorage.removeItem('userInfo');
        this.props.history.push('/login');
        // this.props.logout();
    }

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
                            style={{
                                marginBottom: '20px'
                            }}
                        >
                            Hi {this.props.userName && <span>{this.props.userName.split(' ')[0]}</span>}
                        </div>
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
                        {this.props.userName && (
                            <div
                                style={{
                                    marginTop: '20px'
                                }}
                            >
                                <GoogleLogout
                                    clientId="29688275580-frp5n08029u8atavt5elo115vmlsn6bh.apps.googleusercontent.com"
                                    buttonText="Logout"
                                    onLogoutSuccess={this.logout.bind(this)}
                                ></GoogleLogout>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userName: state.userName,
        email: state.email,
        isGuestMode: state.isGuest
    };
};

export default connect(mapStateToProps, null)(Sidebar);
