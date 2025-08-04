import { useEffect, useState, type FC } from "react";
import { FaSave } from "react-icons/fa";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "../components/Loading";
import { useAlert } from "../contexts/AlertContext";
import { useInputItemsMutation } from "../services/apiItems";

const TambahItem:FC = () => {
    const [form, setFrom] = useState({
        barcode: "",
        nama: "",
        stok: 0,
        satuan: "", 
        rak: "",
        jenis: "",
        hargaBeli: 0,
        hargaJual: 0,
        persenJual: 0,
        stokMinimal: 0,
        status: 0,
    });
    const [inputItems, {data, isLoading, isSuccess, error}] = useInputItemsMutation();
    const {showAlert} = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from ?? 'daftar-item';
    const [manualHargaJual, setManualHargaJual] = useState(false);
    console.log(form)

    useEffect(() => {
        if (!manualHargaJual) {
            const total = form.hargaBeli + (form.hargaBeli * form.persenJual / 100);
            setFrom(prev => ({
                ...prev,
                hargaJual: Math.floor(total)
            }));
        }
    }, [form.hargaBeli, form.persenJual]);

    useEffect(() => {
        if(isSuccess && data) {
            const message = data.message;
            showAlert(message);
            if(fromPage === 'kasir') {
                navigate(-1);
            } else {
                navigate('/daftar-item');
            }
        } else if (error) {
            const message = (error as { data?: { message?: string } }).data?.message;
            showAlert(message ?? 'Terjadi kesalahan');
        }
    }, [isSuccess, data, error, showAlert]);

    return (
        <div className="flex justify-center">
            {isLoading && <Loading/>}
            <div className="bg-white p-5 rounded-lg shadow-sm w-3/4">
                <div>
                    <p className="text-xl font-semibold">Informasi Item</p>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="barcode" className="block text-sm font-medium text-gray-500">
                            Barcode
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="barcode" 
                            id="barcode" 
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none" 
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                barcode: e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-500">
                            Nama Item
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="nama" 
                            id="nama" 
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none" 
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                nama: e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="stok" className="block text-sm font-medium text-gray-500">
                            Stok
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="stok" 
                            id="stok" 
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none" 
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                stok: Number(e.target.value)
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="satuan" className="block text-sm font-medium text-gray-500">
                            Satuan
                            <span className="text-red-500">*</span>
                        </label>
                        <select 
                            name="satuan" 
                            id="satuan" 
                            className="select w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                satuan: e.target.value
                            }))}
                        >
                            <option value="">- Pilih Data -</option>
                            <option value="pcs">pcs</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="rak" className="block text-sm font-medium text-gray-500">
                            Rak
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="rak" 
                            id="rak" 
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                rak: e.target.value
                            }))} 
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="jenis" className="block text-sm font-medium text-gray-500">
                            Jenis
                            <span className="text-red-500">*</span>
                        </label>
                        <select 
                            name="jenis" 
                            id="jenis" 
                            className="select w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                jenis: e.target.value
                            }))}
                        >
                            <option value="">- Pilih Data -</option>
                            <option value="minuman">Minuman</option>
                            <option value="roti">Roti</option>
                            <option value="bumbu">Bumbu</option>
                            <option value="obat">Obat</option>
                        </select>
                    </div>
                    <div className="flex gap-3">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="beli" className="block text-sm font-medium text-gray-500">
                                Harga Beli
                                <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                name="beli" 
                                id="beli" 
                                className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                                onChange={(e) => setFrom(prev => ({
                                    ...prev,
                                    hargaBeli: Number(e.target.value)
                                }))} 
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="jual" className="block text-sm font-medium text-gray-500">
                                Harga Jual
                                <span className="text-red-500">*</span>
                            </label>
                            <div className="flex gap-2 items-center">
                                <input 
                                    type="text" 
                                    className="w-1/4 border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                                    onChange={(e) => setFrom(prev => ({
                                        ...prev,
                                        persenJual: Number(e.target.value)
                                    }))}  
                                />
                                <span className="text-sm font-bold text-gray-400">%</span>
                                <input 
                                    type="text" 
                                    value={form.hargaJual}
                                    onChange={(e) => {
                                        setManualHargaJual(true);
                                        setFrom(prev => ({
                                            ...prev,
                                            hargaJual: Number(e.target.value)
                                        }));
                                    }}
                                    className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"  
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="stok-minimum" className="block text-sm font-medium text-gray-500">
                            Stok Minimum
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="stok-minimum" 
                            id="stok-minimum" 
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                stokMinimal: Number(e.target.value)
                            }))} 
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="status" className="block text-sm font-medium text-gray-500">
                            Status Jual
                            <span className="text-red-500">*</span>
                        </label>
                        <select 
                            name="status" 
                            id="status" 
                            className="select w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            onChange={(e) => setFrom(prev => ({
                                ...prev,
                                status: Number(e.target.value)
                            }))} 
                        >
                            <option value="0">- Pilih Data -</option>
                            <option value="1">Masih dijual</option>
                            <option value="2">Tidak dijual / Discontinue</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mt-5 border-t border-gray-300 pt-5">
                    <button 
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => inputItems(form)}
                    >
                        <FaSave size={18}/>
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TambahItem;