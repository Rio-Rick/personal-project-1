import { createSlice } from '@reduxjs/toolkit' 
import axios from 'axios'
import Swal from 'sweetalert2'
const url = "https://server.rio-rick.tech";


const initialState = {
    myOrder : [],
    // time : [],
    loading: false,
    error: ""
}


export const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers : {
        fetchPending(state) {
            state.loading = true;
        },
        fetchSuccess(state, action) {
            state.loading = false
            state.myOrder = action.payload
        },
        fetchReject(state, action) {
            state.loading = false
            state.myOrder = action.payload
        }
    }
})

export const { fetchPending, fetchSuccess, fetchReject} = orderSlice.actions

export const fetchAsync = () => async (dispatch, _getState) => {
    try {
        dispatch(fetchPending())
        const token = localStorage.access_token

        const { data } = await axios.get(`${url}/orders`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        // for(let i =0; i< data.length; i++) {
        //     data.userOrder[i].id = i
        // }
        // console.log(data.userOrder[0].id);
        dispatch(fetchSuccess(data.userOrder))
        // dispatch(fetchSuccessTime(data.orders))
    } catch (error) {
        dispatch(fetchReject(   error.message))
        Swal.fire({
            icon: "error",
            title: error.message,
        });
    }
}

export default orderSlice.reducer

