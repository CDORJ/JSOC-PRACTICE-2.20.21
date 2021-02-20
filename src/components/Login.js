import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axiosWithAuth from "../helpers/axiosWithAuth";
import axios from "axios";

const initialState = () => ({
  username: "",
  password: "",
});

const Login = () => {
  // console.log("Login props", isLoggedIn);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route

  const [credentials, setCredentials] = useState(initialState);
  // const { id } = useParams();

  const [error, setError] = useState("");

  const history = useHistory();

  const handleChanges = (e) => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value,
    });
  };

  const logIn = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .post("/login", credentials)
      .then((res) => {
        localStorage.setItem("token", res.data.payload);
        // setIsLoggedIn(true);
        history.push("/protected");
      })
      .catch((err) => {
        console.log("LOGIN FUNCTION Error", err.response.data.error);
        setError("Username or password not valid.");
      });
  };

  useEffect(() => {
    axios
      .delete(`http://localhost:5000/api/colors/1`, {
        headers: {
          authorization:
            "ahuBHejkJJiMDhmODZhZi0zaeLTQ4ZfeaseOGZgesai1jZWYgrTA07i73Gebhu98",
        },
      })
      .then((res) => {
        axios
          .get(`http://localhost:5000/api/colors`, {
            headers: {
              authorization: "",
            },
          })
          .then((res) => {
            console.log("DELETE ERROR", res);
          });
        console.log("DELETE ERROR 2", res);
      });
  }, [credentials]);

  return (
    <form onSubmit={logIn}>
      <label htmlFor="username">username:</label>
      <input
        id="username"
        name="username"
        type="text"
        value={credentials.username}
        onChange={handleChanges}
      />
      <br />
      <label htmlFor="password">password:</label>
      <input
        id="password"
        name="password"
        type="password"
        value={credentials.password}
        onChange={handleChanges}
      />

      {/* <button type="submit" onClick={() => setIsLoggedIn(!isLoggedIn)}>login</button> */}
      <button type="submit">login!</button>
      <br></br>
      {error ? <div style={{ color: "red" }}>{error}</div> : <></>}
      <br />
    </form>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE THAT FORM INPUTS INCLUDE THE LABEL TEXT "username" and "password" RESPECTIVELY.
//4. If either the username or password is not displaied display EXACTLY the following words: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.
