import axiosWithAuth from "./axiosWithAuth";

export const fetchColors = () => {
  return axiosWithAuth()
    .get("/colors")
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
};
