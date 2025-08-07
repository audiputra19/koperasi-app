import moment from 'moment';
import { useEffect, type FC, type JSX } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import Loading from "../components/Loading";
import { getTitle } from "../constants/GetTitle";
import { useDeleteKasirMutation, useGetKasirQuery } from "../services/apiKasir";
import { useAlert } from '../contexts/AlertContext';
import { usePostMeQuery } from '../services/apiAuth';
import { useGetAksesQuery } from '../services/apiHakAkses';

type Kasir = {
    noTransaksi: string;
    tanggal: string;
    kodePel: number;
    nama: string;
    total: string;
    userBuat: string;
    userUbah: string;
    action: JSX.Element;
};

const DaftarKasir: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading, refetch} = useGetKasirQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const [delKasir, {data: dataDel, isSuccess: isSuccessDel, error: errorDel}] = useDeleteKasirMutation();
    const {showAlert} = useAlert();
    const {data: userData} = usePostMeQuery();
    const user = userData?.user;
    const {data: dataAkses} = useGetAksesQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const userAkses = dataAkses?.find(u => u.id === user?.id);

    useEffect(() => {
        if(dataDel && isSuccessDel){
            refetch();
        } else if(errorDel){
            const message = (errorDel as { data?: { message?: string } }).data?.message   
            showAlert(message ?? 'Terjadi kesalahan');
        }
    })
        
    const dataKasir = data?.map(item => {
        const date = moment(item.tanggal).format("YYYY-MM-DD HH:mm:ss");
        const userUbah = item.userUbah === null ? "" : item.userUbah

        return {
            noTransaksi: item.idTransaksi,
            tanggal: date,
            kodePel: item.kdPelanggan,
            nama: item.namaPelanggan,
            total: item.total.toLocaleString("id-ID"),
            userBuat: item.userBuat,
            userUbah: userUbah,
            action: (
                <div className="flex justify-center gap-3">
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate(`/edit-kasir/${encodeURIComponent(item.idTransaksi)}`)}
                    >
                        <TbEdit size={20} />
                    </button>
                    {(!userAkses || userAkses?.delete !== 1) && ( // Just admin has access
                        <button 
                            className="cursor-pointer"
                            onClick={() => {
                                const confirmed = window.confirm("Yakin ingin menghapus data ini?");
                                if (confirmed) {
                                    delKasir({ idTransaksi: item.idTransaksi });
                                }
                            }} 
                        >
                            <RiDeleteBin5Line size={20} />
                        </button>
                    )}
                </div>
            )
        }
    })

    const columns: Column<Kasir>[] = [
        { key: "noTransaksi", label: "No. Transaksi", align: "center", sortable: true },
        { key: "tanggal", label: "Tanggal", align: "center", width: 200, sortable: true },
        { key: "kodePel", label: "Kd Pelanggan", align: "center", sortable: true },
        { key: "nama", label: "Nama", align: "left", width: 200, sortable: true },
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
                        data={dataKasir ?? []} 
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

export default DaftarKasir;