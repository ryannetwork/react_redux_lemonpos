import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';
export const categoryConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/category/categories/:categoryId/:categoryHandle?',
            component: FuseLoadable({
                loader: () => import('./category/category')
            })
        },
        {
            path     : '/apps/category/categories',
            component: FuseLoadable({
                loader: () => import('./categories/Categories')
            })
        },
        {
            path     : '/apps/category',
            component: () => <Redirect to="/apps/category/categories"/>
        }
    ]
};
