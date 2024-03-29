import * as Actions from '../actions';

const initialState = {
    data: null,
    isReady:false,
};

const categoryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CATEGORY:
        {
            return {
                ...state,
                data: action.payload,
                isReady:action.isReady
            };
        }
        case Actions.SAVE_CATEGORY:
        {
            return {
                ...state,
                data: action.payload,
                isReady:action.isReady
            };
        }
        case Actions.UPDATE_CATEGORY:
        {
            return {
                ...state,
                data: action.payload,
                isReady:action.isReady
            };
        }
        case Actions.REMOVE_CATEGORY:
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

export default categoryReducer;
