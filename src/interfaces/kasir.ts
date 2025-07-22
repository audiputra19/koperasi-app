interface DataKasir {
    kodeItem: string;
    namaItem: string;
    jenis: string;
    jumlah: number;
    satuan: string;
    harga: number;
}

interface DataPelanggan {
    kodePelanggan: number;
    namaPelanggan: string;
}

export interface InputKasirRequest {
    userBuat: string;
    total: number;
    metode: number;
    dataKasir: DataKasir[];
    dataPelanggan: DataPelanggan;
}

export interface InputKasirResponse {
    message: string;
}