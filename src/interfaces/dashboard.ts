export interface TotalRes {
    total: number;
}

export interface TableRes {
    kode: string;
    nama: string;
    jumlah: number;
    rak: string;
    expiredDate?: string;
}

export interface PopulerRes {
    nama: string;
    total: number;
}