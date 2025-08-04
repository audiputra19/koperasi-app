import { type FC, type JSX } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import Loading from "../components/Loading";
import { getTitle } from "../constants/GetTitle";
import { useGetSupplierQuery } from "../services/apiSupplier";

type Supplier = {
    kode: string;
    nama: string;
    alamat: string;
    action: JSX.Element;
}

const DaftarSupplier: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading} = useGetSupplierQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const dataSupplier = data?.map(item => ({ 
        kode: item.kode, 
        nama: item.nama, 
        alamat: item.alamat ,
        action: (
            <button 
                className="cursor-pointer"
                onClick={() => navigate(`/edit-supplier/${item.kode}`)}
            >
                <TbEdit size={20}/>
            </button>
        )
    }));

    const columns: Column<Supplier>[] = [
        { key: "kode", label: "Kode", align: "center", width: 100, sortable: true },
        { key: "nama", label: "Nama", align: "left", width: 200, sortable: true },
        { key: "alamat", label: "Alamat", align: "left", sortable: true },
        { key: "action", label: "Action", align: "center", sortable: true },
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