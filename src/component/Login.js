import React, { useState } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import validator from "validator";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { authentication } from '../Redux/auth/action';

const theme = createTheme();

export default function Login() {

    //state for hold useremail and password
  // const [user, newuser] = useState({
  // email: "",
  // password: "",
  // });

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isSignUp, setIsSignUp] = useState(true);
  

  const history = useHistory();
  const dispatch = useDispatch();
  const { success } = useSelector(state => state.authAction)

  const auth = getAuth();

  // function inputDetail(e) {
  //   newuser({ ...user, [e.target.name]: e.target.value });
  // }

  const changeAuthState = (e) => {
		e.preventDefault();
		setIsSignUp((prevState) => {
			return !prevState;
		});
	};

 async function loginuser(e) {
    e.preventDefault();
    // dispatch(authentication(email, password, isSignUp))
    if(isSignUp) {
      //validate useremail and login authentication
      if (validator.isEmail(email) && password.length>5) {
        await  signInWithEmailAndPassword(auth, email, password).then((data)=>{
          console.log(data.user)
          dispatch({type: 'AUTH_SUCCESS', payload: data.user})
          history.push("/");
        }).catch((error)=> {
          alert(error.message)
          dispatch({type: 'AUTH_FAIL', payload: error.message})
        })
  
      } else {
        alert("invalid email or password");
      }
    }
    else {
      //validate useremail and then create user account
      if (validator.isEmail(email) && password.length>5) {
        await createUserWithEmailAndPassword(auth, email, password)
          .then((data) => {
            console.log(data.user);
            dispatch({type: 'AUTH_SUCCESS', payload: data.user})
            history.push("/");
          })
          .catch((error) => {
            alert(error.message)
            dispatch({type: 'AUTH_FAIL', payload: error.message})
          });
      } else {
        alert("invalid email or password");
      }
    }
  }

  return (
    <ThemeProvider theme={theme}>
			{/* {success ? <div>{history.push("/")}</div> : null} */}
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            {isSignUp ? 'Sign In' : 'Sign Up'}
          </Typography>
          <Box component="form" onSubmit={loginuser} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {isSignUp ? 'Sign In' : 'Sign Up'}
            </Button>
            <Grid container>
              {/* <Grid item>
                <Link href="#" variant="body2" onClick={(e) => changeAuthState(e)}>
                  {isSignUp ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                </Link>
              </Grid> */}
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    // <>
		//  	{success ? <div>{history.push("/")}</div> : null}
    //   <form onSubmit={loginuser}>
    //     <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}></input>
    //     <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}></input>
    //     <button type='submit'>sign in</button>
    //   </form>
    // </>
    // <h1>Login</h1>
  );
}