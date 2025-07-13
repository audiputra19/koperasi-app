import type { FC } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import DaftarPelanggan from "../pages/DaftarPelanggan";
import DaftarSupplier from "../pages/DaftarSupplier";
import DaftarItem from "../pages/DaftarItem";
import Pembelian from "../pages/Pembelian";
import Penjualan from "../pages/Penjualan";
import DaftarKasir from "../pages/DaftarKasir";
import TambahPelanggan from "../pages/TambahPelanggan";

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
            element: <MainLayout />,
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
                    path: 'tambah-pelanggan',
                    element: <PageTransition><TambahPelanggan /></PageTransition>,
                }
            ]
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
