const BaseUrl="http://localhost:3000/api/";

export const apiEnum={
    Inventory: {
    Category:{
        createCategory :BaseUrl + 'inventory/category/create',
        updateCategory:BaseUrl + 'inventory/category/update',
        getCategories: BaseUrl + 'inventory/category',
        getCategoryById:BaseUrl + 'inventory/category/',
        deleteCategoryById:BaseUrl + 'inventory/category/',
    },
    ItemSKU:{
        createItemSKU :BaseUrl + 'inventory/itemsku/create',
        updateItemSKU:BaseUrl + 'inventory/itemsku/update',
        getItemsSKU: BaseUrl + 'inventory/itemsku',
        getItemSKUById:BaseUrl + 'inventory/itemsku/',
        deleteItemSKUById:BaseUrl + 'inventory/itemsku/',
    }
    }
};