export interface AuthState<T> {
    data: T;
    message: string;
}
export interface LoginRequest {
    idAdmin: number;
    password: string;
}

export interface LoginResponse {
    token: string | undefined;
}

export interface MeState<T> {
    user: T
}

export interface MeResponse {
    id: number;
    nama: string;
    hakAkses: number;
    kategori: string;
    iat: number;
    exp: number;
}