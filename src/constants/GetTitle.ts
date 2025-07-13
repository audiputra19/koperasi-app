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
            const slug = path.split("/").filter(Boolean).pop();
            if(slug === 'tambah-pelanggan') return setTitle('Tambah Pelanggan');
        }
    }, [path]);

    return title;
}