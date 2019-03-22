import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';
export const productConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/product/products/:productId/:productHandle?',
            component: FuseLoadable({
                loader: () => import('./product/Product')
            })
        },
        {
            path     : '/apps/product/products',
            component: FuseLoadable({
                loader: () => import('./products/Products')
            })
        },
        {
            path     : '/apps/product',
            component: () => <Redirect to="/apps/product/products"/>
        }
    ]
};
