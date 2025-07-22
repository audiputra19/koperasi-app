import type { FC } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { DataTable, type Column } from "../components/DataTable";
import { getTitle } from "../constants/GetTitle";
import { useNavigate } from "react-router-dom";

type Kasir = {
    noTransaksi: string;
    tanggal: string;
    kodePel: number;
    nama: string;
    total: number;
    userBuat: string;
    userUbah: string;
    ppn: string;
};
const DaftarKasir: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
        
    const data: Kasir[] = Array.from({ length: 50 }, (_, index) => (
        {
            noTransaksi: "TRX001",
            tanggal: "2025-07-12",
            kodePel: 101,
            nama: "Budi Santoso",
            total: 250000,
            userBuat: "admin",
            userUbah: "admin",
            ppn: "10%",
        }
    ));

    const columns: Column<Kasir>[] = [
        { key: "noTransaksi", label: "No. Transaksi", align: "center", sortable: true },
        { key: "tanggal", label: "Tanggal", align: "center", sortable: true },
        { key: "kodePel", label: "Kd Pelanggan", align: "center", sortable: true },
        { key: "nama", label: "Nama", align: "left", sortable: true },
        { key: "total", label: "Total", align: "right", sortable: true },
        { key: "ppn", label: "PPN", align: "center", sortable: false },
        { key: "userBuat", label: "User Buat", align: "center", sortable: true },
        { key: "userUbah", label: "User Ubah", align: "center", sortable: true },
    ];

    return (
        <div>
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
                        data={data} 
                        columns={columns} 
                        defaultSort={{ 
                            key: "nama", 
                            asc: true 
                        }} 
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