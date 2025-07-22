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
    hpp: string;
    stokMinimal: number;
    status: number;
}

export interface inputItemRequest {
    barcode: string;
    nama: string;
    stok: number;
    satuan: string; 
    rak: string;
    jenis: string;
    hargaBeli: number;
    hargaJual: number;
    hpp: string;
    stokMinimal: number;
    status: number;
}

export interface inputItemResponse {
    message: string;
}

export interface getItemResponse {
    message: string;
}