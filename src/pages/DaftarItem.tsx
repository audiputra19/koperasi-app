import type { FC } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { DataTable, type Column } from "../components/DataTable";
import { getTitle } from "../constants/GetTitle";
import { useNavigate } from "react-router-dom";
import { useGetItemsQuery } from "../services/apiItems";
import Loading from "../components/Loading";

type Items = {
    kode: string;
    barcode: string;
    nama: string;
    stok: number;
    satuan: string;
    rak: string;
    jenis: string;
    jual: number;
    beli: number;
    hpp: string;
    minStok: number;
    status: string;
};
const DaftarItem: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading} = useGetItemsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    
    const dataItems = data?.map(item => {
        let status = "";
        if(item.status === 2) {
            status = "Tidak Dijual";
        } else {
            status = "Masih Dijual";
        }

        return {
            kode: item.kode, 
            barcode: item.barcode, 
            nama: item.nama, 
            stok: item.stok, 
            satuan: item.satuan, 
            rak: item.rak, 
            jenis: item.jenis,  
            beli: item.hargaBeli, 
            jual: item.hargaJual,  
            hpp: item.hpp, 
            minStok: item.stokMinimal, 
            status: status, 
        }
    });

    const columns: Column<Items>[] = [
        { key: "kode", label: "Kode", align: "center", width: 100, sortable: true },
        { key: "barcode", label: "Barcode", align: "center", width: 100, sortable: true },
        { key: "nama", label: "Nama Item", align: "left", width: 150, sortable: true },
        { key: "stok", label: "Stok", align: "center", sortable: true },
        { key: "satuan", label: "Satuan", align: "center", sortable: false },
        { key: "rak", label: "Rak", align: "center", sortable: false },
        { key: "jenis", label: "Jenis", align: "center", sortable: false },
        { key: "beli", label: "Harga Beli", align: "right", sortable: true },
        { key: "jual", label: "Harga Jual", align: "right", sortable: true },
        { key: "hpp", label: "System HPP", align: "right", sortable: false },
        { key: "minStok", label: "Stok Min.", align: "center", sortable: true },
        { key: "status", label: "Status Jual", align: "center", width: 100, sortable: false },
    ];

    return (
        <div>
            {isLoading && <Loading/>}
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => navigate('/tambah-item')}   
                    >
                            <FiPlusCircle size={20}/>
                            Tambah Item
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DataTable<Items> 
                        data={dataItems ?? []} 
                        columns={columns} 
                        defaultSort={{ 
                            key: "nama", 
                            asc: true 
                        }} 
                        fileExportName={title}
                        footerSummary={(rows) => {
                            const totalStok = rows.reduce((sum, item) => sum + item.stok, 0);

                            return (
                                <tr>
                                    <td colSpan={4} className="text-right">Total</td>
                                    <td className="text-right">{totalStok}</td>
                                    <td colSpan={8}></td>
                                </tr>
                            )
                        }}
                        exportToExcelBtn={true}
                        exportToPdfBtn={true}
                        searchFilter={true}
                    />
                </div>
            </div>
        </div>
    )
}

export default DaftarItem;