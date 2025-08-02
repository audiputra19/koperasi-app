import clsx from "clsx";
import { ArrowLeft, ChevronDown, ChevronRight, LogOut, Settings, User, X } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { FaBars, FaStore, FaXmark } from "react-icons/fa6";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { getTitle } from "../constants/GetTitle";
import { sidebarMenu } from "../constants/SidebarMenu";
import { useAppDispatch } from "../store";
import { clearToken } from "../store/authSlice";
import { usePostMeQuery } from "../services/apiAuth";
import Alert from "../components/Alert";
import { clearTransaction } from "../store/kasirSlice";
import { clearTransactionPembelian } from "../store/pembelianSlice";

const MainLayout: FC = () => {
    const location = useLocation();
    const path = location.pathname;
    const navigate = useNavigate();
    const [toggledMenus, setToggledMenus] = useState<Record<string, boolean>>({});
    const title = getTitle();
    const dispatch = useAppDispatch();
    const {data, isLoading} = usePostMeQuery();
    const user = data?.user;
    const isKasirPage = path === "/tambah-kasir" || /^\/edit-kasir\/.+/.test(path);
    const isPembelianPage = path === "/tambah-pembelian" || /^\/edit-pembelian\/.+/.test(path);
    const [collapsed, setCollapsed] = useState<boolean>(() => {
        const saved = localStorage.getItem("sidebarCollapsed");
        return saved === "true"; // true kalau string 'true'
    });

    useEffect(() => {
        localStorage.setItem("sidebarCollapsed", String(collapsed));
    }, [collapsed]);

    const matchedMenu = sidebarMenu.find((menu) => {
        if (menu.submenus) {
            return menu.submenus.some((sub) => path.includes(sub.path));
        }
        if (menu.path === "") {
            return path === "/";
        }
        return path.startsWith(`/${menu.path}`);
    });

    const isMenuPath = (menuPath: string) => {
        if (menuPath === "") {
            return path === "/";
        }

        if (menuPath === "menu-utama") {
            return ["daftar-item", "daftar-supplier", "daftar-pelanggan"].some((sub) =>
                path.includes(sub)
            );
        }

        if (menuPath === "penjualan") {
            return ["daftar-kasir"].some((sub) =>
                path.includes(sub)
            );
        }

        return path.startsWith(`/${menuPath}`);
    };

    const toggleMenu = (menuName: string) => {
        setToggledMenus((prev) => {
            const isCurrentlyOpen = !!prev[menuName];
            return {
                [menuName]: !isCurrentlyOpen
            };
        });
    };

    const listMenu = sidebarMenu.map((menu, index) => {
        const isActive = isMenuPath(menu.path);
        const isOpen = toggledMenus[menu.path] || isMenuPath(menu.path);
        const Icon = menu.icon;

        return (
            <div key={index}>
                <div 
                    className={clsx("px-5 py-3 rounded-md cursor-pointer group", 
                        "hover:bg-blue-50", {
                            "bg-blue-50": isActive,
                        })}
                    onClick={() => 
                        menu.submenus ? toggleMenu(menu.path) : navigate(menu.path === "dashboard" ? "/" : `/${menu.path}`)
                    }
                >
                    <div className="flex justify-between items-center text-white">
                        <div className="flex items-center gap-3">
                            <Icon 
                                className={clsx("group-hover:text-blue-600",
                                    isActive ? "text-blue-600" : "text-slate-600",
                                )} 
                                size={22}
                            />
                            <p 
                                className={clsx("text-sm font-semibold group-hover:text-blue-600",
                                    isActive ? "text-blue-600" : "text-slate-800",
                                )}
                            >{menu.name}</p>
                        </div>
                        <div>
                            {menu.submenus && <ChevronRight 
                                className={clsx("text-slate-800 group-hover:text-blue-600", {
                                    "rotate-90": isOpen,
                                })} 
                                size={20}
                            />}
                        </div>
                    </div>  
                </div>
                {menu.submenus && (
                    <div
                        className={clsx(
                            "text-sm overflow-hidden transition-all duration-300",
                            isOpen ? "max-h-40 py-2" : "max-h-0 py-0"
                        )}
                    >
                        {menu.submenus.map((sub, index) => (
                            <div 
                                key={index}
                                className={clsx("pl-14 pr-5 py-2 cursor-pointer",
                                    "hover:text-slate-800 hover:bg-gray-100",
                                    path.includes(sub.path) ? "bg-gray-100 text-slate-800" : "text-slate-600")}
                                onClick={() => navigate(`/${sub.path}`)}
                            >{sub.name}</div>
                        ))}
                    </div>
                )}
            </div>
        )
    });

    return (
        <>
            {/* Desktop */}
            <div className="hidden sm:block">
                <Alert />
                <div
                    className={clsx(
                        "w-64 border-r-2 border-gray-100 min-h-screen fixed z-20 bg-white transition-transform duration-300 ease-in-out",
                        collapsed ? "-translate-x-full" : "translate-x-0"
                    )}
                >
                    <div className="p-5">
                        <div className="flex justify-between items-center">
                            <div className="flex items-center text-white gap-3">
                                <FaStore size={30} className="text-slate-800"/>
                                <p className="font-bold text-xl text-slate-800">Kopsa</p>
                            </div>
                            {!collapsed && (
                                <X 
                                    onClick={() => setCollapsed(true)} 
                                    className="text-slate-800 cursor-pointer hover:text-blue-500 mr-2"
                                    size={25}
                                />
                            )}
                        </div>
                    </div>

                    {/* Menu List */}
                    <div className="mt-2 px-3">
                        {listMenu}
                    </div>
                </div>
                <div
                    className={clsx(
                        "transition-all duration-300 bg-gray-50 min-h-screen",
                        collapsed ? "ml-0" : "ml-64"
                    )}
                >
                    <div className="flex justify-between items-center p-5 h-17 bg-white border-b-2 border-gray-100 sticky top-0 z-10">
                        <div className="flex items-center gap-3">
                            {collapsed && (
                                <FaBars
                                    onClick={() => setCollapsed(false)}
                                    className="text-slate-800 cursor-pointer hover:text-blue-500 mr-2"
                                    size={20}
                                />
                            )}
                            {!matchedMenu && (
                                <ArrowLeft 
                                    onClick={() => {
                                        navigate(-1);
                                        if(isKasirPage) dispatch(clearTransaction());
                                        if(isPembelianPage) dispatch(clearTransactionPembelian());
                                    }} 
                                    className="text-slate-800 cursor-pointer border-2 border-gray-400 p-1 rounded-full hover:bg-gray-100"
                                    size={30}
                                />
                            )}
                            <p className="text-lg font-semibold text-slate-800">{title}</p>
                        </div>
                        <div className="flex items-center gap-2">
                            <img 
                                src="https://images.unsplash.com/photo-1499714608240-22fc6ad53fb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1480&q=80" 
                                alt="profile-picture" 
                                className="w-8 h-8 object-cover rounded-full" 
                            />
                            <div>
                                <p className="text-sm font-bold text-slate-800">{user?.nama}</p>
                            </div>
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <div tabIndex={0} className="cursor-pointer p-2 rounded-full hover:bg-gray-100">
                                    <ChevronDown size={20} />
                                </div>
                                <ul tabIndex={0} className="dropdown-content gap-2 menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-xl border border-gray-200 mt-5">
                                    <li>
                                        <a><User size={20}/>Profile</a>
                                    </li>
                                    <li>
                                        <a><Settings size={20}/>Settings</a>
                                    </li>
                                    <li 
                                        className="border-t border-gray-200 pt-2"
                                        onClick={() => dispatch(clearToken())}
                                    >
                                        <a><LogOut size={20}/>Logout</a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="p-4">
                        <Outlet />
                    </div>
                </div>
            </div>

            {/* End Desktop */}

            {/* Mobile */}

            {/* End Mobile */}
        </>
    )
}

export default MainLayout