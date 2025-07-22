import { useEffect, useState, type FC } from "react";
import { useSearchItemsQuery } from "../services/apiItems";
import type { getItemResponse } from "../interfaces/items";
import { LucideCirclePlus } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface onSelectItemProps {
    onSelectItem: (barang: getItemResponse) => void;
}

const isBarcode = (input: string) => /^\d{8,}$/.test(input);

const SearchItem: FC<onSelectItemProps> = ({ onSelectItem }) => {
    const [search, setSearch] = useState('');
    const { data: barangList = [] } = useSearchItemsQuery(search, { skip: !search });
    const navigate = useNavigate();

    useEffect(() => {
        if (isBarcode(search) && barangList.length === 1) {
            onSelectItem(barangList[0]);
            setSearch('');
        }
    }, [search, barangList, onSelectItem]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            if (barangList.length === 1) {
                onSelectItem(barangList[0]);
                setSearch('');
            }
        }
    };

    return (
        <div>
            <div className="relative">
                <input
                    type="text"
                    placeholder="Cari Barang"
                    className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    onKeyDown={handleKeyDown}
                />
                <button 
                    className="absolute right-2 top-2"
                    onClick={() => navigate('/tambah-item', { state: { from: 'kasir' } })}
                >
                    <LucideCirclePlus
                        size={20} 
                        className="cursor-pointer text-gray-400 hover:text-gray-500"
                    />
                </button>
            </div>
            {search.trim() !== '' && !isBarcode(search) && barangList.length > 0 && (
                <ul className="mt-2 border rounded bg-white absolute z-10">
                {barangList.map((barang) => (
                    <li
                        key={barang.barcode}
                        onClick={() => {
                            onSelectItem(barang);
                            setSearch('');
                        }}
                        className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                    >
                        {barang.nama}
                    </li>
                ))}
                </ul>
            )}
        </div>
    );
}

export default SearchItem;