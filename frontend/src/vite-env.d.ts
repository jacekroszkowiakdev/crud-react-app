/// <reference types="vite/client"/>
export interface ImportMetaEnv {
    readonly VITE_PRODUCTS_BACKEND_SERVER_PORT: string;
}

export interface ImportMeta {
    readonly env: ImportMetaEnv;
}
