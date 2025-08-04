export interface getItemResponse {
    kode: string;
    barcode: string;
    nama: string;
    stok: number;
    satuan: string; 
    rak: string;
    jenis: string;
    hargaBeli: number;
    hargaJual: number;
    stokMinimal: number;
    status: number;
}

export interface inputItemRequest {
    kdItem?: string;
    barcode: string;
    nama: string;
    stok: number;
    satuan: string; 
    rak: string;
    jenis: string;
    hargaBeli: number;
    hargaJual: number;
    persenJual?: number | undefined;
    stokMinimal: number;
    status: number;
}

export interface inputItemResponse {
    message: string;
}

export interface getItemResponse {
    message: string;
}