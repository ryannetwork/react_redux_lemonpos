import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const categoriesReducer = function (state = initialState, action) {
    switch ( action.type )
    {
      
        case Actions.GET_CATEGORIES:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.UPDATE_CATEGORIES:
        {
            const _objData = state.data.filter(n=> n._id !==action.payload._id);
            _objData.push(action.payload)
            return {
                ...state,
                data:_objData
             
            };
        }
        case Actions.DELETE_CATEGORIES:
        {
            console.log(action.payload)
            const _objData = state.data.filter(n=> n._id !==action.payload);
            return {
                ...state,
                data:_objData
             
            };
        }
        case Actions.SET_CATEGORIES_SEARCH_TEXT:
        {
            return {
                ...state,
                searchText: action.searchText
            };
        }
        default:
        {
            return state;
        }
    }
};

export default categoriesReducer;
