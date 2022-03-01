import React from "react";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import "../css/Login.css";
import validator from "validator";
import { getAuth, createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";


function Login() {

  
  //state for hold useremail and password
    const [user, newuser] = useState({
    email: "",
    password: "",
  });
  

  const history = useHistory();

      const auth = getAuth();

  function inputDetail(e) {
    newuser({ ...user, [e.target.name]: e.target.value });
  }

 async function loginuser(e) {
    e.preventDefault();

    
    //validate useremail and login authentication
    if (validator.isEmail(user.email) && user.password.length>5) {
      await  signInWithEmailAndPassword(auth,user.email,user.password).then((data)=>{
        console.log(data.user)
        history.push("/");
      }).catch((error)=>alert(error.message))

    } else {
      alert("invalid email or password");
    }
  }

  async function register() {
    
    
    //validate useremail and then create user account
    if (validator.isEmail(user.email) && user.password.length>5) {
      await createUserWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
          console.log(data);
          history.push("/");
        })
        .catch((error) => alert(error.message));
    } else {
      alert("invalid email or password");
    }
  }

  return (
    <>
      <div className="main_div">
        <div className="login_page">
          <Link to="/">
            <div className="img_div">
              <img
                src="https://img.maximummedia.ie/her_ie/eyJkYXRhIjoie1widXJsXCI6XCJodHRwOlxcXC9cXFwvbWVkaWEtaGVyLm1heGltdW1tZWRpYS5pZS5zMy5hbWF6b25hd3MuY29tXFxcL3dwLWNvbnRlbnRcXFwvdXBsb2Fkc1xcXC8yMDE1XFxcLzA4XFxcLzA2MTUzOTM0XFxcL2FtYXpvbi5qcGdcIixcIndpZHRoXCI6NzAwLFwiaGVpZ2h0XCI6MzcwLFwiZGVmYXVsdFwiOlwiaHR0cHM6XFxcL1xcXC93d3cuaGVyLmllXFxcL2Fzc2V0c1xcXC9pbWFnZXNcXFwvaGVyXFxcL25vLWltYWdlLnBuZz9pZD1iNmY4NGQ2MjdiNDExNGYwMGY1MFwiLFwib3B0aW9uc1wiOltdfSIsImhhc2giOiIyOWE3MjkwZmU5M2Q3NzY2ZTdhNjdiMjlkZDA2NzY2YjE4NDA2NmNhIn0=/amazon.jpg"
                alt="logo"
              />
            </div>
          </Link>
          <form action="" className="form_div">
            <label htmlFor="email">Enter Your Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="Enter Your E-mail"
              autoComplete="off"
              onChange={inputDetail}
              value={user.email}
            />
            <label htmlFor="password">Enter Your Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Your Password"
              autoComplete="off"
              onChange={inputDetail}
              value={user.password}
            />

            <button onClick={loginuser}>Log in</button>
          </form>
          <div className="term_div">
            {/* <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cum fuga
              obcaecati voluptatum eos dolorum rerum voluptatem. Obcaecati sint
              dicta recusandae dignissimos minima quidem.
            </p> */}
            <button onClick={register}>!New to Here,Create Account</button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;