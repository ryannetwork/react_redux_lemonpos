import * as Actions from '../actions';

const initialState = {
    data: null,
    categories:[]
};

const categoryReducer = function (state = initialState, action) {
    switch ( action.type )
    {
        case Actions.GET_CATEGORIES:
        {
            state.categories=action.payload;

            return {
                ...state,
                categories:  state.categories
            };
         
        }
        case Actions.GET_CATEGORY:
        {
            return {
                ...state,
                data: action.payload,
                categories:state.categories
            };
        }
        case Actions.SAVE_CATEGORY:
        {
            return {
                ...state,
                data: action.payload,
                categories:state.categories
            };
        }
        case Actions.REMOVE_CATEGORY:
        {
            return {
                ...state
            };
        }
        default:
        {
            return state;
        }
    }
};

export default categoryReducer;
