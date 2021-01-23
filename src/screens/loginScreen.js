import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import styles from './loginScreen.module.css';

const LoginScreen = ({ history }) => {
    const dispatch = useDispatch();

    const responseGoogle = (res) => {
        const userInfo = {
            isGuest: false,
            userId: res.profileObj.googleId,
            email: res.profileObj.email,
            userName: res.profileObj.name,
            profileImage: res.profileObj.imageUrl
        };

        dispatch({
            type: 'LOGIN',
            payload: userInfo
        });

        axios.get(`https://stokr-beta.firebaseio.com/${res.profileObj.googleId}/companies/.json`).then((res) => {
            if (res.data === null) {
                axios.put(`https://stokr-beta.firebaseio.com/${userInfo.userId}/companies/.json`, ['RI']);
            }
        });

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        history.push(`/screener`);
    };

    const continueAsGuest = (res) => {
        dispatch({
            type: 'GUEST_MODE',
            isGuest: true
        });

        history.push(`/screener/guest`);
    };

    return (
        <div className={styles.loginElementsContainer}>
            <GoogleLogin
                clientId="29688275580-frp5n08029u8atavt5elo115vmlsn6bh.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                buttonText="Sign In With Google"
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            <div onClick={continueAsGuest} className={styles.continueAsGuest}>
                Continue as a Guest
            </div>
        </div>
    );
};

export default LoginScreen;
