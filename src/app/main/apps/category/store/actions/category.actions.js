import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {apiEnum} from '../../../../../constant/apiEnum';
export const GET_CATEGORY = '[CATEGORY APP] GET CATEGORY';
export const SAVE_CATEGORY = '[CATEGORY APP] SAVE CATEGORY';
export const UPDATE_CATEGORY = '[CATEGORY APP] UPDATE CATEGORY';
export const REMOVE_CATEGORY = '[CATEGORY APP] REMOVE CATEGORY';
export function getCategory(params)
{
    const request = axios.get(apiEnum.Inventory.Category.getCategoryById+params.categoryId);

    return (dispatch) =>
        request.then((response) =>
        dispatch({
            type   : GET_CATEGORY,
            payload: response.data,
            isReady:false
        })
        );
}

export function updateCategory(data)
{
    const request = axios.put(apiEnum.Inventory.Category.updateCategory, data);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'Category Updated'}));
              
                return dispatch({
                    type   : UPDATE_CATEGORY,
                    payload: data,
                    isReady:true
                });
            }
        );
}

export function saveCategory(data)
{
    const request = axios.post(apiEnum.Inventory.Category.createCategory, data);
    return (dispatch) =>
        request.then((response) => {
            console.log("DDDDD",response.data);
                dispatch(showMessage({message: 'Category Created'}));
                 dispatch({
                    type   : SAVE_CATEGORY,
                    payload: response.data,
                    isReady:true
                });
            
            }
        );
}
export function removeCategory(data)
{
    const request = axios.delete(apiEnum.Inventory.Category.deleteCategoryById +data._id);

    return (dispatch) =>
        request.then((response) => {

            dispatch(showMessage({message: 'Category Removed'}));
            return dispatch({
                type   : REMOVE_CATEGORY,
                isReady:true
            });
           

              
            }
        );
}
export function newCategory()
{
    const data = {
        catImage:[],
        catCode: '',
        catDesc: '',
        catDesc2: '',
        catStatus: false,
        catParent: [],
        chk:false
    };

    return {
        type   : GET_CATEGORY,
        payload: data
    }
}
