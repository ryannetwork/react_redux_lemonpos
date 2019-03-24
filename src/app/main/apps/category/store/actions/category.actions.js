import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {apiEnum} from '../../../../../constant/apiEnum';
export const GET_CATEGORY = '[CATEGORY APP] GET CATEGORY';
export const GET_CATEGORIES = '[CATEGORY APP] GET CATEGORIES';
export const SAVE_CATEGORY = '[CATEGORY APP] SAVE CATEGORY';
export const REMOVE_CATEGORY = '[CATEGORY APP] REMOVE CATEGORY';
export function getCategories()
{
    
    const request = axios.get(apiEnum.Inventory.Category.getCategories);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_CATEGORIES,
                payload: response.data
            })
        );
}
export function getCategory(params)
{
    const request = axios.get(apiEnum.Inventory.Category.getCategoryById+params.categoryId);

    return (dispatch) =>
        request.then((response) =>
        dispatch({
            type   : GET_CATEGORY,
            payload: response.data
        })
        );
}

export function saveCategory(data)
{
    const request = axios.post(apiEnum.Inventory.Category.createCategory, data);

    return (dispatch) =>
        request.then((response) => {

                dispatch(showMessage({message: 'Category Created'}));
               
                return dispatch({
                    type   : SAVE_CATEGORY,
                    payload: response.data
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
        catParent: 0,
        chk:false
    };

    return {
        type   : GET_CATEGORY,
        payload: data
    }
}
