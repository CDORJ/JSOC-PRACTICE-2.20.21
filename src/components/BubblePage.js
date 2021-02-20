import React, { useEffect, useState } from "react";

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";
import axiosWithAuth from "../helpers/axiosWithAuth";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get("http://localhost:5000/api/colors/")
      .then((res) => {
        console.log("Bubbles response success", res);
        setColorList(res.data);
      })
      .catch((err) => {
        console.log("BubblesList error", err);
      });
  }, []);

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;

//Task List:
//1. Make an axios call to retrieve all color data and push to state on mounting.
