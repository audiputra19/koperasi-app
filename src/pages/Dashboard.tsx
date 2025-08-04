import { LucideBox } from "lucide-react";
import moment from "moment";
import type { FC } from "react";
import { FaArrowRight, FaUsersViewfinder } from "react-icons/fa6";
import { FiShoppingBag } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import { useGetExpiredItemQuery, useGetLimitItemQuery, useGetMostBuyerQuery, useGetPopulerItemQuery, useGetTotalAnggotaQuery, useGetTotalItemQuery, useGetTotalSupplierQuery } from "../services/apiDashboard";

type Restock = {
    nama: string;
    jumlah: number;
    rak: string;
}

type Expired = {
    nama: string;
    jumlah: number;
    rak: string;
    expired: string;
}

type Populer = {
    nama: string;
    total: number;
}

const Dashboard: FC = () => {
    const navigate = useNavigate();
    const {data: totalAnggota} = useGetTotalAnggotaQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {data: totalSupplier} = useGetTotalSupplierQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {data: totalItem} = useGetTotalItemQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {data: limitItem} = useGetLimitItemQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {data: expiredItem} = useGetExpiredItemQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {data: populerItem} = useGetPopulerItemQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {data: mostBuyer} = useGetMostBuyerQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const dataRestock = limitItem?.map(item => ({
        nama: item.nama,
        jumlah: item.jumlah,
        rak: item.rak,
    }));

    const columnRestock: Column<Restock>[] = [
        { key: "nama", label: "Nama Item", align: "left", sortable: false },
        { key: "jumlah", label: "Jumlah", align: "center", sortable: false },
        { key: "rak", label: "Rak", align: "center", sortable: false },
    ];

    const dataExpired = expiredItem?.map(item => ({
        nama: item.nama,
        jumlah: item.jumlah,
        rak: item.rak,
        expired: moment(item.expiredDate).format("YYYY-MM-DD") ?? "",
    }));

    const columnExpired: Column<Expired>[] = [
        { key: "nama", label: "Nama Item", align: "left", sortable: false },
        { key: "jumlah", label: "Jumlah", align: "center", sortable: false },
        { key: "rak", label: "Rak", align: "center", sortable: false },
        { key: "expired", label: "Expired", align: "center", sortable: false },
    ];

    const dataPopulerItem = populerItem?.map(item => ({
        nama: item.nama,
        total: item.total,
    }));

    const columnPopulerItem: Column<Populer>[] = [
        { key: "nama", label: "Nama Item", align: "left", sortable: false },
        { key: "total", label: "Total", align: "center", sortable: false },
    ];

    const data1 = [
        {
            id: 1,
            icon: <FaUsersViewfinder size={25}/>,
            title: "Total Anggota",
            total: totalAnggota?.total ?? 0,
            link: "daftar-pelanggan"
        },
        {
            id: 2,
            icon: <FiShoppingBag size={25}/>,
            title: "Total Supplier",
            total: totalSupplier?.total ?? 0,
            link: "daftar-supplier"
        },
        {
            id: 3,
            icon: <LucideBox size={25}/>,
            title: "Total Item",
            total: totalItem?.total ?? 0,
            link: "daftar-item"
        }
    ];

    const listData1 = data1.map(item => {
        return (
            <div key={item.id}>
                <div className="p-3 bg-white border-2 border-gray-100 rounded-xl">
                    <div className="flex gap-3">
                        <div className="">
                            <div className="bg-blue-100 p-2 flex justify-center w-[40px] rounded text-blue-500">
                                {item.icon}
                            </div>
                        </div>
                        <div className="flex-1">
                            <div className="">
                                <p className="text-sm font-semibold text-gray-400">{item.title}</p>
                            </div>
                            <div className="mt-1">
                                <p className="text-2xl font-bold text-slate-700">{item.total}</p>
                            </div>
                            <div className="flex justify-end">
                                <button
                                    type="button"
                                    className="border border-blue-500 btn btn-sm bg-white text-blue-500 hover:bg-blue-600 hover:text-white"
                                    onClick={() => navigate(`/${item.link}`)}
                                >
                                    View
                                    <FaArrowRight />
                                </button>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>
        )
    });

    return (
        <div>
            <div className="flex gap-3 w-full">
                {/* Dashboard Kiri */}
                <div className="flex-1">
                    <div className="grid grid-cols-3 gap-3 w-full">
                        {listData1}
                    </div>
                    <div className="grid grid-cols-2 gap-3 w-full mt-3">
                        <div className="p-3 bg-white border-2 border-gray-100 rounded-xl">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400 font-bold">Barang yang perlu restock</p>
                                <div>
                                    <DataTable<Restock> 
                                        data={dataRestock ?? []} 
                                        columns={columnRestock}
                                        scrollOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="p-3 bg-white border-2 border-gray-100 rounded-xl">
                            <div className="flex flex-col">
                                <p className="text-sm text-gray-400 font-bold">Barang yang akan expired</p>
                                <div>
                                    <DataTable<Expired> 
                                        data={dataExpired ?? []} 
                                        columns={columnExpired}
                                        scrollOnly={true}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dashboard Kanan */}
                <div className="w-1/4">
                    <div className="p-3 bg-white border-2 border-gray-100 rounded-xl">
                        <div className="flex flex-col">
                            <p className="text-sm text-gray-400 font-bold">Populer Item</p>
                            <div>
                                <DataTable<Populer> 
                                    data={dataPopulerItem ?? []} 
                                    columns={columnPopulerItem}
                                    scrollOnly={true}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                </div>
        </div>
    )
}

export default Dashboard;