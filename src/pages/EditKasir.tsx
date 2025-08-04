import clsx from "clsx";
import moment from "moment";
import { useEffect, useState, type FC, type JSX } from "react";
import { FaCheck } from "react-icons/fa";
import { RiDeleteBin5Line } from "react-icons/ri";
import { useNavigate, useParams } from "react-router-dom";
import { DataTable, type Column } from "../components/DataTable";
import DatePickerInput from "../components/DatePicker";
import SearchItem from "../components/SearchItem";
import SearchPelanggan from "../components/SearchPelanggan";
import { useAlert } from "../contexts/AlertContext";
import type { GetKasirDetailResponse } from "../interfaces/kasir";
import type { GetPelangganResponse } from "../interfaces/pelanggan";
import { usePostMeQuery } from "../services/apiAuth";
import { useDeleteKasirDetailMutation, useGetKasirDetailMutation, useGetKasirQuery, useUpdateKasirMutation } from "../services/apiKasir";
import { useAppDispatch, useAppSelector } from "../store";
import { addTransaction, clearTransaction, deleteTransaction, updateTransaction } from "../store/kasirSlice";

type Kasir = {
    kodeItem: string;
    keterangan: string;
    jenis: string;
    jumlah: JSX.Element;
    satuan: string;
    harga: string;
    total: string;
    action: JSX.Element;
};
const EditKasir:  FC = () => {
    const [step, setStep] = useState(1);
    const [startDate, setStartDate] = useState<Date | null>(new Date());
    const dateKasir = moment(startDate).format("YYYY-MM-DD HH:mm:ss");
    const [listPelanggan, setListPelanggan] = useState<GetPelangganResponse>();
    const dispatch = useAppDispatch();
    const [updateKasir, {data: kasir, error, isSuccess}] = useUpdateKasirMutation();
    const [getKasirDetail, {data: listBarang, isLoading}] = useGetKasirDetailMutation();
    const [deleteKasirDetail, 
        {data: delKasirDetailData, 
        isSuccess: delKasirDetailSuccess, 
        error: delKasirDetailError}] = useDeleteKasirDetailMutation();
    const transaction = useAppSelector(state => state.kasir.transaction);
    const [metode, setMetode] = useState(0);
    const {data} = usePostMeQuery();
    const user = data?.user;
    const {showAlert} = useAlert();
    const navigate = useNavigate();
    const {id} = useParams();
    const idTransaksi = decodeURIComponent(id ?? '');
    const {data: kasirData = []} = useGetKasirQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const takeKasir = kasirData.find(k => k.idTransaksi === idTransaksi);
    const [jumlahPerItem, setJumlahPerItem] = useState<Record<string, number>>({});

    useEffect(() => {
        if(delKasirDetailData && delKasirDetailSuccess){
            if (idTransaksi) {
                getKasirDetail({ idTransaksi });
            }
        } else if (delKasirDetailError) {
            const message = (error as { data?: { message?: string } }).data?.message   
            showAlert(message ?? 'Terjadi kesalahan');
        }
    }, [delKasirDetailData, delKasirDetailSuccess, delKasirDetailError, idTransaksi, getKasirDetail]);

    useEffect(() => {
        if (takeKasir?.tanggal) {
            const parsedDate = moment(takeKasir.tanggal).toDate();
            setStartDate(parsedDate);
        }

        if (takeKasir?.metode) {
            setMetode(takeKasir.metode);
        }
    }, [takeKasir]);

    useEffect(() => {
        if (idTransaksi) {
            getKasirDetail({ idTransaksi });
        }
    }, [idTransaksi, getKasirDetail]);

    useEffect(() => {
        if(kasir && isSuccess) {
            const message = kasir.message;
            showAlert(message);
            dispatch(clearTransaction());
            navigate('/daftar-kasir');
        } else if(error) {
            const message = (error as { data?: { message?: string } }).data?.message   
            showAlert(message ?? 'Terjadi kesalahan');
        }
    }, [data, isSuccess, error]);

    const handleSelectItem = (barang: GetKasirDetailResponse) => {
        dispatch(addTransaction(barang));
    }

    const handleSelectPelanggan = (pelanggan: GetPelangganResponse) => {
        setListPelanggan(pelanggan);
    }

    const combinedItems = [
        ...(listBarang ?? []).map(item => ({ ...item, source: 'database' })),
        ...transaction
            .filter(reduxItem => !(listBarang ?? []).some(dbItem => dbItem.barcode === reduxItem.barcode))
            .map(item => ({ ...item, source: 'redux' }))
    ];

    let total = 0;
    const dataKasir = combinedItems?.map(item => {
        const jumlahFinal = jumlahPerItem[item.kodeItem] ?? item.jumlah;
        const totalItem = jumlahFinal * item.harga;
        total += totalItem;

        return {
            kodeItem: item.kodeItem,
            keterangan: item.namaItem,
            jenis: item.jenis,
            jumlah: (
                <div>
                    <input 
                        type="number"
                        defaultValue={item.jumlah}
                        onChange={(e) => {
                            const newStok = Number( e.target.value);
                            setJumlahPerItem(prev => ({
                                ...prev,
                                [item.kodeItem]: newStok
                            }));
                            dispatch(updateTransaction({barcode: item.kodeItem, stok: newStok}));
                        }}
                        className="w-16 py-1 text-center border border-gray-300 rounded-md focus:outline-none"
                    />    
                </div>
            ),
            satuan: item.satuan,
            harga: item.harga.toLocaleString("id-ID"),
            total: totalItem.toLocaleString("id-ID"),
            action: (
                <button 
                    className="cursor-pointer"
                    onClick={() => {
                        if(item.source === "database"){
                            deleteKasirDetail({
                                idTransaksi,
                                kdItem: item.kodeItem,
                                total: totalItem
                            });
                        } else {
                            dispatch(deleteTransaction(item.barcode));
                        }
                    }}
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
        { key: "harga", label: "Harga", align: "right", sortable: false },
        { key: "total", label: "Total", align: "right", sortable: false },
        { key: "action", label: "Action", align: "center", sortable: false },
    ];

    const handleBayar = async () => {
        if (!listPelanggan || !listPelanggan.kode || !listPelanggan.nama) {
            showAlert("Pelanggan belum dipilih");
            return;
        }

        if (!metode) {
            showAlert("Metode belum dipilih");
            return;
        }

        const finalDataKasir = combinedItems.map(item => {
        const jumlah = jumlahPerItem[item.kodeItem] ?? item.jumlah;
            return {
                kodeItem: item.kodeItem,
                namaItem: item.namaItem,
                jenis: item.jenis,
                jumlah,
                satuan: item.satuan,
                harga: item.harga,
            };
        });

        const finalTotal = finalDataKasir.reduce((acc, item) => acc + (item.jumlah * item.harga), 0);

        const dataPelanggan = {
            kodePelanggan: listPelanggan.kode,
            namaPelanggan: listPelanggan.nama,
        };

        try {
            await updateKasir({
                dataKasir: finalDataKasir,
                dataPelanggan,
                total: finalTotal,
                metode,
                startDate: dateKasir,
                userBuat: user?.nama || "",
                idTransaksi
            })
        } catch (error) {
            console.error('gagal:', error);
        }
    }

    return (
        <div>
            <div className="flex justify-center">
                <div className="w-1/2">
                    <div className="flex gap-2 items-center">
                        <div 
                            className={clsx("w-[34px] h-7 flex justify-center items-center text-xs rounded-full transition-all duration-400 ease-in-out bg-blue-500 text-white")}
                        >{step === 1 ? "1" : <FaCheck size={11} />}</div>
                        <div className={clsx("border w-full transition-all duration-400 ease-in-out", 
                            step === 2 ? "border-blue-500" : "border-blue-200")}
                        ></div>
                        <div 
                            className={clsx("w-[34px] h-7 flex justify-center items-center text-xs rounded-full transition-all duration-400 ease-in-out",
                                step === 2 ? "bg-blue-500 text-white border-2 border-blue-500" : "bg-white text-blue-500 border-2 border-gray-200")}
                        >2</div>
                    </div>
                    <div className="flex justify-between">
                        <p className="text-xs font-semibold text-gray-500 mt-2">Daftar barang</p>
                        <p className="text-xs font-semibold text-gray-500 mt-2">Pembayaran</p>
                    </div>
                </div>
            </div>

            {step === 1 &&
                <div className="flex gap-5 mt-5">
                    <div className="flex-1 bg-white p-5 rounded-lg shadow-sm">
                        <div className="flex gap-5">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="tanggal" className="block text-sm font-medium text-gray-500">
                                    Tanggal
                                </label>
                                <DatePickerInput selectedDate={startDate} onDateChange={setStartDate} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="pelanggan" className="block text-sm font-medium text-gray-500">
                                    Pelanggan
                                </label>
                                <SearchPelanggan onSelectUser={handleSelectPelanggan} />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="kode" className="block text-sm font-medium text-gray-500">
                                    Kode Item
                                </label>
                                <SearchItem onSelectItem={handleSelectItem} />
                            </div>    
                        </div>
                        <div className="mt-5">
                            <DataTable<Kasir> 
                                data={dataKasir ?? []} 
                                columns={columns}
                            />
                        </div>
                    </div>
                    <div className="w-[280px]">
                        <div className="bg-blue-500 p-5 rounded-lg shadow-sm">
                            <p className="text-lg text-white font-bold">Detail Transaksi</p>
                            <p className="text-xs text-blue-100 mt-2">Mohon cek kembali detail pesanan sebelum melakukan pembayaran</p>
                            <div className="mt-10 flex justify-between items-center">
                                <p className="text-base font-semibold text-white">Total</p>
                                <p className="text-4xl font-semibold text-white">{total.toLocaleString("id-ID")}</p>
                            </div>
                            <div className="mt-8">
                                <button 
                                    className="w-full btn bg-white text-blue-500 font-bold py-2 rounded-lg hover:bg-blue-50"
                                    onClick={() => setStep(2)}
                                >
                                    Lanjut ke Pembayaran
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            }

            {step === 2 &&
                <div className="flex justify-center mt-5">
                    <div className="w-1/2 bg-white p-5 rounded-lg shadow-sm">
                        <p className="text-lg font-semibold text-slate-800">Pembayaran</p>
                        <div className="border-t mt-3 py-3 border-gray-200 flex justify-between items-center">
                            <p className="text-base font-semibold text-gray-400">Total Tagihan</p>
                            <p className="text-2xl text-blue-500 font-semibold"><span className="text-sm mr-1">Rp.</span>{total.toLocaleString("id-ID")}</p>
                        </div>
                        <div className="border-3 mt-3 border-gray-100 rounded-lg">
                            <p className="border-b-3 border-gray-100 bg-gray-50 px-3 py-2 text-sm font-semibold text-gray-400 rounded-t-lg">
                                Metode Pembayaran
                            </p>
                            <div className="p-3 flex flex-col gap-3">
                                <div className="flex gap-5">
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="motode" 
                                            id="tunai" 
                                            value="1" 
                                            className="mr-1"
                                            checked={metode === 1}
                                            onChange={(e) => setMetode(Number(e.target.value))}
                                        />
                                        <label htmlFor="tunai" className="text-sm font-semibold text-gray-500">Tunai</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="motode" 
                                            id="kredit" 
                                            value="2" 
                                            className="mr-1"
                                            checked={metode === 2}
                                            onChange={(e) => setMetode(Number(e.target.value))}
                                        />
                                        <label htmlFor="kredit" className="text-sm font-semibold text-gray-500">Kredit</label>
                                    </div>
                                    <div className="flex items-center">
                                        <input 
                                            type="radio" 
                                            name="motode" 
                                            id="qris" 
                                            value="3" 
                                            className="mr-1"
                                            checked={metode === 3}
                                            onChange={(e) => setMetode(Number(e.target.value))}
                                        />
                                        <label htmlFor="qris" className="text-sm font-semibold text-gray-500">QRIS</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex justify-end mt-5">
                            <button 
                                className="btn bg-white text-blue-500 font-bold py-2 rounded-lg mr-2 hover:bg-blue-50"
                                onClick={() => setStep(1)}
                            >
                                Batal
                            </button>
                            <button 
                                className="btn bg-blue-500 text-white font-bold py-2 rounded-lg hover:bg-blue-600"
                                onClick={handleBayar}
                            >
                                Bayar
                            </button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default EditKasir;