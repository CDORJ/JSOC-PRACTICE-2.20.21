import React, { useEffect, useState } from "react";
import axiosWithAuth from "../helpers/axiosWithAuth";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  const getColors = () => {
    axiosWithAuth()
      .get(`/colors`)
      .then((res) => {
        console.log("This is the positive response from the server", res);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log("This is the error response from the server", err);
      });
  }

  useEffect(() => {
    getColors()
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} getColors={getColors}/>
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
// ✔️ 1. Make an axios call to retrieve all color data and push to state on mounting.
