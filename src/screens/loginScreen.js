import React, { Component } from 'react';
import GoogleLogin from 'react-google-login';

class LoginScreen extends Component {
    responseGoogle = (res) => {
        console.log(res);
        console.log(res.profile);
        this.props.history.push('/screener');
    };

    render() {
        return (
            <div>
                <GoogleLogin
                    clientId="29688275580-frp5n08029u8atavt5elo115vmlsn6bh.apps.googleusercontent.com"
                    onSuccess={this.responseGoogle}
                    onFailure={this.responseGoogle}
                    buttonText="Log In"
                    cookiePolicy={'single_host_origin'}
                    isSignedIn={true}
                />
            </div>
        );
    }
}

export default LoginScreen;
