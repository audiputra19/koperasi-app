import moment from 'moment';
import { useEffect, type FC, type JSX } from "react";
import { FiPlusCircle } from "react-icons/fi";
import { RiDeleteBin5Line } from "react-icons/ri";
import { TbEdit } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import Loading from "../components/Loading";
import { getTitle } from "../constants/GetTitle";
import { useDeletePembelianMutation, useGetPembelianQuery } from "../services/apiPembelian";
import { useAlert } from '../contexts/AlertContext';
import { usePostMeQuery } from '../services/apiAuth';
import { useGetAksesQuery } from '../services/apiHakAkses';

type Pembelian = {
    noTransaksi: string;
    tanggal: string;
    kodeSupp: string;
    nama: string;
    total: string;
    userBuat: string;
    userUbah: string;
    action: JSX.Element;
};

const Pembelian: FC = () => {
    const title = getTitle();
    const navigate = useNavigate();
    const {data, isLoading, refetch} = useGetPembelianQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const [delKasir, {data: dataDel, isSuccess: isSuccessDel, error: errorDel}] = useDeletePembelianMutation();
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
        
    const dataPembelian = data?.map(item => {
        const date = moment(item.tanggal).format("YYYY-MM-DD HH:mm:ss");
        const userUbah = item.userUbah === null ? "" : item.userUbah

        return {
            noTransaksi: item.idTransaksi,
            tanggal: date,
            kodeSupp: item.kdSupplier,
            nama: item.namaSupplier,
            total: item.total.toLocaleString("id-ID"),
            userBuat: item.userBuat,
            userUbah: userUbah,
            action: (
                <div className="flex justify-center gap-3">
                    <button 
                        className="cursor-pointer"
                        onClick={() => navigate(`/edit-pembelian/${encodeURIComponent(item.idTransaksi)}`)}
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

    const columns: Column<Pembelian>[] = [
        { key: "noTransaksi", label: "No. Transaksi", align: "center", sortable: true },
        { key: "tanggal", label: "Tanggal", align: "center", width: 200, sortable: true },
        { key: "kodeSupp", label: "Kd Supplier", align: "center", sortable: true },
        { key: "nama", label: "Nama", align: "left", sortable: true },
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
                        onClick={() => navigate('/tambah-pembelian')}
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