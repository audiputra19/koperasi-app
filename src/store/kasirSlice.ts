import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { LoginResponse } from "../interfaces/auth";
import type { getItemResponse } from "../interfaces/items";

interface KasirState {
    transaction: getItemResponse[];
}

const initialState: KasirState = {
    transaction: []
}

const kasirSlice = createSlice({
    name: "item",
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<getItemResponse>) => {
            const existingItem = state.transaction.find(item => item.barcode === action.payload.barcode);
            if (existingItem) {
                existingItem.stok += Number(1);
            } else {
                state.transaction.push({ ...action.payload, stok: Number(1) });
            }
        },
        updateTransaction: (state, action: PayloadAction<{ barcode: string, stok: number }>) => {
            const item = state.transaction.find(item => item.barcode === action.payload.barcode);
            if (item) {
                item.stok = action.payload.stok;
            }
        },
        deleteTransaction: (state, action: PayloadAction<string>) => {
            state.transaction = state.transaction.filter(item => item.barcode !== action.payload);  
        },
        clearTransaction: (state) => {
            state.transaction = [];
        }
    }
});

export const { addTransaction, updateTransaction, deleteTransaction, clearTransaction } = kasirSlice.actions;
export default kasirSlice.reducer;