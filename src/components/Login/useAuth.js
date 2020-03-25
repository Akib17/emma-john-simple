import React from 'react';
import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "../../firebase.config";
import { useState } from 'react';
import { createContext } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { Route, Redirect } from "react-router-dom";

firebase.initializeApp(firebaseConfig)

const AuthContext = createContext() 

export const AuthContextProvider = (props) => {
    const auth = Auth()
    return <AuthContext.Provider value={auth}> {props.children} </AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)

export const PrivateRoute = ({ children, ...rest }) => {
    const auth = useAuth()
    return (
      <Route
        {...rest}
        render={({ location }) =>
          auth.user ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }

const getUser = (user) => {
    const { displayName, email, photoURL } = user
    return { name: displayName, email, photo: photoURL }
}

const Auth = () => {
    const [user, setUser] = useState(null)

    const singInWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        return firebase.auth().signInWithPopup(provider)
            .then(res => {
                const newUser = getUser(res.user)
                setUser(newUser)
                return res.user
            })
            .catch(err => {
                return err.message
            })
    }
    const signOutUser = () => {
        return firebase.auth().signOut()
            .then((res) => {
                setUser(null)
            })
            .catch(err => console.log(err))
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged(function(usr) {
            if (usr) {
                const currUser = getUser(usr)
                setUser(currUser)
            } else {
            //   console.log('Error')
            }
          });
    }, [])
    return {
        user,
        singInWithGoogle,
        signOutUser,
    }
};

export default Auth;