import { useEffect, useState } from "react";
import { sidebarMenu } from "./SidebarMenu";
import { useLocation } from "react-router-dom";

export const getTitle = () => {
    const location = useLocation();
    const path = location.pathname;
    const [title, setTitle] = useState<string>("Dashboard");

    useEffect(() => {
        const matchedMenu = sidebarMenu.find((menu) => {
            if (menu.submenus) {
                return menu.submenus.some((sub) => path.includes(sub.path));
            }
            if (menu.path === "") {
                return path === "/";
            }
            return path.startsWith(`/${menu.path}`);
        });

        if (matchedMenu) {
            const matchedSub = matchedMenu.submenus?.find((sub) => path.includes(sub.path));
            setTitle(matchedSub?.name || matchedMenu.name);
        } else {
            const segments = path.split("/").filter(Boolean);
            const slug = segments.length >= 2 ? segments.at(-2) : segments.at(-1);
            if(slug === 'edit-pelanggan') return setTitle('Edit Pelanggan');
            if(slug === 'tambah-supplier') return setTitle('Tambah Supplier');
            if(slug === 'tambah-item') return setTitle('Tambah Item');
            if(slug === 'tambah-kasir') return setTitle('Tambah Kasir');
            if(slug === 'edit-kasir') return setTitle('Edit Kasir');
            if(slug === 'tambah-pembelian') return setTitle('Tambah Pembelian');
        }
    }, [path]);

    return title;
}