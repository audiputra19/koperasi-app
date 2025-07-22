import { useEffect, type FC } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import { getTitle } from "../constants/GetTitle";
import { useGetSupplierQuery } from "../services/apiSupplier";
import Loading from "../components/Loading";
import type { getSupplierResponse } from "../interfaces/supplier";

type Supplier = {
    kode: string;
    nama: string;
    alamat: string;
}

const DaftarSupplier: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading} = useGetSupplierQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const dataSupplier = data?.map(item => ({ 
        kode: item.kode, nama: item.nama, alamat: item.alamat 
    }));

    const columns: Column<Supplier>[] = [
        { key: "kode", label: "Kode", align: "center", sortable: true },
        { key: "nama", label: "Nama", align: "left", sortable: true },
        { key: "alamat", label: "Alamat", align: "left", sortable: true },
    ];

    return (
        <div>
            {isLoading && <Loading/>}
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => navigate('/tambah-supplier')}
                    >
                            <FiPlusCircle size={20}/>
                            Tambah Supplier
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DataTable<Supplier> 
                        data={dataSupplier ?? []} 
                        columns={columns} 
                        defaultSort={{ 
                            key: "kode", 
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

export default DaftarSupplier;