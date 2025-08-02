import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { GetPembelianDetailResponse } from "../interfaces/pembelian";

interface PembelianState {
    transaction: GetPembelianDetailResponse[];
}

const initialState: PembelianState = {
    transaction: []
}

const pembelianSlice = createSlice({
    name: "pembelian",
    initialState,
    reducers: {
        addTransactionPembelian: (state, action: PayloadAction<GetPembelianDetailResponse>) => {
            const existingItem = state.transaction.find(item => item.barcode === action.payload.barcode);
            if (existingItem) {
                existingItem.jumlah += Number(1);
            } else {
                state.transaction.push({ ...action.payload, jumlah: Number(1) });
            }
        },
        updateTransactionPembelian: (state, action: PayloadAction<{ barcode: string, stok?: number, expiredDate?: string }>) => {
            const item = state.transaction.find(item => item.barcode === action.payload.barcode);
            if (item) {
                if (typeof action.payload.stok !== "undefined") {
                    item.jumlah = action.payload.stok;
                }
                if (typeof action.payload.expiredDate !== "undefined") {
                    item.expiredDate = action.payload.expiredDate;
                }
            }
        },
        deleteTransactionPembelian: (state, action: PayloadAction<string>) => {
            state.transaction = state.transaction.filter(item => item.barcode !== action.payload);  
        },
        clearTransactionPembelian: (state) => {
            state.transaction = [];
        }
    }
});

export const { addTransactionPembelian, updateTransactionPembelian, deleteTransactionPembelian, clearTransactionPembelian } = pembelianSlice.actions;
export default pembelianSlice.reducer;