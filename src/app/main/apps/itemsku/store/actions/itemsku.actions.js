import axios from 'axios';
import {showMessage} from 'app/store/actions/fuse';
import {apiEnum} from '../../../../../constant/apiEnum';
export const GET_ITEMSKU = '[ITEMSKU APP] GET ITEMSKU';
export const SAVE_ITEMSKU = '[ITEMSKU APP] SAVE ITEMSKU';
export const UPDATE_ITEMSKU = '[ITEMSKU APP] UPDATE ITEMSKU';
export const REMOVE_ITEMSKU = '[ITEMSKU APP] REMOVE ITEMSKU';
export function getItemSKU(params)
{
    const request = axios.get(apiEnum.Inventory.ItemSKU.getItemSKUById+params.itemSKUId);

    return (dispatch) =>
        request.then((response) =>
        dispatch({
            type   : GET_ITEMSKU,
            payload: response.data,
            isReady:false
        })
        );
}

export function updateItemSKU(data)
{
    const request = axios.put(apiEnum.Inventory.ItemSKU.updateItemSKU, data);

    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'ItemSKU Updated'}));
              
                return dispatch({
                    type   : UPDATE_ITEMSKU,
                    payload: data,
                    isReady:true
                });
            }
        );
}

export function saveItemSKU(data)
{
    const request = axios.post(apiEnum.Inventory.ItemSKU.createItemSKU, data);
    return (dispatch) =>
        request.then((response) => {
                dispatch(showMessage({message: 'ItemSKU Created'}));
                 dispatch({
                    type   : SAVE_ITEMSKU,
                    payload: response.data,
                    isReady:true
                });
            
            }
        );
}
export function removeItemSKU(data)
{
    const request = axios.delete(apiEnum.Inventory.ItemSKU.deleteItemSKUById +data._id);

    return (dispatch) =>
        request.then((response) => {

            dispatch(showMessage({message: 'ItemSKU Removed'}));
            return dispatch({
                type   : REMOVE_ITEMSKU,
                isReady:true
            });
           

              
            }
        );
}
export function newItemSKU()
{
    const data = {
        skuCode: '',
        skuName: '',
        skuDesc: '',
        skuStatus: false,
        skuParent: [],
        chk:false
    };

    return {
        type   : GET_ITEMSKU,
        payload: data
    }
}
