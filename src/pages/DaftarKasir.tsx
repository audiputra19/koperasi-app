import type { FC } from "react";
import { getTitle } from "../constants/GetTitle";
import { DataTable, type Column } from "../components/DataTable";
import { Plus } from "lucide-react";

type Kasir = {
    noTransaksi: string;
    tanggal: string;
    kodePel: number;
    nama: string;
    mataUang: number;
    total: number;
    userBuat: string;
    userUbah: string;
    ppn: string;
};
const DaftarKasir: FC = () => {
    const title = getTitle();
        
    const data: Kasir[] = [
        {
            noTransaksi: "TRX001",
            tanggal: "2025-07-12",
            kodePel: 101,
            nama: "Budi Santoso",
            mataUang: 1,
            total: 250000,
            userBuat: "admin",
            userUbah: "admin",
            ppn: "10%",
        },
        {
            noTransaksi: "TRX002",
            tanggal: "2025-07-11",
            kodePel: 102,
            nama: "Siti Aminah",
            mataUang: 1,
            total: 500000,
            userBuat: "admin",
            userUbah: "kasir01",
            ppn: "10%",
        },
    ];

    const columns: Column<Kasir>[] = [
        { key: "noTransaksi", label: "No. Transaksi", sortable: true },
        { key: "tanggal", label: "Tanggal", sortable: true },
        { key: "kodePel", label: "Kd Pelanggan", sortable: true },
        { key: "nama", label: "Nama", sortable: true },
        { key: "mataUang", label: "Mata Uang", sortable: false },
        { key: "total", label: "Total", sortable: true },
        { key: "ppn", label: "PPN", sortable: false },
        { key: "userBuat", label: "User Buat", sortable: true },
        { key: "userUbah", label: "User Ubah", sortable: true },
    ];

    return (
        <div>
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600">
                            <Plus size={18}/>
                            Tambah Kasir
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <DataTable<Kasir> 
                    data={data} 
                    columns={columns} 
                    defaultSort={{ 
                        key: "nama", 
                        asc: true 
                    }} 
                    fileExportName={title}
                />
            </div>
        </div>
    )
}

export default DaftarKasir;