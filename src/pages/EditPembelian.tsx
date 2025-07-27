import moment from "moment";
import { useEffect, useState, type FC, type JSX } from "react";
import { FaSave } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import DatePickerInput from "../components/DatePicker";
import SearchItem from "../components/SearchItem";
import SearchSupplier from "../components/SearchSupplier";
import { useAlert } from "../contexts/AlertContext";
import type { GetKasirDetailResponse } from "../interfaces/kasir";
import type { getSupplierResponse } from "../interfaces/supplier";
import { usePostMeQuery } from "../services/apiAuth";
import { useGetPembelianDetailMutation, useGetPembelianQuery, useUpdatePembelianMutation } from "../services/apiPembelian";
import { useAppDispatch, useAppSelector } from "../store";
import { addTransactionPembelian, clearTransactionPembelian, deleteTransactionPembelian, updateTransactionPembelian } from "../store/pembelianSlice";

type Kasir = {
    kodeItem: string;
    keterangan: string;
    jenis: string;
    jumlah: JSX.Element;
    jumlahValue: number;
    satuan: string;
    harga: number;
    total: number;
    action: JSX.Element;
};
const EditPembelian:  FC = () => {
    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const datePembelian = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
    const [listSupplier, setListSupplier] = useState<getSupplierResponse>();
    const dispatch = useAppDispatch();
    const [updatePembelian, {data: pembelian, error, isSuccess}] = useUpdatePembelianMutation();
    const [getPembelianDetail, {data: listBarang, isLoading}] = useGetPembelianDetailMutation();
    const transaction = useAppSelector(state => state.pembelian.transaction);
    const [metode, setMetode] = useState(0);
    const {data} = usePostMeQuery();
    const user = data?.user;
    const {showAlert} = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();
    const idTransaksi = decodeURIComponent(id ?? '');
    const {data: pembelianData = []} = useGetPembelianQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    useEffect(() => {
        if (idTransaksi) {
            getPembelianDetail({ idTransaksi });
        }
    }, [idTransaksi, getPembelianDetail]);

    useEffect(() => {
        if(pembelian && isSuccess) {
            const message = pembelian.message;
            showAlert(message);
            dispatch(clearTransactionPembelian());
            navigate('/pembelian');
        } else if(error) {
            const message = (error as { data?: { message?: string } }).data?.message   
            showAlert(message ?? 'Terjadi kesalahan');
        }
    }, [data, isSuccess, error]);

    const handleSelectItem = (barang: GetKasirDetailResponse) => {
        dispatch(addTransactionPembelian(barang));
    }

    const handleSelectSupplier = (supplier: getSupplierResponse) => {
        setListSupplier(supplier);
    }

    const combinedItems = [
        ...(listBarang ?? []).map(item => ({ ...item, source: 'database' })),
        ...transaction
            .filter(reduxItem => !(listBarang ?? []).some(dbItem => dbItem.barcode === reduxItem.barcode))
            .map(item => ({ ...item, source: 'redux' }))
    ];

    let total = 0;
    const dataPembelian = combinedItems.map(item => {
        const jumlahValue = item.jumlah;
        total += item.jumlah * item.harga;
        const totalItem = item.jumlah * item.harga;

        return {
            kodeItem: item.kodeItem,
            keterangan: item.namaItem,
            jenis: item.jenis,
            jumlah: (
                <div>
                    <input 
                        type="number"
                        value={item.jumlah}
                        onChange={(e) => {
                            const newStok = Number( e.target.value);
                            dispatch(updateTransactionPembelian({barcode: item.barcode, stok: newStok}));
                        }}
                        className="w-16 py-1 text-center border border-gray-300 rounded-md bg-white focus:outline-none"
                    />    
                </div>
            ),
            jumlahValue,
            satuan: item.satuan,
            harga: item.harga,
            total: totalItem,
            action: (
                <button 
                    className="cursor-pointer"
                    onClick={() => dispatch(deleteTransactionPembelian(item.barcode))}
                >
                    <RiDeleteBin5Line size={20} className="text-red-500"/>
                </button>
            )
        }
    })

    const columns: Column<Kasir>[] = [
        { key: "kodeItem", label: "Kode Item", align: "left", sortable: false },
        { key: "keterangan", label: "Keterangan", align: "left", sortable: false },
        { key: "jenis", label: "Jenis", align: "center", sortable: false },
        { key: "jumlah", label: "Jumlah", align: "center", sortable: false },
        { key: "satuan", label: "Satuan", align: "center", sortable: false },
        {
            key: "harga",
            label: "Harga",
            align: "right",
            sortable: false,
            render: (row) => Number(row.harga).toLocaleString("id-ID"),
        },
        {
            key: "total",
            label: "Total",
            align: "right",
            sortable: false,
            render: (row) => Number(row.total).toLocaleString("id-ID"),
        },
        { key: "action", label: "Action", align: "center", sortable: false },
    ];

    const handleBayar = async () => {
        if (!listSupplier || !listSupplier.kode || !listSupplier.nama) {
            showAlert("Pelanggan belum dipilih atau tidak valid");
            return;
        }

        const dataPembelian = transaction.map(item => ({
            kodeItem: item.kodeItem,
            namaItem: item.namaItem,
            jenis: item.jenis,
            jumlah: item.jumlah,
            satuan: item.satuan,
            harga: item.harga,
        }));

        const dataSupplier = {
            kodeSupplier: listSupplier.kode,
            namaSupplier: listSupplier.nama,
        };

        try {
            await updatePembelian({
                dataPembelian,
                dataSupplier,
                total,
                metode,
                startDate: datePembelian,
                userBuat: user?.nama || "",
                idTransaksi
            })
        } catch (error) {
            console.error('gagal:', error);
        }
    }

    return (
        <div>
            <div className="flex gap-5">
                <div className="flex-1 bg-white p-5 rounded-lg shadow-sm">
                    <div className="flex justify-between items-center">
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="tanggal" className="block text-sm font-medium text-gray-500">
                                    Tanggal
                                </label>
                                <DatePickerInput selectedDate={startDate} onDateChange={setStartDate} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="pelanggan" className="block text-sm font-medium text-gray-500">
                                    Supplier
                                </label>
                                <SearchSupplier onSelectUser={handleSelectSupplier} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="kode" className="block text-sm font-medium text-gray-500">
                                    Kode Item
                                </label>
                                <SearchItem onSelectItem={handleSelectItem} />
                            </div>    
                        </div>
                        <div>
                            <button 
                                className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                                onClick={handleBayar}
                            >
                                <FaSave size={18}/>
                                Simpan
                            </button>
                        </div>
                    </div>
                    <div className="mt-5">
                        <DataTable<Kasir> 
                            data={dataPembelian} 
                            columns={columns}
                            footerSummary={(rows) => {
                                const totalStok = rows.reduce((sum, item) => sum + item.jumlahValue, 0);
                                const totalAll = rows.reduce((sum, item) => sum + item.jumlahValue * Number(item.harga), 0);

                                return (
                                    <tr>
                                        <td colSpan={4} className="text-right">Total</td>
                                        <td className="text-center">{totalStok.toLocaleString("id-ID")}</td>
                                        <td colSpan={2}></td>
                                        <td className="text-right">{totalAll.toLocaleString("id-ID")}</td>
                                    </tr>
                                )
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EditPembelian;