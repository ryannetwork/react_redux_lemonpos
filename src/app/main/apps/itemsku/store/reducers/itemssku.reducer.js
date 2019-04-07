import * as Actions from '../actions';

const initialState = {
    data      : [],
    searchText: ''
};

const itemsSKUReducer = function (state = initialState, action) {
    switch ( action.type )
    {
      
        case Actions.GET_ITEMSSKU:
        {
            return {
                ...state,
                data: action.payload
            };
        }
        case Actions.UPDATE_ITEMSSKU:
        {
            const _objData = state.data.filter(n=> n._id !==action.payload._id);
            _objData.push(action.payload)
            return {
                ...state,
                data:_objData
             
            };
        }
        case Actions.DELETE_ITEMSSKU:
        {
            const _objData = state.data.filter(n=> n._id !==action.payload);
            return {
                ...state,
                data:_objData
             
            };
        }
        case Actions.SET_ITEMSSKU_SEARCH_TEXT:
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

export default itemsSKUReducer;
