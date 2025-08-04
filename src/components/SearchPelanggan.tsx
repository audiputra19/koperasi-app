import { LucideCircleX } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import type { GetPelangganResponse } from "../interfaces/pelanggan";
import { useGetKasirQuery } from "../services/apiKasir";
import { useSearchPelangganQuery } from "../services/apiPelanggan";

interface onSelectUserProps {
    onSelectUser: (user: GetPelangganResponse) => void
}

const SearchPelanggan:FC<onSelectUserProps> = ({ onSelectUser }) => {

    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<GetPelangganResponse | null>(null);
    const [hasAutoFilled, setHasAutoFilled] = useState(false);
    const {data: listPelanggan = [] } = useSearchPelangganQuery(search, { 
        skip: !search.trim(),
        refetchOnMountOrArgChange: true,
    });
    const {data: kasirData = []} = useGetKasirQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {id} = useParams();
    const idTransaksi = decodeURIComponent(id ?? '');
    const namaPelanggan = kasirData.find(k => k.idTransaksi === idTransaksi);
    //console.log(search)

    useEffect(() => {
        if (
            !hasAutoFilled &&
            namaPelanggan?.kdPelanggan &&
            namaPelanggan?.namaPelanggan
        ) {
            const pelangganFromKasir: GetPelangganResponse = {
                kode: namaPelanggan.kdPelanggan,
                nama: namaPelanggan.namaPelanggan,
                idKategori: 0,
                limitBelanja: 0,
                kredit: 0
            };
            setSearch(pelangganFromKasir.nama);
            setSelectedUser(pelangganFromKasir);
            onSelectUser(pelangganFromKasir);
            setHasAutoFilled(true); // ✅ jangan auto-fill lagi setelah ini
        }
    }, [hasAutoFilled, namaPelanggan, onSelectUser]);

    const handleSelect = (user: GetPelangganResponse) => {
        onSelectUser(user);
        setSelectedUser(user);
        setSearch(user.nama);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
        setSelectedUser(null);
    };

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari Pelanggan"
                    className="w-full border px-3 py-2 pr-10 border-gray-300 rounded-lg text-sm focus:outline-none"
                    value={search}
                    onChange={handleInputChange}
                />
                <button className="absolute right-2 top-2" onClick={() => setSearch("")} type="button">
                    <LucideCircleX 
                        size={20} 
                        className="cursor-pointer text-gray-400 hover:text-gray-500"
                    />
                </button>
            </div>
            {search.trim() !== "" && !selectedUser && listPelanggan.length > 0 && (
                <ul className="mt-2 max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg bg-white absolute z-10 shadow-lg">
                {listPelanggan.map((user) => (
                    <li
                        key={user.kode}
                        onClick={() => handleSelect(user)}
                        className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                    >
                        {user.nama}
                    </li>
                ))}
                </ul>
            )}
        </div>
    )
}

export default SearchPelanggan;