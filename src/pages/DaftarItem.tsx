import type { FC } from "react";
import { getTitle } from "../constants/GetTitle";
import { DataTable, type Column } from "../components/DataTable";
import { Plus } from "lucide-react";

type Items = {
    kode: string;
    barcode: string;
    nama: string;
    stok: number;
    satuan: string;
    rak: string;
    jenis: string;
    merek: string;
    jual: number;
    beli: number;
    tipe: string;
    hpp: string;
    minStok: number;
    status: string;
};
const DaftarItem: FC = () => {
    const title = getTitle();
    
    const data: Items[] = [
        {
            kode: "BRG001",
            barcode: "1234567890",
            nama: "Pulpen Pilot",
            stok: 100,
            satuan: "pcs",
            rak: "A1",
            jenis: "Alat Tulis",
            merek: "Pilot",
            jual: 5000,
            beli: 3500,
            tipe: "Barang",
            hpp: "3600",
            minStok: 10,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
        {
            kode: "BRG002",
            barcode: "1234567891",
            nama: "Pensil 2B",
            stok: 50,
            satuan: "pcs",
            rak: "A2",
            jenis: "Alat Tulis",
            merek: "Faber-Castell",
            jual: 3000,
            beli: 2000,
            tipe: "Barang",
            hpp: "2100",
            minStok: 5,
            status: "Aktif",
        },
    ];

    const columns: Column<Items>[] = [
        { key: "kode", label: "Kode", sortable: true },
        { key: "barcode", label: "Barcode", sortable: true },
        { key: "nama", label: "Nama Item", sortable: true },
        { key: "stok", label: "Stok", sortable: true },
        { key: "satuan", label: "Satuan", sortable: false },
        { key: "rak", label: "Rak", sortable: false },
        { key: "jenis", label: "Jenis", sortable: false },
        { key: "merek", label: "Merek", sortable: false },
        { key: "jual", label: "Harga Jual", sortable: true },
        { key: "beli", label: "Harga Beli", sortable: true },
        { key: "tipe", label: "Tipe Item", sortable: false },
        { key: "hpp", label: "System HPP", sortable: false },
        { key: "minStok", label: "Stok Min.", sortable: true },
        { key: "status", label: "Status Jual", sortable: false },
    ];

    return (
        <div>
            <div className="flex justify-between items-center">
                <div></div>
                <div>
                    <button     
                        className="flex items-center gap-2 btn bg-blue-500 rounded-lg text-xs text-white hover:bg-blue-600">
                            <Plus size={18}/>
                            Tambah Item
                    </button>
                </div>
            </div>
            <div className="mt-3">
                <DataTable<Items> 
                    data={data} 
                    columns={columns} 
                    defaultSort={{ 
                        key: "nama", 
                        asc: true 
                    }} 
                    fileExportName={title}
                    footerSummary={(rows) => {
                        const totalStok = rows.reduce((sum, item) => sum + item.stok, 0);

                        return (
                            <tr>
                                <td colSpan={4} className="text-right">Total</td>
                                <td>{totalStok}</td>
                                <td colSpan={10}></td>
                            </tr>
                        )
                    }}
                />
            </div>
        </div>
    )
}

export default DaftarItem;