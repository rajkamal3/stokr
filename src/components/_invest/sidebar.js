import React, { Component } from 'react';
import styles from './invest.module.css';

class Sidebar extends Component {
    state = {
        showModal: false
    };

    toggleModal = () => {
        this.setState({ showModal: !this.state.showModal });
    };

    render() {
        console.log(this.state.showModal);

        let showSideMenu;
        let showModal;

        if (!this.state.showModal) {
            showModal = [styles.modal, styles.modalClose].join(' ');
            showSideMenu = [styles.sideMenu, styles.sideMenuClose].join(' ');
        }

        if (this.props.showMenu) {
            showSideMenu = [styles.sideMenu, styles.sideMenuOpen].join(' ');
            showModal = [styles.modal, styles.modalOpen].join(' ');
        }

        return (
            <div>
                <div className={showModal} onClick={this.toggleModal.bind(this)}>
                    Modal
                </div>
                <div className={showSideMenu}>
                    <div className={styles.sidebar}>Sidebar</div>
                </div>
            </div>
        );
    }
}

export default Sidebar;
