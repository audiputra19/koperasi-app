import { useEffect, useState, type FC } from "react";
import type { GetPelangganResponse } from "../interfaces/pelanggan";
import { useSearchPelangganQuery } from "../services/apiPelanggan";
import { LucideCircleX } from "lucide-react";

interface onSelectUserProps {
    onSelectUser: (user: GetPelangganResponse) => void
}

const SearchPelanggan:FC<onSelectUserProps> = ({ onSelectUser }) => {

    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<GetPelangganResponse | null>(null);
    const {data: listPelanggan = [] } = useSearchPelangganQuery(search, { 
        skip: !search.trim(),
        refetchOnMountOrArgChange: true,
    });

    const handleSelect = (user: GetPelangganResponse) => {
        onSelectUser(user);
        setSelectedUser(user);
        setSearch(user.nama);
    };

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari Pelanggan"
                    className="w-full border px-3 py-2 pr-10 border-gray-300 rounded-lg text-sm focus:outline-none"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setSelectedUser(null);
                    }}
                />
                <button className="absolute right-2 top-2" onClick={() => setSearch("")} type="button">
                    <LucideCircleX 
                        size={20} 
                        className="cursor-pointer text-gray-400 hover:text-gray-500"
                    />
                </button>
            </div>
            {search.trim() !== "" && !selectedUser && listPelanggan.length > 0 && (
                <ul className="mt-2 border rounded bg-white absolute z-10">
                {listPelanggan.map((user) => (
                    <li
                        key={user.kode}
                        onClick={() => handleSelect(user)}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
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