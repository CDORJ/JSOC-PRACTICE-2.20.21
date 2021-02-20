import React, { useEffect, useState } from "react";
import axiosWithAuth from '../helpers/axiosWithAuth';

import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

  useEffect(() => {
    axiosWithAuth()
      .get('/colors')
      .then((res) => { 
        console.log("cd: BubblePage.js: axios.get response: ", res)
        setColorList(res.data)
      })
      .catch((err) => {
        console.log("cd: BubblePage.js: axios.get error: ", err)
      })
  }, [])
  
  if (!colorList) {
    return <div>"User must be logged in to do that"</div>
  }

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
