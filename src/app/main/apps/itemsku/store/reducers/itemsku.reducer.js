import * as Actions from '../actions';

const initialState = {
    data: null,
    isReady:false,
};

const itemSKUReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_ITEMSKU:
        {
            return {
                ...state,
                data: action.payload,
                isReady:action.isReady
            };
        }
        case Actions.SAVE_ITEMSKU:
        {
            return {
                ...state,
                data: action.payload,
                isReady:action.isReady
            };
        }
        case Actions.UPDATE_ITEMSKU:
        {
            return {
                ...state,
                data: action.payload,
                isReady:action.isReady
            };
        }
        case Actions.REMOVE_ITEMSKU:
        {
            return {
                ...state,
                isReady:action.isReady
            };
        }
        default:
        {
            return {
                ...state,
                isReady:false
            }
        }
    }
};

export default itemSKUReducer;
