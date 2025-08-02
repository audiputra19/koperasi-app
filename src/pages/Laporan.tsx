import { useState, type FC } from "react";
import DatePickerInput from "../components/DatePicker";
import document from "../assets/images/document.png"
import { useNavigate } from "react-router-dom";
import { FaPrint } from "react-icons/fa6";
import SearchPelanggan from "../components/SearchPelanggan";
import type { GetPelangganResponse } from "../interfaces/pelanggan";

const Laporan: FC = () => {
    const [startDate, setStartDate] = useState<Date | null>(() => {
        const now = new Date();
        return new Date(now.getFullYear(), now.getMonth(), 1);
    });
    const [finishDate, setFinishDate] = useState<Date | null>(new Date());
    const navigate = useNavigate();
    const [listPelanggan, setListPelanggan] = useState<GetPelangganResponse>();

    const handleSelectPelanggan = (pelanggan: GetPelangganResponse) => {
        setListPelanggan(pelanggan);
    }

    const formatDate = (date: Date | null) => {
        if (!date) return "";
        return date.toISOString().split("T")[0];
    };

    return (
        <div>
            <div className="bg-white p-4 rounded-lg shadow-sm">
                <div className="flex gap-5 items-center">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="tanggal" className="block text-sm font-medium text-gray-500">
                            Periode
                        </label>
                        <DatePickerInput selectedDate={startDate} onDateChange={setStartDate} />
                    </div>
                    <p className="mt-5">-</p>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="tanggal" className="block text-sm font-medium text-white">
                            Tanggal 2
                        </label>
                        <DatePickerInput selectedDate={finishDate} onDateChange={setFinishDate} />
                    </div>
                    <div className="flex flex-col gap-1">
                        <label htmlFor="pelanggan" className="block text-sm font-medium text-gray-500">
                            Pelanggan
                        </label>
                        <SearchPelanggan onSelectUser={handleSelectPelanggan} />
                    </div>
                </div> 
                <div className="mt-5 p-3 border border-gray-300 rounded-lg">
                    <div 
                        className="relative p-2 flex gap-3 items-center hover:bg-gray-100 hover:cursor-pointer"
                        onClick={() => navigate(`/laporan-penjualan-rekap?date1=${formatDate(startDate)}&date2=${formatDate(finishDate)}&kdPelanggan=${listPelanggan?.kode}`)}
                    >
                        <img 
                            src={document}
                            alt="document"
                            className="w-10"
                        />
                        <p className="text-gray-500">Laporan Penjualan Rekap</p>
                        <button 
                            className="absolute right-3 z-10 cursor-pointer text-slate-600 hover:text-blue-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/laporan-penjualan-rekap?date1=${startDate}&date2=${finishDate}&kdPelanggan=${listPelanggan?.kode}&autoPrint=true`)
                            }}
                        >
                            <FaPrint size={18} />
                        </button>
                    </div>
                    <div 
                        className="relative p-2 flex gap-3 items-center hover:bg-gray-100 hover:cursor-pointer"
                        onClick={() => navigate(`/laporan-penjualan-detail?date1=${startDate}&date2=${finishDate}&kdPelanggan=${listPelanggan?.kode}`)}
                    >
                        <img 
                            src={document}
                            alt="document"
                            className="w-10"
                        />
                        <p className="text-gray-500">Laporan Penjualan Detail</p>
                        <button 
                            className="absolute right-3 z-10 cursor-pointer text-slate-600 hover:text-blue-500"
                            onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/laporan-penjualan-detail?date1=${startDate}&date2=${finishDate}&kdPelanggan=${listPelanggan?.kode}&autoPrint=true`)
                            }}
                        >
                            <FaPrint size={18} />
                        </button>
                    </div>
                </div>           
            </div>
        </div>
    )
}

export default Laporan; 