import { authService } from 'fbase';
import React, { useState } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

 const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");

    const onChange = (event) => {
        const {
            target: {name, value},
        } = event;
        if (name === "email") {
            setEmail(value);
        } else if (name === "password"){
            setPassword(value);
        }
    };
    const onSubmit = async (event) => {
        event.preventDefault();
        try {
            let data;
            if (newAccount){
                data = await createUserWithEmailAndPassword(authService, email, password);
            } else{
                data = await signInWithEmailAndPassword(authService, email, password);
            }
            console.log(data);
        } catch (err) {
            setError(err.message);
        }
    };

    const toggleAccount = () => setNewAccount((prev) => !prev);

    const onSocialClick = async (event) => {
        const {
            target: {name},
        } = event;
        let provider;
        try {
            if (name === "google") {
                // Sign in using a popup.
                provider = new GoogleAuthProvider();
                await signInWithPopup(authService, provider);
                // const result = await signInWithPopup(authService, provider);
                // The signed-in user info.
                // const user = result.user;
                // This gives you a Google Access Token.
                // const credential = provider.credentialFromResult(authService, result);
                // const token = credential.accessToken;
            } else if (name === "github") {
                provider = new GithubAuthProvider();
                await signInWithPopup(authService, provider);
                // const result = await signInWithPopup(authService, provider);
                // The signed-in user info.
                // const user = result.user;
                // This gives you a Facebook Access Token.
                // const credential = provider.credentialFromResult(authService, result);
                // const token = credential.accessToken;
            }
        } catch (err) {
            setError(err.message);
        }
    }

    return (
    <div>
        <form onSubmit={onSubmit}>
            <input name="email" type="email" placeholder="Email" required value={email} onChange={onChange}/>
            <input name="password" type="password" placeholder="password" required value={password} onChange={onChange}/>
            <input type="submit" value={newAccount ? "Create Account" : "Log In"}/>
            {error}
        </form>
        <span onClick={toggleAccount}>
            {newAccount ? "Sign In" : "Create Account"}
        </span>
        <div>
            <button onClick={onSocialClick} name="google">Continue with Google</button>
            <button onClick={onSocialClick} name="github">Continue wtih Github</button>
        </div>
    </div>
    );
 };
 export default Auth;