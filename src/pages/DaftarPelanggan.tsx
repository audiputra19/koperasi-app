import { Plus } from "lucide-react";
import type { FC } from "react";
import { DataTable, type Column } from "../components/DataTable";
import { getTitle } from "../constants/GetTitle";
import { useNavigate } from "react-router-dom";

type Pelanggan = {
    kode: string;
    mataUang: string;
    nama: string;
    group: string;
};

const DaftarPelanggan: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();

    const data: Pelanggan[] = [
        { kode: "11049", mataUang: "IDR", nama: "Ade Ruslan", group: "ANG" },
        { kode: "11065", mataUang: "IDR", nama: "Ai Sumiati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
        { kode: "11105", mataUang: "IDR", nama: "Rahmawati", group: "ANG" },
    ];

    const columns: Column<Pelanggan>[] = [
        { key: "kode", label: "Kode", sortable: true },
        { key: "mataUang", label: "Mata Uang", sortable: true },
        { key: "nama", label: "Nama", sortable: true },
        { key: "group", label: "Group Pel", sortable: true },
    ];

    return (
        <div>
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => navigate('/tambah-pelanggan')}
                    >
                            <Plus size={18}/>
                            Tambah Pelanggan
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <DataTable<Pelanggan> 
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

export default DaftarPelanggan;