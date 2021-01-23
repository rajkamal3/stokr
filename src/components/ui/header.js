import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './ui.module.css';
import hamburger from './../../assets/images/hamburger.png';
import logo from './../../assets/images/logo.png';
import guest from './../../assets/images/guest.png';

const Header = (props) => {
    const [dp, setDp] = useState('');

    const userDp = useSelector((state) => state.profileImage);

    useEffect(() => {
        setDp(userDp);
    }, [userDp]);

    return (
        <div className={styles.header}>
            <div onClick={props.clicked} className={[styles.hamburgerAndDp, 'burger'].join(' ')}>
                <img src={hamburger} width="25px" alt="menu" />
            </div>
            <div className="logo">
                <img src={logo} width="75px" alt="Logo" />
            </div>
            <div className={[styles.hamburgerAndDp, 'dp'].join(' ')}>
                <img src={dp ? dp : guest} width="25px" alt="guest" className={styles.dp} />
            </div>
        </div>
    );
};

export default Header;
