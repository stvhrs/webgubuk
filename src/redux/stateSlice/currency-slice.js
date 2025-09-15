const { createSlice } = require('@reduxjs/toolkit');

const currencySlice = createSlice({
    name: "currency",
    initialState: {
        currencySymbol: "Rp. ",
        currencyName: "IDR",
        currencyRate: 1
    },
    reducers: {
        setCurrency(state, action) {
            const currencyName = action.payload;

         
                return state = {
                    currencySymbol: "Rp. ",
                    currencyRate: 1,
                    currencyName
                };
       
        }
    },
});

export const { setCurrency } = currencySlice.actions;
export default currencySlice.reducer;
