import { useEffect, useState, type FC } from "react";
import { FaSave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../components/Loading";
import { useAlert } from "../contexts/AlertContext";
import { useGetPelangganQuery, useInputPelangganMutation } from "../services/apiPelanggan";

const TambahPelanggan:FC = () => {
    const {id} = useParams();
    const {data} = useGetPelangganQuery(undefined, {refetchOnMountOrArgChange: true});
    const pelanggan = data?.find(item => item.kode === Number(id));
    const [form, setForm] = useState({ kode: id, idKategori: 0, limitBelanja: 0, kredit: 0 });
    const [inputPelanggan, {data: dataPelanggan, isLoading, isSuccess, error}] = useInputPelangganMutation();
    const {showAlert} = useAlert();
    const navigate = useNavigate();

    useEffect(() => {
        if(isSuccess && dataPelanggan) {
            const message = dataPelanggan.message;
            showAlert(message);
            navigate('/daftar-pelanggan');
        } else if(error) {
            const message = (error as { data?: { message?: string } }).data?.message   
            showAlert(message ?? 'Terjadi kesalahan');
        }
    }, [dataPelanggan, isSuccess, error]);

    useEffect(() => {
        if (pelanggan) {
            setForm({
                kode: id ?? "",
                idKategori: pelanggan.idKategori ?? 0,
                limitBelanja: pelanggan.limitBelanja ?? 0,
                kredit: pelanggan.kredit ?? 0
            });
        }
    }, [pelanggan, id]);

    return (
        <div className="flex justify-center">
            {isLoading && <Loading/>}
            <div className="bg-white p-5 rounded-lg shadow-sm w-3/4">
                <div>
                    <p className="text-xl font-semibold">Informasi pelanggan</p>
                </div>
                <div className="grid grid-cols-2 gap-5 mt-8">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="kode" className="block text-sm font-medium text-gray-500">
                            Kode
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="kode" 
                            id="kode" 
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm bg-gray-100 focus:outline-none" 
                            value={id}
                            disabled
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="group-pel" className="block text-sm font-medium text-gray-500">
                            Group Pelanggan
                            <span className="text-red-500">*</span>
                        </label>
                        <select 
                            name="group-pel" 
                            id="group-pel" 
                            className="select w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            value={form?.idKategori}
                            onChange={(e) => 
                                setForm(prev => ({
                                    ...prev,
                                    idKategori: Number(e.target.value)
                                }))}
                        >
                            <option value="">- Pilih Data -</option>
                            <option value="1">Anggota</option>
                            <option value="2">Non Anggota</option>
                        </select>
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="limit-belanja" className="block text-sm font-medium text-gray-500">
                            Limit Belanja
                            <span className="text-red-500">*</span>
                        </label>
                        <input 
                            type="text" 
                            name="limit-belanja" 
                            id="limit-belanja"
                            className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none" 
                            value={form?.limitBelanja}
                            onChange={(e) => 
                                setForm(prev => ({
                                    ...prev,
                                    limitBelanja: Number(e.target.value)
                                }))}
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="group-pel" className="block text-sm font-medium text-gray-500">
                            Kredit
                            <span className="text-red-500">*</span>
                        </label>
                        <select 
                            name="group-pel" 
                            id="group-pel" 
                            className="select w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                            value={form?.kredit}
                            onChange={(e) => 
                                setForm(prev => ({
                                    ...prev,
                                    kredit: Number(e.target.value)
                                }))}
                        >
                            <option value="">- Pilih Data -</option>
                            <option value="1">Ya</option>
                            <option value="2">Tidak</option>
                        </select>
                    </div>
                </div>
                <div className="flex justify-end mt-5 border-t border-gray-300 pt-5">
                    <button 
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600"
                        onClick={() => inputPelanggan(form)}
                    >
                        <FaSave size={18}/>
                        Simpan
                    </button>
                </div>
            </div>
        </div>
    )
}

export default TambahPelanggan;