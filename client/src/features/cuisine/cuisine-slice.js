import { createSlice } from '@reduxjs/toolkit' 
import axios from 'axios'
import Swal from 'sweetalert2'
const url = "http://localhost:3000";


const initialState = {
    products : [],
    role : '',
    loading: false,
    error: ""
}


export const productSlice = createSlice({
    name: "cuisine",
    initialState,
    reducers : {
        fetchPending(state) {
            state.loading = true;
        },
        fetchRole(state, action) {
            state.role = action.payload
        },
        fetchSuccess(state, action) {
            state.loading = false
            state.products = action.payload
        },
        fetchReject(state, action) {
            state.loading = false
            state.products = action.payload
        }
    }
})

export const { fetchPending, fetchSuccess, fetchReject, fetchRole} = productSlice.actions

export const fetchAsync = () => async (dispatch, _getState) => {
    try {
        dispatch(fetchPending())
        const token = localStorage.access_token

        const { data } = await axios.get(`${url}/foods`, {
          headers: { Authorization: `Bearer ${token}`}
        });
        dispatch(fetchSuccess(data.list))
        dispatch(fetchRole(data.role))
    } catch (error) {
        dispatch(fetchReject(error.message))
        Swal.fire({
            icon: "error",
            title: error.message,
        });
    }
}

export default productSlice.reducer

