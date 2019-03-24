import {apiEnum} from '../../../../../constant/apiEnum';
import axios from 'axios';
export const GET_CATEGORIES = '[CATEGORY APP] GET CATEGORIES';
export const SET_CATEGORIES_SEARCH_TEXT = '[CATEGORY APP] SET CATEGORIES SEARCH TEXT';


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

export function setCategoriesSearchText(event)
{
    return {
        type      : SET_CATEGORIES_SEARCH_TEXT,
        searchText: event.target.value
    };
}

