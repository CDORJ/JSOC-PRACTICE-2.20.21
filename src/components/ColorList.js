import React, { useState } from "react";
import axios from "axios";

import EditMenu from "./EditMenu";
import axiosWithAuth from "../helpers/axiosWithAuth";

const initialColor = {
  color: "",
  code: { hex: "" },
};

const ColorList = ({ colors, updateColors, getColors }) => {
  const [editing, setEditing] = useState(false);
  const [colorToEdit, setColorToEdit] = useState(initialColor);

  

  const editColor = (color) => {
    setEditing(true);
    setColorToEdit(color);
  };

  const saveEdit = (e) => {
    e.preventDefault();
    axiosWithAuth()
      .put(`/colors/${colorToEdit.id}`, colorToEdit)
      .then((response) => {
        console.log("saveEdit response", response);
        updateColors(
          colors.map((color) => {
            return color.id === response.data.id ? response.data : color;
          })
        );
      })
      .catch((error) => {
        console.log("saveEdit error", error);
      });
  };

  const deleteColor = (color) => {
    axiosWithAuth().delete(`/colors/${color.id}`);
    updateColors(colors.filter((colorItem) => {
      return colorItem.id !== color.id
    }))
  };

  // const deleteColor = (color) => {
  //   axiosWithAuth()
  //     .delete(`/colors/${color.id}`) // REVIEW
  //     .then((res) => {
  //       console.log(res);
  //       updateColors(
  //         colors.filter((colorItem) => {
  //           return colorItem.id !== res.data; // return ONLY
  //         })
  //       );
  //     })
  //     .catch((err) => {
  //       console.log(err.message, "error deleting");
  //     });
  // };

  return (
    <div className="colors-wrap">
      <p>colors</p>
      <ul>
        {colors.map((color) => (
          <li key={color.color} onClick={() => editColor(color)}>
            <span>
              <span
                className="delete"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteColor(color);
                }}
              >
                x
              </span>{" "}
              {color.color}
            </span>
            <div
              className="color-box"
              style={{ backgroundColor: color.code.hex }}
            />
          </li>
        ))}
      </ul>
      {editing && (
        <EditMenu
          colorToEdit={colorToEdit}
          saveEdit={saveEdit}
          setColorToEdit={setColorToEdit}
          setEditing={setEditing}
        />
      )}
    </div>
  );
};

export default ColorList;

//Task List:
//1. Complete the saveEdit functions by making a put request for saving colors. (Think about where will you get the id from...)
//2. Complete the deleteColor functions by making a delete request for deleting colors.
