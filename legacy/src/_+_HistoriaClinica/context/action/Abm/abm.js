import axiosInstance from "../../../../global/helpers/axiosInstance";
import { ALL_SELECTED_ITEM, DELETE_ABM, DELETE_ABM_FAIL, DELETE_ABM_SUCCESS, GET_ABM, GET_ABM_FAIL, GET_ABM_SUCCESS, POST_ABM, POST_ABM_FAIL, POST_ABM_SUCCESS, PUT_ABM, PUT_ABM_FAIL, PUT_ABM_SUCCESS, SELECTED_ITEM } from "../../ActionTypes";

export const wsGetAbm = (dataFiltered, error, data, searchData) => (dispatch)=> {
    if(!data){
        dispatch({type: GET_ABM});
    } else if (error){
        dispatch({type: GET_ABM_FAIL, payload: {message:error.message}})
    } else if (dataFiltered){
        dispatch({type: GET_ABM_SUCCESS, payload: {dataFiltered, data, searchData}})
    }
   
}

export const resetAbm = () => (dispatch) => {
    dispatch({type: "nada"})
}

export const wsPostAbm = (url,form, data) => (dispatch) => {
    dispatch({type: POST_ABM});
    axiosInstance().then( respuesta => {
        respuesta 
        .post(url, form)
        .then((resp)=> {
            const objCreate = resp.data;
            data.push(objCreate); 
            dispatch({type:POST_ABM_SUCCESS, payload: {data, searchData: data, dataFiltered: false}})
        })
        .catch((error) => dispatch({type: POST_ABM_FAIL,  payload:{data, searchData: data, dataFiltered: false, message:typeof (error.response.data) === "string"? error.response.data: JSON.stringify(error.response.data)}}))
    })
}


export const wsDelete = (url, id, data) => (dispatch) => { 
    dispatch({type:DELETE_ABM});
    axiosInstance().then( respuesta => {
        respuesta 
        .delete(url + '?id=' + id)
        .then((resp)=> {
            const idDeleted = id; 
            data = data.filter(element => Number(element.id) !== Number(idDeleted))
            dispatch({type:DELETE_ABM_SUCCESS, payload: {data, searchData: data, dataFiltered: false}})
        })
        .catch((error) => {
            dispatch({type: DELETE_ABM_FAIL, payload:{data, searchData: data, dataFiltered: false, message:typeof (error.response.data) === "string"? error.response.data: JSON.stringify(error.response.data)} })
        })
    })
}


export const SelectedItem = (id) => (dispatch) => {
    if(id === "ALL"){
        dispatch({type: ALL_SELECTED_ITEM, payload: id})
    }else{
        dispatch({type: SELECTED_ITEM, payload: id})
    }
};


export const wsPutAbm = (url, form, data) => (dispatch)  => {
    dispatch({type: PUT_ABM});
    axiosInstance().then( respuesta => {
        respuesta 
        .put(url + "/"+ form.id, form)
        .then((resp)=> {
            const indice = [];
            data = data.filter((e, index) => {
                if(Number(e.id) !== Number(resp.data.id)) {
                    indice.push(index);
                    return true
                }
            });
            data.push(resp.data);
            data = data.sort((a, b) => {
                if(a.id < b.id) return -1 ;
            })
            dispatch({type:PUT_ABM_SUCCESS,payload:{data, searchData: data, dataFiltered: false}})
        })
        .catch((error) => {
            dispatch({type: PUT_ABM_FAIL, payload: {data, searchData: data, dataFiltered: false,message:typeof (error.response.data) === "string"? error.response.data: JSON.stringify(error.response.data) }})
    })
    })
} 