interface DataKasir {
    kodeItem: string;
    namaItem: string;
    jenis: string;
    jumlah: number;
    satuan: string;
    harga: number;
}

interface DataPelanggan {
    kodePelanggan: number | undefined;
    namaPelanggan: string | undefined;
}

export interface InputKasirRequest {
    userBuat: string;
    total: number;
    metode: number;
    startDate: string;
    dataKasir: DataKasir[];
    dataPelanggan: DataPelanggan;
}

export interface InputKasirResponse {
    message: string;
}

export interface UpdateKasirRequest {
    userBuat: string;
    total: number;
    metode: number;
    startDate: string;
    dataKasir: DataKasir[];
    dataPelanggan: DataPelanggan;
    idTransaksi: string;
}

export interface UpdateKasirResponse {
    message: string;
}

export interface GetKasirResponse {
    idTransaksi: string;
    tanggal: string;
    kdPelanggan: number;
    namaPelanggan: string;
    total: number;
    userBuat: string;
    userUbah: string;
    metode: number;
}

export interface GetKasirDetailResponse {
    kodeItem: string;
    barcode: string;
    namaItem: string;
    jenis: string;
    jumlah: number;
    satuan: string
    harga: number;
}

export interface GetKasirDetailRequest {
    idTransaksi: string;
}

export interface DeleteKasirRequest { 
    idTransaksi: string;
}

export interface DeleteKasirResponse {
    message: string;
}

export interface DeleteKasirDetailRequest { 
    idTransaksi: string;
    kdItem: string;
    total: number;
}

export interface DeleteKasirDetailResponse {
    message: string;
}