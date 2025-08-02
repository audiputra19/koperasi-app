export interface InputSuppResponse {
    message: string;
}

export interface InputSuppRequest {
    kdSupp?: string;
    nama: string;
    alamat: string
}

export interface getSupplierResponse {
    kode: string;
    nama: string;
    alamat: string;
}