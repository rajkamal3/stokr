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
            <div onClick={props.clicked} className={[styles.hamburgerMenu, 'burger'].join(' ')}>
                <img src={hamburger} width="25px" alt="Menu" />
            </div>
            <div className="logo">
                <img src={logo} width="75px" alt="Logo" />
            </div>
            <div className={[styles.hamburgerMenu, 'extras'].join(' ')}>
                <img
                    src={dp ? dp : guest}
                    width="25px"
                    alt="Menu"
                    style={{
                        borderRadius: '300px'
                    }}
                />
            </div>
        </div>
    );
};

export default Header;
