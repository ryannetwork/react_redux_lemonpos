import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import CategoryTable from './CategoryTable';
import CategoryHeader from './CategoryHeader';
import reducer from '../store/reducers';

const Categories = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            header={
                <CategoryHeader/>
            }
            content={
                <CategoryTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('eCommerceApp', reducer)(Categories);
