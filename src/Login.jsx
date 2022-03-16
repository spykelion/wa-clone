import React from "react";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { Button } from "@mui/material";
import { useStateValue } from "./StateProvider";
import { actionTypes } from "./reducer";
import "./Login.css";

function Login() {
    const [{}, dispatch] = useStateValue();
  const auth = getAuth();
  const provider = new GoogleAuthProvider();
  const signIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
    //   const token = credential.accessToken;
      // The signed-in user info.
    //   const user = result.user;
      dispatch({
        type: actionTypes.SET_USER,
        user: {
            displayName: result?.user?.displayName,
            photoURL: result?.user?.photoURL
        }
    });
      console.log(result?.user?.photoURL);
    } catch (error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The AuthCredential type that was used.
      const credential_1 = GoogleAuthProvider.credentialFromError(error);
      alert(errorMessage);
    }
  };
  return (
    <div className="login">
      <div className="login__container">
        <img
          alt=""
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/langfr-330px-WhatsApp.svg.png"
        />

        <div className="login__text">
          <h1>Sign in to WhatsApp</h1>
        </div>
        <Button onClick={signIn} variant="contained">
          Sign in with Google
        </Button>
      </div>
    </div>
  );
}

export default Login;
