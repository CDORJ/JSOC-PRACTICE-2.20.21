import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

import axiosWithAuth from "../helpers/axiosWithAuth";

const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const { push } = useHistory();

  const handleChange = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

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

  const handleSubmit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then((res) => {
        // console.log("Login.js: handleSubmit: axios.post resposnse: ", res);
        localStorage.setItem("token", res.data.payload);
        push("/protected");
      })
      .catch((err) => {
        setError("Username or Password not valid");
      });
  };

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username" />
        username:
        <input
          name="username"
          id="username"
          type="text"
          value={credentials.username}
          onChange={handleChange}
        />
        <label htmlFor="password" />
        password:
        <input
          name="password"
          id="password"
          type="password"
          value={credentials.password}
          onChange={handleChange}
        />
        <button type="submit">Log In</button>
      </form>
    </>
  );
};

export default Login;

//Task List:
// ✔️ 1. Build a form containing a username and password field.
// ✔️ 2. Add whatever state nessiary for form functioning.
// ✔️ 3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
// ✔️ 4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
// ✔️ 5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
