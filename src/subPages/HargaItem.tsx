import { useEffect, useState, type Dispatch, type FC, type SetStateAction } from "react";
import type { inputItemRequest } from "../interfaces/items";

interface HargaItemProps {
    form: inputItemRequest,
    setFrom: Dispatch<SetStateAction<inputItemRequest>>;
}

export const HargaItem: FC<HargaItemProps> = ({ form, setFrom }) => {
    const [manualHargaJual, setManualHargaJual] = useState(false);

    useEffect(() => {
        //console.log("Running effect - hargaJual:", form.hargaJual, "manual:", manualHargaJual);
        if (!manualHargaJual) {
            const beli = Number(form.hargaBeli) || 0;
            const persen = Number(form.persenJual) || 0;
            const total = beli + (beli * persen / 100);
            setFrom(prev => ({
                ...prev,
                hargaJual: Math.floor(total)
            }));
        }
    }, [form.hargaBeli, form.persenJual, manualHargaJual]);

    return (
        <div className="flex gap-3">
            <div className="flex flex-col gap-1">
                <label htmlFor="beli" className="block text-sm font-medium text-gray-500">
                    Harga Beli
                    <span className="text-red-500">*</span>
                </label>
                <input 
                    type="text"
                    id="beli" 
                    value={form.hargaBeli || ""}
                    className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                    onChange={(e) => {
                        setFrom(prev => ({
                            ...prev,
                            hargaBeli: Number(e.target.value) || 0
                        }));
                    }}  
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
                        value={form.persenJual || ""}
                        className="w-1/4 border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"
                        onChange={(e) => setFrom(prev => ({
                            ...prev,
                            persenJual: Number(e.target.value) || 0
                        }))}  
                    />
                    <span className="text-sm font-bold text-gray-400">%</span>
                    <input 
                        type="text" 
                        value={form.hargaJual || ""}
                        onChange={(e) => {
                            setManualHargaJual(true);
                            setFrom(prev => ({
                                ...prev,
                                hargaJual: Number(e.target.value) || 0
                            }));
                        }}
                        className="w-full border px-3 py-2 border-gray-300 rounded-lg text-sm focus:outline-none"  
                    />
                </div>
            </div>
        </div>     
    )
}