import {combineReducers} from 'redux';
import itemssku from './itemssku.reducer';
import itemsku from './itemsku.reducer';

const reducer = combineReducers({
    itemssku,
    itemsku,
});

export default reducer;
