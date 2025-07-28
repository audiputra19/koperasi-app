interface DataPembelian {
    kodeItem: string;
    namaItem: string;
    jenis: string;
    jumlah: number;
    satuan: string;
    harga: number;
}

interface DataSupplier {
    kodeSupplier: string;
    namaSupplier: string;
}

export interface InputPembelianRequest {
    userBuat: string;
    total: number;
    metode: number;
    startDate: string;
    dataPembelian: DataPembelian[];
    dataSupplier: DataSupplier;
}

export interface InputPembelianResponse {
    message: string;
}

export interface UpdatePembelianRequest {
    userBuat: string;
    total: number;
    metode: number;
    startDate: string;
    dataPembelian: DataPembelian[];
    dataSupplier: DataSupplier;
    idTransaksi: string;
}

export interface UpdatePembelianResponse {
    message: string;
}

export interface GetPembelianResponse {
    idTransaksi: string;
    tanggal: string;
    kdSupplier: string;
    namaSupplier: string;
    total: number;
    userBuat: string;
    userUbah: string;
    metode: number;
}

export interface GetPembelianDetailResponse {
    kodeItem: string;
    barcode: string;
    namaItem: string;
    jenis: string;
    jumlah: number;
    satuan: string
    harga: number;
}

export interface GetPembelianDetailRequest {
    idTransaksi: string;
}

export interface DeletePembelianRequest { 
    idTransaksi: string;
}

export interface DeletePembelianResponse {
    message: string;
}

export interface DeletePembelianDetailRequest { 
    idTransaksi: string;
    kdItem: string;
    total: number;
}

export interface DeletePembelianDetailResponse {
    message: string;
}