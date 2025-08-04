import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetKasirDetailResponse } from "../interfaces/kasir";

interface KasirState {
    transaction: GetKasirDetailResponse[];
}

const initialState: KasirState = {
    transaction: []
}

const kasirSlice = createSlice({
    name: "kasir",
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<GetKasirDetailResponse>) => {
            const existingItem = state.transaction.find(item => item.barcode === action.payload.barcode);
            if (existingItem) {
                existingItem.jumlah += Number(1);
            } else {
                state.transaction.push({ ...action.payload, jumlah: Number(1) });
            }
        },
        updateTransaction: (state, action: PayloadAction<{ barcode: string, stok: number }>) => {
            const item = state.transaction.find(item => item.barcode === action.payload.barcode);
            if (item) {
                item.jumlah = action.payload.stok;
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