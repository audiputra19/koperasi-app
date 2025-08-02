export interface getLaporanRequest {
    date1: string | null;
    date2: string | null;
    kdPelanggan: string | null;
}

export interface getLaporanResponse {
    idTransaksi: string;
    tanggal: string;
    kdPelanggan: number;
    namaPelanggan: string;
    total: number;
    userBuat: string;
    userUbah: string;
    metode: number;
}