

const navigationConfig = [
    {
        'id'      : 'applications',
        'title'   : 'Applications',
        'type'    : 'group',
        'icon'    : 'apps',
        'children': [
            {
                'id'      : 'dashboards',
                'title'   : 'Dashboards',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'children': [
                    {
                        'id'   : 'sell-dashboard',
                        'title': 'Sell Dashboard',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/analytics'
                    },
                    {
                        'id'   : 'inventory-dashboard',
                        'title': 'Inventory Dashboard',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                'id'      : 'pointofsale',
                'title'   : 'Point Of Sale',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'children': [
                    {
                        'id'   : 'sell',
                        'title': 'Sell',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/analytics'
                    },
                    {
                        'id'   : 'cash-register',
                        'title': 'Cash Register',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    }
                ]
            },
            {
                'id'      : 'product',
                'title'   : 'Product',
                'type'    : 'collapse',
                'icon'    : 'dashboard',
                'children': [
                    {
                        'id'   : 'product',
                        'title': 'New Product',
                        'type' : 'item',
                        'url'  : '/apps/product/products',
                        'exact': true
                    },
                
                    {
                        'id'   : 'category',
                        'title': 'Category',
                        'type' : 'item',
                        'url'  : '/apps/category/categories'
                    },
                    {
                        'id'   : 'varienttype',
                        'title': 'Varient Type',
                        'type' : 'item',
                        'url'  : '/apps/dashboards/project'
                    },
                    {
                        'id'   : 'item-sku',
                        'title': 'Item SKU',
                        'type' : 'item',
                        'url'  : '/apps/itemsku/itemssku'
                    }
                ]
            },
 
        ]
    },
   
];

export default navigationConfig;
