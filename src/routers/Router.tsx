import { AnimatePresence, motion } from "framer-motion";
import type { FC } from "react";
import { useLocation, useRoutes } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import DaftarItem from "../pages/DaftarItem";
import DaftarKasir from "../pages/DaftarKasir";
import DaftarPelanggan from "../pages/DaftarPelanggan";
import DaftarSupplier from "../pages/DaftarSupplier";
import Dashboard from "../pages/Dashboard";
import LoginPage from "../pages/LoginPage";
import Pembelian from "../pages/Pembelian";
import Penjualan from "../pages/Penjualan";
import TambahItem from "../pages/TambahItem";
import TambahKasir from "../pages/TambahKasir";
import TambahPelanggan from "../pages/TambahPelanggan";
import TambahSupplier from "../pages/TambahSupplier";
import { ProtectedRoute } from "./ProtectedRoute";

const PageTransition = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.2 }}
    >
        {children}
    </motion.div>
);

const Router: FC = () => {
    const location = useLocation();

    const routes = useRoutes([
        {
            path: '/',
            element: <ProtectedRoute><MainLayout /></ProtectedRoute>,
            children: [
                {
                    index: true,
                    element: <PageTransition><Dashboard /></PageTransition>,
                },
                {
                    path: 'daftar-pelanggan',
                    element: <PageTransition><DaftarPelanggan /></PageTransition>,
                },
                {
                    path: 'daftar-supplier',
                    element: <PageTransition><DaftarSupplier /></PageTransition>,
                },
                {
                    path: 'daftar-item',
                    element: <PageTransition><DaftarItem /></PageTransition>,
                },
                {
                    path: 'pembelian',
                    element: <PageTransition><Pembelian /></PageTransition>,
                },
                {
                    path: 'penjualan',
                    element: <PageTransition><Penjualan /></PageTransition>,
                },
                {
                    path: 'daftar-kasir',
                    element: <PageTransition><DaftarKasir /></PageTransition>,
                },
                {
                    path: 'edit-pelanggan/:id',
                    element: <PageTransition><TambahPelanggan /></PageTransition>,
                },
                {
                    path: 'tambah-supplier',
                    element: <PageTransition><TambahSupplier /></PageTransition>,
                },
                {
                    path: 'tambah-item',
                    element: <PageTransition><TambahItem /></PageTransition>,
                },
                {
                    path: 'tambah-kasir',
                    element: <PageTransition><TambahKasir /></PageTransition>,
                }
            ]
        },
        {
            path: '/login',
            element: <LoginPage />
        }
    ]);

    return (
        <AnimatePresence mode="wait" initial={false}>
        {routes && (
            <motion.div key={location.pathname}>
            {routes}
            </motion.div>
        )}
        </AnimatePresence>
    );
};

export default Router;
