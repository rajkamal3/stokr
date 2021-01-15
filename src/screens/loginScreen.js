import React from 'react';
import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';

const LoginScreen = ({ history }) => {
    const dispatch = useDispatch();

    const responseGoogle = (res) => {
        history.push(`/screener`);

        dispatch({
            type: 'NEXT_USER',
            userId: res.profileObj.googleId,
            email: res.profileObj.email,
            userName: res.profileObj.name,
            profileImage: res.profileObj.imageUrl
        });

        console.log(res);
    };

    return (
        <div>
            <GoogleLogin
                clientId="29688275580-frp5n08029u8atavt5elo115vmlsn6bh.apps.googleusercontent.com"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                buttonText="Log In"
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    );
};

export default LoginScreen;
