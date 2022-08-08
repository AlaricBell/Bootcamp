import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: {
        valueExample: 0
    },
    reducers: {
        example: (state) => {
            state.valueExample += 1;
        },
        exampleWithAction: (state, action) => {
            state.valueExample = action.payload;
        }
    }
});

export const {reducer, actions} = userSlice;
export const {example, exampleWithAction} = userSlice.actions