import {apiEnum} from '../../../../../constant/apiEnum';
import axios from 'axios';
export const GET_ITEMSSKU = '[ITEMSKU APP] GET ITEMSSKU';
export const UPDATE_ITEMSSKU = '[ITEMSKU APP] UPDATE ITEMSSKU';
export const DELETE_ITEMSSKU = '[ITEMSKU APP] DELETE ITEMSSKU';
export const SET_ITEMSSKU_SEARCH_TEXT = '[ITEMSKU APP] SET ITEMSSKU SEARCH TEXT';


export function getItemsSKU()
{
    
    const request = axios.get(apiEnum.Inventory.ItemSKU.getItemsSKU);

    return (dispatch) =>
        request.then((response) =>
            dispatch({
                type   : GET_ITEMSSKU,
                payload: response.data
            })
        );
}
export function deleteItemsSKU(Id){
    return (dispatch) =>
            dispatch({
                type   : DELETE_ITEMSSKU,
                payload: Id
            });
}
export function updateItemsSKU(data)
{
return (dispatch) =>
            dispatch({
                type   : UPDATE_ITEMSSKU,
                payload: data
            });

}

export function setCategoriesSearchText(event)
{
    return {
        type      : SET_ITEMSSKU_SEARCH_TEXT,
        searchText: event.target.value
    };
}

