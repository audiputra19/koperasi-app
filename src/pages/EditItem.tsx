import { useEffect, useState, type FC } from "react";
import { FaSave } from "react-icons/fa";
import { useGetItemsQuery, useInputItemsMutation } from "../services/apiItems";
import { useAlert } from "../contexts/AlertContext";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import clsx from "clsx";
import { RiFileListFill, RiPriceTag3Fill } from "react-icons/ri";
import type { inputItemRequest } from "../interfaces/items";
import { HargaItem } from "../subPages/hargaItem";

const EditItem:FC = () => {
    const {id} = useParams();
    const [form, setFrom] = useState<inputItemRequest>({
        kdItem: id,
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
    const {data: dataItem, isLoading: loadingItem} = useGetItemsQuery(undefined, {refetchOnMountOrArgChange: true});
    const item = dataItem?.find(item => item.kode === id);
    const [inputItems, {data, isLoading, isSuccess, error}] = useInputItemsMutation();
    const {showAlert} = useAlert();
    const navigate = useNavigate();
    const location = useLocation();
    const fromPage = location.state?.from ?? 'daftar-item';
    const dataMenuItem = [
        {
            id: 1,
            name: "Item",
            icon: <RiFileListFill size={18}/>
        },
        {
            id: 2,
            name: "Harga Item",
            icon: <RiPriceTag3Fill size={18}/>
        }
    ];
    const [menuSelected, setMenuSelected] = useState(1);

    const labelMenuEditItem = dataMenuItem.map(item => {
        return (
            <div 
                key={item.id}
                className={clsx("rounded-md w-fit font-semibold rounded-0 px-5 py-2 text-sm cursor-pointer",
                    menuSelected === item.id 
                    ? 'bg-white border-gray-300 text-slate-700 shadow-md' 
                    : 'text-gray-500 hover:bg-gray-200'
                )}
                onClick={() => setMenuSelected(item.id)}
            >
                <span className="flex gap-2 items-center">
                    {item.icon}
                    {item.name}
                </span>
            </div>
        )
    })

    useEffect(() => {
        if (item) {
            setFrom({
                kdItem: id,
                barcode: item.barcode || "",
                nama: item.nama || "",
                stok: 0,
                satuan: item.satuan || "",
                rak: item.rak || "",
                jenis: item.jenis || "",
                hargaBeli: 0,
                hargaJual: 0,
                persenJual: 0,
                stokMinimal: item.stokMinimal || 0,
                status: item.status || 0
            });
        }
    }, [item]);

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

    const handleSave = () => {
        inputItems(form)
    }

    return (
        <div className="flex justify-center">
            {isLoading || loadingItem && <Loading/>}
            <div className="bg-white p-5 rounded-lg shadow-sm w-3/4">
                <div>
                    <p className="text-xl font-semibold">Informasi Item</p>
                </div>
                <div className="flex bg-gray-100 p-1 rounded-lg mt-3">
                    {labelMenuEditItem}
                </div>
                {menuSelected === 1 && (
                    <div className="grid grid-cols-2 gap-5 mt-8">
                        <div className="flex flex-col gap-1">
                            <label htmlFor="barcode" className="block text-sm font-medium text-gray-500">
                                Barcode
                                <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                value={form.barcode} 
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
                                value={form.nama}  
                                id="nama" 
                                className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none" 
                                onChange={(e) => setFrom(prev => ({
                                    ...prev,
                                    nama: e.target.value
                                }))}
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label htmlFor="satuan" className="block text-sm font-medium text-gray-500">
                                Satuan
                                <span className="text-red-500">*</span>
                            </label>
                            <select 
                                value={form.satuan}  
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
                                value={form.rak}  
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
                                value={form.jenis}  
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
                        <div className="flex flex-col gap-1">
                            <label htmlFor="stok-minimum" className="block text-sm font-medium text-gray-500">
                                Stok Minimum
                                <span className="text-red-500">*</span>
                            </label>
                            <input 
                                type="text" 
                                value={form.stokMinimal}  
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
                                value={form.status}  
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
                )}

                {menuSelected === 2 && (
                    <div className="mt-8">
                        <HargaItem form={form} setFrom={setFrom} />
                    </div>
                )}
                <div className="flex justify-end mt-5 border-t border-gray-300 pt-5">
                    <button 
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={handleSave}
                    >
                        <FaSave size={18}/>
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default EditItem;