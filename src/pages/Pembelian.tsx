import moment from 'moment';
import type { FC, JSX } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import Loading from "../components/Loading";
import { getTitle } from "../constants/GetTitle";
import { useGetPembelianQuery } from "../services/apiPembelian";

type Pembelian = {
    noTransaksi: string;
    tanggal: string;
    kodeSupp: string;
    nama: string;
    total: string;
    userBuat: string;
    userUbah: string;
    action: JSX.Element;
};

const Pembelian: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading} = useGetPembelianQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
        
    const dataPembelian = data?.map(item => {
        const date = moment(item.tanggal).format("YYYY-MM-DD HH:mm:ss");
        const userUbah = item.userUbah === null ? "" : item.userUbah

        return {
            noTransaksi: item.idTransaksi,
            tanggal: date,
            kodeSupp: item.kdSupplier,
            nama: item.namaSupplier,
            total: item.total.toLocaleString("id-ID"),
            userBuat: item.userBuat,
            userUbah: userUbah,
            action: (
                <div className="flex gap-3">
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate(`/edit-pembelian/${encodeURIComponent(item.idTransaksi)}`)}
                    >
                        <TbEdit size={20} />
                    </button>
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate(`/edit-pembelian/${encodeURIComponent(item.idTransaksi)}`)}
                    >
                        <RiDeleteBin5Line size={20} />
                    </button>
                </div>
            )
        }
    })

    const columns: Column<Pembelian>[] = [
        { key: "noTransaksi", label: "No. Transaksi", align: "center", sortable: true },
        { key: "tanggal", label: "Tanggal", align: "center", width: 200, sortable: true },
        { key: "kodeSupp", label: "Kd Supplier", align: "center", sortable: true },
        { key: "nama", label: "Nama", align: "left", sortable: true },
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
                        onClick={() => navigate('/tambah-pembelian')}
                    >
                        <FiPlusCircle size={20}/>
                        Tambah Pembelian
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DataTable<Pembelian> 
                        data={dataPembelian ?? []} 
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

export default Pembelian;