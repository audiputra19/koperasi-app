import { FileText, GalleryVerticalEnd, LayoutDashboard, Package, Store } from "lucide-react";

export const sidebarMenu = [
    { 
        name: "Dashboard", 
        path: "", 
        icon: LayoutDashboard
    },
    { 
        name: "Menu Utama", 
        path: "menu-utama", 
        icon: GalleryVerticalEnd, 
        submenus: [
            { name: "Daftar Pelanggan", path: "daftar-pelanggan" },
            { name: "Daftar Supplier", path: "daftar-supplier" },
            { name: "Daftar Item", path: "daftar-item" },
        ], 
    },
    { 
        name: "Pembelian", 
        path: "pembelian", 
        icon: Package
    },
    { 
        name: "Penjualan", 
        path: "penjualan", 
        icon: Store,
        submenus: [
            { name: "Daftar Kasir", path: "daftar-kasir" },
        ]
    },
    { 
        name: "Laporan", 
        path: "laporan", 
        icon: FileText
    },
];