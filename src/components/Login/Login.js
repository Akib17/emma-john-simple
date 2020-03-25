import React from 'react';
import Auth from './useAuth';

const Login = () => {
    const auth = Auth()
    // console.log(auth)
    const shipmentHandler = () => {
        auth.singInWithGoogle()
            .then(res => {
                window.location.pathname = '/review'
            })
    }
    const signoutHandler = () => {
        auth.signOutUser()
            .then(res => {
                window.location.pathname = '/'
            })
    }
    return (
        <div>
            <h2>Hello welcome to ema john</h2>
            {
                auth.user ? <h1>Sign Out your account</h1> : <h1>Sign In your account</h1>
            }
            {
                auth.user ? <button onClick={signoutHandler}>Sign Out</button> : 
                <button onClick={shipmentHandler}>Sign In with Google</button>
            }
        </div>
    );
};

export default Login;