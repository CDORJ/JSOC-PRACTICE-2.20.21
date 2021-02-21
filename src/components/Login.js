import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../helpers/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [login, setLogin] = useState({
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  const { push } = useHistory();

  useEffect(() => {
    axiosWithAuth()
      .delete(`http://localhost:5000/api/colors/1`, {
        headers: {
          authorization:
            "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98",
        },
      })
      .then((res) => {
        axiosWithAuth()
          .get(`http://localhost:5000/api/colors`, {
            headers: {
              authorization: "",
            },
          })
          .then((res) => {
            console.log(res);
          });
        console.log(res);
      });
  });

  const handleChange = (e) => {
    setLogin({
      ...login,
      [e.target.name]: e.target.value,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", login)
      .then((res) => {
        console.log("cd: Login.js: handleLogin: axios post response: ", res);
        localStorage.setItem("token", res.data.payload);
        push("/protected");
      })
      .catch((err) => {
        console.log("cd: Login.js: handleLogin: axios.post error, ", err);
        setError("Username or Password not valid.");
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      {/* <h1>
        Welcome to the Bubble App!
        <p>Build a login page here</p>
      </h1> */}
      <form onSubmit={handleLogin}>
        <label htmlFor="name" /> Username
        <input
          id="name"
          name="username"
          value={login.username}
          placeholder="Username"
          onChange={handleChange}
          type="text"
        />
        <label htmlFor="password" /> Password
        <input
          id="password"
          name="password"
          value={login.password}
          placeholder="Password"
          onChange={handleChange}
          type="password"
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field. ✔️
//2. Add whatever state necessary for form functioning. ✔️
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displayed display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
