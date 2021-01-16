import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';

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

        history.push(`/screener`);

        localStorage.setItem('userInfo', JSON.stringify(userInfo));

        console.log(userInfo);
    };

    const continueAsGuest = (res) => {
        console.log('continue as guest');
        history.push(`/screener`);

        dispatch({
            type: 'GUEST_MODE',
            isGuest: true
        });

        console.log(res);
    };

    // const responseGoogleFail = (res) => {
    //     history.push(`/notsignedin`);
    // };

    return (
        <div
            style={{
                display: 'flex',
                flexFlow: 'column',
                alignItems: 'center',
                alignSelf: 'center'
            }}
        >
            <GoogleLogin
                clientId="29688275580-frp5n08029u8atavt5elo115vmlsn6bh.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                buttonText="Sign In With Google"
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
            <div
                onClick={continueAsGuest}
                style={{
                    marginTop: '10px',
                    textDecoration: 'underline'
                }}
            >
                Continue as a Guest
            </div>
        </div>
    );
};

export default LoginScreen;
