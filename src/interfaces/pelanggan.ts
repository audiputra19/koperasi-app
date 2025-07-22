export interface GetPelangganResponse {
    kode: number;
    nama: string;
    idKategori: number;
    limitBelanja: number;
}

export interface InputPelangganRequest {
    idKategori: number;
    limitBelanja: number;
}

export interface InputPelangganResponse {
    message: string;
}