import { LucideCircleX } from "lucide-react";
import { useEffect, useState, type FC } from "react";
import { useParams } from "react-router-dom";
import type { getSupplierResponse } from "../interfaces/supplier";
import { useGetPembelianQuery } from "../services/apiPembelian";
import { useSearchSupplierQuery } from "../services/apiSupplier";

interface onSelectUserProps {
    onSelectUser: (user: getSupplierResponse) => void
}

const SearchSupplier:FC<onSelectUserProps> = ({ onSelectUser }) => {

    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<getSupplierResponse | null>(null);
    const [hasAutoFilled, setHasAutoFilled] = useState(false);
    const {data: listSupplier = [] } = useSearchSupplierQuery(search, { 
        skip: !search.trim(),
        refetchOnMountOrArgChange: true,
    });
    const {data: pembelianData = []} = useGetPembelianQuery(undefined, {
        refetchOnMountOrArgChange: true
    });
    const {id} = useParams();
    const idTransaksi = decodeURIComponent(id ?? '');
    const namaSupplier = pembelianData.find(p => p.idTransaksi === idTransaksi);
    //console.log(search)

    useEffect(() => {
        if (
            !hasAutoFilled &&
            namaSupplier?.kdSupplier &&
            namaSupplier?.namaSupplier
        ) {
            const SupplierFromPembelian: getSupplierResponse = {
                kode: namaSupplier.kdSupplier,
                nama: namaSupplier.namaSupplier,
                alamat: "",
            };
            setSearch(SupplierFromPembelian.nama);
            setSelectedUser(SupplierFromPembelian);
            onSelectUser(SupplierFromPembelian);
            setHasAutoFilled(true);
        }
    }, [hasAutoFilled, namaSupplier, onSelectUser]);

    const handleSelect = (user: getSupplierResponse) => {
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
                    placeholder="Cari Supplier"
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
            {search.trim() !== "" && !selectedUser && listSupplier.length > 0 && (
                <ul className="mt-2 max-h-[300px] overflow-y-auto border border-gray-200 rounded-lg bg-white absolute z-10 shadow-lg">
                {listSupplier.map((user) => (
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

export default SearchSupplier;