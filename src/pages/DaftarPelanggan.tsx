import type { FC, JSX } from "react";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import Loading from "../components/Loading";
import { getTitle } from "../constants/GetTitle";
import { useGetPelangganQuery } from "../services/apiPelanggan";

type Pelanggan = {
    kode: number;
    nama: string;
    groupPel: string;
    limitBelanja: number;
    action: JSX.Element;
};
const DaftarPelanggan: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading} = useGetPelangganQuery(undefined, {
        refetchOnMountOrArgChange: true,
    });

    const dataPelanggan = data?.map(item => {
        let group = "";
        if(item.idKategori === 1) {
            group = "Anggota";
        } else if(item.idKategori === 2) {
            group = "Non Anggota";
        } else {
            group = "";
        }

        const limitBelanja = item.limitBelanja > 0 ? item.limitBelanja : 0;

        return {
            kode: item.kode, 
            nama: item.nama, 
            groupPel: group, 
            limitBelanja: limitBelanja,
            action: (
                <button 
                    className="cursor-pointer"
                    onClick={() => navigate(`/edit-pelanggan/${item.kode}`)}
                >
                    <TbEdit size={20}/>
                </button>
            )
        }
    });

    const columns: Column<Pelanggan>[] = [
        { key: "kode", label: "Kode", align: "center", sortable: true },
        { key: "nama", label: "Nama", align: "left", sortable: true },
        { key: "groupPel", label: "Group Pelanggan", align: "center", sortable: true },
        { key: "limitBelanja", label: "Limit Belanja", align: "center", sortable: true },
        { key: "action", label: "Action", align: "center" },
    ];

    return (
        <div>
            {isLoading && <Loading/>}
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                </div>
            </div>
            <div className="">
                <div className="bg-white p-4 rounded-lg shadow-sm">
                    <DataTable<Pelanggan> 
                        data={dataPelanggan ?? []} 
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

export default DaftarPelanggan;