import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import authSlice from "./authSlice"
import kasirSlice from "./kasirSlice"
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, type TypedUseSelectorHook } from "react-redux";
import { useSelector } from "react-redux";
import { apiAuth } from "../services/apiAuth";
import { apiSupplier } from "../services/apiSupplier";
import { apiPelanggan } from "../services/apiPelanggan";
import { apiItems } from "../services/apiItems";
import { apiKasir } from "../services/apiKasir";

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['auth', 'kasir']
}

const rootReducer = combineReducers({
    auth: authSlice,
    kasir: kasirSlice,
    [apiAuth.reducerPath]: apiAuth.reducer,
    [apiSupplier.reducerPath]: apiSupplier.reducer,
    [apiPelanggan.reducerPath]: apiPelanggan.reducer,
    [apiItems.reducerPath]: apiItems.reducer,
    [apiKasir.reducerPath]: apiKasir.reducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }).concat(
            apiAuth.middleware,
            apiSupplier.middleware,
            apiPelanggan.middleware,
            apiItems.middleware,
            apiKasir.middleware
        )
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch = () => useDispatch<typeof store.dispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;