import type { FC, JSX } from "react";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import { getTitle } from "../constants/GetTitle";
import { FiPlusCircle } from "react-icons/fi";

type Pembelian = {
    noTransaksi: number;
    tanggal: string;
    kdSupplier: string;
    namaSupplier: string;
    total: number;
    userBuat: string;
    userUbah: string;
    action: JSX.Element;
};
const Pembelian: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();

    const dataPembelian: Pembelian[] = Array.from({ length: 50 }, (_, index) => (
        { 
            noTransaksi: index + 1,
            tanggal: "2023-01-01",
            kdSupplier: "SP001",
            namaSupplier: "Supplier A",
            total: 100000,
            userBuat: "admin",
            userUbah: "admin",
            action: (
                <button
                    className="cursor-pointer"
                    onClick={() => navigate(`/edit-pembelian/${index + 1}`)}
                >
                    <TbEdit size={20}/>
                </button>
            ),
        }
    ));

    const columns: Column<Pembelian>[] = [
        { key: "noTransaksi", label: "No Transaksi", align: "center", sortable: true },
        { key: "tanggal", label: "Tanggal", align: "left", sortable: true },
        { key: "kdSupplier", label: "Kode Supplier", align: "center", sortable: true },
        { key: "namaSupplier", label: "Nama Supplier", align: "center", sortable: true },
        { key: "total", label: "Total", align: "center", sortable: true },
        { key: "userBuat", label: "User Buat", align: "center", sortable: true },
        { key: "userUbah", label: "User Ubah", align: "center", sortable: true },
        { key: "action", label: "Action", align: "center" },
    ];

    return (
        <div>
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => navigate('/tambah-supplier')}
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