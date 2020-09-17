import React, { Component } from 'react';
import styles from './invest.module.css';

class Sidebar extends Component {
    state = {
        sidebarActive: false,
        modalActive: false
    };

    componentDidMount() {
        this.setState({ sidebarActive: this.props.showMenu });
        this.setState({ modalActive: this.props.showMenu });
    }

    toggleModal = () => {
        this.setState({ modalActive: false });
    };

    render() {
        // let showSideMenu;
        // let modalActive;

        // if (this.state.sidebarActive && this.state.modalActive) {
        //     showSideMenu = [styles.sideMenu, styles.sideMenuOpen].join(' ');
        //     modalActive = [styles.modal, styles.modalOpen].join(' ');
        // }

        // if (!this.state.sidebarActive || !this.state.modalActive) {
        //     modalActive = [styles.modal, styles.modalClose].join(' ');
        //     showSideMenu = [styles.sideMenu, styles.sideMenuClose].join(' ');
        // }

        console.log(this.state.modalActive);

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
                <div className={modalActive} onClick={this.toggleModal.bind(this)}>
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
