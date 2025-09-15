import products from "./products.json";
const { createSlice } = require('@reduxjs/toolkit');

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: products,
    },
    reducers: {
        setProducts(state, action) {
            state.products = action.payload;
        }
    },
});

export const { setProducts } = productSlice.actions;
export default productSlice.reducer;
