import axiosWithAuth from './axiosWithAuth';

const fetchColors = () => {
    return axiosWithAuth().get('/colors').then((res) => {
        return res
    })
    .catch((err) => {return err})
}