import { useEffect, useState, type FC } from "react";
import { FaSave } from "react-icons/fa";
import { useInputSupplierMutation } from "../services/apiSupplier";
import { useAlert } from "../contexts/AlertContext";
import { useNavigate } from "react-router-dom";
import Loading from "../components/Loading";

const TambahSupplier:FC = () => {
    const [form, setForm] = useState({ kode: "", nama: "", alamat: "" });
    const [inputSupplier, {data, isLoading, isSuccess, error}] = useInputSupplierMutation();
    const {showAlert} = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess && data) {
            const message = data.message;
            showAlert(message);
            navigate('/daftar-supplier');
        } else if(error) {
            const message = (error as { data?: { message?: string } }).data?.message   
            showAlert(message ?? 'Terjadi kesalahan');
        }
    }, [isSuccess, data, error]);

    return (
        <div className="flex justify-center">
            {isLoading && <Loading/>}
            <div className="bg-white p-5 rounded-lg shadow-sm w-3/4">
                <div>
                    <p className="text-xl font-semibold">Informasi Supplier</p>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="nama" className="block text-sm font-medium text-gray-500">
                            Nama
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="nama" 
                            id="nama" 
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none" 
                            onChange={(e) => setForm(prev => ({
                                ...prev,
                                nama: e.target.value
                            }))}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="alamat" className="block text-sm font-medium text-gray-500">
                            Alamat
                            <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="alamat" 
                            id="alamat"
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            onChange={(e) => setForm(prev => ({
                                ...prev,
                                alamat: e.target.value
                            }))}
                        ></textarea>
                    </div>
                </div>
                <div className="flex justify-end mt-5 border-t border-gray-300 pt-5">
                    <button 
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => inputSupplier(form)}
                    >
                        <FaSave size={18}/>
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TambahSupplier;