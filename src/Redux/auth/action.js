import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useState } from "react";

// export const authSuccess = (userID, name, token) => {
// 	return {
// 		type: "AUTH_SUCCESS",
// 		payload: data.user,
// 	};
// };

export const authentication = (email, password, isSignUp) => dispatch =>{
    const auth = getAuth();
    if(isSignUp) {
        signInWithEmailAndPassword(auth, email, password).then((data)=>{
          console.log(data)
          dispatch({type: "AUTH_SUCCESS", payload: data.user})
        }).catch((error)=>{
          alert(error.message)
          dispatch({type: "AUTH_FAIL", payload: error.message})
        })
    }
    else {
         createUserWithEmailAndPassword(auth, email, password)
          .then((data) => {
            console.log(data.user);
            dispatch({type: "AUTH_SUCCESS", payload: data.user})
          })
          .catch((error) => {
            alert(error.message);
            dispatch({type: "AUTH_FAIL", payload: error.message})
          })
    }
}

export const signOutUser = () => dispatch => {
  const auth = getAuth();
  dispatch({type: "SIGN_OUT"});
  signOut(auth)
  .then(()=>{console.log("successfully sign out");})
  .catch((err) => {console.log(err.message);})
  // window.location.reload();
}

//function for set username and user-email data-layer
export const setUsername = (username, mail, userID) => {
  return {
    type: "SET_USER",
    username: username,
    usermail: mail,
    userID,
  };
};