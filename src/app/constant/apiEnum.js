const BaseUrl="http://localhost:3000/api/";

export const apiEnum={
    Inventory: {
    Category:{
        createCategory :BaseUrl + 'inventory/category/create',
        updateCategory:BaseUrl + 'inventory/category/update',
        getCategories: BaseUrl + 'inventory/category',
        getCategoryById:BaseUrl + 'inventory/category/',
        deleteCategoryById:BaseUrl + 'inventory/category/',
    }
    }
};