import { GET_ITEMS , ADD_ITEM, DELETE_ITEM, ITEMS_LOADING } from './types'
import axios from 'axios'
import { tokenConfig } from './authActions';
import {returnErrors} from './errorActions';
export const getItems = () => dispatch => {
    dispatch(setItemsLoading());
    axios
        .get('http://localhost:5000/api/item', {headers: {
            'Access-Control-Allow-Origin': '*',
          }})
        .then(res => 
            dispatch({
                type: GET_ITEMS,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))
}

export const deleteItem = (id) => (dispatch,getState) => {
    axios
        .delete(`http://localhost:5000/api/item/${id}`,tokenConfig(getState) )
        .then(res => 
            dispatch({
                type: DELETE_ITEM,
                payload: id
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))

}

export const addItem = (item) => (dispatch, getState) => {
    axios
        .post('http://localhost:5000/api/item',item,tokenConfig(getState))
        .then(res => 
            dispatch({
                type: ADD_ITEM,
                payload: res.data
            })
        )
        .catch(err => dispatch(returnErrors(err.response.data, err.response.status)))


}

export const setItemsLoading = () => {
    return {
        type: ITEMS_LOADING
    }
}

