import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';
export const itemskuConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/itemsku/itemssku/:itemSKUId/:itemskuHandle?',
            component: FuseLoadable({
                loader: () => import('./itemsku/itemSKU')
            })
        },
        {
            path     : '/apps/itemsku/itemssku',
            component: FuseLoadable({
                loader: () => import('./itemssku/ItemsSKU')
            })
        },
        {
            path     : '/apps/itemsku',
            component: () => <Redirect to="/apps/itemsku/itemssku"/>
        }
    ]
};
