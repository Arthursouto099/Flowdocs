export type Proccess = {
    id: string;
    name: string;
    created_at: Date | null;
    updated_at: Date | null;
    description: string | null;
    status: string | null;
    created_by: string | null;
    id_module: string;
}


export type Org = {
    id: string;
    name: string;
    created_at: Date;
    updated_at: Date;
    created_by: string;
    identifier_code: string;
}

export type User = {
    id: string;
    email: string;
    name: string;
    role: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    password: string;
}