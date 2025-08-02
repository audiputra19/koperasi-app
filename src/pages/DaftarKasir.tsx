import type { FC, JSX } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { DataTable, type Column } from "../components/DataTable";
import { getTitle } from "../constants/GetTitle";
import { useNavigate } from "react-router-dom";
import { useGetKasirQuery } from "../services/apiKasir";
import moment from 'moment';
import { TbEdit } from "react-icons/tb";
import { FaRegTrashCan } from "react-icons/fa6";
import { RiDeleteBin5Line } from "react-icons/ri";
import Loading from "../components/Loading";

type Kasir = {
    noTransaksi: string;
    tanggal: string;
    kodePel: number;
    nama: string;
    total: string;
    userBuat: string;
    userUbah: string;
    action: JSX.Element;
};

const DaftarKasir: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading} = useGetKasirQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
        
    const dataKasir = data?.map(item => {
        const date = moment(item.tanggal).format("YYYY-MM-DD HH:mm:ss");
        const userUbah = item.userUbah === null ? "" : item.userUbah

        return {
            noTransaksi: item.idTransaksi,
            tanggal: date,
            kodePel: item.kdPelanggan,
            nama: item.namaPelanggan,
            total: item.total.toLocaleString("id-ID"),
            userBuat: item.userBuat,
            userUbah: userUbah,
            action: (
                <div className="flex gap-3">
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate(`/edit-kasir/${encodeURIComponent(item.idTransaksi)}`)}
                    >
                        <TbEdit size={20} />
                    </button>
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate(`/edit-kasir/${encodeURIComponent(item.idTransaksi)}`)}
                    >
                        <RiDeleteBin5Line size={20} />
                    </button>
                </div>
            )
        }
    })

    const columns: Column<Kasir>[] = [
        { key: "noTransaksi", label: "No. Transaksi", align: "center", sortable: true },
        { key: "tanggal", label: "Tanggal", align: "center", width: 200, sortable: true },
        { key: "kodePel", label: "Kd Pelanggan", align: "center", sortable: true },
        { key: "nama", label: "Nama", align: "left", width: 200, sortable: true },
        { key: "total", label: "Total", align: "right", sortable: true },
        { key: "userBuat", label: "User Buat", align: "center", sortable: true },
        { key: "userUbah", label: "User Ubah", align: "center", sortable: true },
        { key: "action", label: "Edit", align: "center", sortable: true },
    ];

    return (
        <div>
            {isLoading && <Loading />}
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => navigate('/tambah-kasir')}
                    >
                            <FiPlusCircle size={20}/>
                            Tambah Kasir
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DataTable<Kasir> 
                        data={dataKasir ?? []} 
                        columns={columns} 
                        fileExportName={title}
                        exportToExcelBtn={true}
                        exportToPdfBtn={true}
                        searchFilter={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default DaftarKasir;