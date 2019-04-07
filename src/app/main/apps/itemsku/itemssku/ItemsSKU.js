import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import ItemSKUTable from './ItemSKUTable';
import ItemSKUHeader from './ItemSKUHeader';
import reducer from '../store/reducers';

const ItemsSKU = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <ItemSKUHeader/>
            }
            content={
                <ItemSKUTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('itemskuApp', reducer)(ItemsSKU);
