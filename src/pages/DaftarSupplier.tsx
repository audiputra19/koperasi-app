import type { FC } from "react";
import { getTitle } from "../constants/GetTitle";
import { DataTable, type Column } from "../components/DataTable";
import { Plus } from "lucide-react";

type Supplier = {
    kode: string;
    mataUang: string;
    nama: string;
    alamat: string;
};
const DaftarSupplier: FC = () => {
    const title = getTitle();

    const data: Supplier[] = [
        { kode: "SP0001", mataUang: "IDR", nama: "INDO GROSIR", alamat: "Jl. Lkr. Selatan" },
        { kode: "SP0002", mataUang: "IDR", nama: "BELLA MOTOR", alamat: "" },
        { kode: "SP0003", mataUang: "IDR", nama: "BP APEN BERAS", alamat: "" },
    ];

    const columns: Column<Supplier>[] = [
        { key: "kode", label: "Kode", sortable: true },
        { key: "mataUang", label: "Mata Uang", sortable: true },
        { key: "nama", label: "Nama", sortable: true },
        { key: "alamat", label: "Alamat", sortable: true },
    ];

    return (
        <div>
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600">
                            <Plus size={18}/>
                            Tambah Supplier
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <DataTable<Supplier> 
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

export default DaftarSupplier;